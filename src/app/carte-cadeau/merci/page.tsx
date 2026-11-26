import type { Metadata } from "next";
import { connection } from "next/server";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

import { GiftCardFace } from "@/components/gift-card/card-face";
import { ButtonLink } from "@/components/ui/button-link";
import { fulfillGiftCard } from "@/lib/gift-card/fulfill";
import { formatDateFr, type GiftCardOrder } from "@/lib/gift-card/order";
import { routes } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { formatDuration } from "@/services/format";

export const metadata: Metadata = pageMetadata({
  title: "Merci pour votre carte cadeau",
  description:
    "Votre carte cadeau Horizon des Sens est réglée : elle vous est envoyée par e-mail au format PDF.",
  path: routes.carteCadeauMerci,
  index: false,
});

/*
 * Retour après paiement Stripe (`?session_id=`). Remet la carte si le
 * webhook ne l'a pas encore fait (idempotent), puis affiche le
 * récapitulatif et le téléchargement du PDF. Textes d'interface fixes
 * (pas de clés CMS) : c'est un écran de transaction.
 */
export default function GiftCardThanksPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container-site">
        <Suspense fallback={<Checking />}>
          <Confirmation searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}

function Checking() {
  return (
    <p className="text-lead text-ink-soft" role="status">
      Vérification du paiement…
    </p>
  );
}

async function requestOrigin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "";
  const proto =
    h.get("x-forwarded-proto") ??
    (/^(localhost|127\.0\.0\.1)/.test(host) ? "http" : "https");
  return host ? `${proto}://${host}` : site.url;
}

async function Confirmation({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Rendu à chaque visite : paiement, e-mails et PDF (qui lit l'heure).
  await connection();
  const raw = (await searchParams).session_id;
  const sessionId = typeof raw === "string" ? raw : "";
  const result = await fulfillGiftCard(sessionId, await requestOrigin());

  if (result.status === "not-found") {
    return (
      <div className="flex max-w-2xl flex-col gap-6">
        <p className="text-eyebrow text-accent-800">Carte cadeau</p>
        <h1 className="text-display text-balance">Paiement non confirmé</h1>
        <p className="text-lead text-pretty text-ink-soft">
          Aucun paiement validé ne correspond à cette page. Si vous avez été
          débité, écrivez-moi : je vous envoie votre carte au plus vite.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <ButtonLink href={`${routes.carteCadeau}#formules`}>
            Revenir aux cartes cadeaux
          </ButtonLink>
          <Link
            href={`${routes.contact}#ecrire`}
            className="text-sm font-medium underline decoration-current/30 underline-offset-[6px] hover:decoration-current"
          >
            Me contacter
          </Link>
        </div>
      </div>
    );
  }

  const { order } = result;
  const sent = result.status === "sent";

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
      <div className="flex flex-col gap-6">
        <p className="text-eyebrow text-accent-800">Paiement reçu</p>
        <h1 className="text-display text-balance">
          Merci, votre carte est {sent ? "en route" : "prête"}
        </h1>
        <p className="text-lead text-pretty text-ink-soft">
          {sent ? (
            <>
              Elle vient d&apos;être envoyée à{" "}
              <strong className="font-medium text-ink">
                {order.buyerEmail}
              </strong>{" "}
              au format PDF. Pensez à regarder dans les courriers indésirables.
            </>
          ) : (
            <>
              L&apos;e-mail n&apos;a pas pu partir pour le moment : téléchargez
              votre carte ci-dessous. Elle vous sera aussi renvoyée par e-mail.
            </>
          )}
        </p>
        <p className="text-body text-pretty text-ink-soft">
          Pour réserver, {order.recipient} appelle le {site.phone.display} ou
          réserve en ligne, en indiquant le numéro de la carte.
        </p>
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <ButtonLink
            href={`${routes.carteCadeauPdf}?session_id=${encodeURIComponent(order.sessionId)}`}
            download
            variant="primary"
          >
            Télécharger la carte
          </ButtonLink>
          <Link
            href={routes.home}
            className="text-sm font-medium underline decoration-current/30 underline-offset-[6px] hover:decoration-current"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>

      <CardSummary order={order} />
    </div>
  );
}

/**
 * La carte telle qu'elle est reçue : recto du PDF (même fond, mêmes
 * positions), puis sa validité.
 */
function CardSummary({ order }: { order: GiftCardOrder }) {
  return (
    <div className="flex flex-col gap-4 lg:rotate-2">
      <GiftCardFace order={order} />
      <p className="text-center text-sm text-ink-soft">
        {order.title} {formatDuration(order.durationMinutes)} · valable
        jusqu&apos;au {formatDateFr(order.validUntil)}
      </p>
    </div>
  );
}
