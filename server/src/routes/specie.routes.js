const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'Specie', 'Species');

module.exports = (app) => {
  app.post('/api/species/', authenticate(['ROLE_ADMIN']), crud.create);
  app.get('/api/species/', crud.readAll);
  app.get('/api/species/:id', crud.readById);
  app.put('/api/species/:id', authenticate(['ROLE_ADMIN']), crud.update);
  app.delete('/api/species/:id', authenticate(['ROLE_ADMIN']), crud.delete);

  // Specie specific routes

  app.get('/api/species/:id/animals', async (req, res) => {
    try {
      const specieId = req.params.id;
      const sql = `
        SELECT animalId, animalName, animalDescr, animalBirth, animalGender
        FROM Animals
        WHERE specieKey = ?`;
      const [animals] = await sequelize.query(sql, {
        replacements: [specieId],
      });

      if (animals.length === 0) {
        return res.status(404).json({ error: 'No animals found for this specie' });
      }

      res.status(200).json(animals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
