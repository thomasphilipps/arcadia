module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Image',
    {
      imageId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      imagePath: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le chemin de l'image ne peut pas être une chaîne vide" },
          notNull: { msg: "Le chemin de l'image est une propriété requise" },
        },
      },
      imageDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      referenceId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: { msg: "L'identifiant de référence ne peut pas être une chaîne vide" },
          notNull: { msg: "L'identifiant de référence est une propriété requise" },
        },
      },
      referenceType: {
        type: DataTypes.ENUM('Animal', 'Biome', 'Service'),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Le type de référence ne peut pas être une chaîne vide' },
          notNull: { msg: 'Le type de référence est une propriété requise' },
          isIn: {
            args: [['Animal', 'Biome', 'Service']],
            msg: 'Le type de référence doit être Animal, Biome ou Service',
          },
        },
      },
    },
    {
      timestamps: false, // Désactiver les timestamps
    }
  );
};
