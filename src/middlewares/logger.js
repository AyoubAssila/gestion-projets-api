// middleware logger : ykteb fil terminal kol requête tji lel serveur
// req = el requête eli jet, res = el réponse eli bech nab3thouha, next = bech n3addiw lel 7aja eli ba3dha
export default function logger(req, res, next) {
  // nsajlou el wa9t eli bdat fih el requête
  const debut = Date.now();

  // ki el réponse tetba3ath (finish), nktbou el méthode, el URL, el code w 9addeh 5dhet de temps
  res.on('finish', () => {
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - debut}ms)`);
  });

  // lazem n3aytou next() sinon el requête to93ed bloquée w ma tousselch lel route
  next();
}