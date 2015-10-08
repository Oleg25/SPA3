'use strict';

angular.module('spa3App')
  .factory('Product', ['$resource','REST_API',function ($resource,apiURL) {

     return $resource(apiURL+"stocks/:itemcode", { itemcode: "@itemcode" });
  }]);
