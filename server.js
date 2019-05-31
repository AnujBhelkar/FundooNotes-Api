/******************************************************************************************
 * @Purpose : To create for get the data from front end stored it into database           *
 * @file    : server.js                                                                   *
 * @author  : Anuj                                                                        *
 * @since   : 22/05/2019                                                                  *
 ******************************************************************************************/

/**
 * import dependencies that required
 */
var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
require('dotenv').config();
//var cors        = require('cors')
/**
 * Fetch all the paths from routes file 
 */
var routes = require('./routes/routes')
/**
 * create aap
 */
var app = express();
//app.use(cors)
/**
 * BodyParser Middlewer 
 */
app.use(
    bodyParser.urlencoded({
        extended : false
    })
)
app.use(bodyParser.json())

/**
 * Get the database url for establish connection with database from config file
 */
var dbUrl = require('../Server/config/config').url;
/**
 * connection of Database
 */
mongoose.Promise = global.Promise;
 mongoose
    .connect(dbUrl,{ useNewUrlParser : true})
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(`Error In Establishing Connection ${err}`))
/**
 * Assign Port for listneing HTTP request
 */
var port = process.env.PORT || 4000;
/**
 * app.use Allows to set up middlewares to respond to HTTP request
 */
app.get((req,res) => {
    res.json({message :" Welcome To Fundoo App "})
})

app.listen(port,() =>{
    console.log(`${port} is listening your Request..`)
})

/**
 * 
 */
app.use('/',routes)
/**
 * here calling radis and connect with them.. 
 */
var redis = require('redis')
var client = redis.createClient();
client.on('connect',() => {
    console.log("Connection Establish With Redis")
})
client.on('error',(err) => {
    console.log("Error in redis connection",err)
} )
module.exports = {
    app,
    client
}
