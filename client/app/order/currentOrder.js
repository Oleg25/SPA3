/**
 * Created by vrog on 03.07.2015.
 */
angular.module('spa3App')

    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
      .state('orders', {
        url: '/orders',
        templateUrl: 'app/order/currentOrder.tpl.html',
        controller: 'cartController'
      })
    }])

    .service('BasketCode', ['$resource', 'UrlApi', function ($resource, UrlApi) {
        return $resource(UrlApi.mongoURL + UrlApi.endPoint.basketCode + ':clientCode', {clientCode: '@clientCode'}, {'get': {isArray: true}});
    }])

    .service('BasketItems', ['$resource', 'UrlApi', function ($resource, UrlApi) {
        return $resource(UrlApi.baseAPI + UrlApi.endPoint.basketItems + ':basketCode', {basketCode: '@basketCode'});
    }])

    .service('Status', ['$resource', 'UrlApi', function ($resource, UrlApi) {
        return $resource(UrlApi.baseAPI + UrlApi.endPoint.status);
    }])

    .controller('currentOrderController', ['$scope', 'Clients', 'BasketCode', 'BasketItems', 'UrlApi', '$http', 'StatusConfig',
        function ($scope, Clients, BasketCode, BasketItems, UrlApi, $http, StatusConfig) {
            window.scope = $scope;
            $scope.StConf = StatusConfig;

            $scope.clientParams = {
                client: new Clients,
                error: false,
                division: null
            };

            $scope.$watch('clientParams.client.code', function (val) {
                if (!val) {
                    return;
                }
                $scope.basketCodes = BasketCode.get({clientCode: val});
            });

            $scope.$watch('basketCodes.$resolved', function (val) {
                if (!val) {
                    return;
                }
                $scope.baskets = [];
                angular.forEach($scope.basketCodes, function (bCode) {
                    var basket = {
                        code: bCode.basketCode,
                        items: []
                    };
                    BasketItems.query({basketCode: bCode.basketCode}, function basketItemsThen(res) {
                        angular.forEach(res, function (item) {
                            item.Amount = parseFloat(item.Amount).toFixed(2);
                            basket.items.push(item);
                        });
                        $scope.baskets.push(basket);
                    });
                });
            });

            $scope.setStatus = function setStatus(item, status) {
                $http.post(UrlApi.baseAPI + UrlApi.endPoint.status, {
                        status: status,
                        recID: item.recID
                    }
                );
            };

        }]);
