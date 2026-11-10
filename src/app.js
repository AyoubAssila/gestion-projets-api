// nimportiw express bech nasn3ou el application
import express from 'express';
// nimportiw el middleware logger eli 3malneh
import logger from './middlewares/logger.js';

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

// ken 7atta route ma jawbet, traja3 404 (lazem tkoun hiya el le5ra)
app.use((req, res) => {
  res.status(404).json({ message: `Route introuvable : ${req.method} ${req.originalUrl}` });
});

// nexportiw app bech nest3mlouha fi server.js
export default app;