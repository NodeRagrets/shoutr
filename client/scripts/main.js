angular.module('shoutr',[
  'ui.router',
  'shoutr.groupCreation',
  'shoutr.shoutCreation',
  'shoutr.auth',
  'shoutr.newsFeed',
  'shoutr.services'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

   $urlRouterProvider.otherwise('/newsfeed');

  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: './scripts/auth/loginView.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: './scripts/auth/signupView.html'
    })
    .state('newsfeed', {
      url: '/newsfeed',
      templateUrl: './scripts/newsFeed/newsFeedView.html'
    })
    .state('shoutmaker', {
      url: '/shoutmaker',
      templateUrl: './scripts/shoutMaker/shoutMakerView.html'
    })
    .state('groupmaker', {
      url: '/groupmaker',
      templateUrl: './scripts/groupMaker/groupCreationView.html'
    })
    .state('userprofile', {
      url: '/userprofile/:username',
      templateUrl: './scripts/userProfile/userProfileView.html'
    });

}]);
