const express = require('express');
const ImageUploadRouter = express.Router();
const aws = require('aws-sdk')

const upload = require('./image-upload-service');
const getObjects = require('./image-upload-service');


const s3 = new aws.S3()

ImageUploadRouter.post('/image-upload', upload.single('avatar'), function (req, res, next) {
      return res.json({'image_url':req.file.location})
    });

ImageUploadRouter.get('/image', (req, res) => {

      var params = { Bucket: 'tuneful-upload-pictures' ,
                    Key: upload.key};
  s3.getObject(params, function (err, data) {
      if (err) {
          return res.send({ "error": err });
      }
      res.json(data.Body);
  });
});

module.exports = ImageUploadRouter