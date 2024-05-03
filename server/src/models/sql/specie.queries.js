const specieReadAllQuery = () => {
  return `
    SELECT
      Species.*,
      Biomes.biomeName as specieBiome
    FROM Species
    LEFT JOIN Biomes ON Species.biomeKey = Biomes.biomeId`;
};

const specieReadByIdQuery = (id) => {
  return `
    SELECT
      Species.*,
      Biomes.biomeName as specieBiome
    FROM Species
    LEFT JOIN Biomes ON Species.biomeKey = Biomes.biomeId WHERE specieId = ${id}`;
};

module.exports = {
  specieReadAllQuery,
  specieReadByIdQuery,
};
