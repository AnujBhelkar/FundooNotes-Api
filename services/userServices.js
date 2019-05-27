/**
 * @Purpose     :
 * @file        : loginServices.js
 * @author      : Anuj
 * @since       : 23-05-2019
 */

 var userModel = require('../app/model/userModel');

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
  * 
  */
 exports.verification = (req,res) => {
    try{
        userModel.verification(req,(err,result) => {
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
  * 
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
  * 
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
  * 
  */
 exports.resetPassword = (req,res) => {
    try{
        userModel.resetPassword(req,(err,result) => {
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