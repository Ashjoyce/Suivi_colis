@echo off
echo 🚀 Suivi Colis - Script d'installation complet
echo ==============================================
echo.

echo 📦 Installation des dépendances frontend...
call npm install

if errorlevel 1 (
  echo ❌ Erreur lors de l'installation des dépendances frontend
  exit /b 1
)

echo.
echo 📦 Installation des dépendances backend...
cd backend
call npm install

if errorlevel 1 (
  echo ❌ Erreur lors de l'installation des dépendances backend
  exit /b 1
)

cd ..

echo.
echo ✅ Installation réussie!
echo.
echo 📝 Prochaines étapes:
echo 1. Configurez votre base de données MongoDB (local ou Atlas)
echo 2. Modifiez le fichier .env dans le dossier backend
echo 3. Modifiez le fichier .env dans le dossier racine (frontend)
echo.
echo 🚀 Pour démarrer en développement:
echo   - Terminal 1: npm run dev (frontend)
echo   - Terminal 2: cd backend ^&^& npm run dev (backend)
echo.
echo 🌐 Accès à l'application:
echo   - Frontend: http://localhost:5173
echo   - Backend: http://localhost:5000
echo   - API: http://localhost:5000/api
echo.
pause
