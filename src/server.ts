import express from 'express';
import payload from 'payload';
import dotenv from 'dotenv';
import cors from 'cors';

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

const app = express();

// Configurer CORS pour autoriser les requêtes provenant de ton frontend
app.use(cors({
  origin: 'http://nationsound.000.pe',  // Ajoute ton domaine frontend ici
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Charger l'URI MongoDB à partir du fichier .env
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MongoDB URI non défini dans le fichier .env');
}

// Fonction pour démarrer Payload après la connexion réussie à MongoDB
const startPayload = async () => {
  try {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      express: app,
      onInit: () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });

    // Démarrer le serveur Express sur le port 3000
    app.listen(3000, () => {
      console.log('Serveur démarré sur http://localhost:3000');
    });
  } catch (err) {
    console.error('Erreur lors du démarrage de Payload:', err);
    process.exit(1);  // Quitter le processus en cas d'erreur lors du démarrage de Payload
  }
};

// Lancer le processus de démarrage du serveur
startPayload();

// Redirection par défaut vers l'admin de Payload
app.get('/', (_, res) => {
  res.redirect('/admin');
});
