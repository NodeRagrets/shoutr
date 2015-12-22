angular.module('shoutr.shoutCreation', [])

.controller('shoutCreationController', ['$scope', 'Shouts', function($scope, Shouts) {
  
  $scope.shout = {
    recipient: '',
    title: '',
    message: ''
  };

  $scope.postShout = function() {
    Shouts.saveShout($scope.shout);
  }

}]);