'use strict';
angular.module('main')
.controller('StatsCtrl', function ($scope, $http, Main, $timeout, Stats) {

  $scope.occupation = {
    county: '',
    occupation: ''
  };
  $scope.compare = {countyA: '', countyB: ''};
  //Get all data for hstorical graph
  $scope.getlastTen = function(){
    $timeout(function () {
      $scope.answer = {};
      if($scope.occupation.occupation.careers && $scope.occupation.county.county){
        Stats.getGraph($scope.occupation).then(function(results){

            $scope.results = results;
            Chart(results);
        });
      }
    }, 10);
  }
  //call for making the prediction
  $scope.naive_bayes = function(){
    if($scope.occupation.occupation.careers && $scope.occupation.county.county){
      Stats.getNaiveBayes($scope.occupation).then(function(results){
        $scope.answer = results;
      })
    }
  }

  //getting titles
  Main.getTitles().then(function(data){
      $scope.titles = data;
  })

//comparing two industry between each other
$scope.compareTwoSectors = function(){
  $timeout(function () {
    if($scope.compare.countyA.county && $scope.compare.countyB.county && $scope.compare.occupationA.careers && $scope.compare.occupationB.careers){
      Stats.getCompare($scope.compare).then(function(results){

       $scope.labels = results.labels;
       $scope.series = ['Industry A', 'Industry B'];

       $scope.data = [
         results.data[0],
         results.data[1]
       ];

     })
    }

  }, 10);
}


  function Chart(chartData){

      var chart = AmCharts.makeChart("chartdiv", {
          "theme": "light",
          "type": "serial",
          "marginRight": 0,
          "autoMarginOffset": 20,
          "marginTop":20,
          "dataProvider": chartData,
          "valueAxes": [{
              "id": "v1",
              "axisAlpha": 0.1
          }],
          "graphs": [{
              "useNegativeColorIfDown": true,
              "balloonText": "[[category]]<br><b>Available Jobs: [[value]]</b>",
              "bullet": "round",
              "bulletBorderAlpha": 1,
              "bulletBorderColor": "#FFFFFF",
              "hideBulletsCount": 50,
              "lineThickness": 2,
              "lineColor": "#2ecc71",
              "negativeLineColor": "#e74c3c",
              "valueField": "visits"
          }],
          "chartScrollbar": {
              "scrollbarHeight": 5,
              "backgroundAlpha": 0.1,
              "backgroundColor": "#868686",
              "selectedBackgroundColor": "#67b7dc",
              "selectedBackgroundAlpha": 1
          },
          "chartCursor": {
              "valueLineEnabled": true,
              "valueLineBalloonEnabled": true
          },
          "categoryField": "date",
          "categoryAxis": {
              "parseDates": true,
              "axisAlpha": 0,
              "minHorizontalGap": 60
          },
          "export": {
              "enabled": true
          }
      });

      chart.addListener("dataUpdated", zoomChart);
      //zoomChart();

      function zoomChart() {
          if (chart.zoomToIndexes) {
              chart.zoomToIndexes(10, chartData.length - 1);
          }
      }
    }

});
