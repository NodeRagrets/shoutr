angular.module('shoutr.userProfile', ['ngFileUpload'])

.controller('userProfileController', ['$scope', 'Users', '$stateParams', '$timeout', 'Upload', 'PicData', function($scope, Users, $stateParams, $timeout, Upload, PicData) {


  $scope.data = {};
	$scope.data.username;
  $scope.data.email;
  



  $scope.getUser = function() {
    Users.pullUser().then(function(response) {
      $scope.data.username = response.data.username;
      $scope.data.email = response.data.email;
    });
  }


  $scope.uploadPic = function(file) { 
    $scope.picFile = file.$ngfBlobUrl;    

    //this is the PicData factory, which is the way of sharing data with the main controller. it gets injected there, as well, to post the uploaded image to the dashboard view.
    $scope.PicData.profilePic = file.$ngfBlobUrl;

    var userDataWithFile = {
      'blobUrl': file.$ngfBlobUrl,
      'username': $scope.data.username
    };

    Users.storeProfilePic(userDataWithFile)
      .then(function(response) {
        console.log("hello, response", response);
      });
  }

  $scope.getUser();
  
}]);


