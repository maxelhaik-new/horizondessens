import { getGiftCards } from "@/lib/gift-cards";
import { currentEditorEmail } from "@/lib/supabase/editor";
import { formatDuration } from "@/services/format";

import { GiftCardTestForm } from "./test-send-form";

/**
 * Test d'envoi de la carte cadeau (PDF + e-mails, comme après un paiement),
 * affiché seulement aux éditeurs connectés (mode édition). Rien pour les
 * visiteurs, pas même le JS.
 */
export async function GiftCardTestSend() {
  const editor = await currentEditorEmail();
  if (editor === null) return null;
  const cards = await getGiftCards();
  return (
    <GiftCardTestForm
      defaultEmail={editor}
      cards={cards.map((c) => ({
        id: c.id,
        label: `${c.name} ${formatDuration(c.durationMinutes)}`,
      }))}
    />
  );
}
