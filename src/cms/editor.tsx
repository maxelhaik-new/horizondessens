"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";

import type { FieldDef } from "@/content/schema";

import {
  discardAll,
  discardDraft,
  publishAll,
  restoreDefault,
  saveDraft,
  signOut,
} from "./actions";
import { editorCss } from "./editor-styles";
import { Counter, ImagePanel, Spinner } from "./image-panel";
import { readTarget, type ImageTarget, type TextTarget } from "./targets";
import { startTextSession, type TextSession } from "./text-session";

type EditorProps = {
  fields: Record<string, FieldDef>;
  /** Valeurs affichées (publié + brouillons), clé par clé. */
  values: Record<string, unknown>;
  /** Clés avec un brouillon non publié. */
  draftKeys: string[];
  /** Clés dont le contenu diffère du code (publié ou brouillon). */
  customKeys: string[];
  editor: { email: string } | null;
};

type Active = { target: TextTarget; el: HTMLElement; length: number };
type HoverImage = { img: HTMLImageElement; rect: DOMRect; pinned: boolean };
type Toast = { message: string; tone: "ok" | "error" };

/**
 * Éditeur en place du mini-CMS, monté UNIQUEMENT en mode édition.
 * - Texte : clic sur un élément marqué → édition dans la vraie mise en page,
 *   compteur et limite stricte ; Entrée / clic ailleurs enregistre le
 *   brouillon, Échap annule.
 * - Image : bouton « Remplacer » discret au survol (ou au toucher).
 * - Barre basse : brouillons, aperçu, publication.
 */
export function CmsEditor({
  fields,
  values,
  draftKeys,
  customKeys,
  editor,
}: EditorProps) {
  const [preview, setPreview] = useState(false);
  const [active, setActive] = useState<Active | null>(null);
  const [hover, setHover] = useState<HoverImage | null>(null);
  const [imageTarget, setImageTarget] = useState<ImageTarget | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [limitFlash, setLimitFlash] = useState(0);
  const [isPending, startTransition] = useTransition();
  const sessionRef = useRef<TextSession | null>(null);
  const pathname = usePathname();

  // Les gestionnaires d'événements lisent toujours les dernières props.
  const latest = useRef({ fields, values, customKeys });
  useLayoutEffect(() => {
    latest.current = { fields, values, customKeys };
  });

  const notify = useCallback((message: string, tone: Toast["tone"] = "ok") => {
    setToast({ message, tone });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  // --- Mode sur <html> -------------------------------------------------
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.cmsMode = preview ? "preview" : "edit";
    return () => {
      delete root.dataset.cmsMode;
    };
  }, [preview]);

  // --- Repère visuel des champs modifiés non publiés --------------------
  useEffect(() => {
    const drafts = new Set(draftKeys);
    const frame = requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>("[data-cms]").forEach((el) => {
        if (drafts.has(el.dataset.cms ?? ""))
          el.setAttribute("data-cms-draft", "");
        else el.removeAttribute("data-cms-draft");
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [draftKeys, pathname]);

  // --- Édition de texte --------------------------------------------------
  const startEditing = useCallback(
    (el: HTMLElement, target: TextTarget) => {
      sessionRef.current?.commit();
      setHover(null);
      const session = startTextSession({
        el,
        value: target.value,
        maxLength: target.maxLength,
        multiline: target.multiline,
        label: target.label,
        onInput: (length) =>
          setActive((a) => (a && a.el === el ? { ...a, length } : a)),
        onLimit: () => setLimitFlash((n) => n + 1),
        onEmpty: () => notify("Ce texte ne peut pas être vide.", "error"),
        onEnd: () => {
          if (sessionRef.current === session) sessionRef.current = null;
          setActive((a) => (a && a.el === el ? null : a));
        },
        onCommit: async (text) => {
          const result = await saveDraft(target.key, target.build(text));
          if (!result.ok) notify(result.error, "error");
          return result.ok;
        },
      });
      sessionRef.current = session;
      setActive({ target, el, length: target.value.length });
    },
    [notify],
  );

  useEffect(() => {
    if (preview) return;

    const imageAt = (x: number, y: number) =>
      document
        .elementsFromPoint(x, y)
        .find(
          (node): node is HTMLImageElement =>
            node instanceof HTMLImageElement && node.hasAttribute("data-cms"),
        ) ?? null;

    const onClick = (event: MouseEvent) => {
      const node = event.target as Element | null;
      if (!node || node.closest("[data-cms-ui]")) return;
      if (sessionRef.current?.isInside(node)) return;

      const el = node.closest<HTMLElement>("[data-cms]:not(img)");
      if (el) {
        const { fields: f, values: v } = latest.current;
        const target = readTarget(el, f, v);
        if (target?.kind === "text") {
          event.preventDefault();
          event.stopPropagation();
          startEditing(el, target);
          return;
        }
      }
      // Clic (ou toucher) sur une photo éditable : affiche son bouton et
      // bloque le lien qui ENTOURE la photo (carte). Les boutons, champs et
      // liens posés par-dessus (CTA, bandeau cookies…) restent cliquables.
      const img = imageAt(event.clientX, event.clientY);
      const control = node.closest(
        "a, button, input, select, textarea, label, summary, [role='button']",
      );
      if (
        img &&
        (!control || (control.tagName === "A" && control.contains(img)))
      ) {
        event.preventDefault();
        event.stopPropagation();
        setHover({ img, rect: visibleRect(img), pinned: true });
      }
    };

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const over = (event.target as Element | null)?.closest?.(
          "[data-cms-ui]",
        );
        if (over) return;
        const img = imageAt(event.clientX, event.clientY);
        setHover((h) => {
          if (!img) return h?.pinned ? h : null;
          if (h?.img === img) return { ...h, rect: visibleRect(img) };
          return { img, rect: visibleRect(img), pinned: false };
        });
      });
    };

    const onScroll = () =>
      setHover((h) => (h ? { ...h, rect: visibleRect(h.img) } : h));

    document.addEventListener("click", onClick, true);
    document.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [preview, startEditing]);

  // Changement de page ou passage en aperçu : on clôt l'édition en cours,
  // et le bouton photo d'une autre page n'est plus affiché.
  useEffect(() => {
    sessionRef.current?.commit();
  }, [pathname, preview]);
  const [hoverPath, setHoverPath] = useState(pathname);
  if (hoverPath !== pathname) {
    setHoverPath(pathname);
    setHover(null);
  }

  // --- Actions -----------------------------------------------------------
  const run = (
    action: () => Promise<{ ok: boolean; error?: string }>,
    ok: string,
  ) =>
    startTransition(async () => {
      const result = await action();
      if (result.ok) notify(ok);
      else notify(result.error ?? "Une erreur est survenue.", "error");
    });

  const openImage = () => {
    if (!hover) return;
    const target = readTarget(
      hover.img,
      latest.current.fields,
      latest.current.values,
    );
    if (target?.kind === "image") setImageTarget(target);
    setHover(null);
  };

  const count = draftKeys.length;

  return (
    <>
      <style>{editorCss}</style>

      {active && !preview ? (
        <FieldBadge
          active={active}
          limitFlash={limitFlash}
          canRestore={customKeys.includes(active.target.key)}
          onAction={(kind) => {
            const { target } = active;
            sessionRef.current?.cancel();
            if (kind === "restore")
              run(
                () => restoreDefault(target.key),
                "Contenu d'origine rétabli (à publier)",
              );
            else if (kind === "add" && target.list)
              run(
                () => saveDraft(target.key, target.list!.withAdded()),
                "Élément ajouté : cliquez dessus pour l'écrire",
              );
            else if (kind === "remove" && target.list)
              run(
                () => saveDraft(target.key, target.list!.withRemoved()),
                "Élément retiré",
              );
          }}
        />
      ) : null}

      {hover && !preview && !imageTarget ? (
        <button
          type="button"
          data-cms-ui
          onClick={openImage}
          onMouseLeave={() => setHover((h) => (h?.pinned ? h : null))}
          className="fixed z-[85] inline-flex h-9 items-center gap-2 rounded-full bg-white/95 pr-4 pl-3 font-sans text-[13px] font-medium text-ink shadow-lift backdrop-blur transition-transform hover:scale-[1.03]"
          style={{
            top: Math.max(hover.rect.top + 12, 84),
            left: Math.max(hover.rect.right - 12, 180),
            transform: "translateX(-100%)",
          }}
        >
          <svg
            viewBox="0 0 20 20"
            className="size-4 text-accent-700"
            aria-hidden
          >
            <rect
              x="2.5"
              y="4"
              width="15"
              height="12"
              rx="2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor" />
            <path
              d="M3 14l4.5-4 3.5 3 2.5-2 3.5 3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          Remplacer
        </button>
      ) : null}

      {imageTarget ? (
        <ImagePanel
          target={imageTarget}
          canRestore={customKeys.includes(imageTarget.key)}
          onClose={() => setImageTarget(null)}
          onDone={(message) => {
            setImageTarget(null);
            notify(message);
          }}
        />
      ) : null}

      <Toolbar
        count={count}
        draftKeys={draftKeys}
        fields={fields}
        editor={editor}
        preview={preview}
        pending={isPending}
        onTogglePreview={() => {
          setHover(null);
          setPreview((p) => !p);
        }}
        onPublish={() => run(publishAll, "Publié : le site est à jour")}
        onDiscardAll={() => run(discardAll, "Modifications annulées")}
        onDiscard={(key) =>
          run(() => discardDraft(key), "Modification annulée")
        }
      />

      {toast ? (
        <div
          role="status"
          data-cms-ui
          className={`fixed bottom-24 left-1/2 z-[96] -translate-x-1/2 animate-[cms-pop_.25s_ease-out] rounded-full px-5 py-2.5 font-sans text-sm font-medium shadow-lift ${
            toast.tone === "error"
              ? "bg-accent-900 text-white"
              : "bg-night text-white"
          }`}
        >
          {toast.message}
        </div>
      ) : null}
    </>
  );
}

/** Pastille au-dessus du texte en cours d'édition : champ, compteur, outils. */
function FieldBadge({
  active,
  limitFlash,
  canRestore,
  onAction,
}: {
  active: Active;
  limitFlash: number;
  canRestore: boolean;
  onAction: (kind: "restore" | "add" | "remove") => void;
}) {
  const [rect, setRect] = useState(() => active.el.getBoundingClientRect());

  useEffect(() => {
    let frame = 0;
    const loop = () => {
      setRect(active.el.getBoundingClientRect());
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [active.el]);

  const { target } = active;
  const list = target.list;
  const above = rect.top > 140;
  const left = Math.min(Math.max(rect.left, 12), window.innerWidth - 12);

  const button =
    "rounded-full px-2.5 py-1 text-[12px] font-medium text-ink-soft hover:bg-ink/5 hover:text-ink";

  return (
    <div
      data-cms-ui
      onMouseDown={(e) => e.preventDefault()}
      className="fixed z-[85] flex max-w-[min(34rem,calc(100vw-24px))] flex-wrap items-center gap-x-1 gap-y-0.5 rounded-2xl bg-white/97 py-1.5 pr-1.5 pl-3.5 font-sans text-[12px] text-ink shadow-lift"
      style={{
        left,
        top: above ? rect.top - 14 : rect.bottom + 14,
        transform: `translate(min(0px, calc(100vw - 100% - ${left + 12}px)), ${above ? "-100%" : "0"})`,
      }}
    >
      <span className="mr-1 truncate font-medium">{target.label}</span>
      <span className="mr-1.5">
        <Counter count={active.length} max={target.maxLength} />
      </span>
      {limitFlash ? (
        <span
          key={limitFlash}
          className="mr-1 animate-[cms-flash_1.6s_ease-out_forwards] rounded-full bg-accent-100 px-2 py-0.5 font-medium text-accent-900"
        >
          Limite atteinte
        </span>
      ) : null}
      {list && list.length < list.maxItems ? (
        <button
          type="button"
          className={button}
          onClick={() => onAction("add")}
        >
          + Ajouter
        </button>
      ) : null}
      {list && list.length > 1 ? (
        <button
          type="button"
          className={button}
          onClick={() => onAction("remove")}
        >
          Supprimer
        </button>
      ) : null}
      {canRestore ? (
        <button
          type="button"
          className={button}
          onClick={() => onAction("restore")}
        >
          Rétablir l&apos;original
        </button>
      ) : null}
      <span className="hidden pl-1 text-ink-subtle sm:inline">
        {target.multiline ? "⌘↵ valider" : "↵ valider"} · Échap annuler
      </span>
    </div>
  );
}

/** Barre d'édition, en bas de l'écran. */
function Toolbar({
  count,
  draftKeys,
  fields,
  editor,
  preview,
  pending,
  onTogglePreview,
  onPublish,
  onDiscardAll,
  onDiscard,
}: {
  count: number;
  draftKeys: string[];
  fields: Record<string, FieldDef>;
  editor: { email: string } | null;
  preview: boolean;
  pending: boolean;
  onTogglePreview: () => void;
  onPublish: () => void;
  onDiscardAll: () => void;
  onDiscard: (key: string) => void;
}) {
  const [openState, setOpen] = useState<"drafts" | "menu" | "confirm" | null>(
    null,
  );
  // Plus rien à publier : la liste et la confirmation se referment.
  const open = count === 0 && openState !== "menu" ? null : openState;

  const pill =
    "inline-flex h-10 items-center gap-2 rounded-full px-4 text-[13px] font-medium transition-colors disabled:opacity-50";

  if (!editor) {
    return (
      <div
        data-cms-ui
        className="fixed bottom-4 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-night px-5 py-3 font-sans text-sm text-white shadow-lift"
      >
        Session expirée.{" "}
        <a href="/admin" className="underline underline-offset-4">
          Se reconnecter
        </a>
      </div>
    );
  }

  return (
    <div
      data-cms-ui
      className="fixed bottom-3 left-1/2 z-[90] w-max max-w-[calc(100vw-16px)] -translate-x-1/2 font-sans sm:bottom-5"
    >
      {open === "drafts" && count > 0 ? (
        <div className="absolute bottom-full left-1/2 mb-2 w-[min(26rem,calc(100vw-16px))] -translate-x-1/2 animate-[cms-pop_.2s_ease-out] rounded-2xl bg-paper-soft p-2 text-ink shadow-soft">
          <p className="px-3 pt-2 pb-1 text-xs font-medium tracking-[0.08em] text-accent-800 uppercase">
            À publier
          </p>
          <ul className="max-h-72 overflow-y-auto">
            {draftKeys.map((key) => (
              <li
                key={key}
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-[13px] hover:bg-ink/[0.04]"
              >
                <button
                  type="button"
                  className="truncate text-left"
                  onClick={() => {
                    const el = document.querySelector(
                      `[data-cms="${CSS.escape(key)}"]`,
                    );
                    el?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  title={
                    document.querySelector(`[data-cms="${CSS.escape(key)}"]`)
                      ? "Voir sur la page"
                      : "Sur une autre page"
                  }
                >
                  {fields[key]?.label ?? key}
                </button>
                <button
                  type="button"
                  onClick={() => onDiscard(key)}
                  disabled={pending}
                  className="shrink-0 text-ink-subtle underline-offset-4 hover:text-ink hover:underline"
                >
                  Annuler
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {open === "menu" ? (
        <div className="absolute right-0 bottom-full mb-2 w-60 animate-[cms-pop_.2s_ease-out] rounded-2xl bg-paper-soft p-2 text-[13px] text-ink shadow-soft">
          <p className="truncate px-3 pt-2 pb-2 text-xs text-ink-subtle">
            {editor.email}
          </p>
          <p className="px-3 pb-3 text-xs leading-relaxed text-ink-soft">
            Cliquez sur un texte pour le modifier, survolez une photo pour la
            remplacer. Vos modifications sont enregistrées en brouillon : seul «
            Publier » les met en ligne.
          </p>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full rounded-xl px-3 py-2 text-left hover:bg-ink/[0.05]"
            >
              Quitter le mode édition
            </button>
          </form>
        </div>
      ) : null}

      <div className="flex items-center gap-1 rounded-full bg-night p-1 text-white shadow-lift">
        <span className="hidden items-center gap-2 pr-2 pl-3 text-[13px] font-medium md:inline-flex">
          <span className="size-2 rounded-full bg-accent-400" aria-hidden />
          {preview ? "Aperçu" : "Édition"}
        </span>

        <button
          type="button"
          className={`${pill} ${count ? "bg-white/10 hover:bg-white/15" : "text-white/70"}`}
          onClick={() => count && setOpen(open === "drafts" ? null : "drafts")}
          aria-expanded={open === "drafts"}
        >
          {pending ? <Spinner /> : null}
          {count === 0
            ? "Tout est publié"
            : `${count} modification${count > 1 ? "s" : ""}`}
        </button>

        <button
          type="button"
          className={`${pill} hover:bg-white/10`}
          onClick={onTogglePreview}
          aria-pressed={preview}
        >
          {preview ? "Modifier" : "Aperçu"}
        </button>

        {open === "confirm" ? (
          <>
            <button
              type="button"
              className={`${pill} hover:bg-white/10`}
              onClick={() => setOpen(null)}
            >
              Garder
            </button>
            <button
              type="button"
              className={`${pill} bg-accent-200 text-ink hover:bg-accent-300`}
              onClick={() => {
                setOpen(null);
                onDiscardAll();
              }}
            >
              Tout annuler
            </button>
          </>
        ) : (
          <>
            {count > 0 ? (
              <button
                type="button"
                className={`${pill} hidden text-white/75 hover:bg-white/10 sm:inline-flex`}
                onClick={() => setOpen("confirm")}
                disabled={pending}
              >
                Annuler tout
              </button>
            ) : null}
            <button
              type="button"
              className={`${pill} bg-paper text-ink hover:bg-white`}
              onClick={onPublish}
              disabled={pending || count === 0}
            >
              Publier
            </button>
          </>
        )}

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full hover:bg-white/10"
          onClick={() => setOpen(open === "menu" ? null : "menu")}
          aria-label="Plus d'options"
          aria-expanded={open === "menu"}
        >
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
            <circle cx="3" cy="8" r="1.4" fill="currentColor" />
            <circle cx="8" cy="8" r="1.4" fill="currentColor" />
            <circle cx="13" cy="8" r="1.4" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/** Partie visible d'une image (cadres en overflow hidden, parallaxe). */
function visibleRect(img: HTMLElement): DOMRect {
  let { top, left, right, bottom } = img.getBoundingClientRect();
  let node = img.parentElement;
  for (let depth = 0; node && depth < 8; depth++, node = node.parentElement) {
    const style = getComputedStyle(node);
    if (style.overflow !== "visible" || style.clipPath !== "none") {
      const r = node.getBoundingClientRect();
      top = Math.max(top, r.top);
      left = Math.max(left, r.left);
      right = Math.min(right, r.right);
      bottom = Math.min(bottom, r.bottom);
    }
  }
  return new DOMRect(
    left,
    top,
    Math.max(0, right - left),
    Math.max(0, bottom - top),
  );
}
