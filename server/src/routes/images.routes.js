// src/routes/image.routes.js
const { Image } = require('../config/database');
const upload = require('../config/uploadConfig');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/s3Client');

module.exports = (app) => {
  app.post('/api/image/upload', upload.single('image'), async (req, res) => {
    try {
      const { referenceId, referenceType, description } = req.body;
      const fileKey = req.file.key;
      const imagePath = `${process.env.AWS_ENDPOINT}/${process.env.AWS_BUCKET_NAME}/${fileKey}`;

      const newImage = await Image.create({
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
        return res.status(404).json({ message: 'Image not found' });
      }

      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image.imagePath.split('/').slice(-1)[0], // Extract the file key
      });

      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

      res.json({ ...image.toJSON(), url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Route to obtain all images of a given referenceType
  app.get('/api/image/type/:referenceType', async (req, res) => {
    try {
      const { referenceType } = req.params;
      const images = await Image.findAll({ where: { referenceType } });

      if (!images.length) {
        return res.status(404).json({ message: 'No images found for this referenceType' });
      }

      res.json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Route to obtain all images of given referenceId and referenceType
  app.get('/api/image/type/:referenceType/id/:referenceId', async (req, res) => {
    try {
      const { referenceType, referenceId } = req.params;
      const images = await Image.findAll({ where: { referenceType, referenceId } });

      if (!images.length) {
        return res
          .status(404)
          .json({ message: 'No images found for this referenceType and referenceId' });
      }

      res.json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Route to delete a specific image by imageId
  app.delete('/api/image/:imageId', async (req, res) => {
    try {
      const { imageId } = req.params;
      const image = await Image.findByPk(imageId);

      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }

      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image.imagePath.split('/').slice(-1)[0],
      });

      await s3Client.send(command);
      await image.destroy();

      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Route to delete all images of a given referenceType
  app.delete('/api/image/type/:referenceType', async (req, res) => {
    try {
      const { referenceType } = req.params;
      const images = await Image.findAll({ where: { referenceType } });

      if (!images.length) {
        return res.status(404).json({ message: 'No images found for this referenceType' });
      }

      for (const image of images) {
        const command = new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: image.imagePath.split('/').slice(-1)[0],
        });
        await s3Client.send(command);
        await image.destroy();
      }

      res.status(200).json({ message: 'All images of the referenceType deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Route to delete all images of given referenceId and referenceType
  app.delete('/api/image/type/:referenceType/id/:referenceId', async (req, res) => {
    try {
      const { referenceType, referenceId } = req.params;
      const images = await Image.findAll({ where: { referenceType, referenceId } });

      if (!images.length) {
        return res
          .status(404)
          .json({ message: 'No images found for this referenceType and referenceId' });
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
        .json({ message: 'All images of the referenceType and referenceId deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
