const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'Animal', 'Animals');

module.exports = (app) => {
  app.post('/api/animals/', authenticate(['ROLE_ADMIN']), crud.create);
  app.get('/api/animals', crud.readAll);
  app.get('/api/animals/:id', crud.readById);
  app.put('/api/animals/:id', authenticate(['ROLE_ADMIN']), crud.update);
  app.delete('/api/animals/:id', authenticate(['ROLE_ADMIN']), crud.delete);
};
