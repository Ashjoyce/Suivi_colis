import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedUser = async () => {
  try {
    // Connexion à MongoDB
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/suivi-colis';
    console.log(`Connexion à: ${mongoURI}`);
    await mongoose.connect(mongoURI);
    console.log('✅ Connecté à MongoDB');

    // Supprimer l'utilisateur s'il existe
    await User.deleteOne({ email: 'test@example.com' });
    console.log('🗑️ Ancien utilisateur supprimé');

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
