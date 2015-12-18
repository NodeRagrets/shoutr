var User = require('./models/userModel.js');
var Group = require('./models/groupModel.js');
var Shout = require('./models/shoutModel.js');

User.hasMany(Shout, {as: 'creator'});
User.hasMany(Shout, {as: 'recipient'});
Group.hasMany(User);
User.belongsToMany(Group, {through: 'UserGroupJoin'});
Group.belongsToMany(User, {through: 'UserGroupJoin'});