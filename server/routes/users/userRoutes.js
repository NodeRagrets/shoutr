var userHandler = require('./userHandler.js')

module.exports = function(app) {

app.post('/login', userHandler.login);
app.post('/signup', userHandler.signup);
app.get('/userprofile', userHandler.profile);
app.get('/logout', userHandler.logout);

}
