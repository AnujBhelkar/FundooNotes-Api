/****************************************************************************************
 * @Purpose : To create this file for storing all paths of controllers and access the   *
 *            using Router method of express web framework                              *
 * @file    : routes.js                                                                 *       
 * @author  : Anuj                                                                      *
 * @since   : 22-05-2019                                                                *
 ****************************************************************************************/

/**
 * @description : Import Require Package 
 */
var express = require('express');
/**
 * @description : here i write path for passing request and getting responce from controller.
 */
var userController = require('../controller/userController');
var middle     = require('../middleware/allAboutToken');
var shortUrlController = require('../controller/urlShortneController')
var noteController = require('../controller/noteController')
var upload  = require('../middleware/fileUploading')
//var ab = require ('../app/model/urlShortne')
/**
 *@description : Pass Router function in a routes Variable 
 */
var routes = express.Router();

routes.post('/register',userController.registration);
routes.post('/verify/:token',middle.verification,userController.verification)
routes.post('/login',userController.login)
routes.post('/verifyUser',userController.verifyUser)
routes.post('/resetPassword/:token',middle.verification,userController.resetPassword);
routes.get('/item/:code',shortUrlController.shortFromOriginal);
routes.post('/item',shortUrlController.renderOriginal)
routes.post('/createNote',middle.usingRedis,noteController.createNote)
routes.get('/getNotes',middle.usingRedis,noteController.getAllNotes)
routes.post('/editTitle',middle.usingRedis,noteController.editTitle)
routes.post('/editDescription',middle.usingRedis,noteController.editDescription)
routes.post('/editDescription',middle.usingRedis,noteController.editDescription)
routes.post('/addLabel',middle.usingRedis,noteController.addLabel)
routes.post('/updateLabel',middle.usingRedis,noteController.updateLabel)
routes.get('/logout',userController.logout);
routes.post('/upload', upload.single('image'))
routes.post('/trash',middle.verification,noteController.isTrashed)
routes.post('/archive',middle.usingRedis,noteController.isArchived)
routes.post('/reminder',middle.usingRedis,noteController.reminder)
routes.post('/editTitle',middle.usingRedis,noteController.editTitle)
routes.post('/editDescription',middle.usingRedis,noteController.editDescription)



/**
 * @description: Export variable for publically Accessible 
 */
module.exports = routes;