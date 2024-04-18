module.exports = (seqelize, DataTypes) => {
  return seqelize.define('Review', {
    reviewId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reviewAlias: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Le peseudonyme ne peut pas être une chaîne vide' },
        notNull: { msg: 'Le peseudonyme est une propriété requise' },
      },
    },
    reviewContent: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Le contenu de la critique ne peut pas être une chaîne vide' },
        notNull: { msg: 'Le contenu de la critique est une propriété requise' },
      },
    },
    reviewRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La note de la critique ne peut pas être une chaîne vide' },
        notNull: { msg: 'La note de la critique est une propriété requise' },
        min: { args: 0, msg: 'La note de la critique doit être comprise entre 0 et 5' },
        max: { args: 5, msg: 'La note de la critique doit être comprise entre 0 et 5' },
      },
    },
    reviewPostedOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    reviewApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    reviewApprvedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'User',
        key: 'userId',
      },
    },
  });
};
