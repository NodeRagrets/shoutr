var express = require('express');
var app = express();
var helpers = require('./../../db/helpers.js');
var bcrypt = require('bcrypt-nodejs');

module.exports = {
  login: function(req, res){
    var userNameData = req.body;
    helpers.getUser(userNameData)
           .then( function(resultData){
            //  if(err){
            //    console.log('ERROR INSIDE GETUSERHANDLER', err);
            //    res.send(404);
            //  } else{
               console.log('SUCCESS GOT A GET REQUEST, USERHANDLER');
               res.status(200).send(resultData);

            //  }
           })
           .catch( function(err){
             console.log(err, "ERROR INSIDE login");
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
      console.log(err, "ERROR INSIDE SIGNUP");
    });
  }

};
