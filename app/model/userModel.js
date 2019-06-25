/******************************************************************************************
 * @Purpose     : Create Schema for storing font end data into Mongo Database.            *
 * @file        : loginModel.js                                                           *
 * @author      : Anuj                                                                    *
 * @since       : 22-05-2019                                                              *
 ******************************************************************************************/

 /**
  *@description:  Import the mongoose Library and bcrypt Package
  */
 var mongoose = require('mongoose');
 var bcrypt   = require('bcrypt');
 //var jwt      = require('jsonwebtoken');
 var tokenPayload = require('../../middleware/allAboutToken');
 var mail      = require('../../middleware/nodeMailer');
 //var session = require('express-session')
 /**
  * @description : Here Creating Schema 
  */
 var userSchema = new mongoose.Schema({
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
  * @description : Creating Model and put the data in fundoo collection
  */
  var model = mongoose.model('fundoo',userSchema);
 // module.exports.model1 = mongoose.model('fundoo',Schema);
  var saltRound = 10;
  function Model() { }
/**
 * @description : Here registration of user
 */
  Model.prototype.registration = (req,res) => {
        try{
            model.findOne({ 'email' : req.email },(err,data) => {
                if(err){
                    console.log('Error in Registration ', err);
                    return res(err)
                }
                else if(data != null){
                    console.log("Email Already Exists")
                    return res(err)
                }
                else{
                        console.log(data);

                       // var pass = req.password;
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
                                var url = `${process.env.isVerified}/${token}` ;
                                console.log('Url',url)
                                //mail.sendEmail(url,newUser.email,pass);
                                //localStorage.setItem('token',token)
                                console.log("Registration Successfully..!!")
                                return res(null,response);
                            })
                            .catch(err => {
                                console.log("Error In Registration", err);
                                return res(err);
                            })
            }
        
        })
    }
    catch(err){
        console.log("Error in registration catch block",err);
        res(err)
    }
  }
  /**
   * @description : conformation of user for login
   */
Model.prototype.verification = (req,res) => {
    try{
            //return model.isVerified = true;
            console.log("Decoded Email ",req.email);
        model.findOneAndUpdate({email : req.email},
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
    catch(err){
        console.log("Error in user email verification catch block");
        res(err)
    }
  }
  /**
   * @description : If user is verified then it will login otherwise not
   */
Model.prototype.login =(req,callback) =>{
    try{
        model.findOne({email : req.email},(err,result) => {
            //console.log("What is in result",result)
            if(err){
                console.log("Please Enter Valid Email Address..!!")
                callback(err)
            }
            else if(result === null){
                console.log("Invalid User")
                return callback(err)
            }
            else if(result.isVerified === null || !result.isVerified  ){
            //  console.log("verify or not ",model.isVerified)
                console.log("verify First..!!");
                callback(err)
            }
            else{
                
                bcrypt.compare(req.password,result.password,(err,res)=> {
                    if(!res){
                        console.log("Password Incorrect");
                        return callback(err)
                    }
                    else{
                        console.log("Login Successfully");
                        return callback(null,result)
                    }
                })
                    
            }
        })
    }
    catch(err){
        console.log("Error in login catch block",err);
        res(err)   
    }
}
/**
 * @description : Verify User Bye Email id for forget password
 */
Model.prototype.verifyUser = (req,res) => {
    try{
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
                var url = `${process.env.resetPassword}/${token}` ;
                console.log('Url',url)
                //mail.sendEmail(url,req.email);
                console.log("User Available")
                res(null,result)
            }
        })
    }
    catch(err){
        console.log("Error forget verifcation catch block",err);
        res(err)
    }
}

/**
 * @description : here reseting Password
 */
Model.prototype.resetPassword = (req,res) => {
    try{
        model.findOne({_id : req._id},(err,result) => {
            if(err){
                console.log(" Error in Authentication ")
                res(err)
            }
            else{
                console.log("pass",req.password,"cpass",req.confirmPassword)
                if(req.password === req.confirmPassword){
                    var newPass = bcrypt.hashSync(req.password,saltRound);
                    model.updateOne({_id : req._id},
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
    catch(err){
        console.log("Error in reseting Password catch block",err);
        res(err)
    }
}

Model.prototype.getUserDetails = (id,res) => {
    console.log("ultimate save");
    try{
    model.find({ _id : id},
       // {note : 0 , password : 0},
        function (err, result) {
            if (err) {
                return res(err);
            } else {
                return res(null,result);
            }
        })
    }
    catch(err){
        console.log("Error in reseting Password catch block",err);
        return res.send(err)
    }
};

 /**
 * @description : export function for accessing method of function
 */
  module.exports = new Model()