// nimportiw Router mel express
import { Router } from 'express';
// nimportiw el middleware mta3 el token
import { verifierToken } from '../middlewares/auth.js';
// nimportiw les controllers
import { creerTache } from '../controllers/tacheController.js';

const router = Router();

// les routes lkol mta3 el tâches lazemhom token
router.use(verifierToken);

// POST /api/taches -> créer une tâche
router.post('/', creerTache);

export default router;