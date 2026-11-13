// nimportiw el modèle Projet
import Projet from '../models/Projet.js';
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