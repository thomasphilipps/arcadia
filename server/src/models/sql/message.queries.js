const messageReadAllQuery = () => {
  return `
  SELECT
    Messages.*,
    Users.userName as processedBy
    FROM Messages
    LEFT JOIN Users ON Messages.messageProcessedBy = Users.userId`;
};

const messageReadByIdQuery = (id) => {
  return `
  SELECT
    Messages.*,
    Users.userName as processedBy
    FROM Messages
    LEFT JOIN Users ON Messages.messageProcessedBy = Users.userId WHERE messageId = ${id}`;
};

module.exports = {
  messageReadAllQuery,
  messageReadByIdQuery,
};
