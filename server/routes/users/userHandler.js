var express = require('express');
var app = express();

module.exports = {
  app.get('/', function(req, res){

    //find on the req where the userName is stored
    //call helpers.getUser and pass it in
    //.then with the data, send user in res.send

  })
  app.post('/', function(req, res){
    //find on req where the user data is
    //call helpers.addUser and pass in req's user data
    //find on req where group data is
    //call addUserToGroup with username and groupName as args
    res.send('Got a POST request, userHandler');
  });
}
