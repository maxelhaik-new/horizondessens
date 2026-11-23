/**
 * Styles du mode édition, injectés par l'éditeur uniquement (aucun poids
 * pour les visiteurs). `html[data-cms-mode="edit"]` : affordances visibles ;
 * `"preview"` : aperçu propre des brouillons.
 */
export const editorCss = /* css */ `
html[data-cms-mode="edit"] [data-cms]:not(img) {
  cursor: text;
  border-radius: 6px;
  outline: 1.5px dashed transparent;
  outline-offset: 5px;
  transition: outline-color 0.2s ease;
}
html[data-cms-mode="edit"] [data-cms]:not(img):hover {
  outline-color: rgb(197 129 110 / 0.85);
}
html[data-cms-mode="edit"] [data-cms-draft]:not(img) {
  outline-color: rgb(197 129 110 / 0.45);
}
html[data-cms-mode="edit"] img[data-cms-draft] {
  outline: 3px dashed rgb(197 129 110 / 0.7);
  outline-offset: -6px;
}

/* Élément en cours d'édition : ses propres nœuds sont masqués (jamais
   retirés), le span éditable hérite de tous ses styles. */
[data-cms-active] {
  font-size: 0 !important;
  outline: 2px solid rgb(197 129 110) !important;
  outline-offset: 5px !important;
  border-radius: 6px;
  cursor: text;
}
[data-cms-active] > :not([data-cms-live]) { display: none !important; }
[data-cms-active]::before, [data-cms-active]::after { display: none !important; }
[data-cms-live] { outline: none; min-width: 1ch; caret-color: currentColor; }
[data-cms-saving] { outline-style: dashed !important; }

/* Le bandeau défilant s'arrête pour pouvoir cliquer sur un mot. */
html[data-cms-mode="edit"] .animate-marquee { animation-play-state: paused !important; }
/* Barre « Réserver » mobile et bandeau cookies : sous la barre d'édition. */
html[data-cms-mode] [data-cms-hide] { display: none !important; }

@keyframes cms-pop { from { opacity: 0; transform: translateY(6px) scale(0.98); } }
@keyframes cms-flash { 0%, 70% { opacity: 1; } 100% { opacity: 0; } }
@keyframes cms-spin { to { transform: rotate(360deg); } }
`;
