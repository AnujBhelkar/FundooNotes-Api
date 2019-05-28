/**
 * @Purpose     :
 * @file        : urlShortneController.js
 * @author      : Anuj
 * @since       : 28-05-2019
 */

var urlShortneController = require('../services/urlShortneServices');

 exports.shortFromOriginal = (req,res) => {
     try{
         var responce = { }
         urlShortneController.shortFromOriginal(req,(err,result) => {
            
            if(err){
                responce.sucess = false,
                responce.error  = err,
                res.status(400).send(err)
            }
            else{
                responce.sucess = false,
                responce.result = true,
                res.status(200).send(result);
            }
        })
    }
    catch(error){
        console.log(" Controller Catch ", error);
        res.send(error);
    }
}
/**
 * 
 */
exports.renderOriginal = (req,res) => {
    try{
        var responce = { }
        urlShortneController.renderOriginal(req,(err,result) => {
           
           if(err){
               responce.sucess = false,
               responce.error  = err,
               res.status(400).send(err)
           }
           else{
               responce.sucess = false,
               responce.result = true,
               res.status(200).send(result);
           }
       })
   }
   catch(error){
       console.log(" Controller Catch ", error);
       res.send(error);
   }
}