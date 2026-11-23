import { cn } from "@/lib/cn";

import { SparkIcon } from "./icons";

/**
 * Bandeau de mots en défilement continu (CSS pur). Le contenu est dupliqué
 * pour boucler sans saut ; la copie est masquée aux lecteurs d'écran.
 */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  if (items.length === 0) return null;

  const row = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={hidden || undefined}
    >
      {items.map((word, i) => (
        <li key={`${word}-${i}`} className="flex items-center gap-10">
          <span className="font-serif text-3xl italic md:text-5xl">{word}</span>
          <SparkIcon className="size-3 text-accent-500 md:size-4" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
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
