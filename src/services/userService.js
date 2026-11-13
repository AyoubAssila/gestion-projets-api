// nimportiw el modèle User
import User from '../models/User.js';

// service : nraj3ou les utilisateurs lkol mratbin 7asb el nom (A -> Z)
export async function listerUtilisateurs() {
  return await User.find().sort({ nom: 1 });
}