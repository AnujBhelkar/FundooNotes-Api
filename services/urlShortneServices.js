/*****************************************************************************************
 * @Purpose     : To create Service for url shortne
 * @file        : urlServices.js
 * @author      : Anuj
 * @since       : 28-05-2019
 ****************************************************************************************/

 const urlShortneModule = require('../app/model/urlShortne')
 /**
  * @description : create service for getting original url from short url.
  * @param {* requested from frontend } req
  * @param {* responce to backend } res
  */
  exports.shortFromOriginal = (req,res) => {
    try{
        
        const urlCode = req.body.code;
        urlShortneModule.shortFromOriginal(urlCode,(err,result) => {
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
  * @description : create service for generating short url
  * @param {* requested from frontend } req
  * @param {* responce to backend } res
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