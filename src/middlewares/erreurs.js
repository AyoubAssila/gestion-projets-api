// middleware 404 : ken 7atta route ma jawbet
export function routeIntrouvable(req, res) {
  res.status(404).json({ message: `Route introuvable : ${req.method} ${req.originalUrl}` });
}

// middleware erreurs : ya9ra kol erreur tsir w yraja3 réponse JSON (kima Nest ya3mel m3a les exceptions)
// lazem 4 paramètres (err, req, res, next) bech Express y3ref eli howa middleware erreurs
export function gestionErreurs(err, req, res, next) {
  // ken HttpError (fiha status), nraj3ou el code w el message mte3ha
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  // sinon erreur ma nesta9bloulhech : 500
  console.error(err);
  res.status(500).json({ message: 'Erreur interne du serveur' });
}