const { v4: uuidv4 } = require('uuid');

const addUUIDDefault = (modelDefinition, primaryKeyField = 'id') => {
  return {
    ...modelDefinition,
    [primaryKeyField]: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  };
};

module.exports = { addUUIDDefault };
