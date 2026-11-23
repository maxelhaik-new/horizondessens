import { cacheLife } from "next/cache";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import { getContent } from "@/content/get-content";
import { legalNav, mainNav, routes } from "@/lib/navigation";
import { site } from "@/lib/site";

export async function Footer() {
  const access = await getContent("home.final.access");
  const { address } = site;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${address.street}, ${address.postalCode} ${address.city}`,
  )}`;

  return (
    <footer className="border-t border-line bg-paper pt-16 pb-28 sm:pb-10 md:pt-20">
      <div className="container-site flex flex-col gap-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-body text-ink-soft">
              Kobido et massages bien-être par {site.practitioner}, à
              Saint-Cyr-sur-Loire.
            </p>
          </div>

          <nav aria-label="Pages" className="flex flex-col gap-3 text-sm">
            <p className="text-eyebrow text-ink-subtle">Pages</p>
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <address className="flex flex-col gap-3 text-sm not-italic">
            <p className="text-eyebrow text-ink-subtle">Nous trouver</p>
            <span>
              {address.street}
              <br />
              {address.postalCode} {address.city}
            </span>
            <a href={mapsUrl} className="w-fit underline underline-offset-4">
              Itinéraire
            </a>
            <span className="text-ink-subtle">{access}</span>
          </address>

          <div className="flex flex-col gap-3 text-sm">
            <p className="text-eyebrow text-ink-subtle">Contact</p>
            <a href={site.phone.href} className="w-fit hover:underline">
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className="w-fit hover:underline">
              {site.email}
            </a>
            <div className="flex gap-2 pt-2">
              <a
                href={site.social.instagram}
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-full bg-paper-soft transition-colors hover:bg-blush"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={site.social.facebook}
                aria-label="Facebook"
                className="grid size-10 place-items-center rounded-full bg-paper-soft transition-colors hover:bg-blush"
              >
                <FacebookIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-6 text-xs text-ink-subtle md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear /> {site.name} · Le massage bien-être n&apos;est
            pas un acte médical.
          </p>
          <nav
            aria-label="Informations légales"
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:underline"
              >
                {item.label}
              </Link>
            ))}
            <a href={routes.reserver} className="hover:underline">
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
