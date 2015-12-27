var express = require('express');
var app = express();
var helpers = require('./../../db/helpers.js');


module.exports = {
  login: function(req, res){
    var userNameData = req.body //TODO find where the data is;
    helpers.getUser(userNameData)
           .then( function(err, resultData){
             if(err){
               console.log('ERROR INSIDE GETUSERHANDLER', err);
               res.send(404);
             } else{
               console.log('SUCCESS GOT A GET REQUEST, USERHANDLER');
               res.send(200, resultData);
               //TODO deal with how resultData is returned--- look at db cheatsheet
             }
           });
  },
  signup: function(req, res){
    var userData = req.body //TODO find where the data is
    var groupData = req.body //TODO find where the data is
    helpers.addUserToGroup(userData, groupData)
           .then(function(err, resultData){
             if(err){
               console.log('ERROR INSIDE POSTUSERHANDLER', err);
               res.send(404);
             } else{
               console.log('SUCCESS POST A POST REQUEST, USERHANDLER');
               res.send(200);
             }
          });

  }
};

// app.get('/', function(req, res){
//
//   //find on the req where the userName is stored
//   //call helpers.getUser and pass it in
//   //.then with the data, send user in res.send
//
// })
// app.post('/', function(req, res){
//   //find on req where the user data is
//   //call helpers.addUser and pass in req's user data
//   //find on req where group data is
//   //call addUserToGroup with username and groupName as args
//   res.send('Got a POST request, userHandler');
// });
