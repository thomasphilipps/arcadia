const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'Service', 'Services');

module.exports = (app) => {
  app.post('/api/services/', authenticate(['ROLE_ADMIN', 'ROLE_EMPLOYEE']), crud.create);
  app.get('/api/services/', crud.readAll);
  app.get('/api/services/:id', crud.readById);
  app.put('/api/services/:id', authenticate(['ROLE_ADMIN', 'ROLE_EMPLOYEE']), crud.update);
  app.delete('/api/services/:id', authenticate(['ROLE_ADMIN', 'ROLE_EMPLOYEE']), crud.delete);
};
