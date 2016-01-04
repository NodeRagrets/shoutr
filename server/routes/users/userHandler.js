var express = require('express');
var app = express();
var helpers = require('./../../db/helpers.js');
var bcrypt = require('bcrypt-nodejs');
var utils = require('./../../config/utils.js');
var SALT_WORK_FACTOR = 10;

module.exports = {

  authenticate: function(req, res) {
    console.log(req.headers);
    var username = req.body.username;
    var password = req.body.password;

    if(!username || !password) {
      return res.status(401).send('Username or password not present');
    }

    helpers.getUser(username)
      .then(function(user) {
        bcrypt.compare(password, user.password, function(error, result) {
          if(result) {
            return res.status(200).json({user: user, token: utils.issueToken(user)});
          }
          if(error) {
            return res.status(401).send(error)
          }
        });
      })
      .catch(function(error) {
        return res.status(401).send(error);
      })
  
  },

  register: function(req, res) {
    var user = req.body;
    bcrypt.genSalt(SALT_WORK_FACTOR, function(error, salt) {
      if(error) {
        return res.status(401).send(error)
      }
      bcrypt.hash(user.password, null, null, function(error, hash) {
        if(error) {
          throw error;
        }
        user.password = hash;
        helpers.addUser(user)
          .then(function(user) {
            return res.status(200).send({user: user, token: utils.issueToken(user)});
          })
          .catch(function(error) {
            return res.status(401).send(error);
          })
      });
    });
  },

  profile: function(req, res) {
    var username = req.query.username;
    var usernamePromise = helpers.getUser(username);
    var recipientShoutsPromise;
    usernamePromise
      .then(function(resultData) {
      
        recipientShoutsPromise = helpers.getShoutsByRecipient(username);
        recipientShoutsPromise
          .then(function (shoutsArray) {
            //CURRENTLY, SHOUTSARRAY IS UNDEFINED. DOES THIS CHANGE ONCE THE DB CONTAINS SHOUTS RECEIVED BY A GIVEN USER?
            // console.log("HERE IS SHOUTSARRAY", shoutsArray);
            resultData.shoutsReceived = shoutsArray;
            // console.log("HERE IS RESULTDATA INSIDE PROFILE FN, USERHANDLER", resultData);
            //ADD SHOUTSSENT ARRAY HERE 
            res.status(200).send(resultData);
          }); 
      })
    .catch( function(err){
      res.status(404).send(err);
    }); 
  },

  storeProfilePic: function(req, res) {
    var addPicPromise = helpers.addProfilePicToUser(req.body);

    addPicPromise.then(function(resultData) {
      //
      res.status(200).send("SUCCESS, DATA STORED", resultData);
    });
  },
  
};
