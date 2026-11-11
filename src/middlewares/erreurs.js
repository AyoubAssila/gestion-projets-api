// middleware 404 : ken 7atta route ma jawbet
export function routeIntrouvable(req, res) {
  res.status(404).json({ message: `Route introuvable : ${req.method} ${req.originalUrl}` });
}

// middleware erreurs : ya9ra kol erreur tsir w yraja3 réponse JSON (kima Nest ya3mel m3a les exceptions)
// lazem 4 paramètres (err, req, res, next) bech Express y3ref eli howa middleware erreurs
export function gestionErreurs(err, req, res, next) {
  // el body mouch JSON s7i7 (mathalan na9es accolade) -> 400
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'JSON invalide dans le body' });
  }

  // HttpError eli lancineha a7na fil services (409, 404, 403...)
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  // erreur de validation mta3 mongoose (champ obligatoire na9es, valeur mouch fil enum...) -> 400
  if (err.name === 'ValidationError') {
    // nlemmou les messages lkol fi tableau
    const erreurs = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: 'Données invalides', erreurs });
  }

  // id mouch valide (mathalan "123" fi blaset ObjectId) -> 400
  if (err.name === 'CastError') {
    return res.status(400).json({ message: `Valeur invalide pour ${err.path} : ${err.value}` });
  }

  // valeur unique deja mawjouda fil base (code 11000 mta3 MongoDB) -> 409
  if (err.code === 11000) {
    const champ = Object.keys(err.keyValue ?? {})[0] ?? 'champ';
    return res.status(409).json({ message: `Cette valeur de ${champ} existe déjà` });
  }

  // erreur ma nesta9bloulhech : nktbouha fil terminal w nraj3ou 500
  console.error(err);
  res.status(500).json({ message: 'Erreur interne du serveur' });
}