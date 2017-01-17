#ng-CleanToast

Simple toast service for Angular 1.x. Most toast services are built on sending $emit messages via $rootScope. This never felt right to me, so this design keeps all data within the service and it's related directives. In any case, $scope.$on is a watcher and if you have a ton of watchers your users are going to have a bad time. 

##Installation
Available on Bower with `bower install ng-cleantoast`. 

## Usage
Add `bower_components/ng-cleantoast/src/ng-cleantoast.js` to your main index.html along with Angular thus: 

````html
<head>
  <script src="bower_components/angularjs/angular.min.js"></script>
  <script src="bower_components/ng-cleantoast/src/ngIsVisible.js"></script>
</head>
````

Inject `ngCleanToast` to your module, and add `toasts` to any components you intend to create toasts from. For example, in the demo we have: 

````javascript
angular.module('demoApp', ['ngCleanToast'])

.controller('demoController', function($scope, toasts) {
    toasts.new(toasts.types.info, 'Hello World', 'Hi there!', 0);
})
````

New toasts are created using: 

````javascript
toasts.new(type, title, text, timeout);
````

`title` and `text` are required, but can be empty strings and as such element wont show. `timeout` IS optional and will default to 3000ms (3s) if not passed. 

You will also need to tell the browser where to show your toasts by placing an element or attribute. Again, from the demo: 

````html
<div ct-toasts></div>
````

OR

````html
<ct-toasts></ct-toasts>
````

##TODO
- CSS explanation
- Better documentation
- Tests!