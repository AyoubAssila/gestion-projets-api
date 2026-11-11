// nimportiw Router mel express bech nasn3ou groupe de routes
import { Router } from 'express';
// nimportiw les controllers
import { register, login } from '../controllers/authController.js';

const router = Router();

// POST /api/auth/register -> inscription (kima @Post('register') fi Nest)
router.post('/register', register);
// POST /api/auth/login -> connexion, traja3 token
router.post('/login', login);

export default router;