// nimportiw el application mel app.js
import app from './app.js';

// el port : na5dhouh mel .env ken mawjoud, sinon 3000
const PORT = process.env.PORT || 3000;

// nlanciw el serveur w nestannew les requêtes 3al port
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});