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

}])
