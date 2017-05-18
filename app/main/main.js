'use strict';
angular.module('main', [
  'ui.router'
])
.run(function ($rootScope, $state, auth) {
  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
    if (toState.name === 'home'){
      $rootScope.homepage = false;
    }else{
      $rootScope.homepage = true;
    }
  })

})
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: '/app/main/templates/main-page.html',
      controller: 'MainCtrl'
    })
    .state('stats', {
      url: '/stats',
      templateUrl: '/app/main/templates/statistic.html',
      controller: 'StatsCtrl'
    })
    .state('home', {
      url: '/',
      templateUrl: '/app/main/templates/home.html'
    })
});
