// nimportiw les fonctions lkol mta3 el service
import * as userService from '../services/userService.js';

// controller "mon profil" : yraja3 el utilisateur connecté (eli 7attou verifierToken fi req.user)
export function monProfil(req, res) {
  res.json(req.user);
}

// controller : liste des utilisateurs (lel manager bark)
export async function listerUtilisateurs(req, res) {
  const users = await userService.listerUtilisateurs();
  res.json({ total: users.length, users });
}