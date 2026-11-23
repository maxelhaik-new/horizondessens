import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { routes } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du site Horizon des Sens : éditrice, hébergeur, propriété intellectuelle et crédits.",
  path: "/mentions-legales",
});

const { address, legal } = site;

const sections: LegalSection[] = [
  {
    id: "editrice",
    title: "Éditrice du site",
    body: (
      <>
        <p>Le site {site.url.replace("https://", "")} est édité par :</p>
        <dl>
          <dt>Nom commercial</dt>
          <dd>{site.name}</dd>
          <dt>Exploitante</dt>
          <dd>{site.practitioner}</dd>
          <dt>Forme juridique</dt>
          <dd>{legal.status}</dd>
          <dt>SIREN</dt>
          <dd>{legal.siren}</dd>
          <dt>TVA</dt>
          <dd>{legal.vat}</dd>
          <dt>Adresse</dt>
          <dd>
            {address.street}, {address.postalCode} {address.city}, France
          </dd>
          <dt>Téléphone</dt>
          <dd>
            <a href={site.phone.href}>{site.phone.display}</a>
          </dd>
          <dt>E-mail</dt>
          <dd>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </dd>
        </dl>
        <p>
          Directrice de la publication : <strong>{site.practitioner}</strong>.
        </p>
      </>
    ),
  },
  {
    id: "hebergement",
    title: "Hébergement",
    body: (
      <p>
        Le site est hébergé par <strong>{legal.host.name}</strong>,{" "}
        {legal.host.address} (<a href={legal.host.url}>vercel.com</a>).
      </p>
    ),
  },
  {
    id: "conception",
    title: "Conception et développement",
    body: (
      <p>
        Design et développement du site :{" "}
        <strong>{legal.developer.name}</strong> (
        <a href={`mailto:${legal.developer.email}`}>{legal.developer.email}</a>
        ).
      </p>
    ),
  },
  {
    id: "prestations",
    title: "Nature des prestations",
    body: (
      <>
        <p>
          Les massages proposés par {site.name} sont des{" "}
          <strong>soins de bien-être et de relaxation</strong>, sans visée
          thérapeutique ni médicale. Ils ne relèvent pas de la kinésithérapie et
          ne remplacent ni un diagnostic ni un traitement médical.
        </p>
        <p>
          En cas de doute sur votre état de santé, demandez l&apos;avis de votre
          médecin avant votre séance.
        </p>
      </>
    ),
  },
  {
    id: "propriete",
    title: "Propriété intellectuelle",
    body: (
      <>
        <p>
          L&apos;ensemble des contenus de ce site (textes, logo, photographies,
          illustrations, mise en page) est protégé par le droit de la propriété
          intellectuelle. Toute reproduction, représentation ou adaptation,
          totale ou partielle, sans autorisation écrite préalable est interdite.
        </p>
        <p>
          Le Massage des 5 Continents est une méthode sous licence ; son nom et
          son logo appartiennent à leurs titulaires respectifs.
        </p>
      </>
    ),
  },
  {
    id: "credits",
    title: "Crédits",
    body: (
      <ul>
        <li>Photographies du salon : {legal.developer.name}.</li>
        <li>
          Visuels d&apos;illustration : Unsplash et images générées par
          intelligence artificielle.
        </li>
        <li>Polices : Instrument Serif et Manrope (licence SIL Open Font).</li>
      </ul>
    ),
  },
  {
    id: "responsabilite",
    title: "Responsabilité et liens",
    body: (
      <>
        <p>
          {site.name} s&apos;efforce de fournir des informations exactes et à
          jour, sans pouvoir garantir l&apos;absence d&apos;erreur. Les tarifs
          et disponibilités qui font foi sont ceux affichés au moment de la
          réservation.
        </p>
        <p>
          Le site contient des liens vers des services tiers (réservation en
          ligne, paiement, cartes, réseaux sociaux). {site.name} n&apos;est pas
          responsable de leur contenu ni de leurs pratiques.
        </p>
      </>
    ),
  },
  {
    id: "donnees",
    title: "Données personnelles et cookies",
    body: (
      <p>
        Le traitement de vos données et l&apos;usage des cookies sont décrits
        dans la{" "}
        <Link href={routes.confidentialite}>politique de confidentialité</Link>.
      </p>
    ),
  },
  {
    id: "droit",
    title: "Droit applicable",
    body: (
      <p>
        Les présentes mentions sont régies par le droit français. Pour la vente
        de prestations et de cartes cadeaux, voir les{" "}
        <Link href={routes.cgv}>conditions générales de vente</Link>.
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      title="Mentions légales"
      current={routes.mentionsLegales}
      intro={
        <p>
          Qui édite ce site, qui l&apos;héberge, et à qui appartiennent ses
          contenus.
        </p>
      }
      sections={sections}
    />
  );
}
