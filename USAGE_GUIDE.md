# 🎯 GUIDE D'UTILISATION - Suivi Colis

L'application est maintenant **entièrement fonctionnelle**! Voici comment l'utiliser.

## 🚀 Démarrage Initial

### Étape 1: Ouvrir 2 Terminaux

**Terminal 1 (Frontend):**
```bash
cd c:\Users\maelh\Documents\workspace\suivi-colis
npm run dev
```
Vous verrez:
```
VITE v7.3.1 ready in 1399 ms
  ➜ Local:   http://localhost:5173/
```

**Terminal 2 (Backend):** *(Déjà en cours)*
```bash
cd c:\Users\maelh\Documents\workspace\suivi-colis\backend
npm run dev
```
Vous verrez:
```
✅ Serveur démarré sur le port 5000
```

### Étape 2: Ouvrir l'Application
- **Frontend:** http://localhost:5173 (dans votre navigateur)
- **Backend API:** http://localhost:5000/api

---

## 👤 Première Utilisation

### 1️⃣ S'Inscrire
1. Aller à http://localhost:5173
2. Cliquer sur "Inscription" (menu ou page Accueil)
3. Remplir le formulaire:
   - Prénom: ex. "Jean"
   - Nom: ex. "Dupont"
   - Email: ex. "jean@example.com"
   - Mot de passe: ex. "MdP123456"
   - Téléphone: ex. "+33612345678"
   - Adresse: ex. "123 rue de Paris, 75000"
4. Cliquer "S'inscrire"
5. ✅ Vous êtes connecté et redirigé vers l'Espace Client

### 2️⃣ Accéder à l'Espace Client
Vous devriez voir:
- Profil personnel
- Mes réservations (vide au début)
- Mes factures (vide au début)
- Mes documents (vide au début)
- Mes messages (vide au début)

### 3️⃣ Créer une Réservation
1. Aller au menu "Réservation" ou cliquer "Nouvelle réservation"
2. Remplir le formulaire:
   - Type de merchandise: ex. "Colis"
   - Poids: ex. "5 kg"
   - Lieu de départ: ex. "Paris, 75000"
   - Lieu de livraison: ex. "Lyon, 69000"
   - Type de véhicule: ex. "Fourgon"
   - Date de départ: ex. "2026-02-10"
   - Date de livraison: ex. "2026-02-12"
3. Cliquer "Créer réservation"
4. ✅ Vous recevez un numéro de suivi auto-généré (ex. "MOON260128001")

### 4️⃣ Rechercher le Suivi
1. Aller à "Suivi" (accessible sans login)
2. Entrer votre numéro de suivi (ex. "MOON260128001")
3. Cliquer "Rechercher"
4. Voir les détails:
   - Location actuelle
   - Timeline d'événements
   - Date de livraison estimée

---

## 🧪 Tester avec Postman

### 1️⃣ Importer la Collection
1. Ouvrir [Postman](https://www.postman.com/downloads/)
2. Cliquer "Import"
3. Charger `backend/postman_collection.json`

### 2️⃣ Flux de Test
```
1. POST /auth/register          → Créer compte
2. POST /auth/login             → Obtenir JWT token
3. GET /auth/me                 → Vérifier authentification
4. POST /reservations           → Créer réservation
5. GET /reservations            → Lister réservations
6. GET /tracking/search/:number → Recherche publique
```

### 3️⃣ Utiliser le JWT Token
1. Copier le token de la réponse login
2. Pour les routes protégées, ajouter header:
```
Authorization: Bearer <votre_token>
```

---

## 📊 Pages Disponibles

### Navigation Publique (Pas de login requis)
1. **Accueil** - Présentation
2. **À propos** - Info entreprise
3. **Services** - Détail des services
4. **Suivi** - Recherche publique par numéro

### Navigation Authentifiée (Login requis)
5. **Réservation** - Créer une commande
6. **Espace Client** - Dashboard personnel

---

## 🔐 Authentification

### Concepts Clés
- **JWT Token:** Token valide 30 jours
- **Stockage:** Sauvegardé en localStorage
- **Auto-connect:** Si token valide, pas besoin de se reconnecter
- **Logout:** Supprimer token du localStorage

### Flux Authentification
```
Inscription/Login 
    ↓
Reçevoir JWT token
    ↓
Stocker en localStorage
    ↓
Envoyer avec chaque requête API
    ↓
Serveur vérifie token
    ↓
Accès accordé/refusé
```

---

## 📱 Fonctionnalités Principales

### ✅ Utilisateurs
- Inscription sécurisée
- Connexion avec JWT
- Gestion profil (voir, modifier)
- Changement mot de passe
- Logout

### ✅ Réservations
- Création avec infos complètes
- Numéro de suivi auto-généré
- Lister vos réservations
- Statut suivi (En attente, Confirmée, En cours, Livrée)
- Annulation possible

### ✅ Suivi
- **Recherche PUBLIQUE** (pas de login!)
- Voir location actuelle
- Timeline d'événements
- Date livraison estimée
- Signature de livraison (preuves)

### ✅ Factures
- Auto-générées pour chaque réservation
- Voir historique
- Suivi paiement
- Statuts multiples

### ✅ Documents
- Upload fichiers
- Gestion permissions
- Signature numérique
- Date expiration

### ✅ Messages
- Support client intégré
- Priorités urgence
- Historique conversations
- Read receipts

---

## 🔧 Dépannage

### Issue: Port déjà utilisé
```bash
# Windows - Tuer le processus sur le port
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: MongoDB non connectée
**Vérifier:**
1. MongoDB est lancé localement
2. `backend/.env` a bon MONGODB_URI
3. Si MongoDB Atlas: vérifier credentials

### Issue: Frontend n'affiche pas les données
**Vérifier:**
1. Backend sur http://localhost:5000 ✅
2. Console navigateur (F12) pour erreurs
3. Vérifier token JWT valide

### Issue: Formulaires ne soumettent pas
**Vérifier:**
1. Tous les champs remplis
2. Pas d'erreurs en console (F12)
3. Backend logs pour erreurs serveur

---

## 📚 Documentation Complète

Pour plus d'infos, consultez:
- **COMPLETE_SETUP.md** - Architecture complète
- **backend/README.md** - API documentation
- **DEPLOYMENT.md** - Production setup
- **QUICKSTART.md** - Démarrage rapide

---

## 🎯 Cas d'Utilisation Exemples

### Cas 1: Client Final
```
1. Aller à http://localhost:5173
2. S'inscrire
3. Créer réservation
4. Voir numéro suivi
5. Partager le numéro
```

### Cas 2: Admin/Support
```
1. Tester API avec Postman
2. Créer données de test
3. Vérifier workflows
4. Tester cas d'erreur
```

### Cas 3: Développeur
```
1. Modifier code frontend/backend
2. Hot reload automatique
3. Vérifier logs (F12 / terminal)
4. Tester avec curl/Postman
```

---

## ⌚ Temps Estimés

| Tâche | Temps |
|-------|-------|
| Installation | 3 min |
| Démarrage | 1 min |
| Première inscription | 2 min |
| Créer réservation | 1 min |
| Rechercher suivi | 30 sec |
| Tester 5 endpoints API | 5 min |

**Total pour test complet:** ~15-20 minutes

---

## ✅ Checklist de Vérification

- [ ] Frontend démarre sur :5173
- [ ] Backend démarre sur :5000
- [ ] Inscription fonctionne
- [ ] Connexion fonctionne
- [ ] Créer réservation OK
- [ ] Voir suivi OK
- [ ] API Postman OK
- [ ] Logs sans erreurs

---

## 🚀 Prochaines Étapes

### Court terme (Ajouter):
- [ ] Plus de véhicules/options
- [ ] Historique détaillé
- [ ] Notifications email
- [ ] Export PDF factures

### Moyen terme (Améliorer):
- [ ] Paiement en ligne
- [ ] Admin dashboard
- [ ] Suivi GPS live
- [ ] Mobile app

### Long terme (Scaling):
- [ ] Multi-langue
- [ ] Multi-devise
- [ ] WebSocket notifications
- [ ] Machine learning pricing

---

## 📞 Besoin d'Aide?

1. **Vérifier les logs:**
   - Frontend: DevTools (F12)
   - Backend: Terminal

2. **Consulter la doc:**
   - COMPLETE_SETUP.md
   - backend/README.md
   - DEPLOYMENT.md

3. **Tester l'API:**
   - Postman collection
   - curl commands

4. **Vérifier la config:**
   - `.env` variables
   - Ports (5000, 5173)
   - MongoDB connection

---

**Bon développement! 🎉**

*Version: 1.0.0*
*Status: ✅ Opérationnel*
*Date: 28 janvier 2026*
