angular.module('shoutr.newsFeed', [

])
.controller('newsFeedController', ['$scope', 'Shouts', function($scope, Shouts){
  $scope.data = {};
  $scope.getShout = function(){
    Shouts.getShouts()
      .then(function(data){
        $scope.data['shouts'] = data;
      })
      .catch(function(err){
        console.log(err, "Caught an error in getShouts");
      })
  }

  $scope.getShout();

}])
