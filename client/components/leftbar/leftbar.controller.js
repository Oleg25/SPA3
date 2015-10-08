'use strict';

angular.module('spa3App')
    .controller('LeftbarCtrl',  function ($scope,$rootScope) {

        $scope.search = function() {

          $rootScope.$broadcast('startSearch',{
            sParam : $scope.searchBox
          });
        }


        $scope.toggleBar = function()
        {

          if ($rootScope.bodylayout.indexOf("sidebar-collapse") >= 0){
              $rootScope.bodylayout = 'hold-transition skin-red-light sidebar-mini fixed';
          }else{$rootScope.bodylayout = 'hold-transition skin-red-light sidebar-mini fixed sidebar-collapse'; }
        }


    });
