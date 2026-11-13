// fonction tasna3 recherche "contient" bla majuscules/minuscules (mathalan "web" yal9a "Site Web")
export function regexRecherche(texte) {
  // nna7iw el ma3na mta3 les caractères spéciaux (. * + ? ...) bech ma ysirch erreur
  const echappe = texte.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // 'i' = insensible à la casse (ma ychoufch el majuscules)
  return new RegExp(echappe, 'i');
}

// fonction tasna3 el tri : 7asb champ (tri) w ordre (asc wala desc)
export function construireTri(query, champsAutorises) {
  // ken el champ mouch msmou7 bih, ntriw b dateCreation par défaut
  const champ = champsAutorises.includes(query.tri) ? query.tri : 'dateCreation';
  // asc = 1 (croissant), sinon -1 (décroissant : el jdid el awel)
  const ordre = query.ordre === 'asc' ? 1 : -1;
  return { [champ]: ordre };
}