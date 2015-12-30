var express = require('express');
var app = express();
var helpers = require('./../../db/helpers.js');
var bcrypt = require('bcrypt-nodejs');

module.exports = {


  login: function(req, res){

    var loginData = req.body;
    var loginPromise = helpers.getUser(loginData.username);
    console.log("BOOYAH HERE IS DATA FROM LOGIN FN", req.body);
    
    loginPromise.then(function(resultData){
      // console.log("HERE IS RESULTDATA", resultData);
      bcrypt.compare(loginData.password, resultData.password, function(err, result) {
        if (result === true) {
          console.log('PASSWORDS ARE THE SAME, USER MAY PROCEED!');
          res.status(200).send(resultData);
        } else {

        }
      })

    })
    .catch(function(err){
      console.log(err, "ERROR INSIDE LOGIN");
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
      console.log('SUCCESSFUL POST REQUEST, USERHANDLER');
      res.status(200).send(resultData);
    })
    .catch( function(err){
      console.log("ERROR INSIDE SIGNUP", err, "ERROR INSIDE SIGNUP");
      res.status(409).send(err);
    });
  }

};
