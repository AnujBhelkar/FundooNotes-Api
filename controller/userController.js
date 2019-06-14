/*****************************************************************************************
 * @Purpose     : To create controller for user.
 * @file        : loginServices.js
 * @author      : Anuj
 * @since       : 23-05-2019
 ****************************************************************************************/

 var userServices = require('../services/userServices');
 var tokens = require('../middleware/allAboutToken')
 /**
  * @description    : Registration of user.
  * @param  {* requested from frontend } req
  * @param  {* responce to backend} res
  */
 exports.registration = (req,res) => {
     try{
         req.checkBody('email','Invalid Email').isEmail();
         //req.checkBody('password',"Please Enter Valid Password").isPassword();
         var responce = { }
         var errors = req.validationErrors()
        if(errors){
            responce.sucess = false,
            responce.result = errors,
            res.status(400).send(responce);
        }
        else{
            userServices.registration(req.body,(err,result) => {
            
                if(err || result === undefined){
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
        console.log("Registration Controller Catch ");
        res.status(400).send({
            success : false,
            message : "Registration Controller catch"
        });
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
        console.log(" verification Controller Catch ");
        res.status(400).send({
            success : false,
            message : "verification Controller catch"
        });
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
           
           if(err || result === undefined){
               responce.sucess = false,
               responce.error  = err,
               res.status(400).send(responce)
           }
           else{
             //  session = result._id;
               const payload = {
                   _id   : result._id 
               }
               var gentoken = tokens.generateToken(payload)
               //client.set('token',gentoken,redis.print)
               client.set((result._id).toString(),gentoken,redis.print)
               console.log((result.id).toString());
               
            //    client.get(result._id,(err,replay)=> {
            //        if(err)
            //         console.log(err)
            //         else
                        //console.log("req.session",session);
                     //   console.log("genToken",gentoken)
                        //console.log("replay",replay)
              // }) 
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
        console.log(" Login Controller Catch ");
        res.status(400).send({
            success : false,
            message : "Login Controller catch"
        });
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
               res.status(400).send(responce)
           }
           else{
               responce.sucess = true,
               responce.result = result, 
               res.status(200).send(responce);
           }
       })
   }
   catch(error){
        console.log(" verify user Controller Catch for forget password ");
        res.status(400).send({
            success : false,
            message : "verify user Controller catch"
        });
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
        // let objParam = {
        //     _id :req.decoded.payload._id
        // }
       userServices.resetPassword(req,(err,result) => {
           
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
   catch(error){
        console.log(" Reset Controller Catch ");
        res.status(400).send({
            success : false,
            message : "Reset Controller catch"
        });
    }
}
/**
 * @description : Here user logout
 * @param {* requested from frontend } req
 * @param {* responce to backend } res
 */
exports.logout= (req,res) => {
    try{
        req.session.destroy((err,success) =>{
        if(err)
            res.status(400).send("logout Unsuccessful")
        else
            res.status(200).send("logout")
        })
    }
    catch(error){
        console.log("Logout Controller Catch ");
        res.status(400).send({
            success : false,
            message : "Logout Controller catch"
        });
    }    
}