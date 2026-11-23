import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { supabaseKey, supabaseUrl } from "@/lib/supabase/config";

/**
 * Rafraîchit la session Supabase de l'éditeur (jetons d'une heure).
 * Ne s'exécute QUE sur /admin et pour les navigateurs en mode édition
 * (cookie Draft Mode) : les visiteurs ne passent jamais par ici.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  if (!supabaseKey) return response;

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        for (const { name, value } of list) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of list)
          response.cookies.set(name, value, options);
      },
    },
  });
  await supabase.auth.getClaims();
  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    {
      source:
        "/((?!_next/static|_next/image|images/|.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|txt|xml|webmanifest)$).*)",
      has: [{ type: "cookie", key: "__prerender_bypass" }],
    },
  ],
};
