/**
 * Created by ovel on 13.10.2015.
 */
angular.module('spa3App')
  .directive('stock', function () {
    return {
      templateUrl: 'app/stock/stock.html',
      restrict: 'E',
      controller: 'stockController'
    };
  });
