## Guide de Démarrage Rapide

### 1️⃣ Installation initiale

```bash
# Depuis la racine du projet
npm install           # Frontend dependencies
cd backend
npm install           # Backend dependencies
cd ..
```

### 2️⃣ Configuration MongoDB

#### Option A: MongoDB Local
```bash
# Sur Windows, lancez MongoDB
mongod

# Vérifie la connexion
mongodb+srv://localhost:27017/suivi-colis
```

#### Option B: MongoDB Atlas (Cloud)
1. Créez un compte sur https://www.mongodb.com/cloud/atlas
2. Créez un cluster gratuit
3. Récupérez la connection string
4. Collez dans `backend/.env` : `MONGODB_URI=mongodb+srv://...`

### 3️⃣ Configuration des fichiers .env

**backend/.env:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/suivi-colis
JWT_SECRET=secret_super_securise_changez_moi
JWT_EXPIRE=30d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**.env (racine):**
```
VITE_API_URL=http://localhost:5000/api
```

### 4️⃣ Démarrage des serveurs

**Terminal 1 - Frontend:**
```bash
npm run dev
# 🌐 http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
# 🔌 http://localhost:5000
# 📡 API: http://localhost:5000/api
```

### 5️⃣ Test de l'application

1. Ouvrez `http://localhost:5173`
2. Cliquez sur "Inscription" ou "Connexion"
3. Créez un compte avec email/password
4. Vous devriez être redirigé vers l'Espace Client
5. Testez la création de réservation

## Architecture de l'App

```
Frontend (React)                Backend (Express)
    ↓                                ↓
Authentification → JWT Token ← API Endpoints
    ↓                                ↓
Pages (Home, Services, etc.)   MongoDB Schemas
    ↓                                ↓
API Calls via axios → MongoDB Queries
```

## Fichiers clés

### Frontend
- `src/App.tsx` - Routing principal
- `src/services/api.ts` - Client API
- `src/hooks/useAuth.ts` - Hook authentification
- `src/pages/` - Pages principales

### Backend
- `backend/server.js` - Serveur Express
- `backend/models/` - Schémas Mongoose
- `backend/routes/` - Endpoints API
- `backend/middleware/auth.js` - JWT protection

## Commandes utiles

```bash
# Frontend
npm run dev         # Mode développement
npm run build       # Build production
npm run preview     # Prévisualiser build

# Backend
npm run dev         # Mode développement avec nodemon
npm start           # Production
cd backend && npm run dev

# Tout
install.bat         # Installation complète (Windows)
./install.sh        # Installation complète (Linux/Mac)
```

## Endpoints utiles à tester

### Public (pas besoin de token)
```bash
GET  /api/health                          # Vérifier serveur
GET  /api/tracking/search/MOON260101001   # Recherche publique
```

### Privés (besoin du token)
```bash
POST /api/auth/register                   # Inscription
POST /api/auth/login                      # Connexion
GET  /api/auth/me                         # Profil
POST /api/reservations                    # Créer réservation
GET  /api/reservations                    # Lister réservations
```

## Débogage

### Vérifier les logs
- **Frontend:** Ouvrez DevTools (F12) → Console
- **Backend:** Regardez le terminal backend

### Erreurs courantes

❌ **"Cannot connect to MongoDB"**
→ Vérifiez que MongoDB est lancé ou changez MONGODB_URI

❌ **"CORS error"**
→ Vérifiez FRONTEND_URL dans backend/.env

❌ **"Token invalid"**
→ Reconnectez-vous pour un nouveau token

## Prochaines étapes

1. ✅ Backend fonctionnel
2. ✅ Frontend connecté à l'API
3. ⏳ Ajouter paiement en ligne
4. ⏳ Notifications email
5. ⏳ Admin dashboard
6. ⏳ Deploy sur production

## Besoin d'aide?

1. Consultez `COMPLETE_SETUP.md`
2. Consultez `backend/README.md`
3. Vérifiez les logs (F12 frontend, terminal backend)
4. Testez avec Postman: `backend/postman_collection.json`

---

🚀 **Bon développement!**
