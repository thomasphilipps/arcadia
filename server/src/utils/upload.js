const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

// Configuration de l'instance S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  endpoint: process.env.AWS_ENDPOINT,
  forcePathStyle: true, // nécessaire pour MinIO
});

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
const processImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  sharp(req.file.buffer)
    .resize({ height: 500, withoutEnlargement: true }) // Redimensionner proportionnellement à max 500px de haut
    .png() // Convertir en PNG
    .toBuffer()
    .then((data) => {
      req.file.buffer = data;
      next();
    })
    .catch((err) => {
      next(err);
    });
};

// Configuration de multer pour utiliser S3 avec traitement d'image
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const uuid = uuidv4().replace(/-/g, ''); // Générer un UUID et enlever les tirets
      cb(null, `${uuid}.png`);
    },
  }),
  fileFilter: fileFilter, // Ajout du file filter
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de taille de fichier à 5MB
});

// Fonction pour supprimer une image du bucket S3
const deleteImageFromS3 = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  try {
    await s3Client.send(new DeleteObjectCommand(params));
  } catch (err) {
    throw new Error(`Erreur lors de la suppression de l'image du bucket S3: ${err.message}`);
  }
};

module.exports = {
  upload,
  processImage,
  s3Client,
  deleteImageFromS3,
};
