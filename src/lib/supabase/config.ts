/**
 * Configuration Supabase (mini-CMS). Valeurs publiques : URL du projet et
 * clé « publishable » (protégée par le RLS). Aucun secret ici.
 */
export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://vlpevjffaqzvksjfknhk.supabase.co";

export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

/** Sans clé, le site affiche simplement les valeurs par défaut du code. */
export const isCmsConfigured = Boolean(supabaseUrl && supabaseKey);

/** Bucket Storage des images remplacées par Élodie (lecture publique). */
export const CMS_BUCKET = "cms-media";

/** Tag de cache du contenu publié : invalidé à chaque publication. */
export const CMS_TAG = "cms-content";

/** URL publique d'un fichier du bucket. */
export const mediaUrl = (path: string) =>
  `${supabaseUrl}/storage/v1/object/public/${CMS_BUCKET}/${path}`;
