angular.module('shoutr.services', [])

.factory('Shouts', ['$http', function($http) {

  var getShouts = function() {
    return $http({
      method: 'GET',
      url:'/api/shouts'
    }).then(function(response) {
      return response.data;
    }).catch(function(error) {
      console.log(error);
    });
  }

  var saveShout = function(shout) {
    return $http({
      method: 'POST',
      url:'/api/shouts',
      data: shout
    }).then(function(response) {
      console.log('successful post')
    }).catch(function(error) {
      console.log(error);
    });
  }

  return {
    getShouts: getShouts,
    saveShout: saveShout
  }

}])

.factory('Users', ['$http', function($http) {

  var login = function() {
    return $http({
      method: 'POST',
      url: '/api/users/login',
      data: userInfo
    }).then(function(response) {
      console.log('Successful Login');
    }).catch(function(error) {
      console.log(error);
    });
  }

  var signup = function() {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: signupInfo
    }).then(function(response) {
      console.log('Successful Signup!');
    }).catch(function(error) {
      console.log(error);
    });
  }

  var pullUser = function() {
    return $http({
      method: 'GET',
      url: '/api/users/profile'
    }).then(function(response) {
      return response.data
    }).catch(function(error) {
      console.log(error);
    });
  }

  return {
    login: login,
    signup: signup,
    pullUser: pullUser
  }

}])
