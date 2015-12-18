var sequelize = require('../init.js');

var Group = sequelize.define('Group', {
	groupName: {
		type: sequelize.STRING
	}
});

Group.sync({force: true}).then(function() {
	return Group.create({
		groupName:"Tomz Group"
	});
});

module.exports = Group;