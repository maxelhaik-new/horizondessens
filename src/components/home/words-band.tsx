import { Marquee } from "@/components/ui/marquee";
import { getContent } from "@/content/get-content";

/** Bandeau de mots défilants entre le hero et les soins. */
export async function WordsBand() {
  const words = await getContent("home.marquee.items");
  return (
    <section
      aria-label="L'esprit des soins"
      className="border-b border-line bg-paper py-8 md:py-12"
    >
      <Marquee items={words} className="text-accent-900" />
    </section>
  );
}
