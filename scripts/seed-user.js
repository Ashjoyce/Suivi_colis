
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Résoudre __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '..', 'backend', '.env') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Importer le modèle User depuis le backend
const userPath = path.join(__dirname, '..', 'backend', 'models', 'User.js');
const { default: User } = await import(userPath);

dotenv.config();

const seedUser = async () => {
  try {
    // Connexion à MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/suivi-colis';
    await mongoose.connect(mongoURI);
    console.log('✅ Connecté à MongoDB');

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email: 'test@example.com' });
    if (userExists) {
      console.log('⚠️ L\'utilisateur test@example.com existe déjà');
      console.log(`
📋 Identifiants:
  Email: test@example.com
  Mot de passe: password123
      `);
      await mongoose.connection.close();
      return;
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Créer l'utilisateur
    const user = new User({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: hashedPassword,
      phone: '+33612345678',
      address: {
        street: '123 Rue de la Paix',
        city: 'Paris',
        postalCode: '75001',
        country: 'France'
      },
      company: 'Mon Entreprise',
      isVerified: true
    });

    await user.save();
    console.log('✅ Utilisateur de test créé avec succès!');
    console.log(`
📋 Identifiants de connexion:
  Email: test@example.com
  Mot de passe: password123
    `);

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

seedUser();
