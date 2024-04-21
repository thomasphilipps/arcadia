const feedingReadAllQuery = () => {
  return `
    SELECT 
      Feedings.*,
      Users.userName as feedingBy,
      FROM Feedings
      LEFT JOIN Users ON Feedings.feedingBy = Users.userId`;
};

const feedingReadByIdQuery = (id) => {
  return `
    SELECT 
      Feedings.*,
      Users.userName as feedingBy,
      FROM Feedings
      LEFT JOIN Users ON Feedings.feedingBy = Users.userId WHERE feedingId = ${id}`;
};

module.exports = {
  feedingReadAllQuery,
  feedingReadByIdQuery,
};
