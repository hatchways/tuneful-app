const express = require('express');
const ImageUploadRouter = express.Router();


const upload = require('./image-upload-service');


ImageUploadRouter.post('/image-upload', upload.single('avatar'), function (req, res, next) {
      return res.json({'imageUrl':req.file.location})
    });


module.exports = ImageUploadRouter