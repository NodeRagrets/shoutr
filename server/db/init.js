var Sequelize = require('sequelize');

var sequelize = new Sequelize('test', null, null, {
	host: 'localhost',
	dialect: 'sqlite',
	storage: './db.sqlite'
});

module.exports = sequelize;