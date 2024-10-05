import express from 'express';
import payload from 'payload';
import cors from 'cors';  // Importer cors pour gérer les CORS

require('dotenv').config();
const app = express();

// Configurer CORS pour autoriser les requêtes provenant de http://nationsound.000.pe
app.use(cors({
  origin: 'http://nationsound.000.pe',  // Autoriser seulement ce domaine
}));

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here (si tu as besoin de routes personnalisées)

  // Démarrer le serveur sur le port 3000
  app.listen(3000, () => {
    console.log('Serveur Payload démarré sur http://localhost:3000');
  });
};

start();
