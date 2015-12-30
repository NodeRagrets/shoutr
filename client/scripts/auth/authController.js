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

	$scope.userSignedup = false;

  $scope.signup = function() { 
  	// TODO: add confirm password to signup view, and logic to accomodate it here
  	
  	Users.signup($scope.signupData.user).then(function(response){
  			if (response.status === 200) {
		  		// TODO: begin session here $window.localStorage.setItem
		  		console.log("response is", response);
		  		$scope.userSignedup = true;
		  		$location.path('/#/newsfeed');
  			} else {
  				//TODO: display appropriate error to user
  				$scope.error = response.status;
  	  		console.log("HERE IS SCOPE ERROR", $scope.error);
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








