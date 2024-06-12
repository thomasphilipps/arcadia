const { Image } = require('../config/database');
const { upload, uploadToS3, sharp } = require('../config/uploadConfig');
const { v4: uuidv4 } = require('uuid');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/s3Client');

module.exports = (app) => {
  app.post('/api/image/upload', upload.single('image'), async (req, res) => {
    try {
      const { referenceId, referenceType, description } = req.body;
      const imageId = uuidv4().replace(/-/g, ''); // Générer un UUID sans tirets
      const fileKey = `${imageId}.png`; // Utiliser l'UUID pour le nom du fichier avec l'extension .png

      let buffer = req.file.buffer;

      // Redimensionner et convertir l'image en PNG
      const metadata = await sharp(buffer).metadata();
      if (metadata.height > 500) {
        buffer = await sharp(buffer).resize({ height: 500 }).png().toBuffer();
      } else {
        buffer = await sharp(buffer).png().toBuffer();
      }

      await uploadToS3(buffer, fileKey, 'image/png');

      const imagePath = `${process.env.AWS_ENDPOINT}/${process.env.AWS_BUCKET_NAME}/${fileKey}`;

      const newImage = await Image.create({
        imageId, // Utiliser l'UUID généré comme imageId
        imagePath,
        referenceId,
        referenceType,
        imageDescription: description,
      });

      res.status(201).json(newImage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/image/:imageId', async (req, res) => {
    try {
      const { imageId } = req.params;
      const image = await Image.findByPk(imageId);

      if (!image) {
        return res.status(404).json({ message: 'Image non trouvée' });
      }

      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image.imagePath.split('/').slice(-1)[0],
      });

      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

      res.json({ ...image.toJSON(), url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/image/type/:referenceType', async (req, res) => {
    try {
      const { referenceType } = req.params;
      const images = await Image.findAll({ where: { referenceType } });

      if (!images.length) {
        return res.status(404).json({ message: 'Aucune image trouvée pour ce type de référence' });
      }

      res.json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/image/type/:referenceType/id/:referenceId', async (req, res) => {
    try {
      const { referenceType, referenceId } = req.params;
      const images = await Image.findAll({ where: { referenceType, referenceId } });

      if (!images.length) {
        return res.status(404).json({
          message: 'Aucune image trouvée pour ce type de référence et cet identifiant de référence',
        });
      }

      res.json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete('/api/image/:imageId', async (req, res) => {
    try {
      const { imageId } = req.params;
      const image = await Image.findByPk(imageId);

      if (!image) {
        return res.status(404).json({ message: 'Image non trouvée' });
      }

      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image.imagePath.split('/').slice(-1)[0],
      });

      await s3Client.send(command);
      await image.destroy();

      res.status(200).json({ message: 'Image supprimée avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete('/api/image/type/:referenceType', async (req, res) => {
    try {
      const { referenceType } = req.params;
      const images = await Image.findAll({ where: { referenceType } });

      if (!images.length) {
        return res.status(404).json({ message: 'Aucune image trouvée pour ce type de référence' });
      }

      for (const image of images) {
        const command = new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: image.imagePath.split('/').slice(-1)[0],
        });
        await s3Client.send(command);
        await image.destroy();
      }

      res
        .status(200)
        .json({ message: 'Toutes les images du type de référence ont été supprimées avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete('/api/image/type/:referenceType/id/:referenceId', async (req, res) => {
    try {
      const { referenceType, referenceId } = req.params;
      const images = await Image.findAll({ where: { referenceType, referenceId } });

      if (!images.length) {
        return res.status(404).json({
          message: 'Aucune image trouvée pour ce type de référence et cet identifiant de référence',
        });
      }

      for (const image of images) {
        const command = new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: image.imagePath.split('/').slice(-1)[0],
        });
        await s3Client.send(command);
        await image.destroy();
      }

      res.status(200).json({
        message:
          "Toutes les images du type de référence et de l'identifiant de référence ont été supprimées avec succès",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
