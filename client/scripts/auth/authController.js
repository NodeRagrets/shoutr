angular.module('shoutr.auth', [])

.controller('authController', ['$scope', '$window', '$location', 'Users', '$state', function($scope, $window, $location, Users, $state){

	$scope.signupData = {
		user: {
			email: 'asd@asd.confirm',
			username: '',
			password: ''
		}
	};

	$scope.loginData = {
		user: {
			username: '',
			password: ''
		}
	};

  $scope.error = {
  };

	$scope.userSignedup = false;

  $scope.signup = function() { 
  	// LOW PRIORITY TODO: add confirm password to signup view, and logic to accomodate it here
  
    if ($scope.signupData.user.password === undefined) {
      $scope.error.status = "Password must be 6-18 characters in length.";
      return;
    }

    if ($scope.signupData.user.username === undefined) {
      $scope.error.status = "Username must be 5-10 characters in length.";
      return;
    } 
      
    else {
      Users.signup($scope.signupData.user).then(function(response){
        
        if (response.status === 200) {
          console.log("response is", response);
          $scope.userSignedup = true;
          $location.path('/groupmaker');
        } 

        if (response.status === 409) {
          $scope.error.status = "Sorry, that username has already been taken.";
        }
      });
    }

  }



  $scope.login = function() {
  	Users.login($scope.loginData.user).then(function(response) {
      
      if (response.status === 200) {
        console.log("successful login!");
  			$location.path('/newsfeed/:groupname');
  		} 

      if (response.status === 422) {
        $scope.error.status = "Incorrect password. Please try again.";
      } 

      if (response.status === 404) {
        $scope.error.status = "That username does not exist.";
      }
  	})
  }

  if($state.current.name === 'logout') {
    Users.logoutUser();
  };

}])










