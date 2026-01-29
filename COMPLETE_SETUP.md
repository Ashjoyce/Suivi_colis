# 📦 Suivi Colis - Application Complète

Application web logistique complète pour la gestion des réservations de transport, suivi des colis, facturation et gestion des documents.

## 🎯 Fonctionnalités

### Utilisateur Client
- ✅ Inscription et connexion sécurisée
- ✅ Gestion du profil personnel
- ✅ Création de réservations de transport
- ✅ Suivi en temps réel des colis (via numéro de suivi public)
- ✅ Gestion des factures et paiements
- ✅ Upload et signature numérique de documents
- ✅ Système de messagerie avec support client
- ✅ Historique complet des commandes

### Admin (À venir)
- Tableau de bord analytics
- Gestion des réservations
- Gestion des conducteurs et véhicules
- Gestion des documents
- Support client avancé

## 🏗️ Architecture

```
suivi-colis/
├── src/                    # Frontend React + TypeScript
│   ├── components/        # Composants réutilisables
│   ├── pages/            # Pages de l'application
│   ├── hooks/            # Hooks personnalisés (useAuth)
│   ├── services/         # API client (axios)
│   ├── assets/           # Images, icons
│   ├── App.tsx          # Composant principal
│   └── main.tsx         # Point d'entrée
├── backend/              # Backend Node.js + Express
│   ├── models/          # Schémas Mongoose (User, Reservation, etc.)
│   ├── routes/          # Routes API (auth, reservations, etc.)
│   ├── middleware/      # Middleware JWT authentication
│   ├── utils/           # Configuration, helpers, errors
│   ├── server.js       # Serveur Express principal
│   ├── package.json    # Dépendances backend
│   └── .env           # Variables d'environnement backend
├── .env                # Variables frontend
├── package.json       # Dépendances frontend + scripts
└── README.md         # Cette documentation

```

## 🚀 Installation & Démarrage

### Prérequis
- **Node.js** v18 ou supérieur
- **npm** ou **yarn**
- **MongoDB** (local ou MongoDB Atlas)

### Installation rapide

#### Option 1: Script d'installation automatique

**Windows:**
```bash
install.bat
```

**Linux/Mac:**
```bash
chmod +x install.sh
./install.sh
```

#### Option 2: Installation manuelle

```bash
# 1. Installer les dépendances frontend
npm install

# 2. Installer les dépendances backend
cd backend
npm install
cd ..

# 3. Configurer les variables d'environnement
# Copier .env.example vers .env dans backend/
# Copier les variables frontend dans .env racine
```

### Configuration

#### Backend (.env dans /backend)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/suivi-colis
# Ou utiliser MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/suivi-colis

JWT_SECRET=votre_secret_jwt_super_securise
JWT_EXPIRE=30d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env à la racine)
```env
VITE_API_URL=http://localhost:5000/api
```

### Démarrage du développement

**Terminal 1 - Frontend:**
```bash
npm run dev
# Application accessible à http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
# API accessible à http://localhost:5000/api
```

## 📱 Interface Utilisateur

### Pages Principales

1. **Accueil** - Présentation services
2. **À propos** - Informations entreprise
3. **Services** - Détail des services
4. **Suivi** - Recherche publique (sans authentification)
5. **Réservation** - Formulaire de réservation (authentifié)
6. **Espace Client** - Dashboard utilisateur (authentifié)
   - Mes réservations
   - Mes factures
   - Mes documents
   - Mes messages

## 🔐 Authentification

### Flux d'authentification
1. Utilisateur s'inscrit/connexion
2. Serveur génère JWT token valide 30 jours
3. Token stocké en localStorage
4. Token envoyé dans header Authorization à chaque requête
5. Middleware vérifie token et récupère l'utilisateur

### Structure JWT
```json
{
  "id": "user_mongodb_id",
  "iat": 1234567890,
  "exp": 1234654290
}
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Headers requis (routes protégées)
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

### Endpoints Principales

#### Authentification
- `POST /auth/register` - Créer compte
- `POST /auth/login` - Connexion
- `GET /auth/me` - Profil (protégé)
- `PUT /auth/profile` - Mettre à jour profil (protégé)
- `PUT /auth/change-password` - Changer mot de passe (protégé)

#### Réservations
- `POST /reservations` - Créer (protégé)
- `GET /reservations` - Liste (protégé)
- `GET /reservations/:id` - Détail (protégé)
- `PUT /reservations/:id` - Modifier (protégé)
- `PATCH /reservations/:id/cancel` - Annuler (protégé)

#### Suivi
- `GET /tracking/search/:trackingNumber` - Recherche publique
- `GET /tracking` - Liste (protégé)
- `GET /tracking/:id` - Détail (protégé)
- `PUT /tracking/:id` - Mettre à jour (protégé)
- `PATCH /tracking/:id/deliver` - Livrer (protégé)

#### Factures
- `GET /invoices` - Liste (protégé)
- `GET /invoices/:id` - Détail (protégé)
- `POST /invoices/reservation/:id` - Créer (protégé)
- `PATCH /invoices/:id/status` - Mettre à jour (protégé)
- `PATCH /invoices/:id/pay` - Payer (protégé)

#### Documents
- `GET /documents` - Liste (protégé)
- `GET /documents/:id` - Détail (protégé)
- `POST /documents` - Upload (protégé)
- `PATCH /documents/:id/sign` - Signer (protégé)
- `DELETE /documents/:id` - Supprimer (protégé)

#### Messages
- `GET /messages` - Liste (protégé)
- `GET /messages/:id` - Détail (protégé)
- `POST /messages` - Envoyer (protégé)
- `PATCH /messages/:id/read` - Lire (protégé)
- `PATCH /messages/:id/status` - Mettre à jour statut (protégé)
- `DELETE /messages/:id` - Supprimer (protégé)

## 🗄️ Modèles de Données

### User
```json
{
  "_id": "MongoDB ID",
  "firstName": "string",
  "lastName": "string",
  "email": "string (unique)",
  "password": "string (hashé)",
  "phone": "string",
  "address": "string",
  "company": "string",
  "role": "user|admin",
  "avatar": "string (URL)",
  "isVerified": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Reservation
```json
{
  "_id": "MongoDB ID",
  "trackingNumber": "string (unique)",
  "userId": "MongoDB ID",
  "merchandise": "object",
  "pickupLocation": "object",
  "deliveryLocation": "object",
  "truck": "string",
  "pickupDate": "date",
  "deliveryDate": "date",
  "estimatedCost": "number",
  "status": "En attente|Confirmée|En cours|Livrée|Annulée",
  "paymentStatus": "Impayée|Payée|Remboursée",
  "createdAt": "timestamp"
}
```

### Tracking
```json
{
  "_id": "MongoDB ID",
  "trackingNumber": "string",
  "reservationId": "MongoDB ID",
  "currentLocation": "object (lat, lng)",
  "status": "string",
  "driver": "object",
  "timeline": "array[events]",
  "estimatedDelivery": "date",
  "actualDelivery": "date",
  "signature": "string (URL)",
  "proof": "array[URLs]"
}
```

### Invoice
```json
{
  "_id": "MongoDB ID",
  "invoiceNumber": "string (unique)",
  "userId": "MongoDB ID",
  "reservationId": "MongoDB ID",
  "items": "array",
  "subtotal": "number",
  "tax": "number",
  "total": "number",
  "paymentStatus": "Draft|Sent|Viewed|Paid|Overdue|Cancelled",
  "paymentDate": "date",
  "createdAt": "timestamp"
}
```

### Document
```json
{
  "_id": "MongoDB ID",
  "userId": "MongoDB ID",
  "documentType": "Contract|Insurance|Proof|Other",
  "fileUrl": "string",
  "fileName": "string",
  "fileSize": "number",
  "mimeType": "string",
  "isSignatureRequired": "boolean",
  "isSigned": "boolean",
  "signatureUrl": "string",
  "expiryDate": "date",
  "createdAt": "timestamp"
}
```

### Message
```json
{
  "_id": "MongoDB ID",
  "userId": "MongoDB ID",
  "subject": "string",
  "message": "string",
  "sender": "user|support",
  "isRead": "boolean",
  "attachments": "array[URLs]",
  "priority": "Low|Normal|High|Urgent",
  "status": "Open|In Progress|Resolved|Closed",
  "createdAt": "timestamp"
}
```

## 🧪 Tests avec Postman

### Importer la collection
1. Ouvrir Postman
2. Créer une nouvelle collection "Suivi Colis"
3. Ajouter les requêtes API

### Flux de test
1. **POST /auth/register** - Créer un compte
2. **POST /auth/login** - Se connecter et récupérer le token
3. Ajouter le token au Bearer Token dans Postman
4. **GET /auth/me** - Vérifier l'authentification
5. **POST /reservations** - Créer une réservation
6. **GET /reservations** - Lister les réservations
7. etc...

## 📊 Stack Technologique

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **React Router v6** - Routing
- **Axios** - HTTP client
- **CSS3** - Styling (animations, gradients)
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM MongoDB
- **JWT** - Authentification
- **bcryptjs** - Hash passwords
- **Multer** - Upload fichiers
- **Nodemailer** - Emails

## 🐛 Dépannage

### Erreur: "Cannot connect to MongoDB"
- Vérifiez que MongoDB est en cours d'exécution
- Vérifiez l'URI dans `.env`
- Vérifiez les identifiants MongoDB Atlas
- Vérifiez que votre IP est autorisée

### Erreur: "JWT token is invalid"
- Le token a expiré (expire après 30 jours)
- Reconnectez-vous pour obtenir un nouveau token
- Vérifiez JWT_SECRET dans .env

### Erreur: "CORS error"
- Vérifiez FRONTEND_URL dans backend/.env
- Assurez-vous que le frontend est sur http://localhost:5173
- Redémarrez les serveurs après changement

### Erreur: "Port 5000 is already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>
```

## 📈 Améliorations Futures

- [ ] Paiement en ligne (Stripe/PayPal)
- [ ] Notifications email en temps réel
- [ ] Suivi GPS en live map
- [ ] Système de rating/review
- [ ] Dashboard admin complet
- [ ] Export factures PDF
- [ ] Signature numérique avancée
- [ ] Multi-langue (i18n)
- [ ] Mobile app (React Native)
- [ ] WebSocket pour notifications live

## 📞 Support

Pour toute question ou problème, consultez la documentation complète dans `/backend/README.md`

## 📄 Licence

MIT - Libre d'utilisation

## 👥 Auteur

Créé avec ❤️ pour l'application Suivi Colis

---

**Dernière mise à jour:** Janvier 2025
