/**
 * @Purpose     :
 * @file        : noteController.js
 * @author      : Anuj
 * @since       : 30-05-2019
 */
var noteServices = require('../services/noteServices')
var authent      = require('../middleware/allAboutToken');
var redis = require('redis')
var client = redis.createClient()
exports.createNote = (req,res) => {
    
    var responce = {};
    noteServices.createNote(req,(err,result) => {
        if(err){
            responce.success = false,
            responce.error   = err,
            res.status(400).send(responce)
        }
        else{
            
            client.get('token',(err,replay)=> {
                if(err){
                    console.log("error",err)
                    throw err
                }
                console.log("Get Result" + replay);
           });
            var token = client.get('token',(err,result) => {

                if(err){
                    console.log("Error in geting token through redis");
                    console.log(result)
                    res(err)
                }
            })
            var goInside = authent.verification(token)
            console.log(goInside)
                if(goInside){
                    responce.success = false,
                    responce.result  = goInside,
                    res.status(400).send(responce)
                }
                else{
                    responce.success = false,
                    responce.error   = error,
                    res.status(400).send(responce)    
                }
        }
    })
}