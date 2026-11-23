import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";

import { SalonGallery } from "./salon-gallery";

/**
 * §6 Le salon (Serelin « experience ») : titre centré + CTA, puis une
 * galerie de grandes images qui défile horizontalement avec le scroll.
 */
export async function Salon() {
  const c = await getContents([
    "home.salon.image",
    "home.salon.eyebrow",
    "home.salon.title",
    "home.salon.text",
    "home.salon.gallery",
  ] as const);

  const images = [
    { ...c["home.salon.image"], edit: c.edit("home.salon.image") },
    ...c["home.salon.gallery"].map((img, i) => ({
      ...img,
      edit: c.edit("home.salon.gallery", i),
    })),
  ];

  return (
    <section className="overflow-hidden bg-paper section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow={c["home.salon.eyebrow"]}
          title={c["home.salon.title"]}
          intro={c["home.salon.text"]}
          edit={{
            eyebrow: c.edit("home.salon.eyebrow"),
            title: c.edit("home.salon.title"),
            intro: c.edit("home.salon.text"),
          }}
          action={
            <ButtonLink href={routes.salon}>Découvrir le salon</ButtonLink>
          }
        />
      </div>
      <SalonGallery images={images} />
    </section>
  );
}
