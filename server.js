/******************************************************************************************
 * @Purpose : To create for get the data from front end stored it into database           *
 * @file    : server.js                                                                   *
 * @author  : Anuj                                                                        *
 * @since   : 22/05/2019                                                                  *
 ******************************************************************************************/

/**
 * @description : import dependencies that required
 */
var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
require('express-validator');
//app.use(validator());
//var session = require('express-session');
require('dotenv').config();

//var cors        = require('cors')
/**
 * @description : Fetch all the paths from routes file 
 */
var routes = require('./routes/routes')
var githubRoutes = require('./routes/githubRoutes')
/**
 * @description : create aap
 */
var app = express();
//app.use(cors)
/**
 * @description : BodyParser Middlewer 
 */
app.use(
    bodyParser.urlencoded({
        extended : false
    })
)
app.use(bodyParser.json())

/**
 * @description : Get the database url for establish connection with database from config file
 */
var dbUrl = require('../Server/config/config').url;
/**
 * @description : connection of Database
 */
mongoose.Promise = global.Promise;
 mongoose
    .connect(dbUrl,{ useNewUrlParser : true})
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(`Error In Establishing Connection ${err}`))
/**
 * @description : Assign Port for listneing HTTP request
 */
var port = process.env.PORT;
/**
 * @description : app.use Allows to set up middlewares to respond to HTTP request
 */
app.get((req,res) => {
    res.json({message :" Welcome To Fundoo App "})
})

app.listen(port,() =>{
    console.log(`${port} is listening your Request..`)
})

//app.use(session({secret : 'sshh',resave : false, saveUninitialized : true}))
/**
 * @description : paths for request and responce
 */
app.use('/',routes)
app.use('/',githubRoutes)
/**
 * @description : here calling radis and connect with them.. 
 */
redis = require('redis')
var client = redis.createClient(6379,'127.0.0.1');
client.on('connect',() => {
    console.log("Connection Establish With Redis")
})
client.on('error',(err) => {
    console.log("Error in redis connection",err)
} )
module.exports = app
