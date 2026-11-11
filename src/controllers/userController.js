// controller "mon profil" : yraja3 el utilisateur connecté (eli 7attou verifierToken fi req.user)
export function monProfil(req, res) {
  res.json(req.user);
}