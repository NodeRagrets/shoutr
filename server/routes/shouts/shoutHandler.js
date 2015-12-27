var express = require('express');
var helpers = require('./../../db/helpers.js');
//var app = express();
//should i require the db

module.exports = {
    getShoutHandler: function(req, res){
      var groupNameData = req.body; //find the data
      helpers.getShouts(groupNameData)
             .then( function(err, resultData){
               if(err){
                 console.log('ERROR INSIDE GETSHOUTHANDLER', err);
                 res.send(404);
               } else{
                 console.log('SUCCESS GOT A GET REQUEST, SHOUTHANDLER');
                 res.send(200, resultData);
                 //TODO deal with how resultData is returned--- look at db cheatsheet
               }
             });
    },
    postShoutHandler: function(req, res){
      var shoutData = req.body;//find the data or req.params.shouts
      helpers.addShout(shoutData)
             .then( function(err, resultData) {
               if(err){
                 console.log('ERROR INSIDE POSTSHOUTHANDLER', err);
                 res.send(404);
               } else{
                 console.log('SUCCESS GOT A POST REQUEST, SHOUTHANDLER')
                 res.send(200);
               }
          });
    }

};
