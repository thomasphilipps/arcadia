const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  animalId: { type: String, required: true },
  clickedAt: { type: Date, default: Date.now },
});

const Click = mongoose.model('Click', clickSchema);

module.exports = Click;
