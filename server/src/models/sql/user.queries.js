const userReadAllQuery = () => {
  return `SELECT userId, userEmail, userName, userRole FROM Users`;
};

const userReadByIdQuery = (id) => {
  return `SELECT userId, userEmail, userName, userRole FROM Users WHERE userId = '${id}'`;
};

module.exports = {
  userReadAllQuery,
  userReadByIdQuery,
};
