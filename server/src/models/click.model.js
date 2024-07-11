const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  animalId: { type: String, required: true },
  animalName: { type: String, required: true },
  animalSpecie: { type: String, required: true },
  animalBiome: { type: String, required: true },
  clickedAt: { type: Date, default: Date.now },
});

// Utiliser la variable d'environnement pour le nom de la collection
const Click = mongoose.model(process.env.MONGO_COLLECTION, clickSchema);

module.exports = Click;
