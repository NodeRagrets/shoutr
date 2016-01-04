var express = require('express');
var app = express();
var helpers = require('./../../db/helpers.js');
var bcrypt = require('bcrypt-nodejs');
var utils = require('./../../config/utils.js');

module.exports = {


  login: function(req, res) {

    var loginData = req.body;
    var loginPromise = helpers.getUser(loginData.username);
    
    loginPromise.then(function(resultData){
      //if the call to getUser does not resolve to an error, the passwords are compared 
      bcrypt.compare(loginData.password, resultData.password, function(err, result) {
        if (result === true) {
          // Regenerate session when signing in to prevent fixation
          utils.createSession(req, res, resultData);

        } else {
          res.status(422).send(err);
        }
      })

    }) //if the call to getUser resolves to an error, we know the user does not exist and send them 404 
    .catch(function(err){
      res.status(404).send(err);
    }); 
  
  },



  signup: function(req, res) {

    var userData = req.body;

    bcrypt.hash(req.body.password, null, null, function(err, hash){
      userData.password = hash;
    });

    var userPromise = helpers.addUser(userData);
    
    userPromise.then(function(resultData){
      utils.createSession(req, res, resultData);
    })
    .catch( function(err){
      res.status(409).send(err);
    });
  
  },



  profile: function(req, res) {
    var username = req.query.username;
    // console.log("HERE IS REQ FROM PROFILE FN:", req.query.username);
    var usernamePromise = helpers.getUser(username);
    var recipientShoutsPromise;
    usernamePromise
      .then(function(resultData) {
      
        recipientShoutsPromise = helpers.getShoutsByRecipient(username);
        recipientShoutsPromise
          .then(function (shoutsArray) {
            //CURRENTLY, SHOUTSARRAY IS UNDEFINED. DOES THIS CHANGE ONCE THE DB CONTAINS SHOUTS RECEIVED BY A GIVEN USER?
            console.log("HERE IS SHOUTSARRAY", shoutsArray);
            resultData.shoutsReceived = shoutsArray;
            console.log("HERE IS RESULTDATA INSIDE PROFILE FN, USERHANDLER", resultData);
            //ADD SHOUTSSENT ARRAY HERE 
            res.status(200).send(resultData);
          }); 
      })
    .catch( function(err){
      res.status(404).send(err);
    });
  
  },



  storeProfilePic: function(req, res) {
    // console.log("storeProfilePic function called! in userhandler. Req is:", req);
    res.status(200).send("WOOT SUCCESS IN USERHANDLER");
  },

 
  logout: function(req, res) {
  // destroy the user's session to log them out
    req.session.destroy(function(){
      console.log('successful user session destruction!');
      res.status(200).send("successful log out!");
    });
  
  }


};
