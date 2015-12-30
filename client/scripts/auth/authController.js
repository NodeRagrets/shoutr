angular.module('shoutr.auth', [])

.controller('authController', ['$scope', '$window', '$location', 'Users', function($scope, $window, $location, Users){

	$scope.signupData = {
		user: {
			email: 'asd@asd.confirm',
			username: 'asdasd',
			password: 'asdsdsdsd'
		}
	};

	$scope.loginData = {
		user: {
			username: 'woooohaa',
			password: 'aekuhwa'
		}
	};

  $scope.error = {
  };

	$scope.userSignedup = false;

  $scope.signup = function() { 
  	// TODO: add confirm password to signup view, and logic to accomodate it here

    if($scope.signupData.user.password.length < 6 || 
        $scope.signupData.user.password.length > 18) {

    }

    if($scope.signupData.user.username.length < 5 || 
       $scope.signupData.user.username.length > 10) {

    }


  	
  	Users.signup($scope.signupData.user).then(function(response){
  			if (response.status === 200) {
		  		// TODO: begin session here $window.localStorage.setItem
		  		console.log("response is", response);
		  		$scope.userSignedup = true;
		  		$location.path('/#/newsfeed');
  			} 

        if (response.status === 409) {
          $scope.error.status = "Sorry, that username has already been taken.";
          // console.log("HERE IS RESPONSE", response);
          // console.log("HERE IS SCOPE ERROR BOOOOYAH", $scope.error);
        }
  	});
  }



  $scope.login = function() {
  	console.log("here's the login data", $scope.loginData.user);
  	Users.login($scope.loginData.user).then(function(response) {
  		if (response.status === 200) {
  			$location.path('/#/newsfeed');
  		} else {
  			//TODO: figure out how to handle this case 
  			console.log('problem with login');
  		}
  	})
  }

}])








