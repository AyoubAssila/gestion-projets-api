// nimportiw Router mel express
import { Router } from 'express';
// nimportiw el middleware mta3 el token
import { verifierToken } from '../middlewares/auth.js';
// nimportiw les controllers
import {
  creerProjet,
  listerProjets,
  getProjet,
  modifierProjet,
  supprimerProjet,
} from '../controllers/projetController.js';

const router = Router();

// les routes lkol mta3 el projets lazemhom token (kima @UseGuards 3al controller lkol fi Nest)
router.use(verifierToken);

// POST /api/projets -> créer un projet
router.post('/', creerProjet);
// GET /api/projets -> liste (m3a ?search= &statut= &tri= &ordre=)
router.get('/', listerProjets);
// GET /api/projets/:id -> un seul projet
router.get('/:id', getProjet);
// PATCH /api/projets/:id -> modifier un projet
router.patch('/:id', modifierProjet);
// DELETE /api/projets/:id -> supprimer un projet
router.delete('/:id', supprimerProjet);

export default router;