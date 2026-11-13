// nimportiw les modèles
import Tache from '../models/Tache.js';
import Projet from '../models/Projet.js';
// nimportiw HttpError bech nlanciw erreurs b code HTTP
import HttpError from '../utils/HttpError.js';
// nimportiw les fonctions mta3 el recherche w el tri
import { regexRecherche, construireTri } from '../utils/recherche.js';

// fonction mta3na (mouch exportée) : nlawjou 3al tâche, sinon 404
async function trouver(id) {
  const tache = await Tache.findById(id);
  if (!tache) throw new HttpError(404, 'Tâche introuvable');
  return tache;
}

// fonction mta3na : nverifiw ken el utilisateur 3andou el 7a9 fil tâche
// - el manager : dima 3andou el 7a9
// - el assigné : ken assigneAutorise = true
// - el propriétaire mta3 el projet : dima 3andou el 7a9
async function verifierAcces(tache, user, assigneAutorise) {
  if (user.role === 'manager') return;
  if (assigneAutorise && tache.assigne?.equals(user._id)) return;
  const projet = await Projet.findById(tache.projet);
  if (projet?.proprietaire.equals(user._id)) return;
  throw new HttpError(403, "Vous n'avez pas accès à cette tâche");
}

// service : nasn3ou tâche jdida (ay utilisateur connecté ynajjem)
export async function creer({ titre, description, statut, deadline, projet }) {
  // nverifiw eli el projet mawjoud 9bal ma nasn3ou el tâche
  const projetExiste = await Projet.findById(projet);
  if (!projetExiste) throw new HttpError(404, 'Projet introuvable');

  // nasn3ou el tâche (bla "assigne" : el manager bark yaffecti)
  return await Tache.create({ titre, description, statut, deadline, projet });
}

// service : liste des tâches m3a filtres, recherche w tri
export async function lister(user, query) {
  const filtre = {};

  // ken mouch manager : ychouf ken les tâches mta3 les projets mte3ou + les tâches eli assignées lih
  if (user.role !== 'manager') {
    // nlemmou les id mta3 les projets eli howa propriétaire mte3hom
    const mesProjets = await Projet.find({ proprietaire: user._id }).distinct('_id');
    filtre.$or = [{ projet: { $in: mesProjets } }, { assigne: user._id }];
  }

  // les filtres (mathalan ?projet=... &statut=doing &assigne=...)
  if (query.projet) filtre.projet = query.projet;
  if (query.assigne) filtre.assigne = query.assigne;
  if (query.statut) filtre.statut = query.statut;

  // recherche fil titre wala fil description (mathalan ?search=maquette)
  // nest3mlou $and 5ater $or deja mest3mel fou9 lel user
  if (query.search) {
    const regex = regexRecherche(query.search);
    filtre.$and = [{ $or: [{ titre: regex }, { description: regex }] }];
  }

  // el tri (mathalan ?tri=deadline&ordre=asc)
  const tri = construireTri(query, ['titre', 'statut', 'deadline', 'dateCreation']);

  return await Tache.find(filtre)
    .sort(tri)
    .populate('projet', 'nom statut')
    .populate('assigne', 'nom login');
}

// service : "mes tâches" = les tâches eli assignées lel utilisateur connecté, mratbin 7asb el deadline
export async function mesTaches(user) {
  return await Tache.find({ assigne: user._id })
    .sort({ deadline: 1 })
    .populate('projet', 'nom statut');
}

// service : tâche wa7da (m3a vérification d'accès)
export async function trouverParId(id, user) {
  const tache = await trouver(id);
  await verifierAcces(tache, user, true);
  return await tache.populate([
    { path: 'projet', select: 'nom statut' },
    { path: 'assigne', select: 'nom login' },
  ]);
}