angular.module('shoutr.services', [])

.factory('Shouts', ['$http', function($http) {

  var getShouts = function() {
    return $http({
      method: 'GET',
      url:'/api/shoutmaker'
    }).then(function(response) {
      return response.data;
    }).catch(function(error) {
      console.log(error);
    });
  }

  var saveShout = function(shout) {
    return $http({
      method: 'POST',
      url:'/api/shoutmaker',
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
