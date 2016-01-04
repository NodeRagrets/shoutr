angular.module('shoutr',[
  'ui.router',
  'ui.bootstrap.buttons',
  'shoutr.directives',
  'shoutr.groupCreation',
  'shoutr.shoutCreation',
  'shoutr.auth',
  'shoutr.newsFeed',
  'shoutr.userProfile',
  'shoutr.services',
  'RDash',
  'ngFileUpload'
])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){

  $urlRouterProvider.otherwise('/dashboard/groupcreate');

  $stateProvider

    .state('anon', {
      abstract: true,
      template: '<ui-view/>',
      data: {
        access: false
      }
    })
    .state('anon.login', {
      url: '/',
      templateUrl: './scripts/auth/loginView.html'
    })
    .state('anon.signup', {
      url: '/signup',
      templateUrl: './scripts/auth/signupView.html'
    })

    $stateProvider

      .state('user', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: true
        }
      })
      .state('user.dashboard', {
        abstract: true,
        url: '/dashboard/',
        templateUrl: './scripts/dashboard.html'
      })
      .state('user.dashboard.newsfeed', {
        url: 'newsfeed/:groupname',
        templateUrl: './scripts/newsFeed/newsFeedView.html'
      })
      .state('user.dashboard.shoutcreate', {
        url: 'shoutcreate',
        templateUrl: './scripts/shoutMaker/shoutMakerView.html'
      })
      .state('user.dashboard.groupcreate', {
        url: 'groupcreate',
        templateUrl: './scripts/groupMaker/groupCreationView.html',
      })
      .state('user.dashboard.profile', {
        url: 'profile',
        templateUrl: './scripts/userProfile/userProfileView.html'
      })

    $httpProvider.interceptors.push('TokenAuth');

}])

.factory('TokenAuth', ['$window', function($window){

  return {

    request: function(request) {
      var jwt = $window.localStorage.getItem('shoutr_auth_token');

      if(jwt) {
        request.headers['authorization'] = jwt;
      }
      request.headers['Allow-Control-Allow-Origin'] = '*';
    
      return request;
    }

  }

}])

.run(['$rootScope', '$state', 'Users', function($rootScope, $state, Users) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

    if(!Users.isAuth() && toState.data.access) {
      if(toState.name === "anon.login") {
        return;
      }
      event.preventDefault();
      $state.go('anon.login');
      return;
    }

    if(Users.isAuth() && !toState.data.access) {
      event.preventDefault();
      $state.go('user.dashboard.groupcreate');
      return;
    }

  });
}]);
