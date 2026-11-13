// nimportiw les fonctions lkol mta3 el service
import * as tacheService from '../services/tacheService.js';

// controller : création d'une tâche
export async function creerTache(req, res) {
  const tache = await tacheService.creer(req.body);
  res.status(201).json({ message: 'Tâche créée', tache });
}

// controller : liste des tâches (filtres fil req.query)
export async function listerTaches(req, res) {
  const taches = await tacheService.lister(req.user, req.query);
  res.json({ total: taches.length, taches });
}

// controller : les tâches assignées lel utilisateur connecté
export async function mesTaches(req, res) {
  const taches = await tacheService.mesTaches(req.user);
  res.json({ total: taches.length, taches });
}

// controller : une seule tâche
export async function getTache(req, res) {
  const tache = await tacheService.trouverParId(req.params.id, req.user);
  res.json(tache);
}

// controller : modifier une tâche
export async function modifierTache(req, res) {
  const tache = await tacheService.modifier(req.params.id, req.body, req.user);
  res.json({ message: 'Tâche modifiée', tache });
}

// controller : affecter une tâche l utilisateur (body : { "userId": "..." })
export async function affecterTache(req, res) {
  const tache = await tacheService.affecter(req.params.id, req.body.userId);
  res.json({ message: 'Tâche affectée', tache });
}

// controller : supprimer une tâche
export async function supprimerTache(req, res) {
  await tacheService.supprimer(req.params.id, req.user);
  res.json({ message: 'Tâche supprimée' });
}