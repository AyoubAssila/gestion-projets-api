// nimportiw mongoose bech nasn3ou el schéma
import mongoose from 'mongoose';

// el schéma mta3 el projet
const projetSchema = new mongoose.Schema(
  {
    // nom du projet : obligatoire
    nom: { type: String, required: [true, 'Le nom du projet est obligatoire'], trim: true },

    // description : facultative, par défaut texte fergh
    description: { type: String, default: '' },

    // el propriétaire : id mta3 utilisateur (ref: 'User' ya3ni yrabet m3a el collection users)
    proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // el statut : ya "en cours", ya "terminé", ya "en pause"
    statut: {
      type: String,
      enum: {
        values: ['en cours', 'terminé', 'en pause'],
        message: 'Le statut doit être : en cours, terminé ou en pause',
      },
      default: 'en cours',
    },
  },
  // mongoose yzid wa7dou el date de création
  { timestamps: { createdAt: 'dateCreation', updatedAt: false } },
);

// nasn3ou el modèle Projet (MongoDB yasna3 collection "projets")
export default mongoose.model('Projet', projetSchema);