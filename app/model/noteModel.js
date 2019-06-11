/**************************************************************************************
 * @Purpose     :
 * @file        : noteModel.js
 * @author      : Anuj
 * @since       : 30-05-2019
 **************************************************************************************/
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * @description : Here Creating Schema for Note..
 */
var noteSchema = mongoose.Schema({
    userId      : {
       type     : Schema.Types.ObjectId,
       required : [true, 'User Id Required'],
       ref      : 'Note'
    },
    title       : {
       type     : String
    },
    description  : {
       type     : String
    },
    reminder    : {
        type    : String
    },
    color       :{
        type    : String
    },
    archive     : {
        type    : Boolean
    },
    trash       :{
        type    : Boolean
    },
    label       : [
        {
            type : String,
            ref  : 'labelSchema' 
        }
    ]
},  
    {
    timestamps  : true
    });

var note = mongoose.model('Note',noteSchema)

function noteModel() { }
/**
 * @description  : Create note and store it into Database
 * @param {* request from front end} objectNote
 * @param {* responce to back end}   callback
*/
 
noteModel.prototype.addNote = (req,callback) => {
    try{
        //console.log('model body',req.body)
        var add = new note({
            userId      : req.userId,
            title       : req.title,
            description : req.description,
            reminder    : req.reminder,
            color       : req.color,
            trash       : req.trash,
            label       : req.label,
            archive     : req.archive
        })
        add.save((err,result) => {
            if(err){
                console.log("Error in Saving Data",err)
                callback(err)
            }
            else{
                console.log("Data Save Successfully",result)
                callback(null,result)
            }
        })
    }
    catch(err){
        console.log("Error in add note catch",err);
        callback(err)
    }       
}
/**
 * @description  : it will get the data from user id and find the data
 * @param   {* request from frontend} id 
 * @param   {* response to backend} callback
 */
noteModel.prototype.getNote = (id,callback) => { 
    //console.log("id is",id);
   try{ 
        note.find({
            userId  : id.userId
        },(err,result) => {
            if(err) {
                console.log("Error in model for getting Notes",err)
                callback(err)
            }
            else{
                console.log("All Notes",result)
                callback(null,result)
            }    
        })
    }
    catch(err){
        console.log("Error in get note catch",err);
        callback(err)
    }
}

/**
 * @description : it will archieved the notes
 * @param   {* requested from frontend } noteId
 * @param   {* requested from frontend } archive
 * @param   {* responce to backend } callback
 */
noteModel.prototype.isArchived = ( noteId, archive,callback) => {
    try{
        console.log("fsdsdf",noteId);
        
        note.findOneAndUpdate({
            _id : noteId
        },{
            $set : {
                archive : archive,
                trash   : false
            }
        },(err,result) => {
            if(err){
                console.log("Error In isArchived");
                callback(err)
            }
            else{
                console.log("is archived successfully..",result);
                callback(null,result)
            }
        })
    }
    catch(error){
        console.log("isArchieve is catch");
        
    }
}
/**
 * @description :  it will check trash status
 * @param  {* requested from frontend } id
 * @param  {* responce to backend } callback
 */
noteModel.prototype.trashStatus = (id,callback) => {
    note.findOneAndUpdate = ({_id : id} ,(err,result) =>{
      if(err){
          console.log("Error in trash status");
          callback(err)
      }  
      else{
          console.log("Trash status",result);
          callback(null,result.trash)
      }
    })
}
/**
 * @description : it will trash the note
 * @param {* requested from frontend }
 * @param {* requested from frontend }
 * @param {* responce to backend }
 */
noteModel.prototype.isTrashed = (noteId,trashNote,callback) => {
    note.findOneAndUpdate({
            _id : noteId
        },{
            $set : {
                trash : trashNote.status,
                archive : false
            }
        },
        (err,res) => {
            if(err) {
                console.log("Error in trashed");
                callback(err)
            }
            else{
                console.log("trash ",res);
                callback(null,res)
            }
    })
}
/**
 * @description : it will set reminder to note and show it in reminders
 * @param {* requested from frontend } noteId  
 * @param {* requested from frontend } reminderParams
 * @param {* response to backend     } callback
 */
noteModel.prototype.reminder = (noteId,reminderParams,callback) => {
    note.findOneAndUpdate({
        _id : noteId
    },{
        $set : {
            reminder : reminderParams
        }
    },
    (err,result) =>{
        if(err){
            console.log("Error in reminder");
            callback(err)
        }
        else{
            console.log("reminder",result);
            callback(result)
        }
    })
}

/**
 * @description : Here i export the noteModel.
 */

module.exports = new noteModel();
