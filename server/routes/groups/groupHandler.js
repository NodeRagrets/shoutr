var express = require('express');
var app = express();

module.exports = {
  app.post('/', function(req, res){
    //find on req where the Group data is
    //call helpers.addGroup and pass in req's user data
    //.then throw an error or res.send
    res.send('Got a POST request, groupHandler');
}
