var express = require('express');
var app = express();
var helpers = require('./../../db/helpers.js');
module.exports = {

    // loadGroup: function(req, res){
    // no getGroup helper?
    // },
    saveGroup: function(req, res){
      console.log(req.body, 'SAVEGROUP')
      var groupData = req.body
      helpers.addGroup(groupData)
             .then( function(resultData){
                 console.log('SUCCESS GOT A POST REQUEST, SAVEGROUP');
                 res.status(200).send(resultData);
             })
             .catch( function(err){
               console.log('ERROR INSIDE SAVEGROUP');
             });

    }

}
