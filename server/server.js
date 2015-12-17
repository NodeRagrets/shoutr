var express = require('express');
var port = PROCESS.ENV.PORT || 3000;
var app = express();
//TODO: Add database stuff to connect it to server

require('config/middleware.js')(app, express);

app.listen(port);

console.log('Now listening on port: ' + port);