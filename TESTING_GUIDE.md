# 🧪 GUIDE DE TESTS - SUPPRESSIONS & TÉLÉCHARGEMENTS PDF

## ✅ PRÉPARATION

1. **Démarrer le backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Démarrer le frontend:**
   ```bash
   npm run dev
   ```

3. **Accéder à l'app:**
   ```
   http://localhost:5173
   ```

4. **Se connecter:**
   ```
   Email: email@example.com
   Password: password123
   ```

---

## 📦 TEST 1: SUPPRESSION DE COMMANDE

### Scénario: Supprimer une commande

**Étapes:**
1. Aller dans "Espace Client" → "Mes Commandes"
2. Voir la liste des commandes
3. Cliquer sur le bouton "🗑️ Supprimer" d'une commande

**Attendus:**
- [ ] Popup de confirmation apparaît
- [ ] Message: "Êtes-vous sûr de vouloir supprimer cette commande?"
- [ ] Deux boutons: OK/Annuler

**Si OK:**
- [ ] Commande disparaît de la liste
- [ ] Notification verte: "Commande supprimée avec succès"
- [ ] Compteur mis à jour

**Si Annuler:**
- [ ] Rien ne se passe
- [ ] Commande reste dans la liste

**Résultat:** ✅ SUCCÈS / ❌ ÉCHEC

---

## 📄 TEST 2: TÉLÉCHARGEMENT DOCUMENT

### Scénario: Télécharger un contrat en PDF

**Étapes:**
1. Aller dans "Espace Client" → "Documents"
2. Voir la liste des documents
3. Cliquer sur "⬇️ Télécharger" pour un document

**Attendus:**
- [ ] Le fichier télécharge (généralement dans le dossier Downloads)
- [ ] Notification verte: "Document téléchargé avec succès"
- [ ] Fichier nommé: `Contrat-*.pdf` ou `Document-*.pdf`

**Vérifier le PDF:**
1. Ouvrir le PDF téléchargé
2. Vérifier le contenu:
   - [ ] En-tête "MOON LOGISTICS"
   - [ ] Numéro contrat
   - [ ] Infos générales (date, statut)
   - [ ] Détails transport
   - [ ] Infos expéditeur
   - [ ] Infos destinataire
   - [ ] Zones signature
   - [ ] Footer avec date génération

**Résultat:** ✅ SUCCÈS / ❌ ÉCHEC

---

## 📄 TEST 3: SUPPRESSION DOCUMENT

### Scénario: Supprimer un document

**Étapes:**
1. Aller dans "Espace Client" → "Documents"
2. Cliquer sur "🗑️ Supprimer" pour un document

**Attendus:**
- [ ] Popup de confirmation
- [ ] Message: "Êtes-vous sûr de vouloir supprimer ce document?"

**Si OK:**
- [ ] Document disparaît
- [ ] Notification verte: "Document supprimé avec succès"

**Résultat:** ✅ SUCCÈS / ❌ ÉCHEC

---

## 💰 TEST 4: TÉLÉCHARGEMENT FACTURE

### Scénario: Télécharger une facture en PDF

**Étapes:**
1. Aller dans "Espace Client" → "Factures"
2. Cliquer sur "⬇️ Télécharger" pour une facture

**Attendus:**
- [ ] Le fichier télécharge
- [ ] Notification verte: "Facture téléchargée avec succès"
- [ ] Fichier nommé: `Facture-FAC-*.pdf`

**Vérifier le PDF:**
1. Ouvrir le PDF
2. Vérifier:
   - [ ] En-tête "FACTURE MOON LOGISTICS"
   - [ ] Numéro facture
   - [ ] Date et numéro suivi
   - [ ] Statut (Draft/Payée/En attente)
   - [ ] Tableau articles/services
   - [ ] Sous-total, TVA (20%), TOTAL
   - [ ] Footer avec date génération

**Résultat:** ✅ SUCCÈS / ❌ ÉCHEC

---

## 💰 TEST 5: SUPPRESSION FACTURE (NON PAYÉE)

### Scénario: Supprimer une facture en attente

**Étapes:**
1. Aller dans "Espace Client" → "Factures"
2. Trouver une facture avec statut "En attente" ou "Draft"
3. Cliquer "🗑️ Supprimer"

**Attendus:**
- [ ] Confirmation apparaît
- [ ] Si OK: Facture disparaît
- [ ] Notification: "Facture supprimée avec succès"

**Résultat:** ✅ SUCCÈS / ❌ ÉCHEC

---

## 💰 TEST 6: SUPPRESSION FACTURE (PAYÉE) - DOIT ÉCHOUER

### Scénario: Tenter supprimer une facture payée

**Étapes:**
1. Aller dans "Espace Client" → "Factures"
2. Trouver une facture avec statut "Payée"
3. Cliquer "🗑️ Supprimer"

**Attendus:**
- [ ] Popup de confirmation
- [ ] Si OK: Message d'erreur rouge
- [ ] Erreur: "Impossible de supprimer une facture payée"
- [ ] Facture reste dans la liste

**Résultat:** ✅ SUCCÈS (Blocage correct) / ❌ ÉCHEC

---

## 📊 TEST 7: NOTIFICATIONS

### Scénario: Vérifier le système de notifications

**Étapes:**
1. Effectuer plusieurs actions (suppression, téléchargement)
2. Observer les notifications

**Attendus:**
- [ ] Notifications verts (succès) en haut à droite
- [ ] Notifications rouges (erreurs) en haut à droite
- [ ] Disparition automatique après 3 secondes
- [ ] Bouton X pour fermer manuellement

**Résultat:** ✅ SUCCÈS / ❌ ÉCHEC

---

## 🔄 TEST 8: RAFRAÎCHISSEMENT DE DONNÉES

### Scénario: Vérifier le rafraîchissement automatique

**Étapes:**
1. Supprimer une commande
2. Vérifier que le compteur dans l'onglet change
3. Rafraîchir la page (F5)
4. Vérifier que la suppression persiste

**Attendus:**
- [ ] Compteur change immédiatement
- [ ] Élément disparaît de la liste
- [ ] Après refresh: élément reste supprimé
- [ ] Les autres données restent intactes

**Résultat:** ✅ SUCCÈS / ❌ ÉCHEC

---

## 🔐 TEST 9: AUTHENTIFICATION

### Scénario: Vérifier la sécurité

**Étapes:**
1. Déconnecter
2. Tenter accéder à /client (si URL directe possible)
3. Reconnecter
4. Vérifier que les données personnelles apparaissent

**Attendus:**
- [ ] Redirection vers login si pas connecté
- [ ] Données utilisateur corretes après connexion
- [ ] Token JWT utilisé correctement

**Résultat:** ✅ SUCCÈS / ❌ ÉCHEC

---

## 📱 TEST 10: RESPONSIVE DESIGN

### Scénario: Tester sur mobile

**Étapes:**
1. Ouvrir Dev Tools (F12)
2. Activer Device Emulation (Iphone/Android)
3. Tester tous les boutons

**Attendus:**
- [ ] Boutons en vertical sur petit écran
- [ ] Notifications bien positionnées
- [ ] Texte lisible
- [ ] Pas d'overflow

**Résultat:** ✅ SUCCÈS / ❌ ÉCHEC

---

## 📋 RÉSUMÉ DES TESTS

| Test | Description | Résultat | Notes |
|------|-------------|----------|-------|
| 1 | Suppression commande | ✅/❌ | |
| 2 | Téléchargement document | ✅/❌ | |
| 3 | Suppression document | ✅/❌ | |
| 4 | Téléchargement facture | ✅/❌ | |
| 5 | Suppression facture (attente) | ✅/❌ | |
| 6 | Suppression facture (payée) | ✅/❌ | |
| 7 | Notifications | ✅/❌ | |
| 8 | Rafraîchissement | ✅/❌ | |
| 9 | Authentification | ✅/❌ | |
| 10 | Responsive | ✅/❌ | |

---

## 🐛 DÉBOGUER EN CAS DE PROBLÈME

### Problème: "Erreur lors du téléchargement"

**Solutions:**
1. Vérifier la console (F12)
2. Vérifier les logs backend
3. Vérifier le JWT token
4. Redémarrer les serveurs

### Problème: "Élément ne se supprime pas"

**Vérifier:**
- [ ] Message d'erreur dans notification
- [ ] Console pour messages d'erreur
- [ ] Statut de l'élément (payé/livré = bloqué)

### Problème: "PDF ne télécharge pas"

**Vérifier:**
- [ ] Paramètres du navigateur (bloqueurs de pop-ups?)
- [ ] Console pour erreurs
- [ ] Espace disque disponible
- [ ] Backend répond bien

---

## ✅ VALIDATION FINALE

Une fois tous les tests passés:

1. ✅ Commits backend
2. ✅ Commits frontend
3. ✅ Commits styles
4. ✅ Merge dans main
5. ✅ Prêt pour production

---

**Bon testing! 🚀**
