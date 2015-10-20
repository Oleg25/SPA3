'use strict';

angular.module('spa3App')
  .factory('Stock', ['$resource','UrlApi',function ($resource,UrlApi) {
     return $resource(UrlApi.baseAPI+UrlApi.endPoint.stock+":itemcode", { itemcode: "@itemcode" }
     );
  }]);
