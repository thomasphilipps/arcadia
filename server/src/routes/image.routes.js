const { authenticate } = require('../middlewares/auth');
const { sequelize } = require('../config/database');
const { upload, deleteImage, processImage, generateImageUrl } = require('../utils/upload');

module.exports = (app) => {
  app.post('/api/image/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        message: 'Invalid file type, only JPEG, PNG and GIF are allowed!',
      });
    }

    const { referenceId, referenceType, description } = req.body;
    const imageId = req.file.key.slice(0, -4); // UUID généré
    const imagePath = generateImageUrl(req.file.key); // URL de l'image

    try {
      const sql = `
        INSERT INTO Images (imageId, imagePath, imageDescription, referenceId, referenceType)
        VALUES (?, ?, ?, ?, ?)`;
      await sequelize.query(sql, {
        replacements: [imageId, imagePath, description, referenceId, referenceType],
      });

      res.status(200).json({
        message: 'Image uploadée avec succès',
        file: req.file,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de l'insertion de l'image dans la base de données",
        error: error.message,
      });
    }
  });

  app.delete('/api/image/:id', async (req, res) => {
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
      const key = imagePath.split('/').pop(); // Récupérer le nom du fichier

      // Suppression de l'image du bucket S3
      await deleteImage(key);

      const sqlDelete = `
      DELETE FROM Images
      WHERE imageId = ?`;
      await sequelize.query(sqlDelete, {
        replacements: [imageId],
      });

      res.status(200).json({ message: 'Image supprimée avec succès' });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression de l'image dans la base de données",
        error: error.message,
      });
    }
  });

  app.get('/api/image/type/:referenceType/id/:referenceId', async (req, res) => {
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
      // Log the error for debugging purposes, but don't expose details to the client
      console.error('Erreur lors de la récupération des images:', error.message);
      res.status(500).json({ error: 'Erreur interne du serveur. Veuillez réessayer plus tard.' });
    }
  });

  app.get('/api/image/type/:referenceType', async (req, res) => {
    const { referenceType } = req.params;

    try {
      const sql = `
        SELECT imageId, imagePath, imageDescription
        FROM Images
        WHERE referenceType = ?`;
      const [images] = await sequelize.query(sql, {
        replacements: [referenceType],
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
