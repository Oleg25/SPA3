/**
 * Created by ovel on 16.10.2015.
 */

'use strict';

var app = angular.module('spa3App')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('cart', {
        url: '/cart',
        templateUrl: 'app/cart/cart.html',
        controller: 'cartController'
      })

       .state('cart.client',{
        url: '/client',
        templateUrl: 'app/cart/templates/client.tpl.html'
        })

      .state('cart.product',{
        url: '/product',
        templateUrl: 'app/cart/templates/product.tpl.html'
      })

      .state('cart.order',{
        url: '/order',
        templateUrl: 'app/cart/templates/order.tpl.html'
      })

    // catch all route
    // send users to the form page
     $urlRouterProvider.otherwise('/cart/client');
  })

  .controller('cartController', ['$scope', '$http',
    'Cart', 'Divisions', 'Clients', 'ngCart',
    'UrlApi', 'toastr', 'underscore',
    function ($scope, $http, Cart, Divisions, Clients, ngCart, UrlApi, toastr, _) {

      window.scope = $scope;
      $scope.ngCart = ngCart;

      $scope.cartItems = Cart.query();
      $scope.clientParams = {
        client: new Clients,
        error: false,
        division: null
      };

      $scope.$watch('cartItems.$resolved', function (val) {
        if (!val) {
          return;
        }
        angular.forEach($scope.cartItems, function (cartItem) {
          cartItem.data = angular.fromJson(cartItem.data);
        });
      });

      $scope.deleteItem = function deleteItem(item) {
        item.$delete().then(function () {
          $scope.cartItems = _.reject($scope.cartItems, function (listItem) {
            return listItem.id === item.id;
          });
        });
      };

      $scope.makeOrder = function makeOrder() {
        if (!$scope.clientParams.client.code) {
          toastr.warning('Укажите код клиента', 'Ошибка валидации');
          $scope.clientParams.error = true;
          var clientInput = document.querySelector("#clientName");
          clientInput.scrollIntoView(true);
          window.scrollBy(0, -35);
          return;
        }
        $http({
          url: UrlApi.baseAPI + UrlApi.endPoint.basket,
          method: 'POST',
          data: {
            custaccount: $scope.clientParams.client.code,
            priceGroup: 'РОЗН',
            division: $scope.clientParams.division.merch_name
          },
          transformResponse: undefined
        })
          .success(function (result) {
            var bsCode = result.trim();
            toastr.success('Код вашей корзины - ' + bsCode, 'Корзина успешно сохранена');
            var data = [];
            angular.forEach(ngCart.getItems(), function (item) {
              var itemParams = item.getData();
              var ids = itemParams.data.combo.split('/');
              data.push({
                itemcode: itemParams.itemcode,
                qty: itemParams.qty.toString(),
                price: itemParams.price,
                stock: itemParams.data.stock,
                colorID: ids[1],
                sizeID: ids[0],
                bs_code: bsCode,

                status: '0',
                cID: 'еtest,'
              });
            });
            $http({
              url: UrlApi.baseAPI + UrlApi.endPoint.basketLines,
              method: 'POST',
              data: data,
              transformResponse: undefined
            });
          })
          .error(function () {
            toastr.error('Корзина НЕ сохранена. Попробуйте ещё раз', 'Ошибка сохранения');
          });
      }


    $scope.formData = {};
    $scope.processForm = function() {
     console.info("делаем заказ");
    };

    $scope.exitValidation = function(context){
      return context.firstName === "Jacob";
    }

  }]);

app.service('Cart', ['$resource', 'UrlApi', function ($resource,UrlApi) {
  return $resource(UrlApi.mongoURL + UrlApi.endPoint.cartItems + ':id', {id: '@id'});
}])

app.service('Clients',function($resource,UrlApi){
  return $resource(UrlApi.baseAPI + UrlApi.endPoint.client + ':name', {name: '@name'}, {'get': {isArray: true}});
});

app.service('Divisions',  function ($resource, UrlApi) {
  return $resource(UrlApi.baseAPI+UrlApi.endPoint.division + ':id', {id: '@id'});
})

app.directive('client', ['Divisions', 'Clients', function (Divisions, Clients) {
  return {
    restrict: 'E',
    templateUrl: '/app/cart/templates/client.html',
    scope: {
      params: '=',
    },
    link: function ($scope) {
      $scope.divisionsList = Divisions.query();


      $scope.$watch('divisionsList.$resolved', function (val) {
        if (!val) {
          return;
        }
        if ($scope.params) {
            $scope.params.division = $scope.divisionsList[0];
        }
      });

      var autoClientChanged = false;

      /**
       * Change Event input text
       */
      $scope.$watch('params.client.name', function (val) {
        if (autoClientChanged) {
          autoClientChanged = false;
          return;
        }
        if ($scope.params) {
           $scope.params.client.code = '';
        }
        if (val === undefined || val.length < 2) {
          return;
        }
        $scope.params.client.code = '';
        $scope.possibleClients = Clients.get({name: val}, function successCallback(result) {
          if (result && result.length === 1) {
            autoClientChanged = true;
            $scope.params.error = false;
            $scope.params.client = result[0];
          }
        });
      });

      $scope.choosePossibleClient = function choosePossibleClient(client) {
        autoClientChanged = true;
        $scope.params.error = false;
        $scope.params.client = client;
      };
    }
  }
}]);
