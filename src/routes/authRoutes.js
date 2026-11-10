// nimportiw Router mel express bech nasn3ou groupe de routes
import { Router } from 'express';
// nimportiw el controller
import { register } from '../controllers/authController.js';

const router = Router();

// POST /api/auth/register -> inscription (kima @Post('register') fi Nest)
router.post('/register', register);

export default router;