var express = require('express');
var helpers = require('./../../db/helpers.js');


module.exports = {
    loadShouts: function(req, res){
      // if(err){
      //   console.log("ERROR", err);
      // }
      console.log("LOADSHOUTS", req.body, "LOADSHOUTS")
      var groupNameData = req.params; //TODO find the data
      // helpers.addGroup({groupName: 'Tomz Group'});
      console.log(req.params, "REQ.PARAMS");
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
      // console.log("SAVESHOUTS", req, "SAVESHOUTS")
      var shoutData = req.body;//TODO find the data or req.params.shouts
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
