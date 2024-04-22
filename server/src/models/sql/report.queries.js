const reportReadAllQuery = () => {
  return `
    SELECT
      Reports.*,
      Users.userName as reportedBy
      FROM Reports
      LEFT JOIN Users ON Reports.veterinaryKey = Users.userId`;
};

const reportReadByIdQuery = (id) => {
  return `
    SELECT
      Reports.*,
      Users.userName as reportedBy
      FROM Reports
      LEFT JOIN Users ON Reports.veterinaryKey = Users.userId WHERE reportId = ${id}`;
};

module.exports = {
  reportReadAllQuery,
  reportReadByIdQuery,
};
