var shoutHandler = require('./shoutHandler.js')

module.exports = function(app) {

  app.get('/', shoutHandler.loadShouts);
  app.post('/', shoutHandler.saveShout);


}
