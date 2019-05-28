/**
 * @Purpose     :
 * @file        : loginServices.js
 * @author      : Anuj
 * @since       : 23-05-2019
 */

 var userServices = require('../services/userServices');

 exports.registration = (req,res) => {
     try{
         var responce = { }
        userServices.registration(req.body,(err,result) => {
            
            if(err){
                responce.sucess = false,
                responce.error  = err,
                res.status(400).send(err)
            }
            else{
                responce.sucess = false,
                responce.result = true,
                res.status(200).send(result);
            }
        })
    }
    catch(error){
        console.log(" Controller Catch ", error);
        res.send(error);
    }
}
/**
 * 
 */
exports.verification = (req,res) => {
    try{
        console.log(req.decoded.payload.email)
        var responce = { }
       userServices.verification(req,(err,result) => {
           
           if(err){
               responce.sucess = false,
               responce.error  = err,
               res.status(400).send(err)
           }
           else{
               responce.sucess = false,
               responce.result = true,
               res.status(200).send(result);
           }
       })
   }
   catch(error){
       console.log(" Controller Catch ", error);
       res.send(error);
   }
}
/**
 * 
 */
exports.login = (req,res) => {
    try{
        var responce = { }
       userServices.login(req.body,(err,result) => {
           
           if(err){
               responce.sucess = false,
               responce.error  = err,
               res.status(400).send(err)
           }
           else{
               responce.sucess = false,
               responce.result = true,
               res.status(200).send(result);
           }
       })
   }
   catch(error){
       console.log(" Controller Catch ", error);
       res.send(error);
   }
}
/**
 * verify User and create token
 */
exports.verifyUser = (req,res) => {
    try{
        var responce = { }
       userServices.verifyUser(req.body,(err,result) => {
           
           if(err){
               responce.sucess = false,
               responce.error  = err,
               res.status(400).send(err)
           }
           else{
               responce.sucess = false,
               responce.result = true,
               res.status(200).send(result);
           }
       })
   }
   catch(error){
       console.log(" Controller Catch ", error);
       res.send(error);
   }
}
/**
 * Reset Password
 */
exports.resetPassword = (req,res) => {
    try{
        var responce = { }
       userServices.resetPassword(req,(err,result) => {
           
           if(err){
               responce.sucess = false,
               responce.error  = err,
               res.status(400).send(err)
           }
           else{
               responce.sucess = false,
               responce.result = true,
               res.status(200).send(result);
           }
       })
   }
   catch(error){
       console.log(" Controller Catch ", error);
       res.send(error);
   }
}