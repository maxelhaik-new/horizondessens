import { cn } from "@/lib/cn";

import { SparkIcon } from "./icons";

/**
 * Bandeau de mots en défilement continu (CSS pur), style ticker Serelin.
 * Le contenu est dupliqué pour boucler sans saut ; la copie est masquée
 * aux lecteurs d'écran. Pause au survol.
 */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  if (items.length === 0) return null;

  // Répète la liste pour couvrir les grands écrans.
  const loop = [...items, ...items];

  const row = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12"
      aria-hidden={hidden || undefined}
    >
      {loop.map((word, i) => (
        <li key={`${word}-${i}`} className="flex items-center gap-8 md:gap-12">
          <span className="font-serif text-xl italic md:text-2xl">{word}</span>
          <SparkIcon className="size-3 text-accent-500" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
