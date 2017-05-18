angular.module('main').directive('svgMap', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: '/app/main/assests/irelandHigh.svg',
        link: function (scope, element, attrs) {

            var regions = element[0].querySelectorAll('.land');

            angular.forEach(regions, function (path, key) {

                var regionElement = angular.element(path);
                regionElement.attr("region", "");
                regionElement.attr("dummy-data", "dummyData");
                $compile(regionElement)(scope);
            })
        }
    }
})
.directive('region', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            dummyData: "="
        },
        link: function (scope, element, attrs) {
            scope.elementId = element.attr("id");
            // console.log(scope.dummyData);
            scope.regionClick = function () {
                // console.log(scope.dummyData[scope.elementId]);
            };
            element.attr("ng-click", "regionClick()");
            element.attr("ng-attr-fill", "{{dummyData[elementId].value | map_colour}}");
            element.removeAttr("region");
            $compile(element)(scope);
        }
    }
})
.filter('map_colour', [function () {
    return function (input) {
      // rgba(22, 160, 133,1.0)
        return "rgba(22, 160, 133,"+ (input*10) +")";
    }
}]);
