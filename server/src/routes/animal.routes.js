const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const crud = require('./crud')(sequelize, 'Animal', 'Animals');
const {
  recordClick,
  deleteAnimalRecords,
  getClickStatistics,
} = require('../controllers/animal.controller');

module.exports = (app) => {
  app.post('/api/animals/', authenticate(['ROLE_ADMIN']), crud.create);
  app.get('/api/animals', crud.readAll);
  app.get('/api/animals/:id', crud.readById);
  app.put('/api/animals/:id', authenticate(['ROLE_ADMIN']), crud.update);
  app.delete('/api/animals/:id', authenticate(['ROLE_ADMIN']), crud.delete);

  app.post('/api/animals/:animalId/click', recordClick);
  app.delete('/api/animals/:animalId/records', authenticate(['ROLE_ADMIN']), deleteAnimalRecords);
  app.get('/api/animals/clicks/statistics', authenticate(['ROLE_ADMIN']), getClickStatistics);
};
