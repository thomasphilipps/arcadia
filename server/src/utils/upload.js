const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
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
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accepter le fichier
  } else {
    cb(new Error('Invalid file type, only JPEG, PNG and GIF are allowed!'), false); // Rejeter le fichier
  }
};

// Middleware pour traiter et redimensionner l'image avant l'upload
const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    req.file.buffer = await sharp(req.file.buffer)
      .resize({ height: 500, withoutEnlargement: true }) // Redimensionner proportionnellement à max 500px de haut
      .png() // Convertir en PNG
      .toBuffer();
    next();
  } catch (err) {
    next(err);
  }
};

// Fonction pour supprimer une image
const deleteImage = async (key) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });
    await s3.send(command);
    console.log(`Image with key ${key} deleted successfully`);
  } catch (err) {
    console.error(`Error deleting image with key ${key}:`, err);
    throw err;
  }
};

// Configuration de multer pour utiliser S3 avec traitement d'image
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const uuid = uuidv4().replace(/-/g, ''); // Générer un UUID et enlever les tirets
      cb(null, `${uuid}.png`);
    },
  }),
  fileFilter: fileFilter, // Ajout du file filter
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de taille de fichier à 10MB
});

module.exports = {
  upload,
  processImage,
  generateImageUrl,
  deleteImage,
};
