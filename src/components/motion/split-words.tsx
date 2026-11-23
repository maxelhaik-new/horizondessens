import type { CSSProperties, ElementType } from "react";

import { InView } from "./in-view";

type SplitWordsProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Lance l'animation dès le chargement (hero), sans attendre le scroll ni le JS. */
  immediate?: boolean;
  /** Délai de départ, en ms. */
  delay?: number;
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
  const content = (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
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
