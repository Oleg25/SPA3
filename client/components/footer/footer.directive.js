'use strict';

angular.module('spa3App')
  .directive('footer', function () {
    return {
      templateUrl: 'components/footer/footer.html',
      restrict: 'E',
      link: function (scope, element) {
        element.addClass('footer');
        scope.version = "1.1.0"
      }
    };
  });
