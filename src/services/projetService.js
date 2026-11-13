// nimportiw el modèle Projet
import Projet from '../models/Projet.js';
// nimportiw el modèle Tache (bech nfass5ou les tâches ki nfass5ou el projet)
import Tache from '../models/Tache.js';
// nimportiw HttpError bech nlanciw erreurs b code HTTP
import HttpError from '../utils/HttpError.js';
// nimportiw les fonctions mta3 el recherche w el tri
import { regexRecherche, construireTri } from '../utils/recherche.js';

// service : nasn3ou projet jdid, w el propriétaire howa el utilisateur connecté
export async function creer({ nom, description, statut }, user) {
  return await Projet.create({ nom, description, statut, proprietaire: user._id });
}

// service : liste des projets m3a recherche, filtre w tri
export async function lister(user, query) {
  // el filtre eli bech nab3thouh l MongoDB
  const filtre = {};

  // ken mouch manager, ychouf ken les projets mte3ou
  if (user.role !== 'manager') filtre.proprietaire = user._id;

  // filtre 7asb el statut (mathalan ?statut=en pause)
  if (query.statut) filtre.statut = query.statut;

  // recherche fil nom wala fil description (mathalan ?search=web)
  if (query.search) {
    const regex = regexRecherche(query.search);
    filtre.$or = [{ nom: regex }, { description: regex }];
  }

  // el tri (mathalan ?tri=nom&ordre=asc)
  const tri = construireTri(query, ['nom', 'statut', 'dateCreation']);

  // populate : nbadlou id mta3 el propriétaire b el nom w el login mte3ou
  return await Projet.find(filtre).sort(tri).populate('proprietaire', 'nom login');
}

// service : nlawjou 3la projet b el id mte3ou, w nverifiw ken 3andou el 7a9 ychoufou
export async function trouverParId(id, user) {
  const projet = await Projet.findById(id).populate('proprietaire', 'nom login');

  // ken el projet mouch mawjoud -> 404
  if (!projet) throw new HttpError(404, 'Projet introuvable');

  // ken mouch manager w mouch howa el propriétaire -> 403
  if (user.role !== 'manager' && !projet.proprietaire._id.equals(user._id)) {
    throw new HttpError(403, 'Ce projet ne vous appartient pas');
  }

  return projet;
}

// service : modifier projet (nbadlou ken les champs eli tba3thou)
export async function modifier(id, { nom, description, statut }, user) {
  // nlawjou 3al projet w nverifiw el 7a9 (404 / 403)
  const projet = await trouverParId(id, user);

  // nbadlou ken el champ mawjoud fil body
  if (nom !== undefined) projet.nom = nom;
  if (description !== undefined) projet.description = description;
  if (statut !== undefined) projet.statut = statut;

  // save() y3awed y3adi el validation (mathalan el statut lazem ykoun fil enum)
  return await projet.save();
}

// service : supprimer projet m3a les tâches mte3ou lkol
export async function supprimer(id, user) {
  // nlawjou 3al projet w nverifiw el 7a9 (404 / 403)
  const projet = await trouverParId(id, user);
  // nfass5ou les tâches lkol mta3 el projet hedha
  const { deletedCount } = await Tache.deleteMany({ projet: projet._id });
  // nfass5ou el projet
  await projet.deleteOne();
  // nraj3ou 9addech mn tâche tfass5et
  return deletedCount;
}