"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button-link";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { mainNav, routes } from "@/lib/navigation";

/**
 * En-tête : transparent sur le hero sombre, opaque dès qu'on défile.
 * Mobile : menu plein écran + barre « Réserver » fixe en bas.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
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
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ease-soft",
          solid
            ? "bg-paper/90 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
            : "text-white",
        )}
      >
        <div className="container-site flex h-18 items-center justify-between gap-6 md:h-20">
          <Logo />

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm font-medium">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="opacity-80 transition-opacity hover:opacity-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink
              href={routes.reserver}
              variant={solid ? "dark" : "glass"}
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
      </header>

      <nav
        id="menu-mobile"
        aria-label="Navigation mobile"
        className={cn(
          "fixed inset-x-0 top-18 bottom-0 z-40 bg-paper px-5 pt-8 transition-opacity duration-300 md:top-20 lg:hidden",
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
                className="block py-3 font-serif text-4xl tracking-[-0.02em]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Barre de réservation mobile, toujours à portée de pouce */}
      <div className="fixed inset-x-0 bottom-0 z-40 p-3 sm:hidden">
        <ButtonLink
          href={routes.reserver}
          className="w-full justify-between shadow-lg"
        >
          Réserver un soin
        </ButtonLink>
      </div>
    </>
  );
}
