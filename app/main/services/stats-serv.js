'use strict';
angular.module('main')
.factory('Stats', function ($log, $timeout, $http) {
  var s = {};

  s.getNaiveBayes = function(data){
    return $http.post('API/v1/naiveBayes', data).then(function(results){
        return results.data;
    })
  }

  s.getGraph = function(data){
    return $http.post('/API/v1/alldays', data).then(function(results){
        return results.data;
    })
  }

  s.getCompare = function(data){
    return $http.post('/API/v1/compare', data).then(function(results){
        return results.data;
    })
  }

  return s;
});
