var groupHandler = require('./groupHandler.js')

module.exports = function(app) {

  app.post('/create', groupHandler.saveGroup);
  // app.get('/load', groupHandler.loadGroup);
  // app.post('/addUser', groupHandler.addUser);

}
