import { SectionHeading } from "@/components/ui/section-heading";
import { getContents } from "@/content/get-content";

import { GesturesScroller } from "./gestures-scroller";

/** Les gestes : liste numérotée, image collante qui change au défilement. */
export async function KobidoGestures() {
  const c = await getContents([
    "kobido.gestes.eyebrow",
    "kobido.gestes.title",
    "kobido.gestes.items",
  ] as const);

  return (
    <section className="bg-[linear-gradient(180deg,var(--color-paper),var(--color-blush))] section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow={c["kobido.gestes.eyebrow"]}
          title={c["kobido.gestes.title"]}
          align="left"
        />
        <GesturesScroller items={c["kobido.gestes.items"]} />
      </div>
    </section>
  );
}
