const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'User', 'Users');

module.exports = (app) => {
  app.post('/api/users/', crud.create);
  app.get('/api/users', crud.readAll);
  app.get('/api/users/:id', crud.readById);
  app.put('/api/users/:id', crud.update);
  app.delete('/api/users/:id', crud.delete);
};
