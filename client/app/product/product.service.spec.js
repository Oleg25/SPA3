'use strict';

describe('Service: productService', function () {

  // load the service's module
  beforeEach(module('spa3App'));

  // instantiate service
  var product;
  beforeEach(inject(function (_productService_) {
    product = _productService_;
  }));

  it('should do something', function () {
    expect(!!product).toBe(true);
  });

});
