/**
 * @Purpose    :
 * @file       : githubRoutes.js
 * @author     : Anuj
 * @since      : 02-06-2019
 */
var express = require('express')
var routes = express.Router();
const passport = require('passport')
var githubStrategy = require('passport-github').Strategy;

passport.use(new githubStrategy({
    clientID : process.env.clientId,
    clientSecret : process.env.clientSecret,
    callbackURL  : process.env.callbackUrl
},
    function(accessToken,refreshToken,profile,cb){
        User.findOrCreate({githubId : profile.id},(err,user) => {
            return cb(err,user)
        })
    }
));

routes.get('/github',passport.authenticate('github'))
routes.get(process.env.callbackUrl,
    passport.authenticate('github',{failureRedirect : '/login'}),(req,res) => {
        res.redirect('/');
    })
module.exports = routes;