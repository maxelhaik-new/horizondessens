"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SoinsMenu } from "@/components/layout/soins-menu";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/cn";
import { legalNav, mainNav, routes } from "@/lib/navigation";
import { servicePages } from "@/services/pages";

/** Pages sans hero sombre : en-tête opaque dès le haut de page. */
const lightPages: readonly string[] = [
  ...legalNav.map((item) => item.href),
  routes.salon,
  routes.carteCadeau,
  routes.carteCadeauMerci,
  routes.reserver,
  routes.contact,
];

/** Pages de soin : la barre mobile mène au module de la page (`#reserver`). */
const servicePagePaths: readonly string[] = [
  routes.kobido,
  ...Object.values(servicePages).map((page) => page.path),
];

/**
 * En-tête en pilule flottante (Serelin) : transparente sur le hero sombre,
 * blanche translucide dès qu'on défile. Mobile : menu plein écran et barre
 * « Réserver » fixe en bas.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  // Mobile et tablette : l'en-tête s'efface quand on descend, revient dès
  // qu'on remonte (environ 90 px d'écran rendus au contenu).
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [heroCtaVisible, setHeroCtaVisible] = useState(false);
  const pathname = usePathname();
  const lightPage = lightPages.includes(pathname);
  const bookHref = servicePagePaths.includes(pathname)
    ? "#reserver"
    : routes.reserver;

  useEffect(() => {
    // Hystérésis : il faut descendre de 12 px pour masquer, remonter de
    // 48 px pour réafficher (les petits réajustements de la page, comme le
    // rebond iOS ou un changement de mise en page, ne font pas clignoter).
    let last = window.scrollY;
    let down = 0;
    let up = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const delta = y - last;
      last = y;
      if (delta > 0) {
        down += delta;
        up = 0;
      } else {
        up -= delta;
        down = 0;
      }
      if (y < 160 || up > 48) setHidden(false);
      else if (down > 12) setHidden(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // La barre « Réserver » mobile double le bouton du hero tant qu'il est à
  // l'écran, et le module de réservation (`#reserver`) quand on y est : on
  // la masque tant que l'un des deux est visible.
  useEffect(() => {
    const targets = document.querySelectorAll("[data-hero-cta], #reserver");
    if (targets.length === 0) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setHeroCtaVisible(visible.size > 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      setHeroCtaVisible(false);
    };
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Menu ouvert : en-tête transparent, texte clair sur le voile sombre.
  const solid = (scrolled || lightPage) && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))] transition-transform duration-500 ease-soft motion-reduce:transition-none md:pt-4",
          hidden && !open && "max-lg:-translate-y-[calc(100%+0.5rem)]",
        )}
      >
        <div className="container-site">
          <div
            className={cn(
              "flex h-16 items-center justify-between gap-6 rounded-full pr-2 pl-5 transition-[background-color,color,box-shadow,backdrop-filter] duration-500 ease-soft md:h-[4.5rem] md:pl-8",
              solid
                ? "bg-paper-soft/90 text-ink shadow-soft backdrop-blur-2xl"
                : "bg-transparent text-white",
            )}
          >
            <Logo />

            <nav aria-label="Navigation principale" className="hidden lg:block">
              <ul className="flex items-center gap-8 text-sm font-medium tracking-[0.016em]">
                {mainNav.map((item) =>
                  item.label === "Soins" ? (
                    <SoinsMenu key={item.href} solid={solid} />
                  ) : (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "-mx-2 inline-flex min-h-11 items-center px-2 transition-colors",
                          solid
                            ? "text-ink-soft hover:text-ink"
                            : "text-white/75 hover:text-white",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full lg:hidden"
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                onClick={() => setOpen((v) => !v)}
              >
                {/* Deux barres qui pivotent en croix (0.6 s). */}
                <span aria-hidden className="relative block size-4">
                  {[0, 1].map((bar) => (
                    <span
                      key={bar}
                      className={cn(
                        "absolute left-0 h-0.5 w-4 rounded-full bg-current transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]",
                        open
                          ? cn(
                              "top-[7px]",
                              bar === 0 ? "rotate-45" : "-rotate-45",
                            )
                          : bar === 0
                            ? "top-[3px]"
                            : "top-[11px]",
                      )}
                    />
                  ))}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        id="menu-mobile"
        open={open}
        onNavigate={() => setOpen(false)}
      />

      {/* Barre de réservation mobile, toujours à portée de pouce (sauf sur
          Réserver, et sur Contact où le formulaire est l'action principale) */}
      {pathname !== routes.reserver && pathname !== routes.contact && (
        <div
          data-cms-hide
          className={cn(
            "fixed inset-x-0 bottom-0 z-40 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[opacity,translate] duration-500 ease-soft sm:hidden",
            (open || heroCtaVisible) &&
              "pointer-events-none translate-y-4 opacity-0",
          )}
          aria-hidden={open || heroCtaVisible}
          inert={open || heroCtaVisible}
        >
          <ButtonLink
            href={bookHref}
            variant="primary"
            className="w-full justify-between"
          >
            {bookHref === "#reserver" ? "Réserver ce soin" : "Choisir un soin"}
          </ButtonLink>
        </div>
      )}
    </>
  );
}
