// nimportiw mongoose bech nasn3ou el schéma
import mongoose from 'mongoose';

// el schéma : y7added chnouwa yelzem ykoun fi kol utilisateur
const userSchema = new mongoose.Schema(
  {
    // el nom : obligatoire, w trim tna77i les espaces eli fil bdeya w fil le5er
    nom: { type: String, required: [true, 'Le nom est obligatoire'], trim: true },

    // el login : obligatoire, unique (ma ynajjemch zouz ykounou 3andhom nafs el login), w dima en minuscules
    login: {
      type: String,
      required: [true, 'Le login est obligatoire'],
      unique: true,
      trim: true,
      lowercase: true,
    },

    // el mot de passe : obligatoire, 6 caractères au minimum
    // select: false ya3ni ma yetba3thech fil réponses (ma yodhharch)
    motDePasse: {
      type: String,
      required: [true, 'Le mot de passe est obligatoire'],
      minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
      select: false,
    },

    // el rôle : ya user ya manager, w par défaut user
    role: {
      type: String,
      enum: { values: ['user', 'manager'], message: 'Le rôle doit être user ou manager' },
      default: 'user',
    },
  },
  // mongoose yzid wa7dou el date de création (dateCreation) ki nasn3ou utilisateur
  { timestamps: { createdAt: 'dateCreation', updatedAt: false } },
);

// nasn3ou el modèle User w nexportiwh (MongoDB bech yasna3 collection esmha "users")
export default mongoose.model('User', userSchema);