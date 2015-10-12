'use strict';

angular.module('spa3App')
  .factory('Product', ['$resource','REST_API',function ($resource,REST_API) {
     return $resource(REST_API+"stocks/:itemcode", { itemcode: "@itemcode" }
     );
  }]);
