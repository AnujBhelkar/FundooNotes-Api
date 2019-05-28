/**
 * @Purpose     :
 * @file        : urlServices.js
 * @author      : Anuj
 * @since       : 28-05-2019
 */

 /**
  * 
  */
 const urlShortneModule = require('../app/model/urlShortne')
 exports.shortFromOriginal = (req,res) => {
    try{
        urlShortneModule.shortFromOriginal(req,(err,result) => {
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
 exports.renderOriginal = (req,res) => {
    try{
        urlShortneModule.renderOriginal(req,(err,result) => {
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