module.exports = (sequelize, Datatypes) => {
  return sequelize.define('Biome', {
    biomeId: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    biomeName: {
      type: Datatypes.STRING(32),
      allowNull: false,
      unique: {
        msg: 'Ce nom de biome est déjà utilisé',
      },
      validate: {
        notEmpty: { msg: 'Le nom du biome ne peut pas être une chaîne vide' },
        notNull: { msg: 'Le nom du biome est une propriété requise' },
      },
    },
    biomeShortDescr: {
      type: Datatypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La description condensée ne peut pas être une chaîne vide' },
        notNull: { msg: 'La description condensée est une propriété requise' },
      },
    },
    biomeLongDescr: {
      type: Datatypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La description détaillée ne peut pas être une chaîne vide' },
        notNull: { msg: 'La description détaillée est une propriété requise' },
      },
    },
    biomeStatus: {
      type: Datatypes.TEXT,
      allowNull: true,
    },
  });
};
