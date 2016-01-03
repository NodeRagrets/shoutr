angular.module('shoutr.userProfile', [])

.controller('userProfileController', ['$scope', 'Users', '$stateParams', function($scope, Users, $stateParams) {

  $scope.data = {};
	$scope.data.username = $stateParams.username;
	$scope.data.shoutsToUser;
	$scope.data.shoutsFromUser;

	// console.log($scope.data.username);
	
	//THIS NEEDS SHOUTS TO USERS TO BE TESTED
  $scope.getUser = function(username) {
    Users.pullUser(username).then(function(response) {
      $scope.data.user = response;
      $scope.data.shoutsToUser = response.shoutsReceived;
      console.log(response.shoutsReceived);
    });
  }

  $scope.getUser($scope.data.username);
  
}]);


