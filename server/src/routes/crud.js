const bcrypt = require('bcrypt');

const {
  getReadAllQuery,
  getReadByIdQuery,
  getValidFields,
} = require('../models/sql/model.queries');

function isValidId(id) {
  const isNumericId = /^\d+$/.test(id);
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
  return isNumericId || isUuid;
}

module.exports = (sequelize, modelName, tableName) => {
  return {
    create: async (req, res) => {
      try {
        // Model validation
        const newRecord = sequelize.model(modelName).build(req.body);

        // Hash password if model is User
        if (modelName === 'User' && req.body.password) {
          req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        await newRecord.validate();

        // Create record if validation passed
        const keys = Object.keys(req.body);
        const values = keys.map((key) => req.body[key]);
        const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${keys
          .map(() => '?')
          .join(', ')})`;

        await sequelize.query(sql, {
          replacements: values,
          type: sequelize.QueryTypes.INSERT,
        });

        res.status(201).json({ message: `${modelName} créé avec succès` });
      } catch (error) {
        // Error handling
        if (
          error.name === 'SequelizeValidationError' ||
          error.name === 'SequelizeUniqueConstraintError'
        ) {
          return res.status(400).json({ errors: error.errors.map((e) => e.message) });
        }
        res.status(500).json({ error: error.message });
      }
    },

    readAll: async (req, res) => {
      try {
        const orderBy = req.query.orderBy;
        let sql = getReadAllQuery(modelName) || `SELECT * FROM ${tableName}`;
        let validFields =
          getValidFields(modelName) || Object.keys(sequelize.model(modelName).rawAttributes);

        // Prevent SQL injections
        if (orderBy && validFields.includes(orderBy)) {
          sql += ` ORDER BY ${orderBy}`;
        } else if (orderBy) {
          return res.status(400).json({ error: 'Paramètre orderBy invalide' });
        }

        const [results] = await sequelize.query(sql);
        res.status(200).json(results);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    readById: async (req, res) => {
      try {
        const { id } = req.params;

        // Prevent sql injections, limit to valid id types
        if (!isValidId(id)) {
          return res.status(400).json({ error: "Format d'id invalide" });
        }

        const primaryKeyField = sequelize.model(modelName).primaryKeyAttribute;
        const orderBy = req.query.orderBy;
        let sql =
          getReadByIdQuery(modelName, id) ||
          `SELECT * FROM ${tableName} WHERE ${primaryKeyField} = ?`;
        let validFields =
          getValidFields(modelName) || Object.keys(sequelize.model(modelName).rawAttributes);

        if (orderBy && validFields.includes(orderBy)) {
          sql += ` ORDER BY ${orderBy}`;
        } else if (orderBy) {
          return res.status(400).json({ error: 'Paramètre orderBy invalide' });
        }

        const [result] = await sequelize.query(sql, {
          replacements: [id],
        });

        if (result.length === 0) {
          return res.status(404).json({ error: `${modelName} avec id: ${id} introuvable` });
        }
        res.status(200).json(result[0]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    update: async (req, res) => {
      try {
        const { id } = req.params;

        if (!isValidId(id)) {
          return res.status(400).json({ error: "Format d'id invalide" });
        }

        // Hash password if model is User
        if (modelName === 'User' && req.body.userPassword) {
          req.body.userPassword = await bcrypt.hash(req.body.userPassword, 10);
        }

        const updateData = req.body;
        const primaryKeyField = sequelize.model(modelName).primaryKeyAttribute;

        const sql = `SELECT * FROM ${tableName} WHERE ${primaryKeyField} = ?`;
        const [result] = await sequelize.query(sql, {
          replacements: [id],
        });

        if (result.length === 0) {
          return res.status(404).json({ error: `${modelName} avec l'id: ${id} introuvable` });
        }

        const updateKeys = Object.keys(updateData);
        const recordToUpdate = sequelize.model(modelName).build(updateData, { isNewRecord: false });
        await recordToUpdate.validate({ fields: updateKeys });

        let updateSql = `UPDATE ${tableName} SET `;
        const replacements = [];

        for (const key in updateData) {
          if (modelName === 'Schedule' || updateData[key] != null) {
            updateSql += `${key} = ?, `;
            replacements.push(
              updateData[key] === null && modelName === 'Schedule' ? null : updateData[key]
            );
          }
        }
        updateSql = updateSql.slice(0, -2); // Delete last comma and space
        updateSql += ` WHERE ${primaryKeyField} = ?`;
        replacements.push(id);
        await sequelize.query(updateSql, { replacements, type: sequelize.QueryTypes.UPDATE });

        res.status(200).json({ message: `${modelName} mis à jour avec succès` });
      } catch (error) {
        if (
          error.name === 'SequelizeValidationError' ||
          error.name === 'SequelizeUniqueConstraintError'
        ) {
          return res.status(400).json({ errors: error.errors.map((e) => e.message) });
        }
        res.status(500).json({ error: error.message });
      }
    },

    delete: async (req, res) => {
      try {
        const { id } = req.params;

        if (!isValidId(id)) {
          return res.status(400).json({ error: "Format d'id invalide" });
        }

        const primaryKeyField = sequelize.model(modelName).primaryKeyAttribute;

        const sql = `SELECT * FROM ${tableName} WHERE ${primaryKeyField} = ?`;
        const [result] = await sequelize.query(sql, {
          replacements: [id],
        });

        if (result.length === 0) {
          return res.status(404).json({ error: `${modelName} avec id: ${id} introuvable` });
        }

        const deleteSql = `DELETE FROM ${tableName} WHERE ${primaryKeyField} = ?`;
        await sequelize.query(deleteSql, {
          replacements: [id],
          type: sequelize.QueryTypes.DELETE,
        });

        res.status(200).json({ message: `${modelName} avec id: ${id} supprimé avec succès` });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  };
};
