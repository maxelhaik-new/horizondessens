import { FullHero } from "@/components/service-page/full-hero";
import { getContents } from "@/content/get-content";
import { getService } from "@/services/get-services";

/**
 * Hero Kobido : le hero plein cadre commun à toutes les pages de soin
 * (`FullHero`), avec ses clés `kobido.hero.*`.
 */
export async function KobidoHero() {
  const [c, service] = await Promise.all([
    getContents([
      "kobido.hero.title",
      "kobido.hero.lead",
      "kobido.hero.image",
    ] as const),
    getService("kobido"),
  ]);

  return (
    <FullHero
      title={c["kobido.hero.title"]}
      lead={c["kobido.hero.lead"]}
      image={c["kobido.hero.image"]}
      imagePosition="object-[50%_40%]"
      edit={{
        title: c.edit("kobido.hero.title"),
        lead: c.edit("kobido.hero.lead"),
        image: c.edit("kobido.hero.image"),
      }}
      ctaLabel="Réserver un Kobido"
      variants={service?.variants ?? []}
    />
  );
}
