angular.module('shoutr.userProfile', [])

.controller('userProfileController', ['$scope', 'Users', '$stateParams', function($scope, Users, $stateParams) {

  $scope.data = {};
	$scope.data.username = $stateParams.username;

	console.log($scope.data.username);

  $scope.getUser = function(username) {
    Users.pullUser(username).then(function(response) {

      $scope.data.user = response;
    });
  }

  $scope.getUser($scope.data.username);
  
}]);
