module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Animal',
    {
      animalId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      animalName: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le nom de l'animal ne peut pas être une chaîne vide" },
          notNull: { msg: "Le nom de l'animal est une propriété requise" },
        },
      },
      animalDescr: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "La description de l'animal ne peut pas être une chaîne vide" },
          notNull: { msg: "La description de l'animal est une propriété requise" },
        },
      },
      animalBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: { msg: "La date de naissance de l'animal doit être une date valide" },
          notNull: { msg: "La date de naissance de l'animal est une propriété requise" },
        },
      },
      animalGender: {
        type: DataTypes.ENUM('Mâle', 'Femelle'),
        allowNull: false,
        validate: {
          isIn: {
            args: [['Mâle', 'Femelle']],
            msg: "Le genre de l'animal doit être 'Mâle' ou 'Femelle'",
          },
          notNull: { msg: "Le genre de l'animal est une propriété requise" },
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
      specieKey: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Specie',
          key: 'specieId',
        },
      },
    },
    {
      timestamps: false, // Désactiver les timestamps automatiques
    }
  );
};
