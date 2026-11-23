import { Marquee } from "@/components/ui/marquee";
import { getContents } from "@/content/get-content";

/** Bandeau de mots défilants (ticker italique Serelin) entre le salon et Élodie. */
export async function WordsBand() {
  const c = await getContents(["home.marquee.items"] as const);
  return (
    <section
      aria-label="L'esprit des soins"
      className="bg-paper py-10 md:py-16"
    >
      <Marquee
        items={c["home.marquee.items"]}
        edit={(i) => c.edit("home.marquee.items", i)}
        className="text-ink"
      />
    </section>
  );
}
