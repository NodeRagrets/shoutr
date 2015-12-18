var Sequelize = require('sequelize');

var sequelize = new Sequelize('test', null, null, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './db.sqlite'
});

var models = {};

models.Group = sequelize.define('Group', {
  groupName: {
    type: Sequelize.STRING
  }
});

models.User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING 
  }, 
  //photo: {},
  email: {
    type: Sequelize.STRING
  }
});

models.Shout = sequelize.define('Shout', {
  blurb: {
    type: Sequelize.STRING
  },
  story: {
    type: Sequelize.TEXT
  },
  color: {
    type: Sequelize.STRING
  }
});

models.User.hasMany(models.Shout, {as: 'creatorID'});
models.User.hasMany(models.Shout, {as: 'recipientID'});
models.Group.hasMany(models.Shout, {as: 'groupID'});
// models.Group.hasMany(models.User);
models.User.belongsToMany(models.Group, {as: 'member', through: 'UserGroupJoin', foreignKey: 'userID'});
models.Group.belongsToMany(models.User, {as: 'org', through: 'UserGroupJoin', foreignKey: 'groupID'});
// for(var key in models){
//   models[key].sync({})
// }

models.Group.sync({force: false}).then(function() {
  return models.Group.create({
    groupName:"Tomz Group"
  });
});

models.Shout.sync({force: false}).then(function() {
  return models.Shout.create({
    blurb: "I love puppies! Plus, node ragrets.",
    story: "Shoutout to puppies.",
    color:"#1eabd9"
  });
});

models.User.sync({force: false}).then(function() {
  return models.User.create({
    username: "Tom",
    password: "abc123",
    email:"tom@tom.com"
  });
});


module.exports = models;