/**
 * @Purpose     :
 * @file        : noteController.js
 * @author      : Anuj
 * @since       : 30-05-2019
 */
var noteServices = require('../services/noteServices')
var authent      = require('../middleware/allAboutToken');
// var redis = require('redis')
// var client = redis.createClient()
/**
 * @description : Here i get the request from frontend to save the notes 
 * @param {* requested from frontend } req
 * @param {* responce to backend} res
 */
exports.createNote = (req,res) => {
    
    var responce = {};
    noteServices.createNote(req,(err,result) => {
        if(err){
            responce.success = false,
            responce.error   = err,
            res.status(400).send(responce)
        }
        else{
        //     client.get('token',(err,replay)=> {
        //         if(err){
        //             console.log("error",err)
        //             throw err
        //         }
        //         console.log("Get Result" + replay);
        //    });
        //     var token = client.get('token',(err,result) => {

        //         if(err){
        //             console.log("Error in geting token through redis");
        //             console.log(result)
        //             res(err)
        //         }
        //     })
        //    var goInside = authent.verification(token)
          //  console.log(goInside)
           //     if(goInside){
                    var payload = {
                        userId : result.userId
                    }
                    var genToken = authent.generateToken(payload)
                    client.set('token',genToken,redis.print);
                    // client.get('token',(err,reply) => {
                    //     if(err){
                    //         console.log("error",err)
                    //     }
                    //     else{
                    //         console.log("result",reply)
                    //     }
                    // })
                    responce.success = true,
                    responce.result  = result,
                    responce.token   = genToken
                    res.status(400).send(responce)
                }
                // else{
                //     responce.success = false,
                //     responce.error   = error,
                //     res.status(400).send(responce)    
                // }
        //}
    })
}

/**
 * @description : Here i get the request from frontend for give the all save notes 
 * @param {* requested from frontend } req
 * @param {* responce to backend} res
 */
exports.getAllNotes = (req,callback) => {
    var responce = {};
    noteServices.getNote(req,(err,result) => {
        if(err) {
            responce.success = false,
            responce.error   = err,
            callback.status(400).send(responce);
        }
        else{
            responce.success = true,
            responce.result  = result,
            callback.status(200).send(responce);
        }
    })
}