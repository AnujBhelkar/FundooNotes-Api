/*****************************************************************************************
 * @Purpose     : Uploading file to Aws bucket
 * @file        : fileUploading.js
 * @author      : Anuj
 * @since       : 31-05-2019
 *****************************************************************************************/

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const conf = {
  AccessKeyID: process.env.AccessKeyID,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region
}
const s3 = new aws.S3(conf)
/**
 * @description : filter image file by extension
 * @param {* requested from frontend } req
 * @param {* requested from frontend } file
 * @param {* response to backend } callback
 */

const fileFilter = function (req, file, callback) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true)
  } else {
    callback(new Error('Invalid MIME type , only jpeg & png'), false)
  }
}

/**
  * @description    : Passing images to aws Bucket using multer-s3.
  */
var upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'fundoo123',
    acl: 'public-read',
    metadata: function (req, file, callback) {
      console.log('file data is ', req, file)
      callback(null,
        { fieldName: 'Test Meta Data' })
    },
    key: function (req, file, callback) {
      callback(null, Date.now().toString())
    }
  })
})

module.exports = upload
