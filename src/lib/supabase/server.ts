import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { supabaseKey, supabaseUrl } from "./config";

/**
 * Client Supabase lié à la session de l'éditeur (cookies). À utiliser dans
 * les Server Actions et le rendu en mode édition, jamais dans un `"use cache"`.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try {
          for (const { name, value, options } of list)
            cookieStore.set(name, value, options);
        } catch {
          // Rendu d'un composant serveur : écriture impossible, le proxy
          // (src/proxy.ts) se charge de rafraîchir la session.
        }
      },
    },
  });
}
