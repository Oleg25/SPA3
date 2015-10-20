/**
 * Created by ovel on 15.10.2015.
 */

angular.module('spa3App')
  .controller('productController', function($scope,$window,product,Stock){

    $scope.$on('startSearch', function (event, data) {

       $scope.stockData = Stock.query({itemcode: data.sParam});

       $window.localStorage.setItem("currItemCode",data.sParam);

      $scope.data = product.query({type: 'product', itemcode: data.sParam});
      $scope.analogs = product.query({type: 'product', itemcode: data.sParam, subType: 'analogs'});
      $scope.accessories = product.query({type: 'product', itemcode: data.sParam, subType: 'accessories'});

      $scope.reservs = product.query({type: 'product', itemcode: data.sParam, subType: 'reserve'});
      $scope.trans = product.query({type: 'product', itemcode: data.sParam, subType: 'intrans'});

    });

      $scope.gridOptions = {
        data: 'stockData',
        columnDefs: [
          {
          field:'stock',
          displayName:'Склад'
          },
          {
            field:'total',
            displayName:'Физ.наличие'
          },
          {
            field:'sizeTon',
            displayName:'калибр'
          },
          {
            field:'color',
            displayName:'тон'
          },
          {
            field:'part',
            displayName:'партия'
          },
          {
            field:'reserve',
            displayName:'резервы'
          },
          {
            field:'intrans',
            displayName:'в пути'
          }
        ]

      };


    $scope.gridReserve = {
      data: 'reservs',
      columnDefs: [
        {
          field:'sklad',
          displayName:'Склад'
        },
        {
          field:'orderCode',
          displayName:'Код заказа'
        },
        {
          field:'empName',
          displayName:'Отвтественный'
        },
        {
          field:'empMob',
          displayName:'Моб.'
        },
        {
          field:'empLocal',
          displayName:'Офис.'
        }
        ]


    };
    $scope.gridTrans = { data: 'trans'};

  });
