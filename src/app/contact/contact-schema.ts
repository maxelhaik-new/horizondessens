/** Sujets proposés dans le formulaire (libellés d'interface, fixés dans le code). */
export const contactSubjects = [
  "Kobido",
  "Massage corps",
  "Carte cadeau",
  "Autre question",
] as const;

type Fields = "name" | "email" | "phone" | "subject" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<Fields, string>>;
  /** L'envoi a échoué côté serveur (clé manquante, service indisponible). */
  unavailable?: boolean;
  /** Valeurs saisies, renvoyées pour ne rien perdre en cas d'erreur. */
  values?: Partial<Record<Fields, string>>;
};
