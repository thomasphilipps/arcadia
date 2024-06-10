const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const { upload, processImage, s3Client, deleteImageFromS3 } = require('../utils/upload');

module.exports = (app) => {
  app.post('/api/images/', upload.single('image'), processImage, async (req, res) => {
    if (!req.file) {
      return res.status(400).send({
        message: 'Invalid file type, only JPEG, PNG and GIF are allowed!',
      });
    }

    const { description, referenceId, referenceType } = req.body;
    const imageId = req.file.key; // UUID généré
    const imagePath = req.file.location; // URL de l'image

    try {
      const sql = `
        INSERT INTO Images (imageId, imagePath, imageDescription, referenceId, referenceType)
        VALUES (?, ?, ?, ?, ?)`;
      await sequelize.query(sql, {
        replacements: [imageId, imagePath, description, referenceId, referenceType],
      });

      res.status(200).send({
        message: 'Image uploadée avec succès',
        file: req.file,
      });
    } catch (error) {
      res.status(500).send({
        message: "Erreur lors de l'insertion de l'image dans la base de données",
        error: error.message,
      });
    }
  });

  app.delete('/api/images/:id', authenticate(['ROLE_ADMIN']), async (req, res) => {
    const imageId = req.params.id;

    try {
      const sqlSelect = `
      SELECT imagePath
      FROM Images
      WHERE imageId = ?`;
      const [images] = await sequelize.query(sqlSelect, {
        replacements: [imageId],
      });

      if (images.length === 0) {
        return res.status(404).json({ error: 'Image non trouvée' });
      }

      const imagePath = images[0].imagePath;

      // Suppression de l'image du bucket S3
      await deleteImageFromS3(imagePath.split('/').pop());

      const sqlDelete = `
      DELETE FROM Images
      WHERE imageId = ?`;
      await sequelize.query(sqlDelete, {
        replacements: [imageId],
      });

      res.status(200).send({ message: 'Image supprimée avec succès' });
    } catch (error) {
      res.status(500).send({
        message: "Erreur lors de la suppression de l'image dans la base de données",
        error: error.message,
      });
    }
  });

  app.get('/api/images/:referenceType/:referenceId', async (req, res) => {
    const { referenceType, referenceId } = req.params;

    try {
      const sql = `
        SELECT imageId, imagePath, imageDescription
        FROM Images
        WHERE referenceType = ? AND referenceId = ?`;
      const [images] = await sequelize.query(sql, {
        replacements: [referenceType, referenceId],
      });

      if (images.length === 0) {
        return res.status(404).json({ error: 'Aucune image trouvée' });
      }

      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
