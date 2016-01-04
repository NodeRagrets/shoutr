angular.module('shoutr.userProfile', ['ngFileUpload'])

.controller('userProfileController', ['$scope', 'Users', '$stateParams', 'Upload', '$timeout', function($scope, Users, $stateParams, Upload, $timeout) {

  $scope.data = {};
	$scope.data.username = $stateParams.username;
	$scope.data.shoutsToUser;
	$scope.data.shoutsFromUser;
  
  $scope.picFile;


	console.log("HERE IS USERNAME", $scope.data.username);
	

  $scope.getUser = function(username) {
    Users.pullUser(username).then(function(response) {
      $scope.data.user = response;
      $scope.data.shoutsToUser = response.shoutsReceived;
      // console.log(response.shoutsReceived);
    });
  }


  $scope.uploadPic = function(file) { 
    $scope.picFile = file;
    
    // Upload.base64DataUrl(file
    Users.storeProfilePic(file).then(function(response) {
      file.result = response.data;
      console.log("here is response", response);
      // if (response.status > 0) {
      //   $scope.errorMsg = response.status + ': ' + response.data;
      // }
      // file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }

  $scope.getUser($scope.data.username);
  
}]);


