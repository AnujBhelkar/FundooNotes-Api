/**
 * @Purpose    : Here github Authentication
 * @file       : githubRoutes.js
 * @author     : Anuj
 * @since      : 02-06-2019
 */
var express = require('express')
var routes = express.Router();
// const passport = require('passport')
// var githubStrategy = require('passport-github').Strategy;

// passport.use(new githubStrategy({
//     clientID : process.env.clientId,
//     clientSecret : process.env.clientSecret,
//     callbackURL  : process.env.callbackUrl
// },
//     function(accessToken,refreshToken,profile,cb){
//         User.findOrCreate({githubId : profile.id},(err,user) => {
//             return cb(err,user)
//         })
//     }
// ));

// routes.get('/github',passport.authenticate('github'))
// routes.get(process.env.callbackUrl,
//     passport.authenticate('github',{failureRedirect : '/login'}),(req,res) => {
//         res.redirect('/');
//    })


var githubOAuth = require('github-oauth')({
    githubClient: process.env.clientId,
    githubSecret: process.env.clientSecret,
    baseURL: process.env.baseUrl+ process.env.PORT ,
    loginURI: '/github',
    callbackURI: '/github/callback'
  })
  
  routes.get("/github", function(req, res){
    console.log("started oauth");
    return githubOAuth.login(req, res);
  });
  
  routes.get("/github/callback", function(req, res){
    console.log("received callback");
    return githubOAuth.callback(req, res);
  });
  
  githubOAuth.on('error', function(err) {
    console.error('there was a login error', err)
  })
  
  githubOAuth.on('token', function(token, serverResponse) {
    serverResponse.end(JSON.stringify(token))
  })


module.exports = routes;