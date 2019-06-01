/**
 * @Purpose     :
 * @file        : noteServices.ja
 * @author      : Anuj
 * @since       : 30-05-2019
 */

var noteModel = require('../app/model/noteModel')

exports.createNote =(req,res) => {
    noteModel.addNote(req,(err,result) => {
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
exports.getNote = (req,callback) => {
    noteModel.getNote(req,(err,result) => {
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