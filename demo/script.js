angular.module('demoApp', ['ngCleanToast'])

.controller('demoController', function ($scope, toasts) {
  // Add your own type called test
  toasts.addType('test')

  // This lets us rotat through all colours to demonstrate them
  var colour = 0
  var type = toasts.types[colour]
  nextColour = function () {
    colour++
    if (colour >= toasts.types.length) colour = 0
    type = toasts.types[colour] // => type text, e.g. 'warn'
  }

  $scope.newToast = function () {
    toasts.new(colour, 'Toast Title', 'Your toast is dark brown in colour');
    nextColour()
  }
  $scope.newNoTitleToast = function () {
    // toasts.type() resolves the type name to the index, e.g. 'warn' => 1
    toasts.new(toasts.type(type), '', 'Done!', 20000);
    nextColour()
  }
})