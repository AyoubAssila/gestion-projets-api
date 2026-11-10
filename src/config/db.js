// nimportiw mongoose : el bibliothèque eli tkhallina n7kiw m3a MongoDB
import mongoose from 'mongoose';

// fonction tconnecti l base MongoDB
export default async function connectDB() {
  try {
    // nconnectiw b l'adresse eli fil .env (await 5ater el connexion to5ou chwaya wa9t)
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' Connecté à MongoDB :', mongoose.connection.name);
  } catch (err) {
    // ken el connexion ma t3addetech, nktbou el erreur w nwa9fou el serveur
    console.error('Erreur de connexion à MongoDB :', err.message);
    process.exit(1);
  }
}