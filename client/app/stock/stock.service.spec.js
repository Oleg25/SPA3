'use strict';

describe('Service: Stock', function () {

  // load the service's module
  beforeEach(module('spa3App'));

  // instantiate service
  var Stock;
  beforeEach(inject(function (_Stock_) {
    Stock = _Stock_;
  }));

  it('should search items in stock', function () {
    expect(!!Stock).toBe(true);
  });

});
