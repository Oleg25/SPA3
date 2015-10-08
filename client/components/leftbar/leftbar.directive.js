'use strict';

angular.module('spa3App')
  .directive('leftbar', function () {
    return {
      templateUrl: 'components/leftbar/leftbar.html',
      restrict: 'E',
      controller: 'LeftbarCtrl',
      link: function (scope, element) {
        element.addClass('leftbar');
      }
    };
  });
