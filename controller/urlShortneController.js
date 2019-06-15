/***************************************************************************************
 * @Purpose     : To create controller for url shortne
 * @file        : urlShortneController.js
 * @author      : Anuj
 * @since       : 28-05-2019
 ***************************************************************************************/

var urlShortneController = require('../services/urlShortneServices');
/**
 * @description : Here i get the original url from short url
 * @param {* requested from frontend} req
 * @param {* response to backend} res
 */
 exports.shortFromOriginal = (req,res) => {
     try{
        //console.log(req)
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
 * @description : Here creating short url
 * @param {* requested from frontend } req
 * @param {* responce to backend} res
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