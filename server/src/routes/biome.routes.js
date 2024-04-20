const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'Biome', 'Biomes');

module.exports = (app) => {
  app.post('/api/biomes/', crud.create);
  app.get('/api/biomes/', crud.readAll);
  app.get('/api/biomes/:id', crud.readById);
  app.put('/api/biomes/:id', crud.update);
  app.delete('/api/biomes/:id', crud.delete);
};
