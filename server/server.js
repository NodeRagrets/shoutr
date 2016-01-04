var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
//TODO: Add database stuff to connect it to server

require('./config/middleware.js')(app, express);
require('./config/utils.js');

app.listen(port);

console.log('Now listening on port: ' + port);