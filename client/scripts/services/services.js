angular.module('shoutr.services', [])

.factory('Shouts', ['$http', '$window', function($http, $window) {

  var getShouts = function(groupname) {
    return $http({
      method: 'GET',
      url:'/api/shouts',
      params: {groupName: groupname}
    }).then(function(response) {
      $window.localStorage.setItem('shoutr_auth_token', response.data.token)
      return response.data.result;
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


.factory('Users', ['$http', '$window', '$state', function($http, $window, $state) {

  var login = function(userInfo) {
    return $http({
      method: 'POST',
      url: '/api/users/login',
      data: userInfo
    }).then(function(response) {
      $window.localStorage.setItem('shoutr_auth_token', response.data.token);
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
      $window.localStorage.setItem('shoutr_auth_token', response.data.token);
      return response;
    }).catch(function(error) {
      console.log(error);
      return error;
    });
  }

  var pullUser = function(username) {
    return $http({
      method: 'GET',
      url: '/api/users/userprofile?username=' + username
    }).then(function(response) {
      console.log("HERE IS RESPONSE", response);
      return response.data
    }).catch(function(error) {
      console.log(error);
    });
  }

  var isAuth = function() {
    return !!$window.localStorage.getItem('shoutr_auth_token');
  }


  var logout = function(){
    $window.localStorage.removeItem('shoutr_auth_token');
    $state.go('anon.login')
  }


  var storeProfilePic = function(UserDataObj) {
    return $http({
      url: '/api/users/storeprofilepic',
      data: UserDataObj,
      method: 'POST'
    }).then(function(response) {
      // console.log('inside promise of storeprofilepic fn!');
      // console.log(response.config.data.blobUrl);
      return response;
    }).catch(function(error) {
      console.log(error);
    });
  }

  return {
    login: login,
    signup: signup,
    pullUser: pullUser,
    isAuth: isAuth,
    logout: logout,
    storeProfilePic: storeProfilePic
  }

}])



.factory('PicData', ['$http', function($http) {

  return {profilePic: ''};

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

  var addGroupUsers = function(users){
    return $http({
      method: 'POST',
      url: '/api/groups/addUsers',
      data: users
    }).then(function(response){
      return response.data;
    }).catch(function(error){
      console.log(error);
    })
  }

  return {
    createGroup: createGroup,
    getGroups: getGroups,
    addGroupUsers: addGroupUsers
  }


}])
