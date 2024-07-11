const mongoose = require('mongoose');
const Click = require('../models/click.model');
const { sequelize } = require('../config/database'); // Importer la connexion Sequelize
const { animalReadByIdQuery } = require('../models/sql/animal.queries'); // Importer les requêtes personnalisées

// Enregistrer un clic sur un animal
exports.recordClick = async (req, res) => {
  try {
    const { animalId } = req.params;

    // Exécuter la requête SQL personnalisée pour récupérer les informations de l'animal
    const [results, metadata] = await sequelize.query(animalReadByIdQuery(animalId));
    const animal = results[0];

    if (!animal) {
      return res.status(404).json({ error: 'Animal non trouvé' });
    }

    const newClick = new Click({
      animalId,
      animalName: animal.animalName,
      animalSpecie: animal.animalSpecie,
      animalBiome: animal.animalBiome,
      clickedAt: new Date(),
    });
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
          _id: {
            animalId: '$animalId',
            animalName: '$animalName',
            animalSpecie: '$animalSpecie',
            animalBiome: '$animalBiome',
          },
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
