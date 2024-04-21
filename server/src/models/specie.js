module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Specie', {
    specieId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    specieName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: {
        msg: "Ce nom d'espèce est déjà utilisé",
      },
      validate: {
        notEmpty: { msg: "Le nom de l'espèce ne peut pas être une chaîne vide" },
        notNull: { msg: "Le nom de l'espèce est une propriété requise" },
      },
    },
    specieTaxon: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La taxonomie de l'espèce ne peut pas être une chaîne vide" },
        notNull: { msg: "La taxonomie de l'espèce est une propriété requise" },
      },
    },
    specieDescr: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La description  ne peut pas être une chaîne vide' },
        notNull: { msg: 'La description  est une propriété requise' },
      },
    },
    biomeKey: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Biome',
        key: 'biomeId',
      },
    },
  });
};
