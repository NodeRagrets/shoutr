angular.module('shoutr.services', [])

.factory('Shouts', ['$http', function($http) {

  var getShouts = function(groupname) {
    return $http({
      method: 'GET',
      url:'/api/shouts',
      params: {groupName: groupname}
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

  var login = function(userInfo) {
    return $http({
      method: 'POST',
      url: '/api/users/login',
      data: userInfo
    }).then(function(response) {
      console.log('Successful Login');
      return response;
    }).catch(function(error) {
      console.log(error);
      return error;
    });
  }

  var signup = function(signupInfo) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: signupInfo
    }).then(function(response) {
      console.log('Successful Signup!');
      return response;
    }).catch(function(error) {
      console.log(error);
      return error;
    });
  }

  var pullUser = function(username) {
    return $http({
      method: 'GET',
      url: '/api/users/userprofile/:' + username  
    }).then(function(response) {
      return response.data
    }).catch(function(error) {
      console.log(error);
    });
  }

  var logoutUser = function() {
    return $http({
      method: 'GET',
      url: '/api/users/logout'
    }).then(function(response) {
      return response.data;
    }).catch(function(error) {
      console.log(error);
    });
  }

  return {
    login: login,
    signup: signup,
    pullUser: pullUser,
    logoutUser: logoutUser
  }

}])

.factory('Groups', ['$http', function($http){

  var createGroup = function(groupName){
    return $http({
      method: 'POST',
      url: '/api/groups/create',
      data: groupName
    }).then(function(response){
      return response.data;
    }).catch(function(error){
      console.log(error);
    })
  }

  var getGroups = function() {
    return $http({
      method: 'GET',
      url: '/api/groups/load',
    }).then(function(response){
      return response.data;
    }).catch(function(error){
      console.log(error);
    })
  }

  return {
    createGroup: createGroup,
    getGroups: getGroups
  }


}])
