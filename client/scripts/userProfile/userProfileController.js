angular.module('shoutr', [])

.controller('userProfileController', ['$scope', 'Users', function($scope, Users) {

  $scope.data = {};

  $scope.getUser = function() {
    Users.pullUser().then(function(response) {
      $scope.data.user = response;
    });
  }

  $scope.getUser();
  
}]);