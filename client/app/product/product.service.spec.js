'use strict';

describe('Service: Product', function () {

  // load the service's module
  beforeEach(module('spa3App'));

  // instantiate service
  var Product;
  beforeEach(inject(function (_Product_) {
    Product = _Product_;
  }));

  it('should search items in stock', function () {
    expect(!!Product).toBe(true);
  });

});
