/**
 * Created by ovel on 12.10.2015.
 */

angular.module('siAppTest',['ngResource']);

angular.module('siAppTest').factory('productService',function($resource){
    return $resource('product.json');
});

angular.module('siAppTest')
   .controller('prodController',function($scope,productService){

    productService
      .query()
      .$promise
      .then(function(response){
         $scope.products = response;
    });

  });

