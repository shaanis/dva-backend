const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudDb');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    // allow all formats (no need to specify `allowed_formats`)
    resource_type: 'auto' // auto-detect type: image, video, etc.
  }
});

const multerMiddleware = multer({ storage });

module.exports = multerMiddleware;
