angular.module('shoutr.groupCreation', [

])
.controller('groupCreationController', ['$scope', 'Groups', function($scope, Groups){
  $scope.groupCreated = false;
  $scope.data = {};
  $scope.data['groupName']= '';
  $scope.groupSubmission = function(){
    if($scope.data.groupName){
      // $scope.data['groupname'] = $scope.groupname;
      Groups.createGroup($scope.data);
      // $scope.groupname = '';
      $scope.groupCreated = true;
    } else {
      alert('You must input a name!');
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
