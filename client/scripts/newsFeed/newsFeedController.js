angular.module('shoutr.newsFeed', [

])
.controller('newsFeedController', ['$scope', 'Shouts', function($scope, Shouts){
  $scope.data = {};
  $scope.data.shouts = [{recipient: 'Bob', title: 'Good job', message:'placeholder'},
  {recipient: 'Bobby', title: 'Good jobb', message:'placeholder'},
  {recipient: 'Bobbi', title: 'Good joba', message:'placeholder'},
  {recipient: 'Bobi', title: 'Good jobd', message:'placeholder'},
  {recipient: 'Bobb', title: 'Good jobf', message:'placeholder'},
  {recipient: 'Bab', title: 'Good jobg', message:'placeholder'}]
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
