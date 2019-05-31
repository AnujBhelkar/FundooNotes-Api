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
    }
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
    var add = new note({
        userId      : req.body.userId,
        title       : req.body.title,
        description : req.body.description
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
/**
 * @description  : it will get the data from user id and find the data
 * @param   {* request from frontend} id 
 * @param   {* response to backend} callback
 */
noteModel.prototype.getNote = (id,callback) => {
    note.find({
        userId  : id.decoded.payload.userId
    },(err,res) => {
        if(err) {
            console.log("Error in model for getting Notes",err)
            callback(err)
        }
        else{
            console.log("All Notes",res)
            callback(res)
        }    
    })
}

module.exports = new noteModel();
