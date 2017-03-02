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
    }
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
    template: '<div ng-repeat="toast in toasts" class="ct-toast ct-toast-{{toast.type}}"><div ng-if="toast.title" class="ct-toast-title">{{toast.title}}</div><div ng-if="toast.text" class="ct-toast-text">{{toast.text}}</div></div>',
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

            // Function to delete the toast, triggered on click or after toast.delay
            toast.clear = function() {
              $timeout.cancel(toast.timer)
              scope.toasts.splice(scope.toasts.indexOf(toast),1);
              scope.$digest()
            }

            // Returns time left until toast.clear() will be run by $timeout
            toast.timeLeft = function() {
              return toast.timeout - (Date.now() - toast.startTime)
            }

            // Clears current $timeout and returns time for passing to toast.resume()
            toast.pause = function() {
              timeLeft = toast.timeLeft()
              $timeout.cancel(toast.timer)
              return timeLeft
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

            // Set the creation time and push to scope
            toast.startTime = Date.now()
            scope.toasts.push(toast);
          })
        }
      }
    }
  }
});