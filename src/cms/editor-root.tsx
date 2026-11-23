import { draftMode } from "next/headers";

import { contentDefaults } from "@/content/defaults";
import { contentFields, type ContentKey } from "@/content/registry";
import { loadCmsState, resolveValue } from "@/content/store";

import { CmsEditor } from "./editor";

/**
 * Monte l'éditeur en mode édition seulement (Draft Mode actif après la
 * connexion sur /admin). Pour les visiteurs : rien, pas même le JS.
 */
export async function CmsEditorRoot() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  const state = await loadCmsState();
  const keys = Object.keys(contentFields) as ContentKey[];
  const values = Object.fromEntries(
    keys.map((key) => [key, resolveValue(state.values, key)]),
  );
  const customKeys = keys.filter(
    (key) =>
      JSON.stringify(values[key]) !== JSON.stringify(contentDefaults[key]),
  );

  return (
    <CmsEditor
      fields={contentFields}
      values={values}
      draftKeys={state.draftKeys}
      customKeys={customKeys}
      editor={state.editor}
    />
  );
}
