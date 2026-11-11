// nimportiw les fonctions lkol mta3 el service
import * as authService from '../services/authService.js';

// controller inscription : ya9ra el requête, y3ayet lel service, w yab3ath el réponse
export async function register(req, res) {
  // n3aytou lel service b les données mta3 el body
  const user = await authService.inscrire(req.body);
  // nab3thou réponse 201 (created)
  res.status(201).json({ message: 'Utilisateur créé', user });
}

// controller login : y3ayet lel service w yraja3 el token
export async function login(req, res) {
  const token = await authService.connecter(req.body);
  res.json({ message: 'Connexion réussie', token });
}