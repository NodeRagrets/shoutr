var sequelize = require('../init.js');

var User = sequelize.define('User', {
	username: {
		type: sequelize.STRING
	},
	password: {
		type: sequelize.STRING 
	}, 
	//photo: {},
	email: {
		type: sequelize.STRING
	}
});

User.sync({force: true}).then(function() {
	return User.create({
		username: "Tom",
		password: "abc123",
		email:"tom@tom.com"
	});
});

module.exports = User;