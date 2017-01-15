angular.module('demoApp', ['ngCleanToast'])

.controller('demoController', function($scope, toasts) {
  $scope.newToast = function() {
    toasts.new(Math.round(Math.random() * (3 - 0) + 0), 'test', 'test text');
  }
  $scope.newNoTitleToast = function() {
    toasts.new(toasts.types.info, '', 'test text', 2000);
  }
})