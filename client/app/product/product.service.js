'use strict';

angular.module('spa3App')
  .factory('product', ['$resource','UrlApi','$http',function ($resource,UrlApi,$http) {
       // Public API here
    var product = $resource(UrlApi.baseAPI+UrlApi.endPoint.product+":itemcode/:subType", {
        itemcode: "@itemcode",
        subType:  "@subType"
         },{
         'query':  {method:'GET', isArray:true}
      });
    return product;

  }]);
