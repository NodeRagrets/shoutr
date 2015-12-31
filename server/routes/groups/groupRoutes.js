var groupHandler = require('./groupHandler.js')

module.exports = function(app) {

  app.post('/create', groupHandler.saveGroup);
  // app.post('/load', groupHandler.loadGroup);

}
