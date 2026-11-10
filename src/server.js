// na9raw el fichier .env (lazem tkoun el ligne el lowla)
import 'dotenv/config';
// nimportiw el application mel app.js
import app from './app.js';
// nimportiw el fonction mta3 el connexion
import connectDB from './config/db.js';

// el port : na5dhouh mel .env ken mawjoud, sinon 3000
const PORT = process.env.PORT || 3000;

// nconnectiw l MongoDB 9bal ma nlanciw el serveur
await connectDB();

// nlanciw el serveur w nestannew les requêtes 3al port
app.listen(PORT, () => {
  console.log(` Serveur lancé sur http://localhost:${PORT}`);
});