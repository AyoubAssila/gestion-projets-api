// nimportiw Router mel express
import { Router } from 'express';
// nimportiw el middleware mta3 el token
import { verifierToken } from '../middlewares/auth.js';
// nimportiw les controllers
import { creerProjet } from '../controllers/projetController.js';

const router = Router();

// les routes lkol mta3 el projets lazemhom token (kima @UseGuards 3al controller lkol fi Nest)
router.use(verifierToken);

// POST /api/projets -> créer un projet
router.post('/', creerProjet);

export default router;