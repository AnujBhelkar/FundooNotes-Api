/******************************************************************************************
 * @Purpose : To create for get the data from front end stored it into database           *
 * @file    : server.js                                                                   *
 * @author  : Anuj                                                                        *
 * @since   : 22/05/2019                                                                  *
 ******************************************************************************************/

/**
 * @description : import dependencies that required
 */
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

// var session = require('express-session');

/**
 * @description : accessing the .env files variable.
 */
require('dotenv').config()

var cors = require('cors')
/**
 * @description : Fetch all the paths from routes file
 */
var routes = require('./routes/routes')
var githubRoutes = require('./routes/githubRoutes')
/**
 * @description : create aap
 */
var app = express()
app.use(cors())
/**
 * @description : BodyParser Middlewer
 */
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())

var validator = require('express-validator')
app.use(validator())

/**
 * @description : Get the database url for establish connection with database from config file
 */
var dbUrl = require('../Server/config/config').url
/**
 * @description : connection of Database
 */
const pipeline = [
  {
    $project: { documentKey: false }
  }
]
mongoose.Promise = global.Promise
var db = mongoose
  .connect(dbUrl, { useNewUrlParser: true })
  .then((cl) => {
    console.log('Database Connected')
    // const db = cl.db('notes')
    // const collection = db.collection('users')
    // const changeStream = collection.watch(pipeline)
    // changeStream.on("change",function(change) {
    //     console.log("ghashjg",change);

    // })
  })
  .catch(err => console.log(`Error In Establishing Connection ${err}`))
/**
 * @description : Assign Port for listneing HTTP request
 */
var port = process.env.PORT
/**
 * @description : app.use Allows to set up middlewares to respond to HTTP request
 */
app.get((req, res) => {
  res.json({ message: ' Welcome To Fundoo App ' })
})

// app.use(session({secret : 'sshh',resave : false, saveUninitialized : true}))
/**
 * @description : paths for request and responce
 */
app.use('/', routes)
app.use('/', githubRoutes)
/**
 * @description : here calling radis and connect with them..
 */
redis = require('redis')
client = redis.createClient({/** 6379,'127.0.0.1' */})
client.on('connect', () => {
  console.log('Connection Establish With Redis')
})
client.on('error', (err) => {
  console.log('Error in redis connection', err)
})

// /**
//  * @description :  watching mongodb Database
//  */
//     const collection = db.collection('notes')
//     const taskCollection = db.collection('notes');
//     const changeStream = taskCollection.watch();

//   changeStream.on('change', (change) => {

//   });

var expressWinston = require('express-winston')
var winston = require('winston')
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}))

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}))

app.listen(port, () => {
  console.log(`${port} is listening your Request..`)
})

module.exports = app
