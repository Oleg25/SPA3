/**
 * Created by ovel on 15.10.2015.
 */
'use strict';

angular.module('spa3App')
  .directive('product', function () {
    return {
      templateUrl: 'app/product/product.html',
      restrict: 'E',
      controller: 'productController'
    };
  });

