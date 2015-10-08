'use strict';

describe('Directive: leftbar', function () {

  // load the directive's module and view
  beforeEach(module('spa3App'));
  beforeEach(module('components/leftbar/leftbar.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<leftbar></leftbar>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the leftbar directive');
  }));
});
