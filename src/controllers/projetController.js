// nimportiw les fonctions lkol mta3 el service
import * as projetService from '../services/projetService.js';

// controller : création d'un projet
export async function creerProjet(req, res) {
  // n3addiw el body w el utilisateur connecté (req.user) lel service
  const projet = await projetService.creer(req.body, req.user);
  res.status(201).json({ message: 'Projet créé', projet });
}

// controller : liste des projets (req.query fih les paramètres eli ba3d "?" fil URL)
export async function listerProjets(req, res) {
  const projets = await projetService.lister(req.user, req.query);
  res.json({ total: projets.length, projets });
}