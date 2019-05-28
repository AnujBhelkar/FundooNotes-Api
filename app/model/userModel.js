/******************************************************************************************
 * @Purpose     : Create Schema for storing font end data into Mongo Database.            *
 * @file        : loginModel.js                                                           *
 * @author      : Anuj                                                                    *
 * @since       : 22-05-2019                                                              *
 ******************************************************************************************/

 /**
  * Import the mongoose Library and bcrypt Package
  */
 var mongoose = require('mongoose');
 var bcrypt   = require('bcrypt');
 //var jwt      = require('jsonwebtoken');
 var tokenPayload = require('../../middleware/allAboutToken');
 var mail      = require('../../middleware/nodeMailer');
 /**
  * Create Schema 
  */
 var Schema = new mongoose.Schema({
     firstName  : {
         type       : String,
         required   : [true,'First Name Required']
     },
     lastName : {
         type       : String,
         required   : [true,"Last Name required"] 
     },
     email    : {
         type       : String,
         required   : [true,"Email Reuired for registration"]
     },
     password  : {
         type       : String,
         required   : [true,"Password required"]
     },
     isVerified :   {
        type        : Boolean,
        defaultValue: false,      
     }
 })
 /**
  * Creating Model and put the data in fundoo collection
  */
  var model = mongoose.model('fundoo',Schema);
 // module.exports.model1 = mongoose.model('fundoo',Schema);
  var saltRound = 10;
  function Model() { }

  Model.prototype.registration = (req,res) => {
        model.findOne({ 'email' : req.email },(err,data) => {
            if(err){
                console.log('Error in Registration ', err);
                res(err)
            }
            else if(data != null){
                console.log("Email Already Exists")
                res(err)
            }
            else{
                    console.log(data);
                    var pass = req.password;
                    req.password = bcrypt.hashSync(req.password,saltRound);
                    var newUser = new model({
                        "firstName"       : req.firstName,
                        "lastName"        : req.lastName,
                        "email"           : req.email,
                        "password"        : req.password,
                        "isVerified"      : 'false'
                        
                    });                  
                    const payload = {
                       email    : req.email
                
                    }
                //     var token = tokenPayload.generateToken(payload)
                //     localStorage.setItem('token','token');
                //   console.log("New User",newUser)
                //     newUser.save((err,result) => {
                //         if(err){
                //             console.log("Error In Save Registration")
                //             res(err)
                //         }
                //         else{
                //             console.log("Registration Successfully..!!")
                //             var url = 'http://localhost:3000/'+ token ;
                //             console.log('Url',url)
                //             // mail.sendEmail(url,newUser.email,pass);
                //             res(null,result);
                //         }
                //     }) 
                    
                    newUser.save()
                        .then((response) => {
                            var token = tokenPayload.generateToken(payload)
                            console.log("token",token)
                            var url = `http://localhost:4000/verify/${token}` ;
                            console.log('Url',url)
                            //mail.sendEmail(url,newUser.email,pass);
                            //localStorage.setItem('token',token)
                            console.log("Registration Successfully..!!")
                            res(null,response);
                        })
                        .catch(err => {
                            console.log("Error In Registration", err);
                            res(err);
                        })
            }
        
        })
  }
Model.prototype.verification = (req,res) => {
        //return model.isVerified = true;
        console.log("Decoded Email ",req.decoded.payload.email);
    model.findOneAndUpdate({email : req.decoded.payload.email},
        {"isVerified":true},
        (err,result) => {
        if(err) {
            console.log("Token on decode email",err);
            res(err)
        }
        else{
          // model.isVerified = true;
         console.log("Verify successfully", result)
         res(null,result)
          //return res(null,result)
        }
    })
  }
  /**
   * If user is verified then it will login otherwise not
   */

Model.prototype.login =(req,res) =>{
    model.findOne({email : req.email},(err,result) => {
        console.log("What is in result",result)
        if(err){
            console.log("Please Enter Valid Email Address..!!",err)
            res(err)
        }
        else if(!result.isVerified){
          //  console.log("verify or not ",model.isVerified)
            console.log("verify First..!!");
            res(err)
        }
        else if(result === undefined){
            console.log("Invalid User",err)
            res(err)
        }
        else{
            bcrypt.compare(req.password,result.password)
                .then(() => {
                    console.log("Login Successfully..",result)
                    res(null,result)
                })
                .catch(err => {
                    console.log("Password is Incorrect " , err);
                    res(err)
                })
        }
    })
}
/**
 *  Verify User Bye Email id
 */
Model.prototype.verifyUser = (req,res) => {
    model.findOne({email : req.email},(err,result) => {
        if(err){
            console.log("No User Found..!!")
            res(err)
        }
        else{
            var payload = {
                _id : result._id
            }
            var token = tokenPayload.generateToken(payload)
            console.log("token",token)
            var url = `http://localhost:4000/resetPassword/${token}` ;
            console.log('Url',url)
            //mail.sendEmail(url,req.email);
            console.log("User Available")
            res(null,result)
        }
    })
}

/**
 * 
 */
Model.prototype.resetPassword = (req,res) => {
    model.findOne({_id : req.decoded.payload._id},(err,result) => {
        if(err){
            console.log(" Error in Authentication ")
            res(err)
        }
        else{
            console.log("pass",req.body.password,"cpass",req.body.confirmPassword)
            if(req.body.password === req.body.confirmPassword){
                var newPass = bcrypt.hashSync(req.body.password,saltRound);
                model.updateOne({_id : req.decoded.payload._id},
                        {password : newPass} ,
                        (err,passSuccess) => {
                            if(err){
                                console.log("Error in Reset Password",result);
                                  res(err)
                            }
                            else{
                                console.log("Password change Successfully")
                                  res(null,passSuccess)
                            }
                        })
            }
            else{
                console.log("Password Must Be Same ")
                res(err)
            }
        }
    })
}

 /**
 * export function for accessing method of function
 */
  module.exports = new Model()