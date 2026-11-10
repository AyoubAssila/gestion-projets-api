// nimportiw express bech nasn3ou el application
import express from 'express';
// nimportiw el middleware logger eli 3malneh
import logger from './middlewares/logger.js';
// nimportiw les middlewares mta3 el 404 w les erreurs
import { routeIntrouvable, gestionErreurs } from './middlewares/erreurs.js';
// nimportiw les routes mta3 l'authentification
import authRoutes from './routes/authRoutes.js';

// nasn3ou l'application express
const app = express();

// middleware ya9ra el body JSON w y7ottou fi req.body
app.use(express.json());
// nest3mlou el logger 3la les requêtes lkol
app.use(logger);

// route de test : GET / traja3 message bech net2akdou eli el serveur ye5dem
app.get('/', (req, res) => {
  res.json({ message: 'API Gestion de Projets et Tâches' });
});

// kol route tebda b /api/auth temchi l authRoutes
app.use('/api/auth', authRoutes);

// ken 7atta route ma jawbet : 404 (ba3d les routes lkol)
app.use(routeIntrouvable);
// middleware erreurs : dima el le5er
app.use(gestionErreurs);

// nexportiw app bech nest3mlouha fi server.js
export default app;