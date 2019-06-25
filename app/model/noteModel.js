/**************************************************************************************
 * @Purpose     : create Model for storing Note data in database
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
       ref      : 'userSchema'
    },
    title       : {
       type     : String,
       required : ['true','title required']
    },
    description  : {
       type     : String,
       required : ['true','description required']
    },
    reminder    : {
        type    : String
    },
    color       :{
        type    : String
    },
    archive     : {
        type    : Boolean,
        default : 'false'
    },
    trash       : {
        type    : Boolean,
        default : 'false'
    },  
    collab      : {
            type : String,
            ref  : 'collabSchema'
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
            label       : req.label
        })
        add.save((err,result) => {
            if(err){
                client.set(result.id + data, result);
                console.log("Error in Saving Data",err)
                callback(err)
            }
            else{
                console.log("Data Save Successfully",result)
                callback(null,result)
            }
        })
    }
    catch(error){
        console.log(" Catch the add note Block");
        callback.status(400).send({
            success : false,
            message : "Catch the add note Block"
        });
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
            userId  : id
        },(err,result) => {
            if(err) {
                console.log("Error in model for getting Notes",err)
                callback(err)
            }
            else{
               // console.log("All Notes",result)
                callback(null,result)
            }    
        })
    }
    catch(error){
        console.log(" Catch the get note Block");
        callback.status(400).send({
            success : false,
            message : "Catch the get notes Block"
        });
    }
}

/**
 * @description  : it will get the data from user id and delete the data
 * @param   {* request from frontend} id 
 * @param   {* response to backend} callback
 */
noteModel.prototype.deleteNote = (noteId,callback) => { 
    //console.log("id is",id);
   try{ 
       console.log("id is",noteId);
       
        note.deleteOne({
            _id  : noteId
        },(err,result) => {
            if(err) {
                console.log("Error in model for deleting Notes",err)
                callback(err)
            }
            else{
                console.log("Delete Note",result)
                client.set(result.id + data, result);
                callback(null,result)
            }    
        })
    }
    catch(error){
        console.log(" Catch the delete note Model Block");
        callback.status(400).send({
            success : false,
            message : "Catch the delete note Model Block"
        });
    }
}

/**
 * @description  : it will edit note title
 * @param   {* request from frontend} noteId
 * @param   {* request from frontend} titleParam 
 * @param   {* response to backend} callback
 */
noteModel.prototype.editTiile = (noteId,titleParam,callback) => {
    try{
        note.findOneAndUpdate({
            _id : noteId
        },{
            $set : {
                title   : titleParam
            }
        },(err,result) => {

            if(err){
                console.log("Error in edit title model");
                callback(err)
            }
            else{
                callback(null,result)
            }
        })
    }
    catch(error){
        console.log(" Catch the edit title Model Block");
        callback.status(400).send({
            success : false,
            message : "Catch the edit title Model Block"
        });
    }
}
 
/**
 * @description  : It will edit note Description.
 * @param   {* request from frontend} noteId
 * @param   {* request from frontend} descParam 
 * @param   {* response to backend} callback
 */
noteModel.prototype.editDescription = (noteId,descParam,callback) => {
    try{
        note.findOneAndUpdate({
            _id : noteId
        },{
            $set : {
                description : descParam
            }
        },(err,result) => {
            if(err || result === null){
                console.log("Error in edit description model");
                return callback(err)
            }
            else{
                return callback(null,result)
            }
        })
    }
    catch(error){
        console.log(" Catch the edit discription Model Block");
        callback.status(400).send({
            success : false,
            message : "Catch the edit discription Model Block"
        });
    }
}

/**
 * @description  : It will save label in note.
 * @param   {* request from frontend} noteId
 * @param   {* request from frontend} labelParam 
 * @param   {* response to backend} callback
 */
noteModel.prototype.savelabelToNote = (noteId,labelParam,callback) => {
    try{

        console.log(noteId,labelParam);
            
        // if(labelParam !== null){
        //     callback("Write something on label");
        // }
        // else{
            var labelledNote = labelParam;
            note.findOneAndUpdate(
                {
                    _id: noteId
                },
                {
                    $push: {
                        label: labelledNote,
                    }
                },
                (err, result) => {
                    if (err) {
                        callback(err)
                    } else {
                        console.log("in model success");
                        let res = result.label;
                        res.push(labelledNote);
                        return callback(null, res)
                    }
                });
       // }
    }
    catch(error){
        console.log(" Catch the save label to note Model Block");
        callback.status(400).send({
            success : false,
            message : "Catch the save label to note Model Block"
        });
    }
}

/**
 * @description  : It will delete label in note.
 * @param   {* request from frontend} noteId
 * @param   {* request from frontend} labelParam 
 * @param   {* response to backend} callback
 */
noteModel.prototype.deletelabelToNote = (noteId,labelParam,callback) => {
    try{
        // if(labelParam != null){
        //     callback("Write something on label");
        // }
        // else{
            var labelledNote = labelParam;
            note.findOneAndUpdate({
                _id : noteId
            },{
                $pull : {
                    label   : labelledNote
                }
            },(err,result) => {
                if(err){
                    
                    callback(err)
                }
                else{
                    console.log("Delete label Model ");
                    let newArray = result.label;
                    for(let i = 0; i < newArray.length; i++){
                        if(newArray[i] === labelledNote){
                            newArray.splice(i,1)
                            return callback(null,newArray)
                        }
                    }
                    
                }
            })   
            // note.findOneAndUpdate(
            //     {
            //         _id: noteId
            //     },
            //     {
            //         $pull: {
            //             label: labelledNote,
            //         }
            //     },
            //     (err, result) => {
            //         if (err) {
            //             callback(err)
            //         } else {
            //             let newArray = result.label;
            //             console.log("in model success result", result);
        
            //             for (let i = 0; i < newArray.length; i++) {
            //                 if (newArray[i] === labelledNote) {
            //                     newArray.splice(i, 1);
            //                     return callback(null, newArray)
            //                 }
            //             }
            //         }
            //     });
        //}
    }        
    catch(error){
        console.log(" Catch the delete label from note Model Block");
        callback.status(400).send({
            success : false,
            message : "Catch the delete label from note Model Block"
        });
    }
}

/**
 * @description : Here creating schema for label
 */

 var labelSchema = mongoose.Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'userSchema'
    }, 
    label : {
        type : String,
        require : [true,'label required'],

     }
 },{
     timestamps : true 
 })
var label = mongoose.model('Label',labelSchema)

/**
 * @description : it will add the label
 * @param   {* requested from frontend } labelData
 * @param   {* responce to backend } callback
 */

noteModel.prototype.addLabel = (labelData,callback) => {
    try{
        const data = new label(labelData)
        data.save((err,result) => {
            if(err){
                console.log("error in add label model");
                return callback(err)
            }
            else{
                console.log("label add successfully..",result);
                return callback(null,result)
            }
        })
    }
    catch(error){
        console.log(" Catch the add label Model Block");
        callback.status(400).send({
            success : false,
            message : "Catch the add label Model Block"
        });
    }        
}

/**
 * @description : it will update the label
 * @param   {* requested from frontend } labelparam
 * @param   {* responce to backend } callback
 */

noteModel.prototype.updateLabel = (labelParam,callback) => {
    try{
        var editLabel = null;
        var labelID =null;
        if( labelParam != null){
            editLabel = labelParam.label;
            labelID = labelParam.labelId
        }
        else{
            callback("Please write something on label")
        }
        label.findByIdAndUpdate({
            _id : labelID 
        },{
            $set : {
                label : editLabel
            }
        },(err,result) => {
            if(err){
                console.log("Error in update label model");
                callback(err) 
            }
            else{
                console.log("Successfully updated label",result);
                callback(null,result)
            }
        })
    }
    catch(error){
        console.log(" Catch the update label Model Block");
        callback.status(400).send({
            success : false,
            message : "Catch the update label Model Block"
        });
    }

}

/**
 * @description : it will delete the label
 * @param   {* requested from frontend } labelId
 * @param   {* responce to backend } callback
 */
noteModel.prototype.deleteLabel = (labelID,callback) => {
    try{
        label.deleteOne({
            _id :labelID
        },(err,result) => {
            if(err){
                console.log("Error in label Model");
                callback(err)
            }
            else{
                console.log("Label deleted succesfully");
                callback(null,result)
            }
        })
    }
    catch(error){
        console.log(" Catch the delete label Model Block");
        callback.status(400).send({
            success : false,
            message : "Catch the delete label Model Block"
        });
    }
}


/**
 * @description : it will get all label of note
 * @param   {* requested from frontend } labelId
 * @param   {* responce to backend } callback
 */
noteModel.prototype.getAllLabel = (userId,callback) => {
    try{
        label.find({
            userId :userId
        },(err,result) => {
            if(err){
                console.log("Error in  get all label Model");
                callback(err)
            }
            else{
                console.log("Getting all Label succesfully",result);
                callback(null,result)
            }
        })
    }
    catch(error){
        console.log(" Catch the get all label Model Block");
        callback.status(400).send({
            success : false,
            message : "Catch the get all label Model Block"
        });
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
        callback.status(400).send("isArchieve is catch")
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
            callback(null,result)
        }
    })
}

/**
 * @description : Here i creating Schema for collaberator
 */

var collabSchema = mongoose.Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref  : 'userSchema'
    },
    noteId : {
        type : Schema.Types.ObjectId,
        ref  : 'noteSchema' 
    },
    collabId : {
        type : Schema.Types.ObjectId,
        ref  : 'userSchema'
    }
},{
    timestamps : true
})

var collab = mongoose.model('Collab',collabSchema)

noteModel.prototype.saveCollab = (collabData,callback) => {
    var data = new collab(collabData)
    data.save((err,result) => {
        if(err){
            callback('Error in save collaborator data')
        }
        else{
            callback(null,result)
        }
    })
}
noteModel.prototype.getDataByNoteId = (noteId,callback) => {
console.log("dasjk;");
    collab.find({noteId : noteId},(err,result) => {
            if(err){
                callback('Error in get data by note id model')
            }
            else{
                console.log("get data by note id",result);
                 callback(null,result)
            }
        })
}

noteModel.prototype.getCollabNotesUserId = (userId,callback) => {
    collab.find({collabId : userId},(err,result) => { 
        if(err){
            callback('Error in get collaborator user id model')
        }
        else{
            console.log( "get collab notes user id ",result);
            callback(null,result)
        }
    })
}

noteModel.prototype.getCollabOwnerUserId = (ownerUserId,callback) => {
    collab.find({userId : ownerUserId },(err,result) => {
        if(err){
            callback("Error in get collaborator owner user id")
        }
        else{
         console.log("get collab owner user",result);
            callback(null,result)
        }
    })
}
/**
 * @description : Here i export the noteModel.
 */

module.exports = new noteModel();
