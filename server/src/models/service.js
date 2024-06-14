module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Service', {
    serviceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serviceName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: {
        msg: 'Ce nom de service est déjà utilisé',
      },
      validate: {
        notEmpty: { msg: 'Le nom du service ne peut pas être une chaîne vide' },
        notNull: { msg: 'Le nom du service est une propriété requise' },
      },
    },
    serviceShortDescr: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La description condensée du service ne peut pas être une chaîne vide' },
        notNull: { msg: 'La description condensée du service est une propriété requise' },
      },
    },
    serviceLongDescr: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La description détaillée du service ne peut pas être une chaîne vide' },
        notNull: { msg: 'La description détaillée du service est une propriété requise' },
      },
    },
  });
};
