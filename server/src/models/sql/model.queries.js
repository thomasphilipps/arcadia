const { userReadAllQuery, userReadByIdQuery } = require('./user.queries');
const { messageReadAllQuery, messageReadByIdQuery } = require('./message.queries');
const { reviewReadAllQuery, reviewReadByIdQuery } = require('./review.queries');
const { reportReadAllQuery, reportReadByIdQuery } = require('./report.queries');

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
