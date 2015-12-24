var groupHandler = require('./groupHandler.js')

module.exports = function(app) {

  app.post('/groupmaker', groupHandler.saveGroup);
  app.post('/group', groupHandler.loadGroup);

}