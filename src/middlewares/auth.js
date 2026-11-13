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

  // na5dhou el token wa7dou : nna77iw "Bearer " w les espaces eli zaydin
  const token = header.slice('Bearer '.length).trim();

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

// middleware ychouf ken el utilisateur 3andou el rôle el s7i7 (kima RolesGuard + @Roles fi Nest)
// ...roles : najmou n3addiw rôle wa7ed wala barcha, mathalan autoriser('manager')
export function autoriser(...roles) {
  // traja3 middleware (fonction fiha req, res, next)
  return (req, res, next) => {
    // ken el rôle mta3 el utilisateur connecté mouch fil liste -> 403
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Accès réservé au rôle : ${roles.join(', ')}` });
    }
    // el rôle s7i7 : n3addiw
    next();
  };
}