// nimportiw el modèle User
import User from '../models/User.js';
// nimportiw HttpError bech nlanciw erreurs b code HTTP
import HttpError from '../utils/HttpError.js';

// service inscription : fih el logique lkol, bla req w bla res (kima service fi Nest)
export async function inscrire({ nom, login, motDePasse, role }) {
  // nchoufou ken el login deja mawjoud
  const existe = await User.findOne({ login: login?.toLowerCase() });
  if (existe) {
    // nlanciw erreur 409 (kima ConflictException fi Nest)
    throw new HttpError(409, `Le login ${login} est déjà utilisé`);
  }

  // nasn3ou el utilisateur (el mot de passe yetcrypta wa7dou b el hook pre('save'))
  const user = await User.create({ nom, login, motDePasse, role });

  // nraj3ou el utilisateur bla mot de passe
  return { id: user._id, nom: user.nom, login: user.login, role: user.role };
}