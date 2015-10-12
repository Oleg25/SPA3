/**
 * Created by ovel on 12.10.2015.
 */

describe('prodController',function(){

  var $q,$rootScope,$scope,
    mockProductService,
    mockProductResponse = [{"name":"К","imgUrl":"n015574_Z.jpg"}];


  beforeEach(module('siAppTest'));

  // внедряем службу q для работты с отложенными результатами

  beforeEach(inject(function(_$q_,_$rootScope_){
    $q = _$q_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(inject(function($controller) {

    $scope = $rootScope.$new();

    // наш мок для эмуляции работы фабрики
    mockProductService = {
       query: function(){
         queryDefered = $q.defer();
         return { $promise: queryDefered.promise };
       }
    }

    spyOn(mockProductService,'query').andCallThrough();

    $controller('prodController',{
      '$scope': $scope,
      'productService': mockProductService
    });

  }));

  describe('productService.query', function() {

  beforeEach(function(){
    queryDefered.resolve(mockProductResponse);
    $rootScope.$apply();
  });


    it('должен быть вызван сервис productService',function(){
      expect(mockProductService.query).toHaveBeenCalled();
    });

    it('должен быть установлен результат ответа $scope.products',function(){
       expect($scope.products).toEqual(mockProductResponse);
    });

  });


});




