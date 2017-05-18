'use strict';
angular.module('main')
.factory('Main', function ($log, $timeout, $http) {
  var m = {};

  m.getTitles = function(){
    return $http.get('/API/v1/titles').then(function(data){
        return data.data;
    })
  }

  m.getInfo = function(data){
    return $http.post('/API/v1/careersInfo', data).then(function(data){
        return data.data;
    })
  }

  m.getSectorJob = function(data){
    return $http.post('API/v1/jobs', data).then(function(data){
        return data.data;
    })
  }

    m.scrapeJobs = function(data){
      return $http.post('/API/v1/scrape', data).then(function(data){
          return data.data;
      })
   }

   m.getCardInfo = function(data){
     return $http.get('/API/v1/cardinfo', data).then(function(data){
         return data.data;
     })
   }


  return m;
});
