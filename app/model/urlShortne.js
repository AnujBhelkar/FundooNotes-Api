/******************************************************************************************
 * @Purpose     : To create Shorten Url 
 * @file        : urlShortne.js
 * @author      : Anuj
 * @since       : 27-05-2019
 *****************************************************************************************/
const mongoose = require('mongoose');
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
const errorUrl = 'http://localhost/error';

urlShortne1.prototype.shortFromOriginal = (req,res) => {
    const urlCode = req.params.code;
    console.log("urlCode", urlCode);
    try{
        shortUrlSchema.findOne({urlCode : urlCode},(err,result) => {
            if(err){
                console.log("Error in finding Orinal id",errUrl);
                res(errorUrl)
            }
            else if(result === null){
                console.log("Invalid Id")
                res(err)
            }
            else{
                console.log("Original id is");
                res(null,result)
            }
        });
        
    }
    catch(error){
        console.log(error)
        return res(error)
        
    }
}

urlShortne1.prototype.renderOriginal =(req,res) => {
    const {originalUrl,shortBaseUrl} = req.body;
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
        try{
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
        catch(err){
            res(err)
        }
    }
    else{
        return res
            .status(401)  
            .json(
                "Invalid Original Url "
            )
    }
}

module.exports = new urlShortne1();