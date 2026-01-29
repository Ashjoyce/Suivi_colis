# 🚚 Suivi Colis - Application Logistique Complète

Application web logistique complète pour la gestion des réservations de transport, suivi des colis en temps réel, facturation automatique et gestion des documents.

## ✨ Caractéristiques

### 👤 Utilisateurs
- ✅ Inscription et connexion sécurisées (JWT)
- ✅ Gestion complète du profil
- ✅ Création de réservations
- ✅ Suivi public des colis
- ✅ Gestion des factures
- ✅ Upload de documents
- ✅ Messagerie support

### 🔐 Sécurité
- ✅ JWT Authentication (30 jours)
- ✅ Bcrypt password hashing
- ✅ CORS protection
- ✅ Role-based access (user/admin)
- ✅ Input validation
- ✅ Error handling sécurisé

## 🚀 Démarrage Rapide

### Prérequis
- Node.js v18+
- MongoDB (local ou Atlas)

### Installation (2 minutes)
```bash
# Installer dépendances
npm install && cd backend && npm install && cd ..

# Configuration MongoDB
# Modifiez MONGODB_URI dans backend/.env

# Démarrage
npm run install:all  # Installation complète
npm run dev:all      # Frontend + Backend
```

### Accès
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Collection Postman:** `backend/postman_collection.json`

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [COMPLETE_SETUP.md](COMPLETE_SETUP.md) | Setup complet + architecture (15+ pages) |
| [QUICKSTART.md](QUICKSTART.md) | Démarrage rapide 5 minutes |
| [APP_COMPLETE.md](APP_COMPLETE.md) | Vue d'ensemble & fonctionnalités |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Guide production complet |
| [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md) | Récapitulatif déploiement |
| [FINAL_CHECKLIST.md](FINAL_CHECKLIST.md) | Checklist de vérification |
| [backend/README.md](backend/README.md) | Documentation API détaillée |

## 📊 Stack Technologique

### Frontend
```
React 19 + TypeScript
React Router v6
Axios HTTP Client
CSS3 avancé
Vite build tool
```

### Backend
```
Node.js + Express.js
MongoDB + Mongoose
JWT + bcryptjs
CORS + Multer
Nodemailer
```

## 🎯 Endpoints API (36 Total)

### Authentification (5)
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/profile
PUT    /api/auth/change-password
```

### Réservations (5)
```
POST   /api/reservations
GET    /api/reservations
GET    /api/reservations/:id
PUT    /api/reservations/:id
PATCH  /api/reservations/:id/cancel
```

### Suivi (5)
```
GET    /api/tracking/search/:number     (Public)
GET    /api/tracking
GET    /api/tracking/:id
PUT    /api/tracking/:id
PATCH  /api/tracking/:id/deliver
```

### Factures (5) | Documents (5) | Messages (6)
*Voir [backend/README.md](backend/README.md) pour détails*

## 📁 Structure du Projet

```
suivi-colis/
├── backend/                 # Node.js/Express API
│   ├── models/             # 6 modèles Mongoose
│   ├── routes/             # 6 routes (36 endpoints)
│   ├── middleware/         # JWT auth
│   ├── utils/              # Helpers
│   └── server.js           # Entry point
├── src/                    # Frontend React
│   ├── pages/              # 6 pages principales
│   ├── components/         # Composants
│   ├── hooks/              # useAuth hook
│   └── services/           # API client
├── COMPLETE_SETUP.md       # Documentation complète
├── QUICKSTART.md           # Démarrage rapide
├── DEPLOYMENT.md           # Guide production
├── docker-compose.yml      # Docker setup
└── install.bat/sh          # Installation scripts
```

## 🧪 Tests avec Postman

1. Importer: `backend/postman_collection.json`
2. Créer un compte (POST /auth/register)
3. Se connecter (POST /auth/login)
4. Utiliser le JWT token pour les requêtes protégées

## 🚢 Déploiement

### Docker (Rapide)
```bash
docker-compose up -d
```

### Production (Heroku/Railway/Render)
Voir [DEPLOYMENT.md](DEPLOYMENT.md) pour guide complet

## 🔧 Commandes Utiles

```bash
# Installation
npm run install:all

# Développement
npm run dev          # Frontend seul
npm run backend      # Backend seul
npm run dev:all      # Frontend + Backend

# Production
npm run build        # Build frontend
cd backend && npm start

# Utilitaires
npm run lint         # Vérifier code
npm run clean        # Nettoyer node_modules
```

## 🆘 Aide & Dépannage

### Erreur: Cannot connect to MongoDB
→ Vérifiez MONGODB_URI dans `backend/.env`

### Erreur: CORS error
→ Vérifiez FRONTEND_URL dans `backend/.env`

### Erreur: Port already in use
```bash
# Tuer le processus
lsof -i :5000 && kill -9 <PID>
```

**Voir [DEPLOYMENT.md](#-dépannage) pour plus**

## 📈 Stats du Projet

- **Pages Frontend:** 6
- **Endpoints API:** 36
- **Modèles DB:** 6
- **Middleware:** 2
- **Documentation:** 50+ pages
- **Fichiers:** 50+
- **Lignes Code:** 5000+

## 🎁 Bonus Inclus

- ✅ Docker + docker-compose
- ✅ Installation scripts
- ✅ Postman collection
- ✅ Production checklist
- ✅ Security guide
- ✅ Deployment guide
- ✅ Complete documentation

## 🌟 Fonctionnalités Clés

✨ **Tracking Public** - Recherche sans authentification
✨ **Numéros Auto** - Tracking & Invoice auto-générés
✨ **Signatures Numériques** - Documents signables
✨ **Timeline Events** - Suivi événementiel
✨ **Role-Based Access** - Admin & User roles
✨ **Multi-Statuts** - Workflows complexes
✨ **Responsive Design** - Mobile-friendly
✨ **Error Handling** - Gestion erreurs robuste

## 📞 Support

1. Consultez la documentation (voir liens ci-dessus)
2. Vérifiez les logs (F12 / terminal)
3. Testez avec Postman
4. Lire FINAL_CHECKLIST.md

## 📄 Licence

MIT - Libre d'utilisation

## 🎉 Prêt à Commencer?

```bash
npm run dev:all
```

Puis accédez à **http://localhost:5173** 🚀

---

**Version:** 1.0.0
**Status:** ✅ Production Ready
**Last Update:** January 2025
