const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'User', 'Users');

module.exports = (app) => {
  app.post('/api/users/', authenticate(['ROLE_ADMIN']), crud.create);
  app.get(
    '/api/users',
    authenticate(['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_VETERINARY']),
    crud.readAll
  );
  app.get(
    '/api/users/:id',
    authenticate(['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_VETERINARY']),
    crud.readById
  );
  app.put('/api/users/:id', authenticate(['ROLE_ADMIN']), crud.update);
  app.delete('/api/users/:id', authenticate(['ROLE_ADMIN']), crud.delete);
};
