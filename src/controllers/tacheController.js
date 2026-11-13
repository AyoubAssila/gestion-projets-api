// nimportiw les fonctions lkol mta3 el service
import * as tacheService from '../services/tacheService.js';

// controller : création d'une tâche
export async function creerTache(req, res) {
  const tache = await tacheService.creer(req.body);
  res.status(201).json({ message: 'Tâche créée', tache });
}