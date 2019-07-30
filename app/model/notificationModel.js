/***********************************************************************************
 * @Purpose      : create model for notication
 * @file         : notificationModel.js
 * @since        : 20-06-2019
 * @author       : Anuj
 **********************************************************************************/

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var noticationSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    require: [true, 'User Id required']
  },
  pushToken: {
    type: String,
    require: [true, 'pushToken required']
  }
}, {
  timestamps: true
})

var pushNotification = mongoose.model('Push', noticationSchema)

function noticationModel () { }

/**
  * @description    : crate note for update push notification
  * @param {* requested from frontend } req
  * @param {* responce to backend } callback
  */
noticationModel.prototype.updatePushNotification = (req, callback) => {
  try {
    pushNotification.findByIdAndUpdate({
      userId: req.userId
    }, {
      $set: {
        pushToken: req.pushToken
      }
    }, { upsert: true, new: true },
    (err, result) => {
      if (err) {
        return callback('Error in update push notification')
      } else {
        return callback(null, result)
      }
    }
    )
  } catch (err) {
    return callback.status(400).send({
      success: false,
      message: 'update push notification model catch'
    })
  }
}

/**
  * @description    : crate note for Send push notification
  * @param {* requested from frontend } req
  * @param {* responce to backend } callback
  */

noticationModel.prototype.sendPushNotification = (req, callback) => {
  try {
    pushNotification.findOne({
      userId: req.userId
    }, (err, result) => {
      if (err) {
        callback('Error in finding user id in send push notifiaction model')
      } else {
        callback(null, result.pushToken)
      }
    })
  } catch (err) {
    return callback.status(400).send({
      success: false,
      message: 'send push notification mpodel catch'
    })
  }
}

module.exports = new noticationModel()
