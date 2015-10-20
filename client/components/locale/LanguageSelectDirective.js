/**
 * Created by ovel on 12.10.2015.
 */

angular.module('spa3App') .directive('ngTranslateLanguageSelect', function (LocaleService) { 'use strict';

  return {
    restrict: 'A',
    replace: true,
    template: ''+
    '<div class="language-select" ng-if="visible">'+
    '<label>'+
    '{{"directives.language-select.Language" | translate}}:'+
    '&nbsp;<select ng-model="currentLocaleDisplayName"'+
    'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'+
    'ng-change="changeLanguage(currentLocaleDisplayName)">'+
    '</select>'+
    '</label>'+
    '</div>'+
    '',
    controller: function ($scope) {
      $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
      $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
      $scope.visible = $scope.localesDisplayNames &&
        $scope.localesDisplayNames.length > 1;

      $scope.changeLanguage = function (locale) {
        LocaleService.setLocaleByDisplayName(locale);
      };
    }
  };
});
