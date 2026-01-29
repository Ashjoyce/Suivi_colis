import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './utils/database.js';
import { errorMiddleware } from './utils/errorHandler.js';
import { config } from './utils/config.js';

// Import routes
import authRoutes from './routes/auth.js';
import reservationRoutes from './routes/reservations.js';
import trackingRoutes from './routes/tracking.js';
import simulatorRoutes from './routes/simulator.js';
import invoiceRoutes from './routes/invoices.js';
import documentRoutes from './routes/documents.js';
import messageRoutes from './routes/messages.js';

// Config dotenv
dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Serveur en ligne' });
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/tracking', trackingRoutes);
// Mount simulator routes only in development to avoid production exposure
if (process.env.NODE_ENV === 'development') {
  app.use('/api/simulator', simulatorRoutes);
}
app.use('/api/invoices', invoiceRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/messages', messageRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route non trouvée' });
});

// Error handling middleware
app.use(errorMiddleware);

// Démarrer le serveur
const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.PORT, () => {
      console.log(`✅ Serveur démarré sur le port ${config.PORT}`);
      console.log(`📡 Environnement: ${config.NODE_ENV}`);
      console.log(`🔗 Base de données: ${config.MONGODB_URI}`);
      console.log(`🌐 Frontend URL: ${config.FRONTEND_URL}`);
    });
  } catch (error) {
    console.error('Erreur au démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();

export default app;
