const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'Review', 'Reviews');

module.exports = (app) => {
  app.post('/api/reviews/', crud.create);
  app.get('/api/reviews', crud.readAll);
  app.get('/api/reviews/:id', crud.readById);
  app.put('/api/reviews/:id', authenticate(['ROLE_ADMIN', 'ROLE_EMPLOYEE']), crud.update);
  app.delete('/api/reviews/:id', authenticate(['ROLE_ADMIN', 'ROLE_EMPLOYEE']), crud.delete);
};
