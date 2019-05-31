/****************************************************************************************
 * @Purpose : To create this file for storing all paths of controllers and access the   *
 *            using Router method of express web framework                              *
 * @file    : routes.js                                                                 *       
 * @author  : Anuj                                                                      *
 * @since   : 22-05-2019                                                                *
 ****************************************************************************************/

/**
 * Import Require Package 
 */
var express = require('express');
/**
 * 
 */
var userController = require('../controller/userController');
var middle     = require('../middleware/allAboutToken');
var shortUrlController = require('../controller/urlShortneController')
var noteController = require('../controller/noteController')
var upload  = require('../middleware/fileUploading')
//var ab = require ('../app/model/urlShortne')
/**
 * Pass Router function in a routes Variable 
 */
var routes = express.Router();

routes.post('/register',userController.registration);
routes.post('/verify/:token',middle.verification,userController.verification)
routes.post('/login',userController.login)
routes.post('/verifyUser',userController.verifyUser)
routes.post('/resetPassword/:token',middle.verification,userController.resetPassword);
routes.get('/item/:code',shortUrlController.shortFromOriginal);
routes.post('/item',shortUrlController.renderOriginal)
routes.post('/createNote',middle.verification,noteController.createNote)
routes.post('/upload',upload.single('image'))

/**
 * Export variable for publically Accessible 
 */
module.exports = routes;