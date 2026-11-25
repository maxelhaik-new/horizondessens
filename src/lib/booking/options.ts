import "server-only";

import { formatVariant } from "@/services/format";
import { getService, getServices } from "@/services/get-services";
import type { ServiceSlug } from "@/services/types";

import type { BookableOption } from "./types";

/** Formules réservables en ligne d'un soin (celles qui ont un ID SimplyBook 2026). */
export async function getBookableOptions(
  slug: ServiceSlug,
): Promise<BookableOption[]> {
  const service = await getService(slug);
  return (service?.variants ?? [])
    .filter((v) => v.simplybookId !== undefined)
    .map((v) => ({
      key: `${slug}-${v.durationMinutes}`,
      durationMinutes: v.durationMinutes,
      label: formatVariant(v),
    }));
}

/** Retrouve la formule à partir de sa clé `<slug>-<minutes>` (liste blanche). */
export async function resolveOption(key: string) {
  for (const service of await getServices()) {
    for (const variant of service.variants) {
      if (
        variant.simplybookId !== undefined &&
        key === `${service.slug}-${variant.durationMinutes}`
      ) {
        return { service, variant, simplybookId: variant.simplybookId };
      }
    }
  }
  return null;
}
