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
    compile: function() {
      return {
        pre: function(scope, element) {
          element.on('click', function(event) {
            scope.toast.clear()
          })
        }
      }
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
          element.addClass('ct-toasts');
          scope.toasts = [];
          toasts.seton(function(toast) {
            toast.clear = function() {
              $timeout.cancel(toast.timeout)
              scope.toasts.splice(scope.toasts.indexOf(toast),1);
              scope.$digest()
            }

            toast.timeout = $timeout(function () {
              toast.clear()
            }, toast.timeout || 3000);
            scope.toasts.push(toast);
          })
        }
      }
    }
  }
});