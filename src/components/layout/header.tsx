"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button-link";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { mainNav, routes } from "@/lib/navigation";

/**
 * En-tête en pilule flottante (Serelin) : transparente sur le hero sombre,
 * blanche translucide dès qu'on défile. Mobile : menu plein écran et barre
 * « Réserver » fixe en bas.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-4">
        <div className="container-site">
          <div
            className={cn(
              "flex h-16 items-center justify-between gap-6 rounded-full pr-2 pl-5 transition-[background-color,color,box-shadow,backdrop-filter] duration-500 ease-soft md:h-[4.5rem] md:pl-8",
              solid
                ? "bg-white/70 text-ink shadow-soft backdrop-blur-xl"
                : "bg-transparent text-white",
            )}
          >
            <Logo />

            <nav aria-label="Navigation principale" className="hidden lg:block">
              <ul className="flex items-center gap-8 text-sm font-medium tracking-[0.016em]">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "transition-colors",
                        solid
                          ? "text-ink-soft hover:text-ink"
                          : "text-white/75 hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <ButtonLink
                href={routes.reserver}
                size="sm"
                className="hidden sm:inline-flex"
              >
                Réserver
              </ButtonLink>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full lg:hidden"
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? (
                  <CloseIcon className="size-6" />
                ) : (
                  <MenuIcon className="size-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav
        id="menu-mobile"
        aria-label="Navigation mobile"
        className={cn(
          "fixed inset-0 z-40 bg-paper px-5 pt-28 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        hidden={!open}
      >
        <ul className="flex flex-col gap-1">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-serif text-5xl tracking-[-0.02em] italic"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Barre de réservation mobile, toujours à portée de pouce */}
      <div className="fixed inset-x-0 bottom-0 z-40 p-3 sm:hidden">
        <ButtonLink href={routes.reserver} className="w-full justify-between">
          Réserver un soin
        </ButtonLink>
      </div>
    </>
  );
}
