module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Message', {
    messageId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    messageTitle: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Le titre ne peut pas être une chaîne vide' },
        notNull: { msg: 'Le titre est une propriété requise' },
      },
    },
    messageContent: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Le contenu ne peut pas être une chaîne vide' },
        notNull: { msg: 'Le contenu est une propriété requise' },
      },
    },
    messageEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: { msg: 'Doit être une adresse email valide' },
        notEmpty: { msg: "L'email ne peut pas être une chaîne vide" },
        notNull: { msg: "L'email est une propriété requise" },
      },
    },
    messageDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    messageProcessed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    messageProcessedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'User',
        key: 'userId',
      },
    },
    messageProcessedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
};
