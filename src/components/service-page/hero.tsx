import { getContents } from "@/content/get-content";
import { getService } from "@/services/get-services";
import { servicePages, type ServicePageSlug } from "@/services/pages";

import { getServicePageContents } from "./content";
import { FullHero, M5cBadge } from "./full-hero";

/**
 * Hero d'une page de soin (gabarit et 5 Continents) : le hero plein cadre
 * commun (`FullHero`), comme le Kobido. Badge M5C pour le 5 Continents.
 */
export async function ServiceHero({ slug }: { slug: ServicePageSlug }) {
  const page = servicePages[slug];
  const [c, service, badge] = await Promise.all([
    getServicePageContents(slug, [
      "hero.title",
      "hero.lead",
      "hero.image",
    ] as const),
    getService(slug),
    page.badge === "m5c" ? getContents(["home.5c.licence"] as const) : null,
  ]);

  return (
    <FullHero
      title={c["hero.title"]}
      lead={c["hero.lead"]}
      image={c["hero.image"]}
      imagePosition={page.heroPosition}
      edit={{
        title: c.edit("hero.title"),
        lead: c.edit("hero.lead"),
        image: c.edit("hero.image"),
      }}
      ctaLabel="Réserver ce massage"
      variants={service?.variants ?? []}
      aside={
        badge ? (
          <M5cBadge
            text={badge["home.5c.licence"]}
            edit={badge.edit("home.5c.licence")}
          />
        ) : null
      }
    />
  );
}
