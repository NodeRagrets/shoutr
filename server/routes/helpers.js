var db = require('../db/sequelize.js');
var helpers = {};
//to be called from the requesthandlers to send the data to the database
//this is our interface between server and DB. 
helpers.addUser = function(userData) {
  //check for correct formatting 
  db.User.create(userData);
};
helpers.addGroup = function(groupData) {
};
helpers.addShout = function(shoutData) {
  //take in the shoutData from client (services.js)
  //query Group for the group ID
  //query Users for the user ID 
  //add the group and user IDs, plus the correct shoutData, 
    //to a new object
  //pass that object into the create fn and send to DB 
  
  //Promises are being nested below to ensure queries return before their data is used
  var shoutGroupID;
  var shoutCreatorID;
  var shoutRecipientID;
  db.Group.findOne({
    // attributes: ['id'],
    where: {groupName: shoutData.groupName}
  }).then(function(group){
    shoutGroupID = group.get('id');
    db.User.findOne({
      where: {username: shoutData.creator}
    })
    .then(function(creator){
      shoutCreatorID = creator.get('id');
      db.User.findOne({
        where: {username: shoutData.recipient}
    })
    .then(function(recipient){
        shoutRecipientID = recipient.get('id');
        return db.Shout.create({
         groupID: shoutGroupID, 
         blurb: shoutData.blurb,
         story: shoutData.story,
         creatorID: shoutCreatorID,
         recipientID: shoutRecipientID
        }).then(function(shout){
          console.log('rachel wants to ', shout.get('story'));
        });
      })
    })
  });
  
};

helpers.addShout({
  groupName: "Tomz Group",
  creator: 'Tom',
  recipient: 'Tom',
  blurb: 'bah',
  story: 'humbug'
});
module.exports = helpers;
