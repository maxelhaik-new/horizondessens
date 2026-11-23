import Link from "next/link";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";
import { site } from "@/lib/site";

/** Bon à savoir : annulation, règlement, carte cadeau, jour du soin. */
export async function BookingInfos() {
  const c = await getContents([
    "reserver.infos.title",
    "reserver.infos.items",
  ] as const);

  return (
    <section className="section-y">
      <div className="container-site flex flex-col gap-10 md:gap-12">
        <SplitWords
          text={c["reserver.infos.title"]}
          edit={c.edit("reserver.infos.title")}
          className="text-h2 text-balance"
        />
        <RevealGroup
          as="ul"
          className="grid gap-x-10 gap-y-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {c["reserver.infos.items"].map((item, i) => (
            <RevealItem key={i} as="li" className="flex flex-col gap-3">
              <span className="font-serif text-3xl leading-none text-accent-800 italic tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                {...c.edit("reserver.infos.items", i, "title")}
                className="text-h4"
              >
                {item.title}
              </h3>
              <p
                {...c.edit("reserver.infos.items", i, "text")}
                className="text-body text-pretty text-ink-soft"
              >
                {item.text}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="text-body text-ink-soft">
          Une autre question ? Appelez-moi au{" "}
          <a
            href={site.phone.href}
            className="font-medium whitespace-nowrap text-ink underline decoration-current/30 underline-offset-4 hover:decoration-current"
          >
            {site.phone.display}
          </a>{" "}
          ou{" "}
          <Link
            href={routes.contact}
            className="font-medium text-ink underline decoration-current/30 underline-offset-4 hover:decoration-current"
          >
            écrivez-moi
          </Link>
          . Les conditions complètes sont dans les{" "}
          <Link
            href={routes.cgv}
            className="font-medium text-ink underline decoration-current/30 underline-offset-4 hover:decoration-current"
          >
            conditions générales de vente
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
