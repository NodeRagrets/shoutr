var Sequelize = require('sequelize');

//TODO: 1. make a table for profile images (higher priority)
//      2. make a table for images on shouts 

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
  },
  recipientId: {
    type: Sequelize.INTEGER
  }
  // userId is added automatically by the "hasMany" relationship established below
});

models.UserGroupJoin = sequelize.define('UserGroupJoin', {
  status: {
    type: Sequelize.STRING
  }
});

models.User.hasMany(models.Shout);
models.Group.hasMany(models.Shout);
models.User.belongsToMany(models.Group, {through: 'UserGroupJoin'});
models.Group.belongsToMany(models.User, {through: 'UserGroupJoin'});

models.Group.sync({force: false}).then(function() {
  // return models.Group.create({
  //   groupName:"Tomz Group"
  // });
});

models.Shout.sync({force: false}).then(function() {
  // return models.Shout.create({
  //   blurb: "I love puppies! Plus, node ragrets.",
  //   story: "Shoutout to puppies.",
  //   color:"#1eabd9"
  // });
});

models.User.sync({force: false}).then(function() {
  // return models.User.create({
  //   username: "Tom",
  //   password: "abc123",
  //   email:"tom@tom.com"
  // });
});

models.UserGroupJoin.sync({force: false}).then(function() {
});

module.exports = models;