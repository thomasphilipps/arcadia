const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'Report', 'Reports');
const { isValidId } = require('../utils/validation.utils');
module.exports = (app) => {
  app.post('/api/reports/', authenticate(['ROLE_VETERINARY']), crud.create);
  app.get('/api/reports', crud.readAll);
  app.get('/api/reports/:id', crud.readById);
  app.put('/api/reports/:id', authenticate(['ROLE_VETERINARY']), crud.update);
  app.delete('/api/reports/:id', authenticate(['ROLE_VETERINARY']), crud.delete);

  // Reports specific routes

  //Get all reports for a specific animal
  app.get('/api/reports/animal/:id', async (req, res) => {
    try {
      const animalId = req.params.id;

      if (!isValidId(animalId)) {
        return res.status(400).json({ error: "Format d'id invalide" });
      }

      const sql = `
       SELECT
        Reports.*,
        Users.userName as reportedBy,
        Animals.animalName as animalName
      FROM Reports
      LEFT JOIN Users ON Reports.veterinaryKey = Users.userId
      LEFT JOIN Animals ON Reports.animalKey = Animals.animalId
      WHERE animalKey = ?`;

      const [reports] = await sequelize.query(sql, {
        replacements: [animalId],
      });

      if (reports.length === 0) {
        return res.status(404).json({ error: 'Aucun rapport trouvé pour cet animal' });
      }

      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

// Reports specific routes
