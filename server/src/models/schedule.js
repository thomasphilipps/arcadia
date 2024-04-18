module.exports = (sequelize, DataTypes) => {
  const Schedules = sequelize.define('Schedule', {
    dayId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dayName: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    openAm: {
      type: DataTypes.TIME,
      validate: {
        isValid(value) {
          if (value >= this.closeAm) {
            throw new Error(
              "L'heure d'ouverture du matin doit être avant l'heure de fermeture du matin."
            );
          }
        },
      },
    },
    closeAm: {
      type: DataTypes.TIME,
    },
    openPm: {
      type: DataTypes.TIME,
      validate: {
        isValid(value) {
          if (value >= this.closePm) {
            throw new Error(
              "L'heure d'ouverture de l'après-midi doit être avant l'heure de fermeture de l'après-midi."
            );
          }
        },
      },
    },
    closePm: {
      type: DataTypes.TIME,
    },
  });

  // Validate AM and PM times to avoid PM opening before AM closing
  Schedules.beforeSave((schedule, options) => {
    if (schedule.closeAm > schedule.openPm) {
      throw new Error(
        "L'heure de fermeture du matin ne peut pas être après l'heure d'ouverture de l'après-midi."
      );
    }
  });

  return Schedules;
};
