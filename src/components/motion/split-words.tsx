import type { CSSProperties, ElementType } from "react";

import type { EditAttrs } from "@/content/edit";

import { InView } from "./in-view";

type SplitWordsProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Lance l'animation dès le chargement (hero), sans attendre le scroll ni le JS. */
  immediate?: boolean;
  /** Délai de départ, en ms. */
  delay?: number;
  /** Marquage CMS (mode édition). */
  edit?: EditAttrs;
};

/**
 * Titre révélé mot à mot (flou + glissement), comme les titres Serelin.
 * Rendu serveur : le texte complet est dans le HTML (SEO). L'animation est
 * en CSS (`.split-word`) ; `InView` ne fait que la déclencher au scroll.
 */
export function SplitWords({
  text,
  as: Tag = "h2",
  className,
  immediate = false,
  delay = 0,
  edit,
}: SplitWordsProps) {
  // Typographie française : la ponctuation haute (: ; ! ? ») reste collée au
  // mot précédent, « au mot suivant, via une espace insécable.
  const words = text
    .split(/\s+/)
    .filter(Boolean)
    .reduce<string[]>((acc, token) => {
      const prev = acc.at(-1);
      if (prev !== undefined && /^[:;!?»]+$/.test(token))
        acc[acc.length - 1] = `${prev} ${token}`;
      else if (prev === "«") acc[acc.length - 1] = `« ${token}`;
      else acc.push(token);
      return acc;
    }, []);
  // `aria-label` n'est permis que sur un titre : ailleurs (un `<p>`), les
  // mots restent lus tels quels, ce sont de simples `<span>` en ligne.
  const heading = typeof Tag === "string" && /^h[1-6]$/.test(Tag);
  const content = (
    <Tag
      className={className}
      aria-label={heading ? text : undefined}
      {...edit}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden={heading || undefined}
          className="split-word"
          style={{ "--i": i, "--d": `${delay}ms` } as CSSProperties}
        >
          {word}
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );

  if (immediate) return <div data-inview="true">{content}</div>;
  return <InView>{content}</InView>;
}
