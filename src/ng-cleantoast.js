angular.module('ngCleanToast', [])

.service('toasts', function() {
  return {
    types: {
      info: 0,
      warn: 1,
      error: 2,
      debug: 3
    },
    _types: ['info', 'warn', 'error', 'debug'],
    _listener: null,
    new: function(type, title, text, timeout) {
      this._listener({type:this._types[type], title:title, text:text, timeout:timeout});
    },
    seton: function(callback) {
      this._listener = callback;
    },
  }
})
.directive('ctToasts', function($timeout, toasts){
  return {
    restrict: 'AE',
    replace: false,
    template: '<div ng-repeat="toast in toasts" class="ct-toast ct-toast-{{toast.type}}"><div ng-if="toast.title" class="ct-toast-title">{{toast.title}}</div><div ng-if="toast.text" class="ct-toast-text">{{toast.text}}</div></div>',
    compile: function() {
      return {
        pre: function(s, e, a) {
          e.addClass('ct-toasts');
          s.toasts = [];
          toasts.seton(function(toast) {
            s.toasts.push(toast);
            $timeout(function () {
              s.toasts.splice(s.toasts.indexOf(toast),1);
            }, toast.timeout || 3000);
          })
        }
      }
    }
  }
});