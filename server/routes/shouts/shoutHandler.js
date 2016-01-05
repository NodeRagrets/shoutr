var express = require('express');
var helpers = require('./../../db/helpers.js');
var utils = require('./../../config/utils.js');

module.exports = {
    loadShouts: function(req, res){
      console.log('LOADSHOUTS', req.query.groupName, 'LOADSHOUTS')
      var groupNameData = req.query.groupName;
      helpers.getShouts(groupNameData)
             .then( function(resultData){
                 console.log('Result Data', resultData)
                 console.log('SUCCESS GOT A GET REQUEST, SHOUTHANDLER');
                 var newPayload = utils.extendPayload(req.token, req.query);
                 res.status(200).send({result: resultData, token: utils.issueToken(newPayload)});
             })
             .catch( function(err){
               console.log(err, 'ERROR INSIDE LOADSHOUTS');
             });
    },

    saveShout: function(req, res){
       console.log('SAVESHOUTS', req.body, 'SAVESHOUTS')
      var shoutData = req.body;//TODO find the groupname data
      shoutData.creator = req.token.username;
      console.log(shoutData);
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
