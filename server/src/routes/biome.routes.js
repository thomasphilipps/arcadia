const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'Biome', 'Biomes');

module.exports = (app) => {
  app.post('/api/biomes/', authenticate(['ROLE_ADMIN']), crud.create);
  app.get('/api/biomes/', crud.readAll);
  app.get('/api/biomes/:id', crud.readById);
  app.put('/api/biomes/:id', authenticate(['ROLE_ADMIN', 'ROLE_VETERINARY']), crud.update);
  app.delete('/api/biomes/:id', authenticate(['ROLE_ADMIN']), crud.delete);

  // Biome specific routes
  app.get('/api/biomes/:id/species', async (req, res) => {
    try {
      const biomeId = req.params.id;
      const sql = `
        SELECT specieId, specieName, specieDescr
        FROM Species
        WHERE biomeKey = ?`;
      const [species] = await sequelize.query(sql, {
        replacements: [biomeId],
      });

      if (species.length === 0) {
        return res.status(404).json({ error: 'No species found for this biome' });
      }

      res.status(200).json(species);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  //TODO: Check if this is useful
  app.get('/api/biomes/:id/animals', async (req, res) => {
    try {
      const biomeId = req.params.id;
      const sql = `
        SELECT animalId, animalName, animalDescr, animalBirth, animalGender
        FROM Animals
        WHERE biomeKey = ?`;
      const [animals] = await sequelize.query(sql, {
        replacements: [biomeId],
      });

      if (animals.length === 0) {
        return res.status(404).json({ error: 'No animals found for this biome' });
      }

      res.status(200).json(animals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
