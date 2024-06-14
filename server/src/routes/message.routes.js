const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'Message', 'Messages');

module.exports = (app) => {
  app.post('/api/messages/', crud.create);
  app.get('/api/messages', crud.readAll);
  app.get('/api/messages/:id', crud.readById);
  app.put('/api/messages/:id', crud.update);
  app.delete('/api/messages/:id', crud.delete);
};
