const { userReadAllQuery, userReadByIdQuery } = require('./user.queries');
const { messageReadAllQuery, messageReadByIdQuery } = require('./message.queries');
const { reviewReadAllQuery, reviewReadByIdQuery } = require('./review.queries');
const { reportReadAllQuery, reportReadByIdQuery } = require('./report.queries');
const { feedingReadAllQuery, feedingReadByIdQuery } = require('./feeding.queries');
const { specieReadAllQuery, specieReadByIdQuery } = require('./specie.queries');
const { animalReadAllQuery, animalReadByIdQuery } = require('./animal.queries');

const getReadAllQuery = (modelName) => {
  switch (modelName) {
    case 'User':
      return userReadAllQuery();
    case 'Message':
      return messageReadAllQuery();
    case 'Review':
      return reviewReadAllQuery();
    case 'Report':
      return reportReadAllQuery();
    case 'Feeding':
      return feedingReadAllQuery();
    case 'Specie':
      return specieReadAllQuery();
    case 'Animal':
      return animalReadAllQuery();
    default:
      return null;
  }
};

const getReadByIdQuery = (modelName, id) => {
  switch (modelName) {
    case 'User':
      return userReadByIdQuery(id);
    case 'Message':
      return messageReadByIdQuery(id);
    case 'Review':
      return reviewReadByIdQuery(id);
    case 'Report':
      return reportReadByIdQuery(id);
    case 'Feeding':
      return feedingReadByIdQuery(id);
    case 'Specie':
      return specieReadByIdQuery(id);
    case 'Animal':
      return animalReadByIdQuery(id);
    default:
      return null;
  }
};

const getValidFields = (modelName) => {
  switch (modelName) {
    case 'User':
      return ['userId', 'userEmail', 'userName'];
    default:
      return null;
  }
};

module.exports = {
  getReadAllQuery,
  getReadByIdQuery,
  getValidFields,
};
