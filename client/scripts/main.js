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
  'RDash'
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
    // .state('newsfeed', {
    //   url: '/newsfeed/:groupname',
    //   templateUrl: './scripts/newsFeed/newsFeedView.html'
    // })
    // .state('shoutmaker', {
    //   url: '/shoutmaker',
    //   templateUrl: './scripts/shoutMaker/shoutMakerView.html'
    // })
    // .state('groupmaker', {
    //   url: '/groupmaker',
    //   templateUrl: './scripts/groupMaker/groupCreationView.html'
    // })
    // .state('userprofile', {
    //   url: '/userprofile/:username',
    //   templateUrl: './scripts/userProfile/userProfileView.html'
    // });

    .state('dashboard', {
      url: '/dashboard',
      templateUrl: './scripts/dashboard.html'
    })
    .state('dashboard.newsfeed', {
      url: '/newsfeed/:groupname',
      templateUrl: './scripts/newsFeed/newsFeedView.html'
    })
    .state('dashboard.shoutcreate', {
      url: '/shoutcreate',
      templateUrl: './scripts/shoutMaker/shoutMakerView.html'
    })
    .state('dashboard.groupcreate', {
      url: '/groupcreate',
      templateUrl: './scripts/groupMaker/groupCreationView.html'
    })
    .state('dashboard.user', {
      url: '/user/:username',
      templateUrl: './scripts/userProfile/userProfileView.html'
    })
    .state('logout', {
      url: '/logout',
      templateUrl: './scripts/auth/logoutView.html'
    });

}]);



//subview method -> will be much cleaner and is part of a larger refactor of the routes coming soon.
// <ul>
//   <li ng-repeat="group in groups">
//     <a ui-sref=".groupname({ groupname: group.name })">{{ group.name }}</a>
//   </li>
// </ul>

// .state('newsfeed', {
//   url: '/newsfeed',
//   templateUrl: './scripts/newsFeed/newsFeedView.html'
// })
// .state('newsfeed.groupname', {
//   url: '/:groupname'
// })