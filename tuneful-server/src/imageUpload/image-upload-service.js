require('dotenv').config()
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
 
aws.config.update({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_Secret_Access_Key,
    region: process.env.AWS_region
})


const s3 = new aws.S3()
 
 
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'tuneful-upload-pictures',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;