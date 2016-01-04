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
  email: {
    type: Sequelize.STRING
  },
  pic: {
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
  },
  imageLink: {
    type: Sequelize.STRING
  }
  // userId is added automatically by the "hasMany" relationship established below
});

models.UserGroupJoin = sequelize.define('UserGroupJoin', {
  status: {
    type: Sequelize.STRING
  }
});

// models.ProfilePic = sequelize.define('ProfilePic', {
//   pic: {
//     type: Sequelize.STRING 
//   }
// });

models.User.hasMany(models.Shout);
models.Group.hasMany(models.Shout);
models.User.belongsToMany(models.Group, {through: 'UserGroupJoin'});
models.Group.belongsToMany(models.User, {through: 'UserGroupJoin'});


//NOTE: All of the model creations in the below .then functions are for testing purposes and are not necessary for the db functionality

models.Group.sync({force: false}).then(function() {
  return models.Group.create({
    groupName:"Tomz Group"
  });
});

models.Shout.sync({force: false}).then(function() {

  // return models.Shout.create({
  //   blurb: "I love puppies! Plus, node ragrets.",
  //   story: "Shoutout to puppies.",
  //   color:"#1eabd9",
  //   imageLink: 'whoah'
  // });
});

models.User.sync({force: false}).then(function() {
  return models.User.create({
    username: "Tom",
    password: "abc123",
    email:"tom@tom.com",
    pic: "blob:http%3A//localhost%3A3000/30c2c1b5-8713-48af-9856-9fd2f6024b29"
  });
});

models.UserGroupJoin.sync({force: false}).then(function() {
});

module.exports = models;