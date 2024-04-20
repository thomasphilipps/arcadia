const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'Schedule', 'Schedules');

module.exports = (app) => {
  app.get('/api/schedules', crud.readAll);
  app.get('/api/schedules/:id', crud.readById);
  app.put('/api/schedules/:id', crud.update);
};
