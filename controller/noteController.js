/*****************************************************************************************
 * @Purpose     : To create controller for notes.
 * @file        : noteController.js
 * @author      : Anuj
 * @since       : 30-05-2019
 ****************************************************************************************/
var noteServices = require('../services/noteServices')
var authent      = require('../middleware/allAboutToken');
redis = require('redis')
var client = redis.createClient(6379,'127.0.0.1');

/**
 * @description : Here i get the request from frontend to save the notes 
 * @param {* requested from frontend } req
 * @param {* responce to backend} res
 */
exports.createNote = (req,res) => {
    try{
        var response = { };
        //var errors = req.validationErrors();
        // if(errors){
        //     response.success = false,
        //     response.error   = errors,
        //     res.status(422).send(response)
        // } 
        // else {
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
                            // var payload = {
                            //     userId : result.userId
                            // }
                            // var genToken = authent.generateToken(payload)
                            //client.set(result.userId,genToken,redis.print);
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
                        // responce.token   = genToken
                            res.status(400).send(responce)
                        }
                        // else{
                        //     responce.success = false,
                        //     responce.error   = error,
                        //     res.status(400).send(responce)    
                        // }
                //}   
            })
        //}
    }
    catch(err){
        console.log("Error in creating notes",err);
        res(err)
    }
}

/**
 * @description : Here i get the request from frontend for give all notes.  
 * @param {* requested from frontend } req
 * @param {* responce to backend} callback
 */
exports.getAllNotes = (req, res ) => { //callback) => {
    try{
        var responce = {};
        noteServices.getNote(req,(err,result) => {
            if(err) {
                responce.success = false;
                responce.error   = err;
                return res.status(400).send(responce);
            }
            else{
                responce.success = true;
                responce.result  = result;
                return res.status(200).send(responce);
            }
        })
    }
    catch(err){
        console.log("Error in get all notes contoller",err);
        return res.status(400).send(err);
    }
}
/**
 * @description : It handlt trash note .  
 * @param {* requested from frontend } req
 * @param {* responce to backend} res
 */
exports.isTrashed = (req,res) => {
    try{
        req.checkbody('noteId','noteId required ').not().isEmpty(); //mongoose.Types.ObjectId.isValid
        var response = { };
        var errors = req.validationErrors();
        if(errors){
            response.status = false
            response.error  = error
            res.status(422).send(response)
        } 
        else{
            var responseResult = { }
            noteId = req.body.noteId;

            noteServices.isTrashed(noteId,(err,result) => {
                if(err){
                    responseResult.status = false
                    responseResult.error = err
                    res.status(400).send(responseResult)
                }
                else{
                    responseResult.status = true
                    responseResult.result = result
                    res.status(200).send(responseResult)
                }
            })
        }
    }
    catch(err){
        console.log("Error catch in trash");
        res.send(err)
    }
}

/**
 * @description : It handle archived notes.  
 * @param {* requested from frontend } req
 * @param {* responce to backend} res
 */
exports.isArchived = (req,res) => {
    try{
        // req.checkbody('noteId','noteId required ').not().isEmpty();
        // req.checkbody('archive','archive required ').not().isEmpty();
        // var response = { };
        // var errors = req.validationErrors();
        // if(errors){
        //     response.status = false
        //     response.error  = error
        //     res.status(422).send(response)
        // } 
        // else{
            var responseResult = { }
            
            noteId = req.body.noteId;
            archive = req.body.archive;
            console.log("dsgds",noteId,archive);
            
            noteServices.isArchived(noteId,archive,(err,result) => {
                if(err){
                    responseResult.status = false
                    responseResult.error = err
                    res.status(400).send(responseResult)
                }
                else{
                    responseResult.status = true
                    responseResult.result = result
                    res.status(200).send(responseResult)
                }
            })
        //}
    }
    catch(err){
        console.log("Error catch in archived ");
        res.send(err)
    }
}

/**
 * @description : It handle the reminder notes.  
 * @param {* requested from frontend } req
 * @param {* responce to backend} res
 */
exports.reminder = (req,res) => {
    try{
        req.checkbody('noteId','noteId required').not().isEmpty();
        var response = { };
        var errors = req.validationErrors();
        if(errors){
            response.status = false
            response.error  = error
            res.status(422).send(response)
        } 
        else{
            var responseResult = { }
            noteId = req.body.noteId;
            reminder = req.body.reminder;
            noteServices.reminder(noteId,reminder,(err,result) => {
                if(err){
                    responseResult.status = false
                    responseResult.error = err
                    res.status(400).send(responseResult)
                }
                else{
                    responseResult.status = true
                    responseResult.result = result
                    res.status(200).send(responseResult)
                }
            })
        }
    }
    catch(err){
        console.log("Error catch in archived ");
        res.send(err)
    }
}
