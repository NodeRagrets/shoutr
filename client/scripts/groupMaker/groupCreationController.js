angular.module('shoutr.groupCreation', [

])
.controller('groupCreationController', ['$scope', 'Groups', function($scope, Groups){
  $scope.groupCreated = false;
  $scope.data = {};
  $scope.data['groupName']= '';
  $scope.data['username'] = '';
  $scope.data['usersArray'] = [];



  $scope.groupSubmission = function(){
    if($scope.data.groupName){
      // $scope.data['groupname'] = $scope.groupname;
      Groups.createGroup($scope.data);
      Groups.addGroupUsers($scope.data)
      // $scope.groupname = '';
      $scope.groupCreated = true;
    } else {
      alert('You must input a name!');
    }
  }

  $scope.usersAdded = false;

  $scope.addingUsers = function(){
    if($scope.data.username){

      var array = $scope.data['usersArray'];
      var name = $scope.data['username'];
      array.push(name);
      console.log(array);
      Groups.addGroupUsers($scope.data);
      $scope.usersAdded = true;
    }else {
      alert('You must add at least one user!');
    }

  }

  $scope.data.groups = [{groupname: 'group1'}, {groupname: 'group2'}, {groupname: 'group3'}, {groupname: 'group4'}, {groupname: 'group5'}, {groupname: 'group6'}];

  // $scope.loadGroups = function() {
  //   Groups.getGroups()
  //     .then(function(groups) {
  //       $scope.data.groups = groups;
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }

}])
