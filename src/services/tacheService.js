// nimportiw les modèles
import Tache from '../models/Tache.js';
import Projet from '../models/Projet.js';
// nimportiw HttpError bech nlanciw erreurs b code HTTP
import HttpError from '../utils/HttpError.js';

// service : nasn3ou tâche jdida (ay utilisateur connecté ynajjem)
export async function creer({ titre, description, statut, deadline, projet }) {
  // nverifiw eli el projet mawjoud 9bal ma nasn3ou el tâche
  const projetExiste = await Projet.findById(projet);
  if (!projetExiste) throw new HttpError(404, 'Projet introuvable');

  // nasn3ou el tâche (bla "assigne" : el manager bark yaffecti)
  return await Tache.create({ titre, description, statut, deadline, projet });
}