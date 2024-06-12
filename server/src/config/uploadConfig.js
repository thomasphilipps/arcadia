// src/config/uploadConfig.js
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const s3Client = require('./s3Client');

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}_${file.originalname}`);
    },
  }),
});

module.exports = upload;
