# 🚀 Guide de Déploiement Production

## 1️⃣ Préparation du Code

```bash
# Optimiser pour production
npm run build

# Vérifier les erreurs
npm run lint
```

## 2️⃣ Configuration MongoDB (Production)

### Option A: MongoDB Atlas (recommandé)

1. Créez un compte sur https://www.mongodb.com/cloud/atlas
2. Créez un cluster (M0 gratuit)
3. Créez un utilisateur avec des credentials forts
4. Récupérez la connection string
5. Ajoutez votre IP à whitelist
6. Mettez dans `backend/.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/suivi-colis?retryWrites=true&w=majority
```

### Option B: Self-hosted MongoDB

```bash
# Installation sur serveur
apt-get install mongodb

# Sécurisation
systemctl enable mongodb
systemctl start mongodb
```

## 3️⃣ Variables d'Environnement Production

### backend/.env
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/suivi-colis
JWT_SECRET=CHANGE_ME_WITH_A_STRONG_SECRET_32_CHARACTERS_MINIMUM
JWT_EXPIRE=30d
NODE_ENV=production
FRONTEND_URL=https://votre-domaine.com

# Email (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-app-password
FROM_EMAIL=noreply@votre-domaine.com
```

### Générer une clé JWT sécurisée
```bash
# Linux/Mac
openssl rand -hex 32

# Windows PowerShell
[System.Convert]::ToHexString((1..32 | ForEach-Object { [byte](Get-Random -Minimum 0 -Maximum 256) }))
```

## 4️⃣ Déploiement avec Docker

### Avec Docker
```bash
# Construire l'image
docker build -t suivi-colis:latest .

# Lancer avec docker-compose
docker-compose up -d
```

### Sans Docker

```bash
# Installer dépendances
npm install
cd backend && npm install

# Build frontend
npm run build

# Démarrer backend
cd backend
NODE_ENV=production npm start
```

## 5️⃣ Déploiement Cloud

### Option A: Heroku

```bash
# Installation
npm install -g heroku-cli
heroku login

# Création app
heroku create suivi-colis

# Config variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=...
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Option B: Railway

1. Créez un compte sur https://railway.app
2. Connectez votre repo GitHub
3. Déployez directement depuis GitHub
4. Configurez les variables d'environnement dans le dashboard

### Option C: Render

1. Créez un compte sur https://render.com
2. Créez un nouveau service Web
3. Connectez votre GitHub
4. Configurez les variables d'environnement
5. Déployez

### Option D: Vercel (Frontend) + Railway/Render (Backend)

**Frontend:**
```bash
# Vercel
npm i -g vercel
vercel

# Ajoutez VITE_API_URL=https://votre-backend-domain.com/api
```

**Backend:**
Déployez sur Railway/Render avec le guide ci-dessus

## 6️⃣ Nginx Reverse Proxy (optionnel)

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    # Redirection HTTP → HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name votre-domaine.com;

    ssl_certificate /etc/ssl/certs/your-cert.crt;
    ssl_certificate_key /etc/ssl/private/your-key.key;

    # Frontend
    location / {
        root /var/www/suivi-colis/dist;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 7️⃣ SSL/HTTPS

### Let's Encrypt (gratuit)
```bash
# Installer Certbot
apt-get install certbot python3-certbot-nginx

# Générer certificat
certbot certonly --standalone -d votre-domaine.com

# Auto-renouvellement
certbot renew --dry-run
```

## 8️⃣ Monitoring & Logs

### PM2 (gestion processus)
```bash
npm install -g pm2

# Démarrer avec PM2
pm2 start backend/server.js --name "suivi-colis-api"
pm2 save
pm2 startup

# Logs
pm2 logs suivi-colis-api
```

### CloudWatch / ELK Stack
```bash
# Installation ELK Stack pour logs
docker run -d --name elasticsearch docker.elastic.co/elasticsearch/elasticsearch:8.0.0
docker run -d --name kibana docker.elastic.co/kibana/kibana:8.0.0
```

## 9️⃣ Sauvegarde & Restauration

### MongoDB Backup
```bash
# Backup
mongodump --uri "mongodb+srv://..." --out ./backup

# Restore
mongorestore --uri "mongodb+srv://..." ./backup
```

### Automatisation (Cron)
```bash
# Ajouter au crontab
0 2 * * * /usr/local/bin/mongodump --uri "mongodb+srv://..." --out /backups/$(date +\%Y\%m\%d)
```

## 🔟 Checklist Pre-Deploy

- [ ] Variables d'environnement sécurisées
- [ ] JWT_SECRET fort (32+ caractères)
- [ ] MONGODB_URI valide et testée
- [ ] HTTPS/SSL configuré
- [ ] CORS configuré pour votre domaine
- [ ] Logs activés
- [ ] Backups automatiques activés
- [ ] Tests complets réalisés
- [ ] Performance testée (ab, wrk)
- [ ] Monitoring en place

## ⚠️ Sécurité

✅ HTTPS obligatoire
✅ JWT secret fort
✅ Rate limiting
✅ CORS restrictif
✅ Input validation
✅ Password hashing (bcrypt)
✅ SQL injection prevention
✅ XSS prevention
✅ CSRF tokens
✅ Logs sécurisés

## 📞 Support Production

### Erreurs courantes

❌ **503 Service Unavailable**
→ Vérifiez MongoDB connection

❌ **CORS error**
→ Vérifiez FRONTEND_URL

❌ **JWT token expired**
→ User doit se reconnecter

❌ **Out of memory**
→ Augmentez Node memory: `NODE_OPTIONS="--max-old-space-size=4096"`

---

## Ressources

- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Heroku: https://www.heroku.com
- Railway: https://railway.app
- Render: https://render.com
- Let's Encrypt: https://letsencrypt.org

🚀 **Bon déploiement!**
