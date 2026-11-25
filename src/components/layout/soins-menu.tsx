"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { ChevronRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/navigation";
import { soinsNav } from "@/services/pages";

/**
 * Entrée « Soins » de l'en-tête (desktop) : bouton qui ouvre la liste des
 * pages de soin, plus « Tous les soins et tarifs » (/reserver).
 * Ouverture au clic ou au survol (souris), fermeture à Échap, au clic
 * extérieur, à la sortie du pointeur et au changement de page.
 */
export function SoinsMenu({ solid }: { solid: boolean }) {
  const [open, setOpen] = useState(false);
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const pathname = usePathname();
  const ref = useRef<HTMLLIElement>(null);
  const panelId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Fermé dès qu'on change de page (dérivé, sans effet).
  const isOpen = open && openedOn === pathname;
  const show = () => {
    clearTimeout(closeTimer.current);
    setOpenedOn(pathname);
    setOpen(true);
  };
  const hide = () => setOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        hide();
        ref.current?.querySelector("button")?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) hide();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, [isOpen]);

  const active =
    pathname === routes.reserver || soinsNav.some((s) => s.href === pathname);

  return (
    <li
      ref={ref}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        closeTimer.current = setTimeout(hide, 150);
      }}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) hide();
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => (isOpen ? hide() : show())}
        className={cn(
          "-mx-2 inline-flex min-h-11 cursor-pointer items-center gap-1.5 px-2 transition-colors",
          solid
            ? active
              ? "text-ink"
              : "text-ink-soft hover:text-ink"
            : active
              ? "text-white"
              : "text-white/75 hover:text-white",
        )}
      >
        Soins
        <ChevronRightIcon
          aria-hidden
          className={cn(
            "size-3 transition-transform duration-300",
            isOpen ? "-rotate-90" : "rotate-90",
          )}
        />
      </button>

      <div
        id={panelId}
        hidden={!isOpen}
        className="absolute top-full left-1/2 w-72 -translate-x-1/2 pt-4"
      >
        <ul className="flex flex-col rounded-3xl bg-paper-soft p-2 text-ink shadow-soft ring-1 ring-line">
          {soinsNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={hide}
                aria-current={pathname === item.href ? "page" : undefined}
                className="flex min-h-11 items-center rounded-2xl px-4 font-serif text-xl tracking-[-0.01em] italic transition-colors hover:bg-white aria-[current=page]:bg-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-1 border-t border-line pt-1">
            <Link
              href={routes.reserver}
              onClick={hide}
              className="flex min-h-11 items-center justify-between rounded-2xl px-4 text-sm text-ink-soft transition-colors hover:bg-white hover:text-ink"
            >
              Tous les soins et tarifs
              <ChevronRightIcon aria-hidden className="size-3.5" />
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
}
