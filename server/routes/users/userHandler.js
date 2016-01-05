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
        console.log("USER INFORMATION", user.get('username'));
        bcrypt.compare(password, user.password, function(error, result) {
          if(result) {
            return res.status(200).json({user: user, token: utils.issueToken({username: user.get('username')})});
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
            return res.status(200).json({user: user, token: utils.issueToken({username: user.get('username')})});
          })
          .catch(function(error) {
            return res.status(401).send(error);
          })
      });
    });
  },

  profile: function(req, res) {
    var username = req.token.username;
    var usernamePromise = helpers.getUser(username);
    console.log("HERE IS REQ.TOKEN", req.token);
    usernamePromise
      .then(function(resultData) {
        res.status(200).send(resultData);
      })
    .catch( function(err){
      res.status(404).send(err);
    }); 
  },

  storeProfilePic: function(req, res) {
    console.log('HERE IS REQ INSIDE USERHANDLER, STOREPROFILEPIC', req);
    var addPicPromise = helpers.addProfilePicToUser(req.body);
    var getPicPromise = helpers.getProfilePic(req.body.username);
    addPicPromise
      .then(function(resultData) {
        return getPicPromise
          .then(function(userPicUrl){
            res.userPic = userPicUrl;
            res.status(200).send("SUCCESS, DATA STORED");
          })
      })
        .catch(function(err) {
          res.status(404).send(err);
        });
  }
 

  
};
