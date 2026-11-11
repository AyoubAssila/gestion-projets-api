// nimportiw jsonwebtoken bech nverifiw el token
import jwt from 'jsonwebtoken';
// nimportiw el modèle User bech nlawjou 3al utilisateur
import User from '../models/User.js';

// middleware ychouf ken el utilisateur connecté (kima AuthGuard('jwt') fi Nest)
export async function verifierToken(req, res, next) {
  // na9raw el header Authorization (lazem ykoun "Bearer <token>")
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  // na5dhou el token wa7dou (el partie eli ba3d "Bearer ")
  const token = header.split(' ')[1];

  // nverifiw el token b el JWT_SECRET (ken mbaddel wala expiré -> erreur)
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    // nktbou el sbab el 7a9i9i fil terminal (bech nfahmou el mochkla)
    console.log('Erreur JWT :', err.message);
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }

  // nlawjou 3al utilisateur b el id eli fil token
  const user = await User.findById(payload.id);
  if (!user) {
    return res.status(401).json({ message: "L'utilisateur de ce token n'existe plus" });
  }

  // n7ottou el utilisateur fi req.user bech les controllers yest3mlouh
  req.user = user;
  // n3addiw lel 7aja eli ba3dha (el controller)
  next();
}