'use strict';

angular.module('spa3App')
  .controller('NavbarCtrl', function ($scope, Auth, Modal) {
    $scope.menu = [{
      'title': 'Главная',
      'state': 'main'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.items = ['item1', 'item2', 'item3'];
    $scope.animationsEnabled = true;


  });


