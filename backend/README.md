# Backend Suivi Colis API

API REST complète pour l'application de suivi de colis logistiques.

## 🚀 Démarrage rapide

### Prérequis
- Node.js v18+
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

### Installation

```bash
# Installez les dépendances
npm install

# Créez un fichier .env à partir du template
cp .env.example .env

# Configurez vos variables d'environnement
# - MONGODB_URI: URI de votre base de données MongoDB
# - JWT_SECRET: Clé secrète pour JWT
# - FRONTEND_URL: URL du frontend React
```

### Démarrage du serveur

```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

Le serveur démarre sur `http://localhost:5000`

## 📚 API Endpoints

### Authentification
- `POST /api/auth/register` - Création compte
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur (protégé)
- `PUT /api/auth/profile` - Mise à jour profil (protégé)
- `PUT /api/auth/change-password` - Changement mot de passe (protégé)

### Réservations
- `GET /api/reservations` - Liste réservations (protégé)
- `GET /api/reservations/:id` - Détail réservation (protégé)
- `POST /api/reservations` - Créer réservation (protégé)
- `PUT /api/reservations/:id` - Modifier réservation (protégé)
- `PATCH /api/reservations/:id/cancel` - Annuler réservation (protégé)

### Suivi
- `GET /api/tracking/search/:trackingNumber` - Recherche publique par numéro
- `GET /api/tracking` - Liste suivi (protégé)
- `GET /api/tracking/:id` - Détail suivi (protégé)
- `PUT /api/tracking/:id` - Mettre à jour suivi (protégé)
- `PATCH /api/tracking/:id/deliver` - Confirmer livraison (protégé)

### Factures
- `GET /api/invoices` - Liste factures (protégé)
- `GET /api/invoices/:id` - Détail facture (protégé)
- `POST /api/invoices/reservation/:id` - Créer facture (protégé)
- `PATCH /api/invoices/:id/status` - Mettre à jour statut (protégé)
- `PATCH /api/invoices/:id/pay` - Marquer comme payée (protégé)

### Documents
- `GET /api/documents` - Liste documents (protégé)
- `GET /api/documents/:id` - Détail document (protégé)
- `POST /api/documents` - Upload document (protégé)
- `PATCH /api/documents/:id/sign` - Signer document (protégé)
- `DELETE /api/documents/:id` - Supprimer document (protégé)

### Messages
- `GET /api/messages` - Liste messages (protégé)
- `GET /api/messages/:id` - Détail message (protégé)
- `POST /api/messages` - Envoyer message (protégé)
- `PATCH /api/messages/:id/read` - Marquer comme lu (protégé)
- `PATCH /api/messages/:id/status` - Mettre à jour statut (protégé)
- `DELETE /api/messages/:id` - Supprimer message (protégé)

## 🔐 Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification.

### Exemple de requête authentifiée

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Structure du JWT
```json
{
  "id": "userid",
  "iat": 1234567890,
  "exp": 1234654290
}
```

## 📊 Modèles de données

### User
- firstName, lastName
- email, password (hashé)
- phone, address, company
- role (user/admin)
- avatar, isVerified

### Reservation
- trackingNumber (auto-généré)
- userId, merchandise type
- pickup/delivery locations
- truck selection
- dates, pricing
- status, paymentStatus

### Tracking
- trackingNumber
- reservationId
- currentLocation (coordinates)
- driver info
- timeline (events)
- estimated/actual delivery

### Invoice
- invoiceNumber (auto-généré)
- userId, reservation ref
- items, subtotal, tax, total
- paymentStatus
- dates

### Document
- documentType
- fileUrl, fileName, fileSize
- isSignatureRequired, isSigned
- expiryDate

### Message
- subject, message
- sender (user/support)
- isRead, attachments
- priority (Low→Urgent)
- status (Open→Closed)

## 🧪 Tests avec Postman

1. Créer une collection `Suivi Colis`
2. Importer les endpoints de l'API
3. Tester l'authentification d'abord
4. Utiliser le token JWT pour les routes protégées

## 🐛 Dépannage

### Erreur de connexion MongoDB
- Vérifiez que MongoDB est en cours d'exécution
- Vérifiez l'URI dans `.env`
- Assurez-vous que votre IP est autorisée (MongoDB Atlas)

### Erreur JWT invalide
- Vérifiez que le token n'a pas expiré
- Vérifiez que la clé JWT_SECRET correspond
- Vérifiez le format du header Authorization

### CORS error
- Vérifiez que FRONTEND_URL dans `.env` correspond à votre frontend
- Vérifiez les en-têtes CORS dans server.js

## 📦 Dépendances principales

- **express**: Framework Web
- **mongoose**: ODM MongoDB
- **cors**: CORS support
- **bcryptjs**: Hachage des mots de passe
- **jsonwebtoken**: JWT tokens
- **dotenv**: Gestion des variables d'environnement
- **validator**: Validation données
- **multer**: Upload de fichiers
- **nodemailer**: Envoi emails

## 📝 Licence

MIT

## 👤 Auteur

Créé pour l'application Suivi Colis
