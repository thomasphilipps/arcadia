const animalReadAllQuery = () => {
  return `
  SELECT
    Animals.*,
    Species.specieName as animalSpecie,
    Biomes.biomeName as animalBiome
    FROM Animals
    LEFT JOIN Species ON Animals.specieKey = Species.specieId
    LEFT JOIN Biomes ON Animals.biomeKey = Biomes.biomeId`;
};

const animalReadByIdQuery = (id) => {
  return `
  SELECT
    Animals.*,
    Species.specieName as animalSpecie,
    Biomes.biomeName as animalBiome
    FROM Animals
    LEFT JOIN Species ON Animals.specieKey = Species.specieId
    LEFT JOIN Biomes ON Animals.biomeKey = Biomes.biomeId
    WHERE animalId = ${id}`;
};

module.exports = {
  animalReadAllQuery,
  animalReadByIdQuery,
};
