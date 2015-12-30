var express = require('express');
var app = express();
var helpers = require('./../../db/helpers.js');
var bcrypt = require('bcrypt-nodejs');

module.exports = {


  login: function(req, res){

    var loginData = req.body;
    var loginPromise = helpers.getUser(loginData.username);
    
    loginPromise.then(function(resultData){
      //if the call to getUser does not resolve to an error, the passwords are compared 
      bcrypt.compare(loginData.password, resultData.password, function(err, result) {
        if (result === true) {
          // passwords are the same and user may proceed
          res.status(200).send(resultData);
        } else {
          //passwords conflict (422)
          res.status(422).send(err);
        }
      })

    }) //if the call to getUser resolves to an error, we know the user does not exist and send them 404 
    .catch(function(err){
      res.status(404).send(err);
    }); 
  },
  



  signup: function(req, res){

    var userData = req.body;
    // console.log("HERE IS THE USERDATA", userData);

    bcrypt.hash(req.body.password, null, null, function(err, hash){
      userData.password = hash;
    });

    var userPromise = helpers.addUser(userData);
    
    userPromise.then(function(resultData){
      // console.log('SUCCESSFUL POST REQUEST, USERHANDLER');
      res.status(200).send(resultData);
    })
    .catch( function(err){
      // console.log("ERROR INSIDE SIGNUP", err, "ERROR INSIDE SIGNUP");
      res.status(409).send(err);
    });
  }

};
