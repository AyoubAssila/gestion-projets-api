// nimportiw mongoose bech nasn3ou el schéma
import mongoose from 'mongoose';

// el schéma mta3 el tâche
const tacheSchema = new mongoose.Schema(
  {
    // titre : obligatoire
    titre: { type: String, required: [true, 'Le titre est obligatoire'], trim: true },

    // description : facultative
    description: { type: String, default: '' },

    // statut : ken todo, doing wala done (kima talbet el énoncé)
    statut: {
      type: String,
      enum: { values: ['todo', 'doing', 'done'], message: 'Le statut doit être : todo, doing ou done' },
      default: 'todo',
    },

    // deadline : date limite (facultative)
    deadline: { type: Date },

    // el projet associé : obligatoire (ref: 'Projet' ya3ni yrabet m3a collection projets)
    projet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Projet',
      required: [true, 'Le projet est obligatoire'],
    },

    // el utilisateur assigné : par défaut 7atta 7ad (null), el manager bark yaffecti
    assigne: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  // mongoose yzid wa7dou el date de création
  { timestamps: { createdAt: 'dateCreation', updatedAt: false } },
);

// nasn3ou el modèle Tache (MongoDB yasna3 collection "taches")
export default mongoose.model('Tache', tacheSchema);