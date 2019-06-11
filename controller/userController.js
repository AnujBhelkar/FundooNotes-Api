/*****************************************************************************************
 * @Purpose     : To create controller for user.
 * @file        : loginServices.js
 * @author      : Anuj
 * @since       : 23-05-2019
 ****************************************************************************************/

 var userServices = require('../services/userServices');
 var tokens = require('../middleware/allAboutToken')
 var redis  = require('redis')
 var client = redis.createClient(6379,'127.0.0.1');
 /**
  * @description    : Registration of user.
  * @param  {* requested from frontend } req
  * @param  {* responce to backend} res
  */
 exports.registration = (req,res) => {
     try{
         req.checkBody('email','Invalid Email').isEmail()
         var responce = { }
         var errors = req.validationErrors()
        if(errors){
            responce.sucess = true,
            responce.result = result,
            res.status(200).send(responce);
        }
        else{
            userServices.registration(req.body,(err,result) => {
            
                if(err){
                    responce.sucess = false,
                    responce.error  = err,
                    res.status(400).send(responce)
                }
                else{
                    responce.sucess = true,
                    responce.result = result,
                    res.status(200).send(responce);
                }
            })
        }
        
    }
    catch(error){
        console.log(" Controller Catch ", error);
        res.send(error);
    }
}
/**
 * @description : verification of user for login.
 * @param {* requested from frontend } req
 * @param {* responce to backend} res
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
               responce.sucess = true,
               responce.result = result,
               res.status(200).send(responce);
           }
       })
   }
   catch(error){
       console.log(" Controller Catch ", error);
       res.send(error);
   }
}
/**
 * @description : Here user login
 * @param {* requested from frontend } req
 * @param {* responce to backend } res
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
               session = result._id;
               const payload = {
                   _id   : result._id 
               }
               var gentoken = tokens.generateToken(payload)
               client.set('token',gentoken,redis.print)
               client.set((result._id).toString(),gentoken,redis.print)
               console.log((result.id).toString());
               
               client.get(result._id,(err,replay)=> {
                   if(err)
                    console.log(err)
                    else
                        console.log("req.session",session);
                     //   console.log("genToken",gentoken)
                        console.log("replay",replay)
               }) 
            //    client.keys('*', function (err, keys) {
            //     if (err) return console.log(err);
              
            //     for(var i = 0, len = keys.length; i < len; i++) {
            //       console.log(keys[i]);
            //     }
            //   });  
               responce.sucess = true,
               responce.result = result,
               responce.token  = gentoken,
               res.status(200).send(responce);
           }
       })
   }
   catch(error){
       console.log(" Controller Catch ", error);
       res.send(error);
   }
}
/**
 * @description : verify User and create token.
 * @param {* requested from frontend } req
 * @param {* responce to backend } res
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
               responce.sucess = true,
               responce.result = result,
               res.status(200).send(responce);
           }
       })
   }
   catch(error){
       console.log(" Controller Catch ", error);
       res.send(error);
   }
}
/**
 * @description : Here Reseting Password
 * @param {* requested from frontend } req
 * @param {* responce to backend } res
 */
exports.resetPassword = (req,res) => {
    try{
        var responce = { }
        let objParam = {
            _id :req.decoded.payload._id
        }
       userServices.resetPassword(objParam,(err,result) => {
           
           if(err){
               responce.sucess = false,
               responce.error  = err,
               res.status(400).send(err)
           }
           else{
               responce.sucess = true,
               responce.result = result,
               res.status(200).send(responce);
           }
       })
   }
   catch(error){
       console.log(" Controller Catch ", error);
       res.send(error);
   }
}
/**
 * @description : Here user logout
 * @param {* requested from frontend } req
 * @param {* responce to backend } res
 */
exports.logout= (req,res) => {
    req.session.destroy((err,success) =>{
    if(err)
        res.status(400).send("logout Unsuccessful")
    else
        res.status(200).send("logout")
    })
}