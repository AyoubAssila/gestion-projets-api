// nimportiw les fonctions lkol mta3 el service
import * as projetService from '../services/projetService.js';

// controller : création d'un projet
export async function creerProjet(req, res) {
  // n3addiw el body w el utilisateur connecté (req.user) lel service
  const projet = await projetService.creer(req.body, req.user);
  res.status(201).json({ message: 'Projet créé', projet });
}