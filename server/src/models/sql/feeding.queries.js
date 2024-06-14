const feedingReadAllQuery = () => {
  return `
    SELECT 
      Feedings.*,
      Users.userName as feederName,
      Animals.animalName as animalName
    FROM Feedings
    LEFT JOIN Users ON Feedings.feedingBy = Users.userId
    LEFT JOIN Animals ON Feedings.animalKey = Animals.animalId`;
};

const feedingReadByIdQuery = (id) => {
  return `
    SELECT 
      Feedings.*,
      Users.userName as feederName,
      Animals.animalName as animalName
    FROM Feedings
    LEFT JOIN Users ON Feedings.feedingBy = Users.userId
    LEFT JOIN Animals ON Feedings.animalKey = Animals.animalId
    WHERE feedingId = ${id}`;
};

module.exports = {
  feedingReadAllQuery,
  feedingReadByIdQuery,
};
