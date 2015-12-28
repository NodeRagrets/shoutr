var userHandler = require('./userHandler.js')

module.exports = function(app) {

app.post('/login', userHandler.login);
app.post('/signup', userHandler.signup);
app.get('/profile', userHandler.profile);
  
}