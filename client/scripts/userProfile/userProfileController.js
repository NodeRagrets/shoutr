angular.module('shoutr.userProfile', ['ngFileUpload'])

.controller('userProfileController', ['$scope', 'Users', '$stateParams', 'Upload', '$timeout', 'PicData', function($scope, Users, $stateParams, Upload, $timeout, PicData) {

  $scope.data = {};
	$scope.data.username = $stateParams.username;
	$scope.data.shoutsToUser;
	$scope.data.shoutsFromUser;
  
  $scope.picFile;

  $scope.getUser = function(username) {
    Users.pullUser(username).then(function(response) {
      $scope.data.user = response;
      // $scope.data.shoutsToUser = response.shoutsReceived;
      // console.log(response.shoutsReceived);
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
        console.log(response);
      // file.result = response.data;
      // console.log("here is THE URL", response.config.data.pic.$ngfBlobUrl);
      // if (response.status > 0) {
      //   $scope.errorMsg = response.status + ': ' + response.data;
      // }
      // file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
  }

  $scope.getUser($scope.data.username);
  
}]);


