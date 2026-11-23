"use client";

import { useEffect, useId, useRef, useState } from "react";

import type { GalleryItem } from "@/content/schema";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { CMS_BUCKET, mediaUrl } from "@/lib/supabase/config";

import { restoreDefault, saveDraft } from "./actions";
import { describeRatio, ImageFormatError, prepareImage } from "./prepare-image";
import type { ImageTarget } from "./targets";

type Mode = "replace" | "add";

/**
 * Fenêtre de remplacement d'une photo : aperçu dans le format du site,
 * choix du fichier, description (alt) et, pour une galerie, légende,
 * ajout et suppression. La photo est optimisée dans le navigateur avant
 * l'envoi.
 */
export function ImagePanel({
  target,
  canRestore,
  onClose,
  onDone,
}: {
  target: ImageTarget;
  canRestore: boolean;
  onClose: () => void;
  onDone: (message: string) => void;
}) {
  const [mode, setMode] = useState<Mode>("replace");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [alt, setAlt] = useState(target.current.alt);
  const [caption, setCaption] = useState(target.current.caption ?? "");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  const gallery = target.gallery;
  const [rw, rh] = target.ratio.split(":").map(Number);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, onClose]);

  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  const pick = (next: File | undefined) => {
    if (!next) return;
    setError(null);
    setFile(next);
    setPreview(URL.createObjectURL(next));
  };

  const startAdd = () => {
    setMode("add");
    setFile(null);
    setPreview(null);
    setAlt("");
    setCaption("");
    setError(null);
    inputRef.current?.click();
  };

  const upload = async (source: File) => {
    setBusy("Optimisation de la photo…");
    const { blob, extension } = await prepareImage(source);
    setBusy("Envoi de la photo…");
    const path = `${target.key}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${extension}`;
    const { error: uploadError } = await getSupabaseBrowserClient()
      .storage.from(CMS_BUCKET)
      .upload(path, blob, {
        contentType: blob.type,
        cacheControl: "31536000",
        upsert: false,
      });
    if (uploadError) throw uploadError;
    return mediaUrl(path);
  };

  const save = async () => {
    setError(null);
    if (mode === "add" && !file) {
      setError("Choisissez d'abord une photo.");
      return;
    }
    if (target.altMaxLength !== undefined && !alt.trim()) {
      setError(
        "Décrivez la photo en quelques mots (pour Google et l'accessibilité).",
      );
      return;
    }
    try {
      const src = file ? await upload(file) : target.current.src;
      setBusy("Enregistrement…");
      const item: GalleryItem = { src, alt: alt.trim() };
      if (target.captionMaxLength !== undefined) item.caption = caption.trim();

      const value =
        mode === "add" && gallery
          ? gallery.withAdded(item)
          : target.build(item);
      const result = await saveDraft(target.key, value);
      if (!result.ok) throw new Error(result.error);
      onDone(mode === "add" ? "Photo ajoutée" : "Photo enregistrée");
    } catch (e) {
      setBusy(null);
      setError(
        e instanceof ImageFormatError
          ? e.message
          : e instanceof Error && e.message
            ? e.message
            : "L'envoi a échoué. Réessayez.",
      );
    }
  };

  const remove = async () => {
    if (!gallery) return;
    setBusy("Suppression…");
    const result = await saveDraft(target.key, gallery.withRemoved());
    if (!result.ok) {
      setBusy(null);
      setError(result.error);
      return;
    }
    onDone("Photo retirée de la galerie");
  };

  const restore = async () => {
    setBusy("Rétablissement…");
    const result = await restoreDefault(target.key);
    if (!result.ok) {
      setBusy(null);
      setError(result.error);
      return;
    }
    onDone("Contenu d'origine rétabli (à publier)");
  };

  const shown = preview ?? (mode === "replace" ? target.current.src : null);
  const altTooLong =
    target.altMaxLength !== undefined && alt.length > target.altMaxLength;

  return (
    <div
      data-cms-ui
      className="fixed inset-0 z-[95] flex items-end justify-center bg-night/45 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !busy) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[92svh] w-full max-w-lg animate-[cms-pop_.25s_ease-out] flex-col overflow-hidden rounded-[1.75rem] bg-paper-soft font-sans text-ink shadow-soft"
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-3">
          <div>
            <p className="text-xs font-medium tracking-[0.08em] text-accent-800 uppercase">
              {mode === "add" ? "Ajouter une photo" : "Remplacer la photo"}
            </p>
            <h2 id={titleId} className="mt-1 text-base font-semibold">
              {target.label}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={!!busy}
            className="grid size-9 shrink-0 place-items-center rounded-full text-ink-soft hover:bg-ink/5 disabled:opacity-40"
            aria-label="Fermer"
          >
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-5 overflow-y-auto px-6 pb-6">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={!!busy}
            className="group relative w-full overflow-hidden rounded-2xl bg-blush"
            style={{ aspectRatio: `${rw || 4} / ${rh || 3}` }}
          >
            {shown ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={shown} alt="" className="size-full object-cover" />
            ) : null}
            <span className="absolute inset-0 grid place-items-center bg-night/0 transition-colors group-hover:bg-night/30">
              <span className="rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-ink shadow-lift">
                {shown ? "Choisir une autre photo" : "Choisir une photo"}
              </span>
            </span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/heic"
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              pick(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <p className="-mt-2 text-xs leading-relaxed text-ink-subtle">
            Format conseillé : {describeRatio(target.ratio)}. Sur le site, la
            photo est cadrée automatiquement au centre. JPG, PNG ou WebP : elle
            est optimisée avant l&apos;envoi.
          </p>

          {target.altMaxLength !== undefined ? (
            <Field
              label="Description de la photo"
              hint={
                file
                  ? "Nouvelle photo : pensez à mettre la description à jour."
                  : "Lue par Google et les lecteurs d'écran."
              }
              count={alt.length}
              max={target.altMaxLength}
            >
              <textarea
                value={alt}
                onChange={(e) => setAlt(e.target.value.replace(/\n/g, " "))}
                rows={2}
                maxLength={target.altMaxLength}
                className="w-full resize-none rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm leading-relaxed outline-none focus:border-accent-500"
              />
            </Field>
          ) : null}

          {target.captionMaxLength !== undefined ? (
            <Field
              label="Légende"
              count={caption.length}
              max={target.captionMaxLength}
            >
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={target.captionMaxLength}
                className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-accent-500"
              />
            </Field>
          ) : null}

          {error ? (
            <p
              role="alert"
              className="rounded-xl bg-accent-100 px-3.5 py-2.5 text-sm text-accent-900"
            >
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {gallery &&
              mode === "replace" &&
              gallery.length < gallery.maxItems ? (
                <button
                  type="button"
                  onClick={startAdd}
                  disabled={!!busy}
                  className="text-accent-800 underline-offset-4 hover:underline disabled:opacity-40"
                >
                  + Ajouter une photo après
                </button>
              ) : null}
              {gallery && mode === "replace" && gallery.length > 1 ? (
                <button
                  type="button"
                  onClick={remove}
                  disabled={!!busy}
                  className="text-ink-soft underline-offset-4 hover:underline disabled:opacity-40"
                >
                  Retirer de la galerie
                </button>
              ) : null}
              {canRestore && mode === "replace" ? (
                <button
                  type="button"
                  onClick={restore}
                  disabled={!!busy}
                  className="text-ink-soft underline-offset-4 hover:underline disabled:opacity-40"
                >
                  Rétablir l&apos;original
                </button>
              ) : null}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={!!busy}
                className="h-10 rounded-full px-4 text-sm font-medium text-ink-soft hover:bg-ink/5 disabled:opacity-40"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={save}
                disabled={!!busy || altTooLong}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-night px-5 text-sm font-medium text-white shadow-lift disabled:opacity-60"
              >
                {busy ? <Spinner /> : null}
                {busy ?? "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  count,
  max,
  children,
}: {
  label: string;
  hint?: string;
  count: number;
  max: number;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-baseline justify-between gap-3 text-sm font-medium">
        {label}
        <Counter count={count} max={max} />
      </span>
      {children}
      {hint ? <span className="text-xs text-ink-subtle">{hint}</span> : null}
    </label>
  );
}

export function Counter({ count, max }: { count: number; max: number }) {
  const ratio = count / max;
  return (
    <span
      className={
        ratio >= 1
          ? "font-semibold text-accent-800 tabular-nums"
          : ratio >= 0.9
            ? "text-accent-700 tabular-nums"
            : "text-ink-subtle tabular-nums"
      }
    >
      {count} / {max}
    </span>
  );
}

export function Spinner() {
  return (
    <span
      aria-hidden
      className="size-3.5 animate-[cms-spin_.8s_linear_infinite] rounded-full border-2 border-current border-r-transparent"
    />
  );
}
