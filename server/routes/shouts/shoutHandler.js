var express = require('express');
var helpers = require('../helpers.js');
var app = express();

module.exports = {
  app.get('/', function(req, res){
    //find on the req where the groupName is stored
    //call helpers.getShouts and pass it in
    //.then with the data, retrieve all the shouts of that group in res.send
  })
  app.post('/', function(req, res){
    //find on req where the shout data is
    //call helpers.addShout and pass in req's shout data
    //.then with that data, retrieve all the shouts in the res.send
    res.send('Got a POST request, shoutHandler');
  });
}
