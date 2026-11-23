import { Marquee } from "@/components/ui/marquee";
import { getContent } from "@/content/get-content";

/** Bandeau de mots défilants (ticker italique Serelin) entre le salon et Élodie. */
export async function WordsBand() {
  const words = await getContent("home.marquee.items");
  return (
    <section
      aria-label="L'esprit des soins"
      className="bg-paper py-10 md:py-16"
    >
      <Marquee items={words} className="text-ink" />
    </section>
  );
}
