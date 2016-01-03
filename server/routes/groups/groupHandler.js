var express = require('express');
var app = express();
var helpers = require('./../../db/helpers.js');
module.exports = {

    // loadGroup: function(req, res){
    //   //TODO ask rachel where it is
    //   console.log('LOADGROUP', req.body, 'LOADGROUP');
    //   helpers.getUserGroups()
    //         .then( function(resultData){
    //           console.log('SUCCESS INSIDE LOADGROUP');
    //         })
    //
    // },
    addUser: function(req, res){
        // this will be for existing groups
      console.log('ADDUSER', req.body, 'ADDUSER'); // find users
      var userArray = req.body.usersArray;
      var groupNameForAddUsers = req.body.groupName;
      for(var i = 0; i < userArray[i]; i++){
        helpers.addUserToGroup(userArray[i], groupNameForAddUsers)
               .then(function(results){
                 console.log('SUCCESSFULLY ADDED MORE USERS');
               })
               .catch(function(err){
                 console.log('ERROR')
               });
      }



    },
    saveGroup: function(req, res){

      var groupData = {};
      groupData['groupName'] = req.body.groupName;
      var groupNameForAddUsers = req.body.groupName;
      // console.log(groupData, "GROUPDATA")
      var userArray = req.body.usersArray;
      // console.log(userArray, "USERARRAY");
      helpers.addGroup(groupData)
             .then( function(resultData){
                 console.log('SUCCESS GOT A POST REQUEST, SAVEGROUP');
                 for(var i = 0; i < userArray.length; i++){
                  //  console.log("CURRENTELEMENT USERARRAY", userArray[i])
                   helpers.addUserToGroup(userArray[i], groupNameForAddUsers)
                          .then(function(results){
                            console.log('SUCCESSFULLY ADDED USER');
                          })
                          .catch( function(err){
                            console.log('ERROR ADDING USER', err);
                          })
                 }
                 res.status(200).send(resultData);
             })
             .catch( function(err){
               console.log('ERROR INSIDE SAVEGROUP', err);
             });

    }

}
