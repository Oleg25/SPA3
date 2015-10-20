/**
 * Created by ovel on 13.10.2015.
 */

angular.module('spa3App')
  .controller('stockController', function($scope,$window){
    $scope.code = $window.localStorage.getItem("currItemCode");

  });
