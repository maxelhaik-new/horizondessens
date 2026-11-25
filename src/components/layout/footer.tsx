import { cacheLife } from "next/cache";
import Link from "next/link";

import { CookieSettingsButton } from "@/components/layout/cookie-banner";
import { FacebookIcon, InstagramIcon, PhoneIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { getContents } from "@/content/get-content";
import { featuredSoins, legalNav, mainNav, routes } from "@/lib/navigation";
import { soinsNav } from "@/services/pages";
import { site } from "@/lib/site";

/**
 * Pied de page (Serelin) sur fond rosé « mist », dans la continuité de
 * l'appel final. Textes en ink / ink-soft : contraste AA sur ce fond.
 */
export async function Footer() {
  const c = await getContents(["home.final.access"] as const);
  const { address } = site;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${address.street}, ${address.postalCode} ${address.city}`,
  )}`;

  const columnTitle =
    "mb-1 text-eyebrow text-accent-800 md:mb-2 md:text-sm md:font-medium md:tracking-[0.016em] md:text-ink md:normal-case";
  const link =
    "inline-flex min-h-10 w-fit items-center text-[0.9375rem] text-ink-soft transition-colors hover:text-ink md:min-h-11 md:text-sm";
  const chip =
    "inline-flex min-h-11 items-center gap-2 rounded-full bg-white/60 px-4 text-ink transition-colors hover:bg-white";

  return (
    <footer className="bg-mist pt-12 pb-24 text-sm sm:pb-10 md:pt-20">
      <div className="container-site flex flex-col gap-10 md:gap-14">
        {/*
         * Mobile : soins et pages côte à côte, puis adresse et contact en
         * pleine largeur. Desktop : quatre colonnes.
         */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4 lg:gap-10">
          <nav aria-label="Soins" className="flex flex-col">
            <p className={columnTitle}>Soins</p>
            {soinsNav.map((item) => (
              <Link key={item.href} href={item.href} className={link}>
                {item.label.replace(/^Massage des /, "")}
              </Link>
            ))}
          </nav>

          <nav aria-label="Pages" className="flex flex-col">
            <p className={columnTitle}>Pages</p>
            <Link href={routes.reserver} className={link}>
              Soins et tarifs
            </Link>
            {mainNav
              // Les soins sont dans la colonne « Soins ».
              .filter(
                (item) =>
                  item.href !== routes.reserver &&
                  !featuredSoins.includes(item.href),
              )
              .map((item) => (
                <Link key={item.href} href={item.href} className={link}>
                  {item.label}
                </Link>
              ))}
          </nav>

          <address className="col-span-2 flex flex-col gap-1 not-italic sm:col-span-1">
            <p className={columnTitle}>Nous trouver</p>
            <span className="text-[0.9375rem] leading-relaxed text-ink md:text-sm">
              {address.street}
              <br />
              {address.postalCode} {address.city}
            </span>
            <span
              {...c.edit("home.final.access")}
              className="hidden text-ink-soft md:block"
            >
              {c["home.final.access"]}
            </span>
            <a href={mapsUrl} className={link}>
              Itinéraire →
            </a>
          </address>

          <div className="col-span-2 flex flex-col gap-1 sm:col-span-1">
            <p className={columnTitle}>Contact</p>
            {/* Mobile : actions en pastilles, à portée de pouce. */}
            <div className="mt-1 flex flex-wrap gap-2 md:hidden">
              <a href={site.phone.href} className={chip}>
                <PhoneIcon className="size-4" />
                {site.phone.display}
              </a>
              <a
                href={site.social.instagram}
                aria-label="Instagram"
                className={cn(chip, "w-11 justify-center px-0")}
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={site.social.facebook}
                aria-label="Facebook"
                className={cn(chip, "w-11 justify-center px-0")}
              >
                <FacebookIcon className="size-4" />
              </a>
            </div>
            <div className="hidden gap-2 md:flex">
              <a
                href={site.social.instagram}
                aria-label="Instagram"
                className="grid size-11 place-items-center rounded-full bg-white/60 text-ink transition-colors hover:bg-white"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={site.social.facebook}
                aria-label="Facebook"
                className="grid size-11 place-items-center rounded-full bg-white/60 text-ink transition-colors hover:bg-white"
              >
                <FacebookIcon className="size-4" />
              </a>
            </div>
            <a href={`mailto:${site.email}`} className={link}>
              {site.email}
            </a>
            <a href={site.phone.href} className={cn(link, "max-md:hidden")}>
              {site.phone.display}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-soft md:flex-row-reverse md:items-center md:justify-between md:gap-4 md:text-sm">
          <nav
            aria-label="Informations légales"
            className="-my-2 flex flex-wrap gap-x-5 md:gap-x-6"
          >
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-10 items-center transition-colors hover:text-ink md:min-h-11"
              >
                {item.label}
              </Link>
            ))}
            <CookieSettingsButton className="inline-flex min-h-10 cursor-pointer items-center transition-colors hover:text-ink md:min-h-11" />
          </nav>
          <p className="text-pretty">
            © <CopyrightYear /> {site.name} · Le massage bien-être n&apos;est
            pas un acte médical.
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Année courante, mise en cache (Cache Components interdit `new Date()` hors cache). */
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
