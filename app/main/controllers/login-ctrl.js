'use strict';
angular.module('main')
.controller('LoginCtrl', function ($scope, $http) {

  $scope.user = {};

  $scope.login = function (){
    $http.post('/api/v1/auth/login/', $scope.user).then(function(data){
      console.log(data);
    })
  }

});
