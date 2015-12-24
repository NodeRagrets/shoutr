var shoutHandler = require('./shoutHandler.js')

module.exports = function(app) {

  app.get('/shoutmaker', shoutHandler.loadShouts);
  app.post('/shoutmaker', shoutHandler.saveShout);

}