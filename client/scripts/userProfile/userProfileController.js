angular.module('shoutr.userProfile', [])

.controller('userProfileController', ['$scope', 'Users', '$stateParams', '$timeout', 'PicData', function($scope, Users, $stateParams, $timeout, PicData) {


  $scope.data = {};
	$scope.data.username;
	$scope.data.shoutsToUser;
	$scope.data.shoutsFromUser;
  
  $scope.picFile;


  $scope.getUser = function() {
    Users.pullUser().then(function(response) {
      $scope.data.username = response.token.username;
      console.log("HERE IS USERNAME", $scope.data.username);
    });
  }


  $scope.uploadPic = function(file) { 
    $scope.picFile.imgBlobUrl = file.$ngfBlobUrl;
    console.log("USERNAME IS HERE", $scope.data.username);

    $scope.PicData.profilePic = file.$ngfBlobUrl;

    var userDataWithFile = {
      'blobUrl': file.$ngfBlobUrl,
      'username': $scope.data.username
    };

    Users.storeProfilePic(userDataWithFile)
      .then(function(response) {
        console.log("hello, response", response);
        $scope.PicData.profilePic = response.config.data.blobUrl;
      });
  }

  $scope.getUser();
  
}]);


