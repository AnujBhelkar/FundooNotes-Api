/************************************************************************************
 * @Purpose : To create Service for notification
 * @file    : notificationServices.js
 * @author  : Anuj
 * @since   : 21-06-2019
 ***********************************************************************************/
var notificationModel = require('../app/model/notificationModel');

/**
 * @description : create service fro passing  data to update push notification model
 * @param {* requested from frontend }
 * @param {* response to dro} 
 */
exports.updatePushNotification = (req,callback) => {
    try{
        notificationModel.updatePushNotification(req,(err,result) => {
            if(err){
                callback('error in update push notification service')
            }
            else{
                callback(null,result)
            }
        })
    }
    catch(err){
        return callback.status(400).send({
            success : false,
            message : "update push notification service catch"
        })
    }
}

/**
 * @description : create service for passing data to update push notification model
 * @param {* requested from frontend }
 * @param {* response to dro} 
 */
exports.sendPushNotification = (req,callback) => {
    try{
        notificationModel.sendPushNotification(req,(err,result) => {
            if(err){
                callback('error in send push notification service')
            }
            else{
                callback(null,result)
            }
        })
    }
    catch(err){
        return callback.status(400).send({
            success : false,
            message : "send push notification service catch"
        })
    }
}