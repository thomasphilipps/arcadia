const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'Feeding', 'Feedings');
const { isValidId } = require('../utils/validation.utils');

module.exports = (app) => {
  app.post('/api/feedings/', crud.create);
  app.get('/api/feedings', crud.readAll);
  app.get('/api/feedings/:id', crud.readById);
  app.put('/api/feedings/:id', crud.update);
  app.delete('/api/feedings/:id', crud.delete);
};

// Feedings specific routes

//Get all feedings for a specific animal
app.get('/api/feedings/animal/:id', async (req, res) => {
  try {
    const animalId = req.params.id;

    if (!isValidId(animalId)) {
      return res.status(400).json({ error: "Format d'id invalide" });
    }

    const sql = `
     SELECT
        Feedings.*,
        Users.userName as feedingBy
        FROM Feedings
        LEFT JOIN Users ON Feedings.feedingBy = Users.userId WHERE animalKey = ?`;

    const [feedings] = await sequelize.query(sql, {
      replacements: [animalId],
    });

    if (feedings.length === 0) {
      return res.status(404).json({ error: 'Aucune ration trouvée pour cet animal' });
    }

    res.status(200).json(feedings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
