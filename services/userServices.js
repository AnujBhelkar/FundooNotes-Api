/**********************************************************************************
 * @Purpose     : To create service for user.
 * @file        : loginServices.js
 * @author      : Anuj
 * @since       : 23-05-2019
 ***********************************************************************************/

 var userModel = require('../app/model/userModel');
/**
 * @description : create service for registration.
 * @param   {* requested from frontend} req
 * @param   {* responce to backend} res
 */
 exports.registration = (req,res) => {
    try{
        userModel.registration(req,(err,result) => {
            if(err){
                console.log("Service Error" , err)
                res(err);
            }
            else{
                console.log("Service In ")
                res(null,result)
            }
        })
    }
    catch(err){
        console.log("Catch Error In services ",err)
        res(err)
    }
 }
 /**
  * @description : create service for verification of email id for login purpose. 
  * @param   {* requested from frontend} req
  * @param   {* responce to backend} res
  */
 exports.verification = (req,res) => {
    try{
        var data = {
            email : req.decoded.payload.email
        }
        userModel.verification(data,(err,result) => {
            if(err){
                console.log("Service Error" , err)
                res(err);
            }
            else{
                console.log("Service In ")
                res(null,result)
            }
        })
    }
    catch(err){
        console.log("Catch Error In services ",err)
        res(err)
    }
 }
 /**
  * @description : create service for user login
  * @param   {* requested from frontend} req
  * @param   {* responce to backend} res
  */
 exports.login = (req,res) => {
    try{
        userModel.login(req,(err,result) => {
            if(err){
                console.log("Service Error" , err)
                res(err);
            }
            else{
                console.log("Service In ")
                res(null,result)
            }
        })
    }
    catch(err){
        console.log("Catch Error In services ",err)
        res(err)
    }
 }
 /**
  * @description : create service to verify user for getting token of reset password.  
  * @param   {* requested from frontend} req
  * @param   {* responce to backend} res
  */
 exports.verifyUser = (req,res) => {
    try{
        userModel.verifyUser(req,(err,result) => {
            if(err){
                console.log("Service Error" , err)
                res(err);
            }
            else{
                console.log("Service In ")
                res(null,result)
            }
        })
    }
    catch(err){
        console.log("Catch Error In services ",err)
        res(err)
    }
 }
 /**
  * @description : create service for reset password
  * @param   {* requested from frontend} req
  * @param   {* responce to backend} res
  */
 exports.resetPassword = (req,res) => {
    try{
        var data ={
            _id : req.decoded.payload._id,
            password : req.body.password,
            confirmPassword : req.confirmPassword
        }
        userModel.resetPassword(data,(err,result) => {
            if(err){
                console.log("Service Error" , err)
                res(err);
            }
            else{
                console.log("Service In ")
                res(null,result)
            }
        })
    }
    catch(err){
        console.log("Catch Error In services ",err)
        res(err)
    }
 }