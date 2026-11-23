import { Marquee } from "@/components/ui/marquee";
import { getContent } from "@/content/get-content";

/** Bandeau de mots défilants (ticker italique Serelin) sous le hero. */
export async function WordsBand() {
  const words = await getContent("home.marquee.items");
  return (
    <section aria-label="L'esprit des soins" className="bg-paper py-6 md:py-8">
      <Marquee items={words} className="text-ink" />
    </section>
  );
}
