// nimportiw Router mel express
import { Router } from 'express';
// nimportiw les middlewares mta3 el token w les rôles
import { verifierToken, autoriser } from '../middlewares/auth.js';
// nimportiw les controllers
import {
  creerTache,
  listerTaches,
  mesTaches,
  getTache,
  modifierTache,
  affecterTache,
  supprimerTache,
} from '../controllers/tacheController.js';

const router = Router();

// les routes lkol mta3 el tâches lazemhom token
router.use(verifierToken);

// POST /api/taches -> créer une tâche
router.post('/', creerTache);
// GET /api/taches -> liste (m3a ?projet= &statut= &assigne= &search= &tri= &ordre=)
router.get('/', listerTaches);
// GET /api/taches/mine -> mes tâches (lazem tkoun 9bal /:id)
router.get('/mine', mesTaches);
// GET /api/taches/:id -> une seule tâche
router.get('/:id', getTache);
// PATCH /api/taches/:id/affecter -> affecter une tâche (el manager bark)
router.patch('/:id/affecter', autoriser('manager'), affecterTache);
// PATCH /api/taches/:id -> modifier une tâche
router.patch('/:id', modifierTache);
// DELETE /api/taches/:id -> supprimer une tâche
router.delete('/:id', supprimerTache);

export default router;