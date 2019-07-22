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
//var ab = require ('../app/model/urlShortne')
/**
 *@description : Pass Router function in a routes Variable 
 */
var routes = express.Router();

routes.post('/register',userController.registration);
routes.post('/confirm/:token',middle.verification,userController.verification)
routes.post('/login',userController.login)
routes.post('/confirmUser',userController.verifyUser)
routes.post('/resetPassword/:token',middle.verification,userController.resetPassword);
routes.get('/item/:code',shortUrlController.shortFromOriginal);
routes.post('/item',shortUrlController.renderOriginal)
routes.post('/createNote',middle.usingRedis,noteController.createNote)
routes.get('/getNotes',middle.usingRedis,noteController.getAllNotes)
routes.post('/deleteNote',middle.usingRedis,noteController.deleteNote)
routes.post('/editTitle',middle.usingRedis,noteController.editTitle)
routes.post('/editDescription',middle.usingRedis,noteController.editDescription)
routes.put('/updateColor',middle.usingRedis,noteController.updatecolor)
routes.post('/addLabel',middle.usingRedis,noteController.addLabel)
routes.put('/updateLabel',middle.usingRedis,noteController.updateLabel)
routes.post('/deleteLabel',middle.usingRedis,noteController.deleteLabel)
routes.get('/getAllLabel',middle.usingRedis,noteController.getAllLabel)
routes.get('/logout',userController.logout);
routes.post('/upload',middle.usingRedis,userController.uploadFile)
routes.post('/trash',middle.verification,noteController.isTrashed)
routes.post('/archive',middle.usingRedis,noteController.isArchived)
routes.post('/reminder',middle.usingRedis,noteController.reminder)
routes.get('/getAllReminderNotes',middle.usingRedis,noteController.getAllReminderNotes)
routes.get('/getArchiveNotes',middle.usingRedis,noteController.getArchiveNotes)
routes.post('/saveLabelToNote',middle.usingRedis,noteController.savelabelToNote)
routes.post('/deleteLabelToNote',middle.usingRedis,noteController.deletelabelToNote)
routes.post('/deleteReminderToNote',middle.usingRedis,noteController.deleteReminderToNote)
routes.post('/saveCollaborator',middle.usingRedis,noteController.saveCollaborator)

routes.post('/get',noteController.get)
routes.post('/collabGet',noteController.collabGet)

var mmm= require('../app/model/userModel')
routes.get('/getSomething',mmm.getUserDetails)


/**
 * @description: Export variable for publically Accessible 
 */
module.exports = routes;