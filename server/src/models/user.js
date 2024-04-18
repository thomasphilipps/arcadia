module.exports = (sequelize, DataTypes) => {
  return (
    sequelize.define('User'),
    {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Cette adresse email est déjà utilisée',
        },
        validate: {
          isEmail: {
            msg: 'Doit être une adresse email valide.',
          },
        },
      },
      userName: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le nom d'utilisateurne peut pas être une chaîne vide" },
          notNull: { msg: "Le nom d'utilisateur est une propriété requise" },
        },
      },
      userPassword: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      userRole: {
        userRole: {
          type: DataTypes.ENUM('ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_VETERINARY'),
          allowNull: false,
          defaultValue: 'ROLE_EMPLOYEE',
        },
      },
    }
  );
};
