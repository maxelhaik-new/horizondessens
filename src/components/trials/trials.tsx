"use client";

/*
 * ⚠️ TEMPORAIRE (26/11/2026) : essais typographiques pour Maxime.
 *  - Logo : le nom « Horizon des Sens » écrit avec chaque police d'essai,
 *    en capitales et en minuscules (une ligne).
 *  - Contenu : remplace `--font-serif` (titres) et `--font-sans` (textes) sur
 *    `<html>`. Les tailles ne changent pas : seules les familles changent.
 * Les choix sont gardés dans `localStorage` (navigateur seulement) et
 * propagés à tout le site. Le serveur rend toujours les valeurs par défaut.
 * À retirer une fois les choix faits : garder les polices retenues dans
 * `fonts.ts` / `globals.css` / `LogoWordmark`, puis supprimer
 * `src/components/trials/`, `public/fonts/essais/` et les polices d'essai de
 * `fonts.ts`.
 */

import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

import { LogoSymbol, SYMBOL } from "@/components/brand/logo-symbol";

/* ------------------------------------------------------------------ */
/* Données                                                              */
/* ------------------------------------------------------------------ */

type Face = {
  family: string;
  label: string;
  weight: number;
  italic?: boolean;
  /** Valeur CSS complète, quand la famille vient d'une variable next/font. */
  css?: string;
  /** Feuille de style externe, chargée seulement quand la police est choisie. */
  stylesheet?: string;
  /** Agrandissement du logo (polices condensées, qui paraissent plus petites). */
  scale?: number;
};

/**
 * Logo du site : Squatina, condensée, affichée à 125 % de la taille du logo
 * pour avoir la même présence que les autres polices.
 */
const LOGO_SCALE = 1.25;

/** Gambarino (Fontshare, licence ITF gratuite) : chargée à la demande. */
const GAMBARINO_CSS =
  "https://api.fontshare.com/v2/css?f[]=gambarino@400&display=swap";

/** Polices du dossier « Font import », une entrée par graisse et style. */
const faces: { group: string; items: Face[] }[] = [
  {
    group: "LT Superior Serif",
    items: [
      { family: "Essai LT Superior Serif", label: "Regular", weight: 400 },
      { family: "Essai LT Superior Serif", label: "Medium", weight: 500 },
      { family: "Essai LT Superior Serif", label: "Semibold", weight: 600 },
      { family: "Essai LT Superior Serif", label: "Bold", weight: 700 },
      { family: "Essai LT Superior Serif", label: "ExtraBold", weight: 800 },
    ],
  },
  {
    group: "Bluu Next",
    items: [
      { family: "Essai Bluu Next", label: "Bold", weight: 700 },
      {
        family: "Essai Bluu Next",
        label: "Bold Italic",
        weight: 700,
        italic: true,
      },
    ],
  },
  {
    group: "Sorts Mill Goudy",
    items: [
      { family: "Essai Sorts Mill Goudy", label: "Regular", weight: 400 },
      {
        family: "Essai Sorts Mill Goudy",
        label: "Italic",
        weight: 400,
        italic: true,
      },
    ],
  },
  {
    group: "Americaine Condensed",
    items: [
      {
        family: "Essai Americaine Condensed",
        label: "Regular",
        weight: 400,
        scale: 1.25,
      },
    ],
  },
  {
    group: "Thestral Neue",
    items: [{ family: "Essai Thestral Neue", label: "Bold", weight: 700 }],
  },
  {
    group: "Squatina",
    items: [
      {
        family: "Squatina",
        css: "var(--font-squatina)",
        label: "Regular",
        weight: 400,
        scale: LOGO_SCALE,
      },
    ],
  },
  {
    group: "Young Serif",
    items: [
      {
        family: "Young Serif",
        css: "var(--font-essai-young-serif)",
        label: "Regular",
        weight: 400,
      },
    ],
  },
  {
    group: "Gambarino",
    items: [
      {
        family: "Gambarino",
        stylesheet: GAMBARINO_CSS,
        label: "Regular",
        weight: 400,
      },
    ],
  },
];

const familyValue = (f: Face) => f.css ?? `"${f.family}"`;

/** Ajoute une feuille de style externe une seule fois. */
function useStylesheet(href?: string) {
  useEffect(() => {
    if (!href || document.querySelector(`link[data-essai="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.essai = href;
    document.head.append(link);
  }, [href]);
}

type LogoVariant = {
  id: string;
  label: string;
  style?: CSSProperties;
  stylesheet?: string;
  scale?: number;
};
type Option = { id: string; label: string };
type Group<T> = { group: string; items: T[] };

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** Logo : « actuel » + chaque police en capitales puis en minuscules. */
const logoGroups: Group<LogoVariant>[] = [
  {
    group: "Actuel",
    items: [
      {
        id: "actuel",
        label: "Sorts Mill Goudy italique · minuscules (site)",
        style: {
          fontFamily: "var(--font-serif)",
          fontWeight: 400,
          fontStyle: "italic",
          textTransform: "lowercase",
          letterSpacing: "-0.01em",
        },
      },
    ],
  },
  ...faces.map(({ group, items }) => ({
    group,
    items: items.flatMap((f) =>
      (["uppercase", "lowercase"] as const).map((transform) => ({
        id: `${slug(group)}-${f.weight}${f.italic ? "-italic" : ""}-${transform === "uppercase" ? "maj" : "min"}`,
        label: `${group} ${f.label} · ${transform === "uppercase" ? "MAJUSCULES" : "minuscules"}`,
        stylesheet: f.stylesheet,
        scale: f.scale,
        style: {
          fontFamily: `${familyValue(f)}, serif`,
          fontWeight: f.weight,
          fontStyle: f.italic ? "italic" : "normal",
          textTransform: transform,
          letterSpacing: transform === "uppercase" ? "0.03em" : "-0.01em",
        },
      })),
    ),
  })),
];
const logoVariants = logoGroups.flatMap((g) => g.items);

/** Titres (`--font-serif`) : Sorts Mill Goudy (site) + autres polices. */
const serifOptions: (Option & { value?: string; stylesheet?: string })[] = [
  { id: "sorts-mill-goudy", label: "Sorts Mill Goudy (site)" },
  {
    id: "instrument-serif",
    label: "Instrument Serif (ancienne)",
    value: `var(--font-instrument-serif), "Times New Roman", serif`,
  },
  ...faces
    .filter(({ group }) => group !== "Sorts Mill Goudy")
    .map(({ group, items }) => ({
      id: slug(group),
      label: group,
      value: `${familyValue(items[0])}, "Times New Roman", serif`,
      stylesheet: items[0].stylesheet,
    })),
];

/** Textes (`--font-sans`) : Source Sans 3 +10 % (site) + linéales Google. */
const sansOptions: (Option & { value?: string })[] = [
  { id: "source-sans-3-agrandie", label: "Source Sans 3 +10 % (site)" },
  ...(
    [
      ["manrope", "Manrope (ancienne)", "var(--font-manrope)"],
      [
        "source-sans-3",
        "Source Sans 3 (taille d'origine)",
        "var(--font-essai-source-sans-3)",
      ],
      ["figtree", "Figtree", "var(--font-essai-figtree)"],
      [
        "instrument-sans",
        "Instrument Sans",
        "var(--font-essai-instrument-sans)",
      ],
      ["hanken-grotesk", "Hanken Grotesk", "var(--font-essai-hanken-grotesk)"],
      ["work-sans", "Work Sans", "var(--font-essai-work-sans)"],
    ] as const
  ).map(([id, label, family]) => ({
    id,
    label,
    value: `${family}, ui-sans-serif, system-ui, sans-serif`,
  })),
];

/* ------------------------------------------------------------------ */
/* Stockage (localStorage + événement, partagé par tous les composants) */
/* ------------------------------------------------------------------ */

const EVENT = "hds-essais";
const keys = {
  logo: "hds-logo-essai",
  serif: "hds-serif-essai",
  sans: "hds-sans-essai",
} as const;
type TrialKey = keyof typeof keys;
const defaults: Record<TrialKey, string> = {
  logo: logoVariants[0].id,
  serif: serifOptions[0].id,
  sans: sansOptions[0].id,
};
const valid: Record<TrialKey, { id: string }[]> = {
  logo: logoVariants,
  serif: serifOptions,
  sans: sansOptions,
};

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function read(key: TrialKey) {
  try {
    const v = localStorage.getItem(keys[key]);
    return valid[key].some((o) => o.id === v) ? (v as string) : defaults[key];
  } catch {
    return defaults[key];
  }
}

function useTrial(key: TrialKey) {
  return useSyncExternalStore(
    subscribe,
    () => read(key),
    () => defaults[key],
  );
}

function setTrial(key: TrialKey, id: string) {
  try {
    if (id === defaults[key]) localStorage.removeItem(keys[key]);
    else localStorage.setItem(keys[key], id);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/* ------------------------------------------------------------------ */
/* Composants                                                           */
/* ------------------------------------------------------------------ */

/** Hauteur des capitales de Squatina, en em (H : 700 / 1000). */
const LOGO_CAP = 0.7;
/** Repères du symbole, rapportés à la hauteur haut des rayons → horizon. */
const SYM_HEIGHT = SYMBOL.height / SYMBOL.horizon;
const SYM_BELOW = (SYMBOL.height - SYMBOL.horizon) / SYMBOL.horizon;

/**
 * Nom de la marque : Squatina Regular en capitales, affichée à 125 % (police
 * condensée), interlettrage 0,03 em (choix de Maxime, 26/11/2026).
 * Avec `symbol`, le soleil est placé devant, dans la même ligne et en `em` :
 * le haut des rayons s'aligne sur le haut des capitales, la ligne d'horizon
 * sur la ligne de base, et le reflet descend en dessous. `--cap` = hauteur
 * des capitales en em (mesurée pour les polices d'essai).
 */
export function LogoWordmark({
  className,
  fit = false,
  symbol = false,
}: {
  className?: string;
  /** Réduit la taille si le nom ne tient pas dans son parent (en-tête mobile). */
  fit?: boolean;
  /** Ajoute le symbole devant le nom, calé sur les capitales. */
  symbol?: boolean;
}) {
  const id = useTrial("logo");
  const variant = logoVariants.find((v) => v.id === id) ?? logoVariants[0];
  const ref = useRef<HTMLSpanElement>(null);
  useStylesheet(variant.stylesheet);

  // Polices d'essai : on mesure la hauteur de leurs capitales.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const cs = getComputedStyle(el);
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return;
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} 100px ${cs.fontFamily}`;
      const cap = ctx.measureText("H").actualBoundingBoxAscent / 100;
      if (cap > 0)
        el.style.setProperty("--cap", `${cap * (variant.scale ?? 1)}`);
    };
    measure();
    document.fonts.addEventListener("loadingdone", measure);
    return () => document.fonts.removeEventListener("loadingdone", measure);
  }, [variant.id, variant.scale]);

  useLayoutEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!fit || !el || !box) return;
    const adjust = () => {
      el.style.fontSize = "";
      const base = parseFloat(getComputedStyle(el).fontSize);
      const avail =
        box.getBoundingClientRect().right - el.getBoundingClientRect().left;
      const natural = el.scrollWidth;
      if (natural > avail + 1 && avail > 0) {
        el.style.fontSize = `${Math.floor(base * (avail / natural) * 10) / 10}px`;
      }
    };
    adjust();
    const ro = new ResizeObserver(adjust);
    ro.observe(box.parentElement ?? box);
    document.fonts.addEventListener("loadingdone", adjust);
    return () => {
      ro.disconnect();
      document.fonts.removeEventListener("loadingdone", adjust);
    };
  }, [fit, variant.id]);

  return (
    <span
      ref={ref}
      className={cn(
        "font-logo leading-none font-normal tracking-[0.03em] whitespace-nowrap uppercase not-italic",
        className,
      )}
      style={
        {
          "--cap": LOGO_CAP * (variant.scale ?? 1),
          ...variant.style,
        } as CSSProperties
      }
    >
      {symbol && (
        <LogoSymbol
          style={{
            height: `calc(var(--cap) * ${SYM_HEIGHT.toFixed(5)}em)`,
            verticalAlign: `calc(var(--cap) * -${SYM_BELOW.toFixed(5)}em)`,
            marginRight: "calc(var(--cap) * 0.62em)",
          }}
        />
      )}
      {variant.scale ? (
        <span
          className="leading-none"
          style={{ fontSize: `${variant.scale}em` }}
        >
          {site.name}
        </span>
      ) : (
        site.name
      )}
    </span>
  );
}

/** Applique les polices du contenu choisies (variables sur `<html>`). */
function ContentFontsApplier() {
  const serif = useTrial("serif");
  const sans = useTrial("sans");
  useStylesheet(serifOptions.find((o) => o.id === serif)?.stylesheet);
  useEffect(() => {
    const root = document.documentElement.style;
    const s = serifOptions.find((o) => o.id === serif)?.value;
    const t = sansOptions.find((o) => o.id === sans)?.value;
    if (s) root.setProperty("--font-serif", s);
    else root.removeProperty("--font-serif");
    if (t) root.setProperty("--font-sans", t);
    else root.removeProperty("--font-sans");
  }, [serif, sans]);
  return null;
}

function TrialSelect({
  trial,
  label,
  groups,
}: {
  trial: TrialKey;
  label: string;
  groups: Group<Option>[];
}) {
  const id = useTrial(trial);
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.6875rem] font-medium tracking-[0.08em] text-ink-soft uppercase">
        {label}
      </span>
      <select
        value={id}
        onChange={(e) => setTrial(trial, e.target.value)}
        className="w-full cursor-pointer rounded-xl border border-line-strong bg-paper-soft px-3 py-2 text-sm text-ink max-md:text-base"
      >
        {groups.map((g) =>
          g.items.length === 1 && g.group === g.items[0].label ? (
            <option key={g.items[0].id} value={g.items[0].id}>
              {g.items[0].label}
            </option>
          ) : (
            <optgroup key={g.group} label={g.group}>
              {g.items.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </optgroup>
          ),
        )}
      </select>
    </label>
  );
}

/**
 * Essais typographiques : petit onglet « Aa » au bord droit de l'écran, qui
 * ouvre le panneau des sélecteurs. Monte aussi l'application des polices du
 * contenu. Monté une seule fois, dans `layout.tsx`.
 */
export function TrialsDock() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const logo = useTrial("logo");
  const serif = useTrial("serif");
  const sans = useTrial("sans");
  const changed =
    logo !== defaults.logo ||
    serif !== defaults.serif ||
    sans !== defaults.sans;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) =>
      ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      data-cms-hide
      className="fixed top-1/2 right-0 z-[70] -translate-y-1/2 font-sans"
    >
      <ContentFontsApplier />
      <button
        type="button"
        aria-expanded={open}
        aria-controls="essais-typo"
        aria-label="Essais typographiques (temporaire)"
        title="Essais typographiques (temporaire)"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative grid h-10 w-8 place-items-center rounded-l-xl bg-night/75 text-xs text-white backdrop-blur-md transition-opacity hover:opacity-100 focus-visible:opacity-100",
          open ? "opacity-100" : "opacity-35",
        )}
      >
        Aa
        {changed && (
          <span
            aria-hidden
            className="absolute top-1.5 left-1.5 size-1.5 rounded-full bg-accent-300"
          />
        )}
      </button>
      {open && (
        <div
          id="essais-typo"
          className="absolute top-1/2 right-10 flex w-[min(18rem,calc(100vw-4rem))] -translate-y-1/2 flex-col gap-4 rounded-2xl bg-paper-soft p-4 text-ink shadow-soft"
        >
          <p className="text-xs text-ink-soft">
            Essais typographiques · temporaire, gardés dans ce navigateur
          </p>
          <TrialSelect trial="logo" label="Logo" groups={logoGroups} />
          <TrialSelect
            trial="serif"
            label="Titres"
            groups={serifOptions.map((o) => ({ group: o.label, items: [o] }))}
          />
          <TrialSelect
            trial="sans"
            label="Textes"
            groups={sansOptions.map((o) => ({ group: o.label, items: [o] }))}
          />
          {changed && (
            <button
              type="button"
              onClick={() =>
                (["logo", "serif", "sans"] as const).forEach((k) =>
                  setTrial(k, defaults[k]),
                )
              }
              className="self-start text-xs text-ink-soft underline underline-offset-4 hover:text-ink"
            >
              Revenir aux polices du site
            </button>
          )}
        </div>
      )}
    </div>
  );
}
