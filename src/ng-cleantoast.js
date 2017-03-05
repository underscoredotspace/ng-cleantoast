angular.module('ngCleanToast', [])

.service('toasts', function() {
  return {
    // Convert Type text to index, e.g. 'warn' > 1
    type: function(type) {
      return this.types.indexOf(type)
    },
    types: ['info', 'warn', 'error', 'debug'],
    _listener: null,
    new: function(type, title, text, timeout) {
      this._listener({type:this.types[type], title:title, text:text, timeout:timeout});
    },
    seton: function(callback) {
      this._listener = callback;
    },
    addType: function(type) {
      this.types.push(type)
    },
    sticky: -1
  }
})

.directive('ctToast', function(toasts) {
  return {
    restrict: 'C',
    link: function(scope, element) {
      var timeleft
      element.on('mouseover', function() {
        timeleft = scope.toast.pause()
      })
      element.on('mouseout', function() {
        scope.toast.resume(timeleft)
      })
      element.on('click', function(event) {
        scope.toast.clear()
      })
    }
  }
})

.directive('ctToasts', function($timeout, toasts){
  return {
    restrict: 'AE',
    replace: false,
    template: '<div ng-repeat="toast in toasts" class="ct-toast ct-toast-{{toast.type}}" ng-class="{\'ct-toast-sticky\':toast.sticky}"><div ng-if="toast.title" class="ct-toast-title" ng-class="{\'ct-toast-title-sticky\':toast.sticky}">{{toast.title}}</div><div ng-if="toast.text" class="ct-toast-text" ng-class="{\'ct-toast-text-sticky\':toast.sticky}">{{toast.text}}</div></div>',
    compile: function() {
      return {
        pre: function(scope, element) {
          // Adds ct-toasts class if not in element already
          if (!element.hasClass('ct-toasts')) {
            element.addClass('ct-toasts')
          };

          // Initialise toasts pipe for us to push to
          scope.toasts = [];

          // Effectively shares the scope and some new functions with toasts service
          toasts.seton(function(toast) { 
            // Default timeout to 3s if not specified
            toast.timeout = toast.timeout || 3000

            if (toast.timeout<=0) {
              toast.timeout = null
              toast.sticky = true
            }

            // Function to delete the toast, triggered on click or after toast.delay
            toast.clear = function() {
              if (toast.timeout) $timeout.cancel(toast.timer)
              scope.toasts.splice(scope.toasts.indexOf(toast),1);
              scope.$digest()
            }

            if (toast.timeout) {
              // Returns time left until toast.clear() will be run by $timeout
              toast.timeLeft = function() {
                return toast.timeout - (Date.now() - toast.startTime)
              }

              // Clears current $timeout and returns time for passing to toast.resume()
              toast.pause = function() {
                timeLeft = toast.timeLeft()
                $timeout.cancel(toast.timer)
                return timeLeft + 1000
              }

              // Effectively resumes the $timeout where we left off
              toast.resume = function(timeLeft) {
                toast.timer = $timeout(function () {
                  toast.clear()
                }, timeLeft);
              }

              // Create initial $timeout to delete toast after specified duration
              toast.timer = $timeout(function () {
                toast.clear()
              }, toast.timeout);
            } else {
              toast.pause = toast.resume = function(){}
            }

            // Set the creation time and push to scope
            toast.startTime = Date.now()
            scope.toasts.push(toast);
          })
        }
      }
    }
  }
});