var userHandler = require('./userHandler.js');

module.exports = function(app) {

  app.post('/login', userHandler.authenticate);
  app.post('/signup', userHandler.register);
  // app.get('/userprofile', userHandler.profile);

}
