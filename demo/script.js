angular.module('demoApp', ['ngCleanToast'])

.controller('demoController', function($scope, toasts) {
  var colour = 0;

  nextColour = function() {
    colour++
    if (colour>3) {colour=0}
  }

  $scope.newToast = function() {
    toasts.new(colour, 'Toast Title', 'Your toast is dark brown in colour');
    nextColour()
  }
  $scope.newNoTitleToast = function() {
    toasts.new(colour, '', 'Done!', 2000);
    nextColour()
  }
})