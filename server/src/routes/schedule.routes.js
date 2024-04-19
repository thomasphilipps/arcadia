const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const genericCrud = require('./generic.crud')(sequelize, 'Schedule', 'Schedules');

module.exports = (app) => {
  app.get('/api/schedules', genericCrud.readAll);
  app.get('/api/schedules/:id', genericCrud.readById);
  app.put('/api/schedules/:id', genericCrud.update);
};
