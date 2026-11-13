// nimportiw el modèle Projet
import Projet from '../models/Projet.js';

// service : nasn3ou projet jdid, w el propriétaire howa el utilisateur connecté
export async function creer({ nom, description, statut }, user) {
  return await Projet.create({ nom, description, statut, proprietaire: user._id });
}