const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'Specie', 'Species');

module.exports = (app) => {
  app.post('/api/species/', crud.create);
  app.get('/api/species/', crud.readAll);
  app.get('/api/species/:id', crud.readById);
  app.put('/api/species/:id', crud.update);
  app.delete('/api/species/:id', crud.delete);
};
