const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
    accessKeyId: "AKIAJWHN3OBQEGA75LOQ",
    secretAccessKey: "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",
    region: 'us-east-2'
})

const app = express()
const s3 = new aws.S3()

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
}

const upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'vzawstest.com',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'TESTING_META_DATA!' });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;