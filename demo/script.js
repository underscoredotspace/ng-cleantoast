angular.module('demoApp', ['ngCleanToast'])

.controller('demoController', function ($scope, toasts) {
  // Add your own type called test
  toasts.addType('test')

  // This lets us rotate through all colours to demonstrate them
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
  $scope.newStickyToast = function() {
    toasts.new(colour, 'Toast & Jam', 'This toast is sticky - it wont leave until you click it. It also has it\s own style so you can make it stand out. ', toasts.sticky);
    nextColour()
  }
  $scope.newNoTitleToast = function () {
    // toasts.type() resolves the type name to the index, e.g. 'warn' => 1
    toasts.new(toasts.type(type), '', 'As well as having no title, this toast waits for 10s instead of default 3', 10000);
    nextColour()
  }
})