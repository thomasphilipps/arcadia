const reportReadAllQuery = () => {
  return `
    SELECT
      Reports.*,
      Users.userName AS reportedBy,
      Animals.animalName AS animalName,
      Species.specieName AS animalSpecie,
      Biomes.biomeName AS animalBiome,
      Animals.animalBirth AS animalBirth,
      Animals.animalGender AS animalGender
    FROM Reports
    LEFT JOIN Users ON Reports.veterinaryKey = Users.userId
    LEFT JOIN Animals ON Reports.animalKey = Animals.animalId
    LEFT JOIN Species ON Animals.specieKey = Species.specieId
    LEFT JOIN Biomes ON Animals.biomeKey = Biomes.biomeId;`;
};

const reportReadByIdQuery = (id) => {
  return `
    SELECT
      Reports.*,
      Users.userName AS reportedBy,
      Animals.animalName AS animalName,
      Species.specieName AS animalSpecie,
      Biomes.biomeName AS animalBiome,
      Animals.animalBirth AS animalBirth,
      Animals.animalGender AS animalGender
    FROM Reports
    LEFT JOIN Users ON Reports.veterinaryKey = Users.userId
    LEFT JOIN Animals ON Reports.animalKey = Animals.animalId
    LEFT JOIN Species ON Animals.specieKey = Species.specieId
    LEFT JOIN Biomes ON Animals.biomeKey = Biomes.biomeId
    WHERE reportId = ${id}`;
};

module.exports = {
  reportReadAllQuery,
  reportReadByIdQuery,
};
