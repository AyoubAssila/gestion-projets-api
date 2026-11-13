// nimportiw Router mel express
import { Router } from 'express';
// nimportiw les middlewares mta3 el token w les rôles
import { verifierToken, autoriser } from '../middlewares/auth.js';
// nimportiw les controllers
import { monProfil, listerUtilisateurs } from '../controllers/userController.js';

const router = Router();

// GET /api/users/me -> ay utilisateur connecté
router.get('/me', verifierToken, monProfil);
// GET /api/users -> lel manager bark : verifierToken 9bal, ba3d autoriser('manager'), ba3d el controller
router.get('/', verifierToken, autoriser('manager'), listerUtilisateurs);

export default router;