// nimportiw Router mel express
import { Router } from 'express';
// nimportiw el middleware mta3 el token
import { verifierToken } from '../middlewares/auth.js';
// nimportiw el controller
import { monProfil } from '../controllers/userController.js';

const router = Router();

// GET /api/users/me -> lazem token : verifierToken yet3ada 9bal monProfil
router.get('/me', verifierToken, monProfil);

export default router;