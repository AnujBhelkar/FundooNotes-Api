/*****************************************************************************************
 * @Purpose     : To create Service for Note
 * @file        : noteServices.ja
 * @author      : Anuj
 * @since       : 30-05-2019
 *****************************************************************************************/
/**
 * @description : Here i call the notemodel file.
 */
var noteModel = require('../app/model/noteModel')
var userModel = require('../app/model/userModel')
var async = require('async')
/**
 * @description : Here Creating Service for creating note.
 * @param  {* requested from frontend } req
 * @param  {* responce to backend } res
 */
exports.createNote = (req,res) => {
    try{
        console.log(req.body);
        
        var data = {
            userId      : req.decoded.payload._id,
            title       : req.body.title,
            description : req.body.description,
            reminder    : req.body.reminder,
            color       : req.body.color,
            label       : req.body.label
        }
        noteModel.addNote(data,(err,result) => {
            if(err){
                console.log("Error in add note services",err)
                res(err)
            }
            else{
                console.log(" create note in Services ");
                res(null,result)
            }
        })
    }
    catch(err){
        return res.status(400).send({
            success : false,
            message : "catch in create note services"
      })
    }
}
/**
 * @description : Here creating service for getting Notes.
 * @param   {* requested from frontend} req
 * @param   {* responce to backend} callback
 */
exports.getNote = (req,callback) => {
    try{
        var id = req.decoded.payload._id
        noteModel.getNote(id,(err,result) => {
            if(err){
                console.log("Error in get Note Services")
                callback(err)
            }
            else{
                console.log("get Note in services");
                callback(null,result)
            }
        })
    }
    catch(err){
        return res.status(400).send({
            success : false,
            message : "catch in get all notes services"
      })
    }
}

/**
 * @description : Here creating service for deleting Note.
 * @param   {* requested from frontend} req
 * @param   {* responce to backend} callback
 */
exports.deleteNote = (req,callback) => {
    try{
        var noteId = req.noteId
        noteModel.deleteNote(noteId,(err,result) => {
            if(err){
                console.log("Error in delete Note Services")
                callback(err)
            }
            else{
                console.log("Delete Note services");
                callback(null,result)
            }
        })
    }
    catch(err){
        return res.status(400).send({
            success : false,
            message : "catch in delete notes services"
      })
    }
}

/**
 * @description : it will send edit title data to model.
 * @param   {* requested from frontend } req 
 * @param   {* responce to backend } callback
 */
exports.editTitle = (req,callback) => {
    try{
        var noteID = req.noteId;
        var titleParam = req.title;
        noteModel.editTiile(noteID,titleParam,(err,result) => {
            if(err){
                console.log("Error edit title");
                callback(err)
            }
            else{
                console.log("Title editted Successfully",result);
                callback(null,result)
            }
        })
    }
    catch(err){
        return callback.status(400).send({
            success : false,
            message : "catch in edit title services"
      })
    }
}

/**
 * @description : it will send edit description data to model.
 * @param   {* requested from frontend } req 
 * @param   {* responce to backend } callback
 */
exports.editDescription = (req,callback) => {
    try{
        var noteID = req.noteId;    
        var descParam = req.description;
        noteModel.editDescription(noteID,descParam,(err,result) => {
            if(err || result === undefined){
                console.log("Error in edit description");
                return callback(err)
            }
            else{
                console.log("Description editted Successfully",result);
                return callback(null,result)
            }
        })
    }
    catch(err){
        return callback.status(400).send({
            success : false,
            message : "catch in edit title services"
      })
    }
}

/**
 * @description : it will send add label data to model.
 * @param   {* requested from frontend } req 
 * @param   {* responce to backend } callback
 */
exports.addLabel = (req,callback) => {
    try{
        var labelData = {
            userId : req.decoded.payload._id,
            label  : req.body.label
        }
        noteModel.addLabel(labelData,(err,result) => {
            if(err || result === undefined){
                console.log("Error adding Label");
                return callback(err)
            }
            else{
                console.log("Added label Successfully",result);
                return callback(null,result)
            }
        })
    }
    catch(err){
        return callback.status(400).send({
            success : false,
            message : "catch in add label services"
      })
    }
}

/**
 * @description : it will send edit label data to model.
 * @param   {* requested from frontend } req 
 * @param   {* responce to backend } callback
 */
exports.updateLabel = (req,callback) => {
    try{
        noteModel.updateLabel(req,(err,result) => {
            if(err || result === undefined){
                console.log("Error in updating Label");
                return callback(err)
            }
            else{
                console.log("update Label Successfully",result);
                return callback(null,result)
            }
        })
    }
    catch(err){
        return callback.status(400).send({
            success : false,
            message : "catch in upadate label services"
      })
    }
}

/**
 * @description : it will send delete label data to model.
 * @param   {* requested from frontend } req 
 * @param   {* responce to backend } callback
 */
exports.deleteLabel = (req,callback) => {
    try{
        var labelId = req.labelId;
        noteModel.deleteLabel(labelId,(err,result) => {
            if(err || result === undefined){
                console.log("Error in deleting Label");
                return callback(err)
            }
            else{
                console.log("Delete Label Successfully",result);
                return callback(null,result)
            }
        })
    }
    catch(err){
        return callback.status(400).send({
            success : false,
            message : "catch in delete label services"
      })
    }
}
/**
 * @description : it will send get all label data to model.
 * @param   {* requested from frontend } req 
 * @param   {* responce to backend } callback
 */
exports.getAllLabel = (req,callback) => {
    try{
        var noteId = req.decoded.payload._id;
        noteModel.getAllLabel(noteId,(err,result) => {
            if(err || result === undefined){
                console.log("Error in getting all Label");
                return callback(err)
            }
            else{
                console.log("Get All Label Successfully",result);
                return callback(null,result)
            }
        })
    }
    catch(err){
        return callback.status(400).send({
            success : false,
            message : "catch in get all label services"
      })
    }
}

/**
 * @description : it will add label note data pass to model.
 * @param   {* requested from frontend } req 
 * @param   {* responce to backend } callback
 */
exports.savelabelToNote = (req,callback) => {
    try{
        var noteId = req.noteId;
        var labelParam = req.label;
        noteModel.savelabelToNote(noteId,labelParam,(err,result) => {
            if(err){
                console.log("Error in saving label to note");
                return callback(err)
            }
            else{
                console.log("Saved label to note Successfully",result);
                return callback(null,result)
            }
        })
    }
    catch(err){
        return callback.status(400).send({
            success : false,
            message : "catch saving label to note Model"
      })
    }
}
/**
 * @description : it will delete label note data pass to model.
 * @param   {* requested from frontend } req 
 * @param   {* responce to backend } callback
 */
exports.deletelabelToNote = (req,callback) => {
    try{
        var noteId = req.noteId;
        var labelParam = req.label;
        noteModel.deletelabelToNote(noteId,labelParam,(err,result) => {
            if(err){
                console.log("Error in deleting label to note");
                return callback(err)
            }
            else{
                console.log("delete label from note Successfully",result);
                return callback(null,result)
            }
        })
    }
    catch(err){
        return callback.status(400).send({
            success : false,
            message : "catch delete label to note Model"
      })
    }
}


/**
 * @description : it will send archieved data to model.
 * @param   {* requested from frontend } paramId
 * @param   {* requested from frontend } paramData 
 * @param   {* responce to backend } callback
 */
exports.isArchived = (paramId,paramData,callback) => {
    noteModel.isArchived(paramId,paramData,(err,result) => {
        if(err){
            console.log(" Error in archived ");
            callback(err)
        }
        else{
            console.log("archived service",result);
            callback(null,result)
        }
    })
}

/**
 * @description : it will send trash data to model.
 * @param   {* requested from frontend } paramId
 * @param   {* responce to backend } callback
 */
exports.isTrashed = (paramId,callback) => {
    noteModel.trashStatus(paramId,(err,status) => {
        if(err){
            console.log("Error in trash status");
            callback(err)
        }
        else{
            if(status === true){
                var data = {
                    status : false
                }
                noteModel.isTrashed(paramId,data,(err,result) => {
                    if(err){
                        console.log("Error in Trashed service");
                        callback(err)
                    }
                    else{
                        callback(null,result)
                    }
                })
            }
            else if(status === false){
                var statusData = {
                    status : true
                }
                noteModel.isTrashed(paramId,statusData,(err,result) => {
                    if(err){
                        console.log("Error in Trashed service");
                        callback(err)
                    }
                    else{
                        callback(null,result)
                    }
                })
            }
        }
    })
}


/**
 * @description : it will send reminder data to model.
 * @param   {* requested from frontend } paramId
 * @param   {* requested from frontend } paramData 
 * @param   {* responce to backend } callback
 */
exports.reminder = (paramId,paramData,callback) => {
    noteModel.reminder(paramId,paramData,(err,result) => {
        if(err){
            console.log(" Error in archived ");
            callback(err)
        }
        else{
            console.log("reminder service",result);
            callback(null,result)
        }
    })
}

/**
 * @param {* } collabData
 * @param {* } callback
 */
exports.saveCollaborator = (collabData,callback) => {
    noteModel.saveCollab(collabData , (err,result) => {
        if(err){
            callback(err)
        }
        else{
            callback(null,result)
        }
    })
}

/**
 * @param {* } userId
 * @param {* } callback
 */
exports.getCollabNotesUserId = (userId,callback) => {
    noteModel.getCollabNotesUserId(userId,(err,result) => {
        if(err){
            console.log("service error");
            callback(err)
        }
        else{
            callback(null,result)
        }
    })
}

// /**
//  * @param {*} callback
//  */ 
// exports.getcollabDetails = (callback) => {
//     userModel.
// }

/**
 * @param {* requested from frontend } req
 * @param {* response to backend } callback
 */
// noteModel.getCollabNotesUserId;
// noteModel.getCollabOwnerUserId;
// noteModel.getDataByNoteId;
// userModel.getUserDetails;
//  exports.get = (id,callback) => {
//     noteModel.getNote(id,(err,result) => {
//         if(err){
//             callback("Error in getting note in get services")
//         }
//         else{
//             var finalResult = { }
//             userModel.getUserDetails(id,(errUser,resultUser) => {
//                 if(errUser){
//                     callback('Error in getting user Detail in get sevices')
//                 }
//                 else{
//                     var noteOwner = {
//                         firstName : resultUser.firstName,
//                         lastName  : resultUser.lastName,
//                         userId    : resultUser._id
//                     }
//                     for(var i = 0; i < result.length; i++ ){
//                         var userDetails = {
//                             owner : noteOwner,
//                             note  : result[i],
//                             collab : []
//                         }
//                         finalResult.push(userDetails)
//                     }
//                     var data; 
//                     noteModel.getCollabOwnerUserId(id,(errCollab,resultOwnerCollab) => {
//                         if(errCollab){
//                             callback('Error in get collab owner user id')
//                         }else{
//                            // data = resultOwnerCollab.collabId
//                             for(var i = 0 ; i < finalResult.length ; i++ ){
//                                 for(var j = 0 ; j < resultOwnerCollab ; j++ ){
//                                     if(finalResult[i].note._id.equals(resultOwnerCollab[j].noteId)){
//                                         finalResult[i].collab.push(resultOwnerCollab[j].collabId)
//                                     }
//                                 }
//                             }
//                         }
//                     })
//                     console.log(data);
                    
//                     noteModel.getCollabNotesUserId(data,(collobNotesError, collobNotesResult) => {
//                         if(collobNotesError){
//                             callback('Error in collob notes Error ')
//                         }
//                         else{
//                             var operations = []
//                             console.log("dsfgadgsj",collobNotesResult);
//                             for(var i = 0; i < collobNotesResult.length; i++ ){
//                                 operations.push((function(collabData){
//                                     return function(callback){  
//                                         noteModel.getDataByNoteId(collabData.noteId,(errNote,getNoteResult) => {
//                                             if(errNote){
//                                                 callback("Error in getting data by note id")
//                                             }
//                                             else{
//                                                 var collabArray = { }
//                                                 for(var i = 0 ; i < getNoteResult ; i++ ){
//                                                     collabArray.push(getNoteResult[i].collabUserId)
//                                                 }
//                                                 var collabNote = {
//                                                     note : getNoteResult[0].noteId,
//                                                     owner : getNoteResult[0].userId,
//                                                     collab : collabArray
//                                                 }
//                                                 finalResult.push(collabNote)
//                                                 callback(null,collabNote)
//                                             }
//                                         }) 
//                                     }
//                                 }) (collobNotesResult[i]) )
//                             }
//                             async.series(operations,(errorAsync,resultAsync) => {
//                                 console.log(resultAsync);
//                                 if(errorAsync){
//                                     callback(errorAsync)
//                                 }
//                                 else{
//                                  callback(null,finalResult)   
//                                 }
//                             })
//                         }
//                     })
//                 }
//             })
//         }
//     }) 
//  }  

/**
 * @description : get collab notes 
 * @param {* requested from frontend } data
 * @param {* response to backend } callback
 */

exports.get = (data, callback) => {
    try{
        var finalResult = [];
        noteModel.getNote(data, (err, result) => {
            if (err) {
                callback(err);
            } else {
                userModel.getUserDetails(data, (errorUser, resultUser) => {                
                    if (errorUser) {
                        callback(errorUser);
                    } else {
                        const noteOwner = {
                            firstName: resultUser[0].firstName,
                            lastName: resultUser[0].lastName,
                            _id : resultUser[0]._id
                        }
                        //console.log("final Result 244 " ,noteOwner);
                        for (var i = 0; i < result.length; i++) {
                            var userNote = {
                                note: result[i],
                                owner: noteOwner,
                                collab: []
                            }
                            finalResult.push(userNote);
                    // console.log("final Result  "+ i ,userNote);
                        }
                        noteModel.getCollabOwnerUserId(data, (errorCollab, resultOwnerCollab) => {
                            if (errorCollab) {
                                callback(errorCollab);
                            } else {
                                console.log("resulcollabowner  ", resultOwnerCollab);
                                for (var i = 0; i < finalResult.length; i++) {
                                    for (var j = 0; j < resultOwnerCollab.length; j++) {
                                        if (finalResult[i].note._id.equals(resultOwnerCollab[j].noteId)) {
                                            finalResult[i].collab.push(resultOwnerCollab[j].collabId)
                                        }
                                    }
                                }
                                callback(null, finalResult)
                            }
                        })
                    
                    }
                })
            }
        })
    }
    catch(err){
        callback.status(400).send('Catch get notes with collab')
    }
}

/**
 * @description : get collab notes 
 * @param {* requested from frontend } data
 * @param {* response to backend } callback
 */

exports.collabGet = (data,callback) => { 
      //console.log("final Result 2 " ,finalResult);
    try{
        var finalResult = [];
        noteModel.getCollabNotesUserId(data, (errorCollab, resultCollab) => {
            if (errorCollab) {
                callback(errorCollab);
            } else {
                console.log("get collab notes user id service",resultCollab);
                var operations = [];
                for (var i = 0; i < resultCollab.length; i++) {
                    operations.push((function (collabData) {
                        return function(callback) {
                        console.log(i,collabData);
                            noteModel.getDataByNoteId(collabData.noteId, (errorNote, resultNote) => {
                                if (errorNote) {
                                    callback(errorNote)
                                } else {
                                    var collabUserArray = [];
                                    for (var i = 0; i < resultNote.length; i++) {
                                        collabUserArray.push(resultNote[i].collabId)
                                    }
                                    var collabNote = {
                                        note: collabData.noteId,
                                        owner: collabData.userId,
                                        collab: collabUserArray
                                    }
                                    finalResult.push(collabNote);
                                    console.log("asdhfj");
                                    
                                    callback(null, collabNote)
                                }
                            })
                        }
                    })(resultCollab[i]))
                
                    async.series(operations,(errorAsync,resultAsync) => {
                        console.log("RESULT",resultAsync);
                        if(errorAsync){
                            callback(errorAsync)
                        }
                        else{
                        console.log("final result ",finalResult);
                            callback(null,finalResult)   
                        }
                    })
                }
            }
        })
    }
    catch(err){
        callback.status(400).send('Catch collab notes ')
    }
}

