const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// Validate if id is numeric or UUID
function isValidId(id) {
  const isNumericId = /^\d+$/.test(id);
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
  return isNumericId || isUuid;
}

// Async function to hash a password
async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

module.exports = (sequelize, modelName, tableName) => {
  // Aux function to execute a SQL query and handle errors
  const executeQuery = async (sql, replacements, res, successMsg, errorCode = 500) => {
    try {
      const [results, metadata] = await sequelize.query(sql, { replacements });
      if (metadata) {
        return res.status(201).json({ message: successMsg });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(errorCode).json({ error: error.message });
    }
  };

  return {
    create: async (req, res) => {
      // Prepare data
      let userData = req.body;

      // Adding UUID to User model if not provided
      if (modelName === 'User' && !userData.userId) {
        userData.userId = uuidv4();
      }

      // Password hashing for User model
      if (modelName === 'User' && userData.userPassword) {
        userData.userPassword = await hashPassword(userData.userPassword);
      }

      // Building SQL query
      const keys = Object.keys(userData);
      const values = keys.map((key) => userData[key]);
      const placeholders = keys.map(() => '?').join(', ');
      const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;

      // Execute query
      await executeQuery(sql, values, res, `${modelName} créé avec succès`, 400);
    },

    readAll: async (req, res) => {
      let sql = `SELECT * FROM ${tableName}`;
      if (req.query.orderBy) {
        sql += ` ORDER BY ${req.query.orderBy}`;
      }
      await executeQuery(sql, [], res, null);
    },

    readById: async (req, res) => {
      if (!isValidId(req.params.id)) {
        return res.status(400).json({ error: "Format d'id invalide" });
      }
      const sql = `SELECT * FROM ${tableName} WHERE ${
        sequelize.model(modelName).primaryKeyAttribute
      } = ?`;
      await executeQuery(sql, [req.params.id], res, null);
    },

    update: async (req, res) => {
      const { id } = req.params;
      if (!isValidId(id)) {
        return res.status(400).json({ error: "Format d'id invalide" });
      }

      let updateData = req.body;
      if (modelName === 'User' && updateData.userPassword) {
        updateData.userPassword = await hashPassword(updateData.userPassword);
      }

      const updateKeys = Object.keys(updateData);
      let sql = `UPDATE ${tableName} SET `;
      const replacements = [];

      for (const key of updateKeys) {
        // Null is a valid value for Schedule model
        if (updateData[key] != null || modelName === 'Schedule') {
          sql += `${key} = ?, `;
          replacements.push(updateData[key]);
        }
      }

      sql = sql.slice(0, -2); // Delete last comma and space
      sql += ` WHERE ${sequelize.model(modelName).primaryKeyAttribute} = ?`;
      replacements.push(id);

      await executeQuery(sql, replacements, res, `${modelName} mis à jour avec succès`);
    },

    delete: async (req, res) => {
      const { id } = req.params;
      if (!isValidId(id)) {
        return res.status(400).json({ error: "Format d'id invalide" });
      }
      const sql = `DELETE FROM ${tableName} WHERE ${
        sequelize.model(modelName).primaryKeyAttribute
      } = ?`;
      await executeQuery(sql, [id], res, `${modelName} avec id: ${id} supprimé avec succès`);
    },
  };
};
