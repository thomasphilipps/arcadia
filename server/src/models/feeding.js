module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Feedings', {
    feedingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    feedingType: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le type d'alimentation ne peut pas être une chaîne vide" },
        notNull: { msg: "Le type d'alimentation est une propriété requise" },
      },
    },
    feedingAmount: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La quantité d'alimentation ne peut pas être une chaîne vide" },
        notNull: { msg: "La quantité d'alimentation est une propriété requise" },
      },
    },
    feedingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    animalKey: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Animals',
        key: 'animalId',
      },
    },
  });
};
