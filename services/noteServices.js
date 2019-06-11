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
            trash       : req.body.trash,
            label       : req.body.label,
            archive     : req.body.archive
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
        console.log("Error Creating Note Service",err);
        res(err)        
    }
}
/**
 * @description : Here creating service for getting Notes.
 * @param   {* requested from frontend} req
 * @param   {* responce to backend} callback
 */
exports.getNote = (req,callback) => {
    try{
        var id = {
            userId  : req.decoded.payload._id
        }
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
        console.log("Error get note Services",err);
        callback(err)   
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
                var data = {
                    status : true
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
