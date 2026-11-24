# Resend : sortir du mode test

> Rédigé le 24/11/2026. Domaine `horizondessens.fr` déjà créé dans Resend (région eu-west-1), statut **« not_started »** : aucun enregistrement DNS n'est encore posé.

## Pourquoi on est « en mode test »

Tant que le domaine n'est pas vérifié, Resend n'envoie **qu'à l'adresse du titulaire du compte** (`maxelhaik@gmail.com`), depuis `onboarding@resend.dev`. Conséquences aujourd'hui :
- le formulaire de contact n'arrive pas chez Élodie ;
- l'acheteur d'une carte cadeau ne reçoit pas son e-mail (il garde le PDF sur la page de remerciement) ;
- Supabase ne peut pas envoyer l'invitation d'Élodie au CMS.

**Pour en sortir : prouver à Resend que l'on contrôle le domaine**, en ajoutant 4 enregistrements DNS chez OVH.

## Étape 1 — Chez OVH (Maxime, 10 minutes)

1. [OVH Manager](https://www.ovh.com/manager/) → **Web Cloud** → **Noms de domaine** → `horizondessens.fr` → onglet **Zone DNS**.
2. **Ajouter une entrée** pour chacune des lignes ci-dessous. OVH ajoute lui-même `.horizondessens.fr` au sous-domaine : ne saisir que la partie indiquée. TTL : laisser la valeur par défaut.

| # | Type | Sous-domaine | Valeur | Priorité |
|---|---|---|---|---|
| 1 | **TXT** | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5mBAAb4P77ZN2eMD22t59XUNMB9GOugH3Ss1M2F/IEiBW6qEzJ+1Ej8TZ5fyK1J0oUhYAJLN5SDjr58e3Ki8odYqEcj54fxRAkrxUAErg9vCbI5YIrqqotEEx5v9wagxYXpg5FOltbJEyArObeWWoEP0NCLa3c9lJy6kYudEqQQIDAQAB` | — |
| 2 | **MX** | `send` | `feedback-smtp.eu-west-1.amazonses.com.` | 10 |
| 3 | **TXT** | `send` | `v=spf1 include:amazonses.com ~all` | — |
| 4 | **CNAME** | `rsend` | `send.forge.rmta.net.` | — |
| 5 *(conseillé)* | **TXT** | `_dmarc` | `v=DMARC1; p=none;` | — |

Points d'attention :
- **Ne rien modifier sur la racine du domaine.** Les MX `mx1/mx2/mx3.mail.ovh.net` et le SPF `v=spf1 include:mx.ovh.com ~all` servent à la boîte `e.nguyen@horizondessens.fr` : ils restent tels quels. Resend n'utilise que le sous-domaine `send`, il n'y a donc **aucun conflit** avec la messagerie d'Élodie.
- La clé DKIM (ligne 1) est longue : la copier **en entier**, sans espace ni retour à la ligne. Si OVH propose un type « DKIM », prendre quand même **TXT**.
- Pour le MX et le CNAME, OVH accepte la valeur avec ou sans point final ; avec le point, c'est plus sûr.
- La ligne 5 (DMARC) n'est pas exigée par Resend, mais elle améliore la délivrabilité (Gmail et Yahoo la demandent). `p=none` n'a aucun effet bloquant.

La propagation prend de quelques minutes à quelques heures.

## Étape 2 — Vérification dans Resend (Claude)

Une fois les entrées posées, Claude lance la vérification via le serveur MCP Resend (`verify-domain`) et contrôle chaque enregistrement (`dig`). On peut aussi cliquer sur **Verify** dans Resend → Domains. Le statut doit passer à **« verified »**.

## Étape 3 — Le site envoie depuis le vrai domaine (Claude)

Sur Vercel (Production et Preview) et dans `.env.local` :

| Variable | Valeur |
|---|---|
| `CONTACT_FROM_EMAIL` | `Horizon des Sens <contact@horizondessens.fr>` |
| `CONTACT_TO_EMAIL` | `e.nguyen@horizondessens.fr` |
| `RESEND_API_KEY` | clé actuelle (accès « envoi ») ou nouvelle clé limitée au domaine |

Puis redéploiement. L'adresse `contact@` n'a pas besoin d'exister comme boîte : les réponses partent vers le bon destinataire (`Reply-To` = visiteur pour le formulaire, = Élodie pour l'e-mail de l'acheteur).

## Étape 4 — Supabase envoie par Resend (Claude)

Pour inviter Élodie au CMS. Une clé API Resend dédiée (« Supabase SMTP », accès envoi, limitée à `horizondessens.fr`), puis dans la configuration Auth de Supabase :

| Réglage | Valeur |
|---|---|
| Hôte / port | `smtp.resend.com` / `465` |
| Utilisateur | `resend` |
| Mot de passe | la clé API dédiée |
| Expéditeur | `contact@horizondessens.fr`, nom « Horizon des Sens » |

Une fois ce SMTP en place, Supabase autorise :
- les **modèles d'e-mail en français** (invitation, mot de passe oublié) aux couleurs du site ;
- l'envoi à n'importe quelle adresse, au-delà de la limite de 2 e-mails par heure.

## Étape 5 — Contrôles

- Formulaire de contact sur `horizondessens.vercel.app/contact` → reçu dans la boîte d'Élodie.
- Achat test d'une carte cadeau (carte 4242) avec une adresse qui n'est pas celle du compte Resend → l'acheteur reçoit son e-mail avec le PDF.
- « Mot de passe oublié » sur `/admin` → e-mail en français.
- Resend → **Logs** : statut « delivered », sans « bounced ».

## Limites de l'offre gratuite Resend

3 000 e-mails par mois, 100 par jour, 1 domaine. C'est largement suffisant pour le site d'Élodie.
