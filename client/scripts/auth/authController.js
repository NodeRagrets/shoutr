angular.module('shoutr.auth', [])

.controller('authController', ['$scope', '$window', '$location', 'Users', function($scope, $window, $location, Users){

	$scope.signupData = {
		user: {
			email: '',
			username: '',
			password: ''
		}
	};

	$scope.userSignedup = false;

  $scope.signup = function() { 
  	// TODO: add confirm password to view and logic to accomodate it here
  	
  	var signupResponse = Users.signup($scope.signupData.user);
		
		console.log("HERE IS SIGNUP RESPONSE", signupResponse);
  	if (signupResponse.status === 200) {
  		//TODO: begin session here $window.localStorage.setItem...
  		// console.log('INSIDE THE SUCCESS 200 OF AUTHCONTROLLER');
  		$location.path('/#/newsfeed');
  		$scope.userSignedup = true;
  	} else {
  	  //Show error, passwords not matching.
  	  //show error, account already exists
  	  //div with ng-hide ng-model='error' 
  	  $scope.error = signUpResponse.status;
  	  console.log("HERE IS SCOPE ERROR", $scope.error);
  	}
  }



  $scope.login = function() {
  }

}])