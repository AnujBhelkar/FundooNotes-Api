/**********************************************************************************
 * @Purpose     : To create service for user.
 * @file        : loginServices.js
 * @author      : Anuj
 * @since       : 23-05-2019
 ***********************************************************************************/

 var userModel = require('../app/model/userModel');
 var upload = require('../middleware/fileUploadingServices')
/**
 * @description : create service for registration.
 * @param   {* requested from frontend} req
 * @param   {* responce to backend} res
 */
 exports.registration = (req,res) => {
    try{
        userModel.registration(req,(err,result) => {
            if(err || result === undefined){
                console.log("Service Error" )
                return res(err);
            }
            else{
                console.log("Service In ")
                return res(null,result)
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
                console.log("Service Error" )
                return res(err);
            }
            else{
                console.log("Service In ")
                return res(null,result)
            }
        })
    }
    catch(err){
        console.log("Catch Error In services ")
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
            if(err || result === undefined){
                console.log("Service Error")
                return res(err);
            }
            else{
                console.log("Service In ",result)
                return res(null,result)
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
        id = req.decoded.payload._id;
        password = req.body.password;
        userModel.resetPassword(id,password,(err,result) => {
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
  * @description : create service for storing image Url
  * @param   {* requested from frontend} req
  * @param   {* responce to backend} res
  */
 exports.uloadFile = (req,res) => {
    try{
            id = req.decoded.payload._id;
        const uploadImage = upload.single('image')
        console.log("1234");
        
        uploadImage(req,res,(error,result) =>{
            if(error){
                res(error)
            }
            else{
                imageUrl = req.file.location;
                console.log(id,imageUrl);
                
                userModel.uploadFile(id,imageUrl,(err,result1) => {
                    if(err){
                        console.log("Service Error" , err)
                        res(err);
                    }
                    else{
                        console.log("Service In ")
                        res(null,result1)
                    }  
                })     
            }
        })
    }
    catch(err){
        console.log("Catch Error In services ",err)
        res(err)
    }
 }