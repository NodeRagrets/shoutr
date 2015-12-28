var shoutHandler = require('./shoutHandler.js')

module.exports = function(app) {

  app.get('/load', shoutHandler.loadShouts);
  app.post('/create', shoutHandler.saveShout);

}