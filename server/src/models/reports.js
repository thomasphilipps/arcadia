/**
 * CREATE TABLE IF NOT EXISTS Reports (
    reportId INT AUTO_INCREMENT PRIMARY KEY,
    reportState TEXT NOT NULL,
    reportDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reportDetails TEXT,
    reportFoodType VARCHAR(32),
    reportFoodAmount VARCHAR(32),
    animalKey VARCHAR(36),
    FOREIGN KEY (animalKey) REFERENCES Animals(animalId)
);
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Reports', {
    reportId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reportState: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "L'état du rapport ne peut pas être une chaîne vide" },
        notNull: { msg: "L'état du rapport est une propriété requise" },
      },
    },
    reportDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    reportDetails: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reportFoodType: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    reportFoodAmount: {
      type: DataTypes.STRING(32),
      allowNull: true,
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
