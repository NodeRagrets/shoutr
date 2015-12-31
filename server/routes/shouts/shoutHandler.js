var express = require('express');
var helpers = require('./../../db/helpers.js');


module.exports = {
    loadShouts: function(req, res){
      console.log("LOADSHOUTS", req.query.groupName, "LOADSHOUTS")
      var groupNameData = req.query.groupName; //TODO find the data
      // helpers.addGroup({groupName: 'Tomz Group'});
      // console.log(req.params, "REQ.PARAMS");
      helpers.getShouts(groupNameData)
             .then( function(resultData){
              //  if(err){
              //    console.log('ERROR INSIDE GETSHOUTHANDLER', err);
              //    res.json(404);
              //  } else{
                 console.log('Result Data', resultData)
                 console.log('SUCCESS GOT A GET REQUEST, SHOUTHANDLER');
                 res.status(200).send(resultData);
                 //TODO deal with how resultData is returned--- look at db cheatsheet
              //  }
             })
             .catch( function(err){
               console.log(err, "ERROR INSIDE LOADSHOUTS");
             });
    },

    saveShout: function(req, res){
       console.log("SAVESHOUTS", req.body, "SAVESHOUTS")
      var shoutData = req.body;//TODO find the groupname data
      helpers.addShout(shoutData)
             .then( function(resultData) {
              //  if(err){
              //    console.log('ERROR INSIDE POSTSHOUTHANDLER', err);
              //    res.json(404);
              //  } else{
                 console.log('SUCCESS GOT A POST REQUEST, SHOUTHANDLER')
                 res.status(200).send(resultData);
              //  }
          })
          .catch( function(err){
            console.log(err, "ERROR INSIDE SAVESHOUTS");
          });
    }


};
