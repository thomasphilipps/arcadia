const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const genericCrud = require('./generic.crud')(sequelize, 'AppUser', 'App_users');

module.exports = (app) => {
  app.post('/api/users/', authenticate('ROLE_ADMIN'), genericCrud.create);
  app.get('/api/users', authenticate('ROLE_ADMIN'), genericCrud.readAll);
  app.get('/api/users/:id', authenticate('ROLE_ADMIN'), genericCrud.readById);
  app.put('/api/users/:id', authenticate('ROLE_ADMIN'), genericCrud.update);
  app.delete('/api/users/:id', authenticate('ROLE_ADMIN'), genericCrud.delete);
};
