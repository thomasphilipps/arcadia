const { S3Client, DeleteObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

// Configuration de l'instance S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true, // nécessaire pour MinIO
});

// Fonction pour générer l'URL de l'image avec le port correct
const generateImageUrl = (key) => {
  const endpoint = new URL(process.env.AWS_ENDPOINT);
  // Inclure le port seulement s'il est spécifié
  const port = endpoint.port ? `:${endpoint.port}` : '';
  return `${endpoint.protocol}//${endpoint.hostname}${port}/${process.env.AWS_BUCKET_NAME}/${key}`;
};

// Fonction de filtrage pour vérifier que le fichier est une image
const fileFilter = (file) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return allowedMimeTypes.includes(file.mimetype);
};

// Middleware pour traiter et redimensionner l'image avant l'upload
const processImage = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  if (!fileFilter(req.file)) {
    return res
      .status(400)
      .json({ message: 'Invalid file type, only JPEG, PNG and GIF are allowed!' });
  }

  try {
    const uuid = uuidv4().replace(/-/g, '');
    const imageKey = `${uuid}.png`;

    // Redimensionner l'image principale
    const imageBuffer = await sharp(req.file.buffer)
      .resize({ height: 500, withoutEnlargement: true }) // Redimensionner proportionnellement à max 500px de haut
      .png() // Convertir en PNG
      .toBuffer();

    // Créer un thumbnail
    const thumbnailBuffer = await sharp(req.file.buffer)
      .resize({ height: 100, withoutEnlargement: true }) // Redimensionner proportionnellement à max 100px de haut
      .png() // Convertir en PNG
      .toBuffer();

    // Upload de l'image principale
    const imageCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageKey,
      Body: imageBuffer,
      ContentType: 'image/png',
      ACL: 'public-read',
    });
    await s3.send(imageCommand);

    // Upload du thumbnail
    const thumbnailKey = `thumbnail-${imageKey}`;
    const thumbnailCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: thumbnailKey,
      Body: thumbnailBuffer,
      ContentType: 'image/png',
      ACL: 'public-read',
    });
    await s3.send(thumbnailCommand);

    req.file.imageUrl = generateImageUrl(imageKey);
    req.file.imageId = uuid;

    next();
  } catch (err) {
    next(err);
  }
};

// Fonction pour supprimer une image et son thumbnail
const deleteImage = async (key) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });
    await s3.send(command);

    const thumbnailKey = `thumbnail-${key}`;
    const thumbnailCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: thumbnailKey,
    });
    await s3.send(thumbnailCommand);

    console.log(`Image and thumbnail with key ${key} deleted successfully`);
  } catch (err) {
    console.error(`Error deleting image and thumbnail with key ${key}:`, err);
    throw err;
  }
};

module.exports = {
  processImage,
  generateImageUrl,
  deleteImage,
};
