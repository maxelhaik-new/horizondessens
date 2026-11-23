import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { routes } from "@/lib/navigation";
import { site } from "@/lib/site";
import { formatVariant } from "@/services/format";
import { getServices } from "@/services/get-services";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente d'Horizon des Sens : réservation, annulation, abonnement Kobido et cartes cadeaux.",
  alternates: { canonical: "/cgv" },
};

const { address, legal } = site;

export default async function CgvPage() {
  const services = await getServices();
  const kobido = services.find((s) => s.slug === "kobido");

  const sections: LegalSection[] = [
    {
      id: "objet",
      title: "Objet",
      body: (
        <p>
          Les présentes conditions générales de vente (CGV) s&apos;appliquent
          aux <strong>séances de massage bien-être</strong> réalisées par{" "}
          {site.practitioner} sous le nom {site.name}, ainsi qu&apos;à la{" "}
          <strong>vente de cartes cadeaux</strong> sur ce site. Toute
          réservation ou tout achat vaut acceptation des présentes CGV.
        </p>
      ),
    },
    {
      id: "prestataire",
      title: "Prestataire",
      body: (
        <dl>
          <dt>Nom commercial</dt>
          <dd>{site.name}</dd>
          <dt>Exploitante</dt>
          <dd>
            {site.practitioner}, {legal.status.toLowerCase()}
          </dd>
          <dt>SIREN</dt>
          <dd>{legal.siren}</dd>
          <dt>Adresse</dt>
          <dd>
            {address.street}, {address.postalCode} {address.city}
          </dd>
          <dt>Contact</dt>
          <dd>
            <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
            <a href={site.phone.href}>{site.phone.display}</a>
          </dd>
        </dl>
      ),
    },
    {
      id: "prestations",
      title: "Prestations et prix",
      body: (
        <>
          <p>Les prestations proposées sont les suivantes :</p>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <strong>{s.name}</strong> :{" "}
                {s.variants.map(formatVariant).join(" ou ")}
              </li>
            ))}
          </ul>
          <p>
            Les prix sont indiqués en euros, toutes taxes comprises. {legal.vat}
            . Le prix applicable est celui affiché au moment de la réservation
            ou de l&apos;achat.
          </p>
          <p>
            Les massages sont des soins de bien-être, sans visée thérapeutique
            ni médicale, et ne présentent aucun caractère sexuel.
          </p>
        </>
      ),
    },
    {
      id: "reservation",
      title: "Réservation et paiement des séances",
      body: (
        <>
          <p>
            Les séances se réservent en ligne via le service de prise de
            rendez-vous SimplyBook.me, par téléphone ou par e-mail. La
            réservation est confirmée par e-mail.
          </p>
          <p>
            Sauf utilisation d&apos;une carte cadeau ou d&apos;un abonnement, la
            séance est réglée au salon, le jour du rendez-vous.
          </p>
        </>
      ),
    },
    {
      id: "annulation",
      title: "Annulation, report et retard",
      body: (
        <>
          <p>
            Une séance peut être{" "}
            <strong>
              annulée ou reportée gratuitement jusqu&apos;à 24 heures
            </strong>{" "}
            avant le rendez-vous, en ligne, par téléphone ou par e-mail.
          </p>
          <p>
            En cas d&apos;annulation moins de 24 heures avant le rendez-vous ou
            d&apos;absence, la séance est due. Si elle était réglée par carte
            cadeau ou dans le cadre d&apos;un abonnement, elle est considérée
            comme utilisée.
          </p>
          <p>
            En cas de retard, la séance peut être écourtée afin de respecter les
            rendez-vous suivants ; elle reste due en totalité.
          </p>
          <p>
            Si {site.name} doit annuler un rendez-vous, un nouveau créneau est
            proposé sans frais, ou la séance déjà réglée est remboursée.
          </p>
        </>
      ),
    },
    {
      id: "abonnement",
      title: "Abonnement Kobido",
      body: (
        <p>
          L&apos;abonnement Kobido comprend <strong>6 séances par an</strong> au
          tarif de <strong>90 € la séance</strong>
          {kobido?.variants[0]?.priceEuros
            ? ` au lieu de ${kobido.variants[0].priceEuros} €`
            : null}
          . Ses modalités de souscription et de règlement sont précisées au
          salon. Les séances de l&apos;abonnement sont soumises aux mêmes
          conditions d&apos;annulation que les autres séances.
        </p>
      ),
    },
    {
      id: "cartes-cadeaux",
      title: "Cartes cadeaux",
      body: (
        <>
          <h3>Offre</h3>
          <p>
            Les cartes cadeaux vendues en ligne correspondent à une séance de{" "}
            <strong>Kobido 1h (100 €)</strong> ou de{" "}
            <strong>Kobido 1h15 (120 €)</strong>. Une carte cadeau pour le
            Massage des 5 Continents peut être obtenue sur demande, directement
            auprès d&apos;{site.practitioner}.
          </p>
          <h3>Commande et paiement</h3>
          <p>
            Le paiement s&apos;effectue en ligne, par carte bancaire, via le
            prestataire sécurisé Stripe. {site.name} n&apos;a jamais accès à vos
            données bancaires. La commande est définitive dès la confirmation du
            paiement.
          </p>
          <h3>Envoi</h3>
          <p>
            La carte cadeau est envoyée au format PDF, par e-mail, à
            l&apos;adresse indiquée lors de la commande, dès la confirmation du
            paiement. Pensez à vérifier vos courriers indésirables.
          </p>
          <h3>Conditions d&apos;utilisation</h3>
          <ul>
            <li>
              Elle est <strong>valable 6 mois</strong> à compter de la date
              d&apos;achat. Passé ce délai, elle ne peut plus être utilisée ni
              prolongée.
            </li>
            <li>
              Elle est <strong>nominative</strong> : elle est établie au nom du
              ou de la bénéficiaire indiqué(e) lors de la commande.
            </li>
            <li>
              Elle est <strong>non remboursable</strong> et ne peut pas être
              échangée contre de l&apos;argent, sous réserve du droit de
              rétractation ci-dessous.
            </li>
            <li>
              Elle s&apos;utilise en une seule fois, pour la prestation
              indiquée. Le ou la bénéficiaire réserve sa séance en mentionnant
              le numéro de la carte.
            </li>
          </ul>
          <h3>Droit de rétractation</h3>
          <p>
            Conformément à l&apos;article L221-18 du Code de la consommation,
            l&apos;acheteur dispose de <strong>14 jours</strong> à compter de
            l&apos;achat pour se rétracter, sans avoir à se justifier, en
            l&apos;indiquant par e-mail à{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>. Le remboursement
            intervient dans les 14 jours suivant la demande, par le même moyen
            de paiement. Ce droit ne s&apos;applique plus si la séance a été
            entièrement réalisée avant la fin de ce délai, à la demande expresse
            du ou de la bénéficiaire.
          </p>
        </>
      ),
    },
    {
      id: "sante",
      title: "Santé et déroulement des séances",
      body: (
        <>
          <p>
            Avant la séance, il appartient au client ou à la cliente de signaler
            tout problème de santé, traitement en cours, grossesse, intervention
            récente ou affection de la peau. {site.practitioner} peut refuser ou
            adapter un soin si elle l&apos;estime contre-indiqué.
          </p>
          <p>
            Tout comportement déplacé met fin immédiatement à la séance, qui
            reste due.
          </p>
        </>
      ),
    },
    {
      id: "responsabilite",
      title: "Responsabilité",
      body: (
        <p>
          {site.name} ne saurait être tenu responsable des conséquences
          d&apos;une information de santé non communiquée ou inexacte. Les
          objets personnels restent sous la garde de leur propriétaire pendant
          la séance.
        </p>
      ),
    },
    {
      id: "donnees",
      title: "Données personnelles",
      body: (
        <p>
          Les données recueillies lors d&apos;une réservation ou d&apos;un achat
          servent uniquement à leur traitement. Voir la{" "}
          <Link href={routes.confidentialite}>
            politique de confidentialité
          </Link>
          .
        </p>
      ),
    },
    {
      id: "reclamations",
      title: "Réclamations et médiation",
      body: (
        <>
          <p>
            Toute réclamation peut être adressée par e-mail à{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> ou par courrier à
            l&apos;adresse du salon. Une solution amiable est toujours
            recherchée en priorité.
          </p>
          <p>
            Conformément aux articles L612-1 et suivants du Code de la
            consommation, si la réclamation écrite n&apos;aboutit pas, le client
            ou la cliente peut recourir gratuitement à un médiateur de la
            consommation, dont les coordonnées sont communiquées sur simple
            demande.
          </p>
        </>
      ),
    },
    {
      id: "droit",
      title: "Droit applicable",
      body: (
        <p>
          Les présentes CGV sont soumises au droit français. À défaut
          d&apos;accord amiable, le litige est porté devant les tribunaux
          compétents dans les conditions prévues par la loi.
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      title="Conditions générales de vente"
      current={routes.cgv}
      intro={
        <p>
          Réservation, annulation, abonnement et cartes cadeaux : les règles,
          simplement.
        </p>
      }
      sections={sections}
    />
  );
}
