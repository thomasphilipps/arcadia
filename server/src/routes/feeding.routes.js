const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'Feeding', 'Feedings');
const { isValidId } = require('../utils/validation.utils');

module.exports = (app) => {
  app.post('/api/feedings/', authenticate(['ROLE_EMPLOYEE']), crud.create);
  app.get('/api/feedings', crud.readAll);
  app.get('/api/feedings/:id', crud.readById);
  app.put('/api/feedings/:id', authenticate(['ROLE_EMPLOYEE']), crud.update);
  app.delete('/api/feedings/:id', authenticate(['ROLE_EMPLOYEE']), crud.delete);

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
        Users.userName as feedingBy,
        Animals.animalName as animalName
      FROM Feedings
      LEFT JOIN Users ON Feedings.feedingBy = Users.userId
      LEFT JOIN Animals ON Feedings.animalKey = Animals.animalId
      WHERE animalKey = ?`;

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
};
