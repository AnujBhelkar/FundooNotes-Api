/******************************************************************************************
 * @Purpose     : To create Shorten Url 
 * @file        : urlShortne.js
 * @author      : Anuj
 * @since       : 27-05-2019
 *****************************************************************************************/
const mongoose = require('mongoose');
/**
 * @description : Here Creating Schema for shorten Url
 */
const Schema = mongoose.Schema({
    originalUrl : String,
    urlCode     : String,
    shortUrl    : String,
    createdAt   : {type: Date, default : Date.now},
    updatedAt   : {type: Date, default : Date.now}
});

const shortUrlSchema = mongoose.model("urlShorten",Schema);

function urlShortne1() { }
const validUrl = require('valid-url');
const shortId = require('shortid');

/**
 * @description : Get the original Url from short Url
 * @param   {* requested from frontend} req
 * @param   {* responce to backend } res
 */
urlShortne1.prototype.shortFromOriginal = (req,res) => {
    try{
        const urlCode = req;
        console.log("urlCode", urlCode);
   
        shortUrlSchema.findOne({urlCode : urlCode},(err,result) => {
            if(err){
                console.log("Error in finding Orinal id",err);
                res(err)
            }
            else if(result === null){
                console.log("Invalid Id")
                res(err)
            }
            else{
                console.log("Original id is",result.originalUrl);
                res(null,result)
            }
        });
        
    }
    catch(error){
        console.log(error)
        return res(error)
        
    }
}
/**
 * @description : Create short Url Here
 * @param   {* requested from frontend} req
 * @param   {* responce to backend } res
 */
urlShortne1.prototype.renderOriginal =(req,res) => {
    try{
        const {originalUrl,shortBaseUrl} = req.body;
        shortUrlSchema.findOne({ originalUrl : originalUrl},(err,result) => {
            if(err){
                console.log("Error",err);
                res(err)
            }
            else if(result !== undefined){
                console.log("Link Already Available")
                res(err)
            }
            else{
                if(validUrl.isUri(shortBaseUrl)){
                    console.log(originalUrl,shortBaseUrl);
                }else{
                    return res  
                        .status(401)
                        .json(
                            "Invalid Base url "
                        );
                }
                const urlCode = shortId.generate();
                const updatedAt = new Date();
                
                if(validUrl.isUri(originalUrl)){
                    console.log(originalUrl,urlCode);
                    
                        // const item = shortUrlSchema.findOne({originalUrl : originalUrl})
                        // if(item){
                        //    res.status(200).json(item)
                        // }
                        // else{
                            shortUrl = shortBaseUrl + "/" + urlCode;
                            const item1 = new shortUrlSchema ({
                                originalUrl,
                                shortUrl,
                                urlCode,
                                updatedAt
                            })
                            console.log("items Are",item1)
                            item1.save();
                            res(null,item1)
                    // }
                    
                }
                else{
                    return res
                        .status(401)  
                        .json(
                            "Invalid Original Url "
                        )
                }
            }
        })
    }
    catch(err){
        console.log("Error in render original catch",err);
        res(err)
    }
}
/**
 * @description : here i export the urlShortne1 .
 */
module.exports = new urlShortne1();