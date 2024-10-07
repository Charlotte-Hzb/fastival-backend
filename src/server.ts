import express from 'express';
import payload from 'payload';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';  // Importer mongoose pour gérer MongoDB

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

const app = express();

// Autoriser CORS pour toutes les origines
app.use(cors({
  origin: 'http://nationsound.000.pe',  // Tu peux restreindre ceci à 'http://nationsound.000.pe' si besoin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Charger l'URI MongoDB à partir du fichier .env
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MongoDB URI non défini dans le fichier .env');
}

// Connexion à MongoDB via Mongoose
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connexion à MongoDB réussie');
  } catch (err) {
    console.error('Erreur lors de la connexion à MongoDB:', err);
    process.exit(1);  // Quitter en cas d'erreur de connexion
  }
};

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
    process.exit(1);  // Quitter en cas d'erreur de démarrage de Payload
  }
};

// Lancer la connexion à MongoDB puis démarrer Payload
const startServer = async () => {
  await connectToMongoDB();
  await startPayload();
};

// Lancer le serveur
startServer();

// Redirection par défaut vers l'admin de Payload
app.get('/', (_, res) => {
  res.redirect('/admin');
});
