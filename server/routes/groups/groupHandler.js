var express = require('express');
var app = express();
var helpers = require('./../../db/helpers.js');
module.exports = {

    // loadGroup: function(req, res){
    // no getGroup helper?
    // },
    saveGroup: function(req, res){
      var groupData = req.body //TODO find where data is
      helpers.addGroup(groupData)
             .then( function(err, resultData){
               if(err){
                 console.log('ERROR INSIDE POSTGROUPHANDLER');
                 res.send(404);
               } else{
                 console.log('SUCCESS GOT A POST REQUEST, GROUPHANDLER');
                 res.send(200);
               }
             });
    }
}
