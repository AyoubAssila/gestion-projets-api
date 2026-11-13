// nimportiw Router mel express
import { Router } from 'express';
// nimportiw el middleware mta3 el token
import { verifierToken } from '../middlewares/auth.js';
// nimportiw les controllers
import { creerTache, listerTaches, mesTaches, getTache } from '../controllers/tacheController.js';

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

export default router;