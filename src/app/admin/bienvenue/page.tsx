import type { Metadata } from "next";

import { AdminShell } from "../admin-shell";
import { SessionFromLink } from "./session-from-link";

export const metadata: Metadata = {
  title: "Connexion",
  robots: { index: false, follow: false },
};

/**
 * Retour des e-mails Supabase (invitation, mot de passe oublié). Les modèles
 * d'e-mail par défaut renvoient ici avec la session dans l'URL ; on l'ouvre
 * puis on envoie vers le choix du mot de passe.
 */
export default function WelcomePage() {
  return (
    <AdminShell
      title="Un instant…"
      intro="Ouverture de votre espace d'édition."
    >
      <SessionFromLink />
    </AdminShell>
  );
}
