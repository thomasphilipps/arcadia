const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'User', 'Users');

module.exports = (app) => {
  app.post('/api/users/', authenticate(['ROLE_ADMIN']), crud.create);
  app.get('/api/users', crud.readAll);
  app.get('/api/users/:id', crud.readById);
  app.put('/api/users/:id', authenticate(['ROLE_ADMIN']), crud.update);
  app.delete('/api/users/:id', authenticate(['ROLE_ADMIN']), crud.delete);
};
