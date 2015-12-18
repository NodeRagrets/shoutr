var sequelize = require('../init.js');

var Shout = sequelize.define('Shout', {
	blurb: {
		type: sequelize.STRING
	},
	text: {
		type: sequelize.TEXT
	},
	color: {
		type: sequelize.STRING
	}
});

Shout.sync({force: true}).then(function() {
	return Shout.create({
		blurb: "I love puppies! Plus, node ragrets.",
		text: "Shoutout to puppies.",
		color:"#1eabd9"
	});
})

module.exports = Shout;