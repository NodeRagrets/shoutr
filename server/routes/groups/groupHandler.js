var express = require('express');
var app = express();
var helpers = require('./../../db/helpers.js');
module.exports = {

    // loadGroup: function(req, res){
    //   console.log('LOADGROUP',  req.body, 'LOADGROUP');
    //   helper.getUserGroups()
    //
    // },
    // addUser: function(req, res){
        //this will be for existing groups
    //   console.log('ADDUSER', req.body, 'ADDUSER'); // find users
    //   var userString = req.body;
    //   var userArray = userString.split(',');
    //   var groupnameToPassIn// find groupname
    //   helpers.addUserToGroup()
    //
    //
    // },
    saveGroup: function(req, res){
      console.log(req.body, 'SAVEGROUP');
      var groupData = {};
      groupData['groupName'] = req.body.groupName;
      var groupNameForAddUsers = req.body.groupName;
      // console.log(typeof req.body)
      var userString = req.body.username;
      var userArray = userString.split(',');
      console.log(userArray, "USERARRAY");
      helpers.addGroup(groupData)
             .then( function(resultData){
                 console.log('SUCCESS GOT A POST REQUEST, SAVEGROUP');
                 for(var i = 0; i < userArray.length; i++){
                   helpers.addUserToGroup(userArray[i], groupNameForAddUsers)
                          .then(function(results){
                            console.log("RESULTS IN FORLOOP", results, "RESULTS IN FORLOOP")
                            console.log('SUCCESSFULLY ADDED USER');
                          })
                          .catch( function(err){
                            console.log('ERROR ADDING USER');
                          })
                 }
                 res.status(200).send(resultData);
             })
             .catch( function(err){
               console.log('ERROR INSIDE SAVEGROUP');
             });

    }

}
