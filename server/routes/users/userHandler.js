var express = require('express');
var app = express();
var helpers = require('./../../db/helpers.js');


module.exports = {
  login: function(req, res){
    var userNameData = req.body //TODO find where the data is;
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
    var userData = req.body //TODO find where the data is
    var groupData = req.body //TODO find where the data is
    helpers.addUserToGroup(userData, groupData)
           .then(function(resultData){
            //  if(err){
            //    console.log('ERROR INSIDE POSTUSERHANDLER', err);
            //    res.send(404);
            //  } else{
               console.log('SUCCESS POST A POST REQUEST, USERHANDLER');
               res.status(200).send(resultData);
            //  }
          })
          .catch( function(err){
            console.log(err, "ERROR ISNIDE SIGNUP");
          });

  }
};
