angular.module('shoutr.groupCreation', [

])
.controller('groupCreationController', ['$scope', function($scope){
  $scope.groupCreated = false;
  $scope.groupSubmission = function(){
    if($scope.groupname){
      //At this point, I will call the addGroup function in the relevant factory in services.js
      //I am unsure about setting this up, so I am waiting until our meeting tomorrow
    }
    $scope.groupname = '';
    $scope.groupCreated = true;
  }

}])
