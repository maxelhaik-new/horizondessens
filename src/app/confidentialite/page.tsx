import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { routes } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité",
  description:
    "Données personnelles et cookies sur le site Horizon des Sens : ce qui est collecté, pourquoi, combien de temps, et vos droits.",
  path: "/confidentialite",
});

const { address } = site;

const sections: LegalSection[] = [
  {
    id: "responsable",
    title: "Responsable du traitement",
    body: (
      <p>
        Les données personnelles collectées sur ce site sont traitées par{" "}
        <strong>{site.practitioner}</strong>, {site.name}, {address.street},{" "}
        {address.postalCode} {address.city}. Pour toute question :{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    ),
  },
  {
    id: "donnees",
    title: "Données collectées et finalités",
    body: (
      <>
        <p>
          Seules les données nécessaires sont collectées, et jamais à des fins
          publicitaires. Elles ne sont ni vendues ni cédées.
        </p>
        <h3>Formulaire de contact</h3>
        <p>
          Nom, adresse e-mail, téléphone (facultatif) et message, pour vous
          répondre. Base légale : l&apos;intérêt légitime à traiter votre
          demande. Conservation : 3 ans après le dernier échange.
        </p>
        <h3>Réservation en ligne</h3>
        <p>
          Nom, e-mail, téléphone et rendez-vous, saisis dans le module de
          réservation du site et transmis au service SimplyBook.me, qui gère
          l&apos;agenda et envoie les confirmations. Base légale :
          l&apos;exécution de la prestation. Conservation : 3 ans après le
          dernier rendez-vous.
        </p>
        <h3>Achat d&apos;une carte cadeau</h3>
        <p>
          Nom et e-mail de l&apos;acheteur, nom du ou de la bénéficiaire et,
          s&apos;ils sont indiqués, l&apos;expéditeur et le petit mot de la
          carte, pour établir et envoyer la carte. Le paiement est traité par
          Stripe : {site.name} n&apos;a jamais accès à vos données bancaires.
          Base légale : l&apos;exécution du contrat et les obligations
          comptables. Conservation : 10 ans pour les pièces comptables.
        </p>
        <h3>Navigation</h3>
        <p>
          L&apos;hébergeur enregistre des journaux techniques (adresse IP, pages
          demandées) pour la sécurité et le bon fonctionnement du site. Aucun
          outil de mesure d&apos;audience ni de publicité n&apos;est utilisé.
        </p>
      </>
    ),
  },
  {
    id: "destinataires",
    title: "Destinataires et sous-traitants",
    body: (
      <>
        <p>
          Vos données sont accessibles uniquement à {site.practitioner} et aux
          prestataires techniques nécessaires au service :
        </p>
        <ul>
          <li>
            <strong>Vercel</strong> : hébergement du site ;
          </li>
          <li>
            <strong>Resend</strong> : acheminement des messages du formulaire et
            envoi des cartes cadeaux par e-mail ;
          </li>
          <li>
            <strong>SimplyBook.me</strong> : prise de rendez-vous en ligne ;
          </li>
          <li>
            <strong>Stripe</strong> : paiement des cartes cadeaux ;
          </li>
          <li>
            <strong>Google</strong> : carte d&apos;accès de la page Contact, si
            vous l&apos;acceptez.
          </li>
        </ul>
        <p>
          Certains de ces prestataires peuvent traiter des données hors de
          l&apos;Union européenne, notamment aux États-Unis. Ces transferts sont
          encadrés par le Data Privacy Framework UE–États-Unis ou par les
          clauses contractuelles types de la Commission européenne.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <>
        <p>
          Ce site ne dépose{" "}
          <strong>
            aucun cookie de mesure d&apos;audience ni de publicité
          </strong>
          .
        </p>
        <p>
          Des cookies tiers peuvent être déposés par les services intégrés :
        </p>
        <ul>
          <li>
            Google Maps, pour la carte de la page{" "}
            <Link href={routes.contact}>Contact</Link>, uniquement si vous
            l&apos;acceptez via le bandeau cookies ;
          </li>
          <li>
            SimplyBook.me, si vous réservez en ligne (le module du site lui
            transmet votre réservation) ;
          </li>
          <li>
            Stripe, si vous payez une carte cadeau (sécurité du paiement).
          </li>
        </ul>
        <p>
          Votre choix est conservé 6 mois. Vous pouvez le modifier à tout moment
          avec le lien « Gérer les cookies » en bas de page, ou bloquer les
          cookies depuis les réglages de votre navigateur.
        </p>
      </>
    ),
  },
  {
    id: "droits",
    title: "Vos droits",
    body: (
      <>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification,
          d&apos;effacement, de limitation, d&apos;opposition et de portabilité
          de vos données. Pour les exercer, écrivez à{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>. Une réponse vous
          est apportée sous un mois.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez
          adresser une réclamation à la CNIL (
          <a href="https://www.cnil.fr">cnil.fr</a>).
        </p>
      </>
    ),
  },
  {
    id: "securite",
    title: "Sécurité",
    body: (
      <p>
        Le site est servi exclusivement en HTTPS. Les accès aux outils de
        gestion sont protégés et limités à ce qui est nécessaire.
      </p>
    ),
  },
  {
    id: "modifications",
    title: "Modifications",
    body: (
      <p>
        Cette politique peut évoluer, par exemple à l&apos;ajout d&apos;un
        nouveau service. La date de dernière mise à jour figure en haut de page.
      </p>
    ),
  },
];

export default function ConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      current={routes.confidentialite}
      intro={
        <p>
          Ce que deviennent vos données quand vous écrivez, réservez ou offrez
          un soin, et comment garder la main dessus.
        </p>
      }
      sections={sections}
    />
  );
}
