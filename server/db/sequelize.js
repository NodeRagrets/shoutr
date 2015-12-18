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
  text: {
    type: Sequelize.TEXT
  },
  color: {
    type: Sequelize.STRING
  }
});

models.User.hasMany(models.Shout, {as: 'creator'});
models.User.hasMany(models.Shout, {as: 'recipient'});
models.Group.hasMany(models.Shout);
// models.Group.hasMany(models.User);
models.User.belongsToMany(models.Group, {through: 'UserGroupJoin'});
models.Group.belongsToMany(models.User, {through: 'UserGroupJoin'});
// for(var key in models){
//   models[key].sync({})
// }

models.Group.sync({force: true}).then(function() {
  return models.Group.create({
    groupName:"Tomz Group"
  });
});

models.Shout.sync({force: true}).then(function() {
  return models.Shout.create({
    blurb: "I love puppies! Plus, node ragrets.",
    text: "Shoutout to puppies.",
    color:"#1eabd9"
  });
});

models.User.sync({force: true}).then(function() {
  return models.User.create({
    username: "Tom",
    password: "abc123",
    email:"tom@tom.com"
  });
});


module.exports = models;