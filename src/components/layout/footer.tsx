import { cacheLife } from "next/cache";
import Link from "next/link";

import { CookieSettingsButton } from "@/components/layout/cookie-banner";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import { getContents } from "@/content/get-content";
import { legalNav, mainNav, routes } from "@/lib/navigation";
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

  const columnTitle = "mb-2 text-sm font-medium tracking-[0.016em] text-ink";
  const link =
    "inline-flex min-h-11 w-fit items-center text-ink-soft transition-colors hover:text-ink";

  return (
    <footer className="bg-mist pt-16 pb-28 text-sm sm:pb-10 md:pt-20">
      <div className="container-site flex flex-col gap-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Pages" className="flex flex-col gap-1">
            <p className={columnTitle}>Pages</p>
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className={link}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-1">
            <p className={columnTitle}>Soins</p>
            <Link href="/#soins" className={link}>
              Kobido
            </Link>
            <Link href="/#5-continents" className={link}>
              Massage des 5 Continents
            </Link>
            <Link href="/#soins" className={link}>
              Calme et harmonie
            </Link>
            <Link href="/#soins" className={link}>
              Jambes légères
            </Link>
          </div>

          <address className="flex flex-col gap-1 not-italic">
            <p className={columnTitle}>Nous trouver</p>
            <span className="text-ink">
              {address.street}
              <br />
              {address.postalCode} {address.city}
            </span>
            <a href={mapsUrl} className={link}>
              Itinéraire
            </a>
            <span {...c.edit("home.final.access")} className="text-ink-soft">
              {c["home.final.access"]}
            </span>
          </address>

          <div className="flex flex-col gap-1">
            <p className={columnTitle}>Contact</p>
            <div className="flex gap-2">
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
            <a href={site.phone.href} className={link}>
              {site.phone.display}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-6 text-ink-soft md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear /> {site.name} · Le massage bien-être n&apos;est
            pas un acte médical.
          </p>
          <nav
            aria-label="Informations légales"
            className="flex flex-wrap gap-x-6"
          >
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <CookieSettingsButton className="inline-flex min-h-11 cursor-pointer items-center transition-colors hover:text-ink" />
            <a
              href={routes.reserver}
              className="inline-flex min-h-11 items-center transition-colors hover:text-ink"
            >
              Réserver
            </a>
          </nav>
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
