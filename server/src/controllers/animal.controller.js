const mongoose = require('mongoose');
const Click = require('../models/click.model'); // Assurez-vous d'avoir un modèle Click

// Enregistrer un clic sur un animal
exports.recordClick = async (req, res) => {
  try {
    const { animalId } = req.params;
    const newClick = new Click({ animalId, clickedAt: new Date() });
    await newClick.save();
    res.status(200).json({ message: 'Click enregistré avec succès' });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'enregistrement du clic" });
  }
};

// Supprimer les enregistrements liés à un animal
exports.deleteAnimalRecords = async (req, res) => {
  try {
    const { animalId } = req.params;
    await Click.deleteMany({ animalId });
    res.status(200).json({ message: 'Enregistrements supprimés avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression des enregistrements' });
  }
};

// Obtenir les statistiques de clics par animal
exports.getClickStatistics = async (req, res) => {
  try {
    const statistics = await Click.aggregate([
      {
        $group: {
          _id: '$animalId',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
};
