# Prestations SimplyBook « 2026 » à créer

> Décision de Maxime (25/11/2026) : on **crée de nouvelles prestations** marquées « 2026 », on **ne touche pas** aux anciennes (legacy), et le site ne pointe **plus jamais** vers les legacy.
> Une fois créées, lancer `npm run simplybook:services`, puis reporter chaque ID dans `simplybookId` (`src/services/local-services.ts`). Le module de réservation s'active alors tout seul sur la page du soin.

## Les 6 prestations — ✅ créées le 25/11/2026 via l'API admin

| ID | Nom dans SimplyBook | Durée | Prix (dans la description ; le champ prix exige le module paiement) | Soin du site |
|---|---|---|---|---|
| 25 | Kobido 1h · 2026 | 60 min | 100 € | `kobido` 60 |
| 26 | Kobido 1h15 · 2026 | 75 min | 120 € | `kobido` 75 |
| 27 | Calme et harmonie · 2026 | 75 min | 120 € | `calme-et-harmonie` 75 |
| 28 | Massage des 5 Continents · 2026 | 75 min | **135 €** (décision de Maxime, 25/11) | `5-continents` 75 |
| 29 | Jambes légères · 2026 | 75 min | 120 € | `jambes-legeres` 75 |
| 30 | Rituel Horizon · 2026 | 75 min | 120 € | `rituel-horizon` 75 |

Branchées dans `src/services/local-services.ts` (`simplybookId`). Visibles, praticienne 1. Les heures fixes du compte (9h, 11h, 15h, 16h, 17h) s'appliquent déjà.

## Réglages par prestation (dans l'interface SimplyBook)

L'API admin ne gère que nom, description, prix, durée, visibilité et praticienne : le reste se règle dans l'interface.

- [x] **Praticienne** : « HORIZON DES SENS » (ID 1).
- [ ] ⚠️ **Temps de pause après** : **0 min à la création** (non modifiable par l'API). À régler à 15 ou 20 min, comme les legacy, sinon des RDV collés.
- [x] **Rendez-vous à heure fixe** : les heures du compte s'appliquent (vérifié par l'API). À aligner sur les horaires du site (voir Agenda).
- [ ] **Catégorie** : une catégorie « Soins 2026 » (facultatif pour le site, utile pour la page SimplyBook et la fiche Google).
- [ ] **Visibilité** : visible (l'API publique ne renvoie pas les prestations masquées). Pour les cacher de la page SimplyBook sans les cacher de l'API : à vérifier.

## Agenda (bloquant pour la mise en ligne)

- [ ] **Aucun créneau après le 27/11/2026** pour les prestations actuelles : horaires, congés ou « délai max avant RDV » à régler (Élodie déménage ?).
- [ ] Horaires annoncés sur le site : **lun.–sam. 9h30–11h / 13h30–17h** (`site.hours`). Les créneaux legacy observés (9h, 11h, 15h, 16h, 17h) ne correspondent pas : à aligner.
- [ ] Adresse de la praticienne et de l'entreprise : encore Saint-Pierre-des-Corps dans SimplyBook (description) → Saint-Cyr-sur-Loire.
- [ ] E-mails de confirmation et de rappel SimplyBook : vérifier qu'ils sont actifs et en français, pour le client **et** pour Élodie.

## Ce que l'API a montré (25/11/2026)

Pas de captcha · e-mail et téléphone obligatoires · conditions SimplyBook et conditions d'annulation à accepter · pas de formulaire d'admission · fuseau Europe/Paris · une praticienne (ID 1) · pas de prix (module « Accepter les paiements » inactif).
