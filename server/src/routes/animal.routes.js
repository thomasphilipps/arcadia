const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'Feeding', 'Feedings');

module.exports = (app) => {
  app.post('/api/animals/', crud.create);
  app.get('/api/animals', crud.readAll);
  app.get('/api/animals/:id', crud.readById);
  app.put('/api/animals/:id', crud.update);
  app.delete('/api/animals/:id', crud.delete);
};
