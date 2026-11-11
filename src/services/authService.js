// nimportiw jsonwebtoken bech nasn3ou el token
import jwt from 'jsonwebtoken';
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

// service login : nverifiw el login w el mot de passe, w nraj3ou token
export async function connecter({ login, motDePasse }) {
  // lazem el zouz ykounou mawjoudin
  if (!login || !motDePasse) {
    throw new HttpError(400, 'Login et mot de passe obligatoires');
  }

  // nlawjou 3al utilisateur, w nzidou el mot de passe (5ater select: false fil modèle)
  const user = await User.findOne({ login: login.toLowerCase() }).select('+motDePasse');

  // ken el utilisateur mouch mawjoud wala el mot de passe ghalet -> 401
  if (!user || !(await user.verifierMotDePasse(motDePasse))) {
    throw new HttpError(401, 'Login ou mot de passe incorrect');
  }

  // nasn3ou el token : fih el id w el rôle, msaini b el JWT_SECRET, w yokhles ba3d JWT_EXPIRES_IN
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });

  return token;
}