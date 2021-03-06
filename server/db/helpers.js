var db = require('../db/sequelize.js');
var helpers = {};
//to be called from the requesthandlers to send the data to the database
//this is our interface between server and DB. 
helpers.addUser = function(userData) {
  //check to see if the user already exists before creating it.
  return db.User.findOne({
    where: {"username": userData.username}
  })
  .then(function(user){
    if(user){
      console.log(user);
      throw Error("Username already taken!");
    }
    else {
      return db.User.create({
        username: userData.username,
        password: userData.password,
        email: userData.email
      });
    }
  })

};



helpers.addGroup = function(groupData) {
  //check to see if the group already exists before creating it.
  return db.Group.findOne({
    where: {"groupName":groupData.groupName}
  })
  .then(function(group){
    if(group){
      throw Error("Group name already taken!");
    } else {
      return db.Group.create({
        groupName: groupData.groupName
      });
    }
  })


};


helpers.addUserToGroup = function(username, groupName) {
    //queries to get the relevant user and group
    var userGroup = {};
    return db.User.findOne({
      where: {"username": username}
    })
    .then(function(user) {
      if(!user) {
        throw Error("User not found");
      }

      userGroup.user = user;

      return db.Group.findOne({
        where: {"groupName": groupName}
      })
      .then(function(group) {
        if(!group) {
          throw Error("Group not found");
        }
        //when you say, "belongsToMany" (in the sequelize.js file), it creates a lot of methods, one of which is addUser
        return group.addUser(userGroup.user);
      });
    });
    //query to get the groupId
};


helpers.addShout = function(shoutData) {
  var shoutGroupID;
  var shoutCreatorID;
  var shoutCreatorName;
  var shoutRecipientName;
  var shoutRecipientID;
  //queries to retrieve Id's for relevant group, shout creator and shout recipient
  return db.Group.findOne({
    where: {groupName: shoutData.groupName}
  })
  .then(function(group){
    shoutGroupID = group.get('id');
    return db.User.findOne({
      where: {username: shoutData.creator}
    })
    .then(function(creator){
      shoutCreatorID = creator.get('id');
      shoutCreatorName = creator.get('username');
      return db.User.findOne({
        where: {username: shoutData.recipient}
      })
      .then(function(recipient){
        shoutRecipientID = recipient.get('id');
        shoutRecipientName = recipient.get('username');
        return db.Shout.create({
          GroupId: shoutGroupID,
          creatorName: shoutCreatorName,
          recipientName: shoutRecipientName,
          blurb: shoutData.blurb,
          story: shoutData.story,
          color: shoutData.color,
          UserId: shoutCreatorID,
          recipientId: shoutRecipientID,
          imageLink: shoutData.imageLink
        });
      })
    })
  });

};


//no need for a getGroup function because all the group's table stores is groupName and IDs.
helpers.getShouts = function(groupName, options) {
  //options: for future versions of this project we'll want to sort the data in different way (e.g. hashtags or datatype)
  //sort by user
  var groupId;
  var shoutResults;

  //when the getSHouts function is being used in the request handlers file, treat the return of that function
  //as a promise. So, use a .then(function(resultsArray){ })
  return db.Group.findOne({
    where: {"groupName": groupName}
  })
  .then(function(group) {
    groupId = group.id;
    return db.Shout.findAll({
      where: {"groupId": groupId}
    })
    .then(function(shouts) {
      if(options && options.username) {
        shoutResults = shouts.filter(function(shout) {
          if(shout.groupId === groupId) {
            return true;
          }
          return false;
        });
      } else {
        shoutResults = shouts;
      }
    });
  })
  .then(function(shoutsPromise) {
    return shoutResults;
  })
};


helpers.getShoutsByRecipient = function(recipientName) {
  var recipientId;
  var shoutResults;

  return db.User.findOne({
    where: {"username": recipientName}
  })
  .then(function(recipient) {
    recipientId = recipient.id;
    // console.log("HERE IS RECIPIENTID, HELPERS.JS", recipientId);
    return db.Shout.findAll({
      where: {"recipientId": recipientId}
    })
      .then(function(shouts) {
        return shouts;
      });
  })
  .then(function(shoutsPromise) {
    return shoutResults;
  })
};


helpers.getUser = function(username) {
  var userId; //pretty sure this line is doing nothing...

  return db.User.findOne({
    where: {"username":username}
  })
  .then(function(user){
    // console.log('INSIDE THE THEN OF GETUSER IN HELPERS. USER:', user);
    if(user) {
      return user;
    } else {
      throw Error("No such user exists!");
    }
  })
};


helpers.getUserGroups = function(username){
  return helpers.getUser(username)
          .then(function(user){
            return user.getGroups()
          })
};


helpers.getGroupMembers = function(groupName){
  return db.Group.findOne({
    where: {"groupName":groupName}
  })
  .then(function(group){
    return group.getUsers();
  })
}


helpers.getProfilePic = function(username) {
  return db.User.findOne({
    where: {"username":username}
  })
    .then(function(user){
      return user.pic;
    })
}


helpers.addProfilePicToUser = function(picData) {
  return db.User.findOne({
    where: { "username": picData.username }
  })
    .then(function(user){
      if(user) {
        user.pic = picData.pic;
        //retun statement below? 
        return user.save().then(function() {})
      } else {
        throw Error("Cannot locate user!");
      }
    })
}




//Function Tests:
// helpers.addShout({
//   groupName: "Tomz Group",
//   creator: 'Tom',
//   recipient: 'Tom',
//   blurb: 'bah',
//   story: 'THIS IS DIFFERENT',
//   color: "#1eabd9",
//   imageLink: 'whoah'
// });

// helpers.getShouts('Tomz Group')
// .then(function(shouts){
//   shouts.forEach(function(shout){
//     console.log(shout.get('imageLink'));
//   })
// })

// helpers.getGroupMembers('Tomz Group')
// .then(function(members){
//   members.forEach(function(member){
//     console.log(member.get('username'));
//   })
// });

// helpers.addUser({
//   username: 'Malek',
//   password: 'Malek',
//   email: 'malek@tom.com'
// });

// helpers.addGroup({
//   groupName: "Lizzzes groop"
// });

// helpers.addGroup({
//   groupName: "Tomz group"
// });

// helpers.addUserToGroup("Malek", "Tomz Group");
// helpers.addUserToGroup("Tom", "Tomz Group");

// helpers.addUserToGroup("Malek", "Lizzzes groop");


// helpers.getUserGroups('Malek')
//   .then(function(groups){
//     groups.forEach(function(item){
//       console.log(item.get('groupName'));
//     })
//   })


//BELOW IS A TEMPLATE FOR HOW THE CALL TO GETSHOUtS SHOULD BE MADE:
// helpers.getShouts("Tomz Group").then(function(shoutsArray){
//   console.log("HERE IS SHOUTSARRAY", shoutsArray);
// });


module.exports = helpers;
