var express = require('express');
var helpers = require('./../../db/helpers.js');


module.exports = {
    loadShouts: function(req, res){
      console.log('LOADSHOUTS', req.query.groupName, 'LOADSHOUTS')
      var groupNameData = req.query.groupName;
      helpers.getShouts(groupNameData)
             .then( function(resultData){
                 console.log('Result Data', resultData)
                 console.log('SUCCESS GOT A GET REQUEST, SHOUTHANDLER');
                 res.status(200).send(resultData);
             })
             .catch( function(err){
               console.log(err, 'ERROR INSIDE LOADSHOUTS');
             });
    },

    saveShout: function(req, res){
       console.log('SAVESHOUTS', req.body, 'SAVESHOUTS')
      var shoutData = req.body;//TODO find the groupname data
      shoutData.username = req.token.username;
      helpers.addShout(shoutData)
             .then( function(resultData) {
                 console.log('SUCCESS GOT A POST REQUEST, SHOUTHANDLER')
                 res.status(200).send(resultData);
              })
             .catch( function(err){
                  console.log(err, 'ERROR INSIDE SAVESHOUTS');
              });
    }

};
