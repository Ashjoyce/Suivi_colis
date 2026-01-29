# 🚚 MOON Logistics - App de Suivi de Colis

## LA RÉVOLUTION DU TRANSPORT ROUTIER

Une plateforme complète de logistique et de suivi de colis développée avec React, TypeScript et Vite.

### 🎯 Features Principales

✅ **Accueil** - Présentation avec CTA  
✅ **À Propos** - Vision, mission, équipe et statistiques  
✅ **Services** - Tous les services logistiques détaillés  
✅ **Réservation** - Formulaire multi-étapes intelligent  
✅ **Suivi en Temps Réel** - Tracking GPS et historique  
✅ **Espace Client** - Gestion des commandes, documents, factures et messages  

### 🚀 Technologies

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: CSS3 modulaire

### 📦 Installation

```bash
npm install
```

### ▶️ Démarrage

```bash
npm run dev
```

L'app sera disponible sur `http://localhost:5173/`

### 🔨 Build Production

```bash
npm run build
```

### 📄 Pages Disponibles

| Route | Description |
|-------|-------------|
| `/` | Accueil avec slogan "LA RÉVOLUTION DU TRANSPORT ROUTIER" |
| `/about` | À propos de MOON, vision, mission, équipe |
| `/services` | Tous les services (transport, réservation, etc.) |
| `/reservation` | Formulaire de réservation en 5 étapes |
| `/tracking` | Suivi en temps réel (test: MOON001, MOON002, MOON003) |
| `/client-space` | Espace client (connexion: email@example.com) |

### 🎨 Design System

- **Couleur Primaire**: #FF6B35 (Orange)
- **Couleur Secondaire**: #004E89 (Bleu Marine)
- **Accent**: #1AC8ED (Cyan)
- **Police**: Segoe UI / Tahoma

### 📱 Responsive Design

L'app est entièrement responsive et fonctionne sur:
- Desktop
- Tablette
- Mobile

### 🔒 Fonctionnalités Sécurité

- Signature digitale électronique
- Contrats envoyés au PDG par email
- Suivi GPS en temps réel
- Données de chauffeur et camion disponibles

### 📊 Données Mock

Pour tester le tracking:
- **MOON001**: En livraison (Paris → Lyon)
- **MOON002**: Livré (Bordeaux → Toulouse)
- **MOON003**: En préparation (Lille → Strasbourg)

Pour l'espace client:
- Email: email@example.com
- Mot de passe: password123

### 📝 Structure des Fichiers

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── styles .css
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Reservation.tsx
│   ├── Tracking.tsx
│   ├── ClientSpace.tsx
│   └── styles .css
├── App.tsx
└── index.css
```

### 🛠️ Linting

```bash
npm run lint
```

### 🌟 Highlights du Projet

- Navigation fluide avec React Router
- Formulaire de réservation avec validation
- Suivi intelligent avec données dynamiques
- Système d'authentification client
- Design moderne et professionnel
- Code TypeScript fortement typé

---

**Développé pour MOON Logistics** - Transforming Logistics for the Future 🚀
