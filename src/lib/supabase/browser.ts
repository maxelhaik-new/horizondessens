"use client";

import { createBrowserClient } from "@supabase/ssr";

import { supabaseKey, supabaseUrl } from "./config";

let client: ReturnType<typeof createBrowserClient> | undefined;

/** Client navigateur (session de l'éditeur), utilisé pour l'envoi des images. */
export function getSupabaseBrowserClient() {
  client ??= createBrowserClient(supabaseUrl, supabaseKey);
  return client;
}
