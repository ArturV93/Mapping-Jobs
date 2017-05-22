'use strict';
angular.module('main')
.controller('MainCtrl', function ($scope,$timeout, $http,$window, Main, colorHelper) {

  $scope.occupation = {};
  $scope.errorMessage = '';
  $scope.disabled = undefined;
  $scope.input = {};

  Main.getCardInfo().then(function(data){


    if(data.avgSalary === 0){
      var salary = 'Not Available';
    }else{
      var salary = "€" + data.avgSalary;
    }

     $scope.charts = [{
       description: 'Jobs Available',
       stats: data.total
     }, {
       description: 'Average Salary',
       stats: salary
     }, {
       description: 'Most Popular Sector',
       stats: data.mostpopular
     },
     {
       description: 'County with Most Jobs',
       stats: data.county
     }
    ];
  })

  Main.getTitles().then(function(data){
      $scope.titles = data;
  })


  $timeout(function(){
    var map = AmCharts.makeChart( "chartdiv", {
             "type": "map",
             "colorSteps": 30,

             "dataProvider": {
               "mapURL": "app/main/assets/irelandHigh.svg",
               "areas": []
             },
             "theme": "light",
             "areasSettings": {
               "autoZoom": true,
               'color': '#69F0AE',
               'colorSolid': '#27ae60',
               'rollOverColor': '#B9F6CA',
               'selectedColor': '#B9F6CA',
               "unlistedAreasColor": '#ecf0f1',
               'balloonText': '<h3>[[title]]</h3><h5><b>Available Jobs:</b>  [[customData]] <br/> <b>Average Salary:</b> [[description]] </h5> ',
             },

             "valueLegend": {
               "right": 10,
               "minValue": "little",
               "maxValue": "a lot!"
             },
        });

        $scope.sectorJobs = function(title){

          var data = {
            occupation: title.careers
          };

          Main.getSectorJob(data).then(function(data){
              map.dataProvider.areas = data;
              map.validateData();
          })
        }

        $scope.searchJobs = function(){
          $scope.errorMessage = '';
          $scope.search = true;

          $timeout(function(){
            Main.scrapeJobs($scope.occupation).then(function(data){
              map.dataProvider.areas = data;
              map.validateData();
              $scope.search = false;

            }, function(err){
              $scope.errorMessage = "Sorry, Refresh page and try again";
              $scope.search = false;
            })
          }, 3000);
        }

        $scope.sectorJobs('');

        // map.addListener("clickMapObject", function(event) {
        //   $scope.link = 'http://www.jobs.ie/' + event.mapObject.id + '_jobs.aspx';
        //   console.log($scope.link);
        // });

    }, 10);




   $scope.donughnut = function(county){
     $scope.doughnutData = {};
     $scope.total = {};
     Main.getInfo(county).then(function(data){
       $scope.total = data.total;
         $scope.doughnutData = {
             labels: data.labels,
             datasets: [
                 {
                     data: data.data,
                     backgroundColor: [
                        "#ffc787",
                         "#ffeb96",
                         '#b4ff99',
                         "#f2df9d",
                         "#fbff87",
                         '#C4E0F9',
                         '#5EBA8F',
                         '#ff8b87',
                         '#ffb796',
                         '#a987ff',
                         '#99ffca',
                         '#AFAAA3',
                         '#706E82',
                         '#a9ff96',
                         '#967ec9',
                         '#98CBB4'

                     ],
                     hoverBackgroundColor: [
                         colorHelper.shade("#ffc787", 15),
                         colorHelper.shade("#ffeb96", 15),
                         colorHelper.shade("#b4ff99", 15),
                         colorHelper.shade('#f2df9d', 15),
                         colorHelper.shade("#fbff87", 15),
                         colorHelper.shade('#C4E0F9', 15),
                         colorHelper.shade('#5EBA8F', 15),
                         colorHelper.shade('#a987ff', 15),
                         colorHelper.shade('#ff8b87', 15),
                         colorHelper.shade('#ffb796', 15),
                         colorHelper.shade('#99ffca', 15),
                         colorHelper.shade('#AFAAA3', 15),
                         colorHelper.shade('#706E82', 15),
                         colorHelper.shade('#a9ff96', 15),
                         colorHelper.shade('#967ec9', 15),
                         colorHelper.shade('#98CBB4', 15)
                     ],
                     percentage: data.percentage
                 }]
         };

         var canvas = document.getElementById('chart-area');
         var ctx = canvas.getContext('2d');
         if($window.myDoughnut){
           $window.myDoughnut.destroy();
         }
         $window.myDoughnut = new Chart(ctx, {
             type: 'doughnut',
             data: $scope.doughnutData,
             options: {
                 cutoutPercentage: 64,
                 responsive: true,
                 showTooltips: true,
                 multiTooltipTemplate: "<%= value %>",
                 elements: {
                     arc: {
                         borderWidth: 0
                     }
                 }
             }
         });
      })
    }
    $scope.donughnut('');
});
