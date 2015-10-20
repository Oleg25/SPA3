'use strict';
(function() {

function MainController($scope, $http, socket,$modal,angularLoad,$log,hotkeys) {
  var self = this;
  this.awesomeThings = [];
  var isLive = false;

  hotkeys.bindTo($scope)
    .add({
      combo: 'ctrl+f',
      callback: function(event) {
        event.preventDefault();
        document.getElementById('sb').focus();
      }
    })


  $http.get('/api/things').then(function(response) {
    self.awesomeThings = response.data;
    socket.syncUpdates('thing', self.awesomeThings);
  });


  this.addThing = function()   {
    if (self.newThing === '') {
      return;
    }
    $http.post('/api/things', { name: self.newThing });
    self.newThing = '';
  };

  this.deleteThing = function(thing) {
    $http.delete('/api/things/' + thing._id);
  };

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates('thing');
  });




  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      }, function () {
      Webcam.off;
      $log.info('Modal dismissed at: ' + new Date());
    });


    //Lazy load script
    angularLoad.loadScript('webcam.js').then(function() {
      if (isLive == false) {
      Webcam.set({
        image_format: 'jpeg',
        jpeg_quality: 100
      });

        Webcam.attach('#my_camera');
        isLive = true;
      }

         }).catch(function() {
          // There was some error loading the script. Meh
      });

  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };


 }

angular.module('spa3App')
  .controller('MainController', MainController);

  angular.module('spa3App').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.close();
     // $modalInstance.dismiss('cancel');
    };
  });

})();
