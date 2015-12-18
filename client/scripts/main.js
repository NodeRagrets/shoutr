angular.module('shoutr',[
  'ui.router',
  'shoutr.groupCreation',
  'shoutr.shoutCreation',
  'shoutr.auth',
  'shoutr.newsFeed',
  'shoutr.services'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('shoutmaker');

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: './auth/loginView.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: './auth/signupView.html'
    })
    .state('newsfeed', {
      url: '/newsfeed/:groupname',
      templateUrl: './newsFeed/newsFeedView.html'
    })
    .state('shoutmaker', {
      url: '/shoutmaker',
      templateUrl: './shoutMaker/shoutMakerView.html'
    })
    .state('groupmaker', {
      url: '/groupmaker',
      templateUrl: './groupMaker/groupCreationView.html'
    })
    .state('userprofile', {
      url: '/userprofile/:username',
      templateUrl: './userProfile/userProfileView.html'
    });

}]);
