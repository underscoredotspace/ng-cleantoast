# ng-CleanToast

Simple toast service for Angular 1.x. Most toast services are built on sending $emit messages via $rootScope. This never felt right to me, so this design keeps all data within the service and it's related directives. 

### Installation
Available on Bower with `bower install ng-cleantoast`. 

### Usage
Add `bower_components/ng-cleantoast/src/ng-cleantoast.js` to your main index.html along with Angular thus: 

````html
<head>
  <script src="bower_components/angularjs/angular.min.js"></script>
  <script src="bower_components/ng-cleantoast/src/ngIsVisible.js"></script>
</head>
````

Inject `ngCleanToast` to your module, and add `toasts` to any components that toasts will be created from. For example, in the demo we have: 

````javascript
angular.module('demoApp', ['ngCleanToast'])

.controller('demoController', function($scope, toasts) {
    toasts.new(toasts.types.info, 'Hello World', 'Hi there!');
})
````

New toasts are created using: 

````javascript
toasts.new(type, title, text, timeout);
````

Built-in types are `info`, `warn`, `success` and `error`. They can be accessed via `toasts.types` like `toasts.types.info`. Custom types can be added with `toasts.addType('myNiceType')`. This new types can then be passed using `toasts.types.myNiceType`.

![A wild Toast has appeared!] (screenshot.png)

`title` and `text` are required, but can be empty strings and as such element wont show. `timeout` is optional and will default to 3000ms (3s) if not passed. You may also create sticky toasts that don't leave until they are clicked on by passing `toasts.sticky` (or any negative number) as the timeout value. 

Sticky toasts have their own style classes, `.ct-toast-sticky`, `.ct-toast-title-sticky` and `.ct-toast-text-sticky`. 

You will also need to tell the browser where to show toasts by placing an element or attribute. Again, from the demo: 

````html
<div ct-toasts></div>
````

OR

````html
<ct-toasts></ct-toasts>
````

### CSS - Placement of Toasts
It's convention that  toasts will pop up over the top of some other content, but not blocking anything important. In the demo, the `ct-toasts` element has fixed positioning and uses a very high `z-index`. 

If you follow this pattern, the initial `height` of `ct-toasts` should be `0`, and `max-height` should be no more than the view height (minus any `top` amount) to prevent a scrollbar appearing unnecessarily. This example shows top-right placement of the toasts: 

````css
.ct-toasts {
  position: fixed;
  z-index: 1000;
  width: 200px;
  height: 0;
  text-align: center;
  top: 20px;
  right: 20px;
  max-height: calc(100vh - 20px); }
````

The toast itself appear inside the `.ct-toasts` class like so (for toast type **info**): 

````HTML
<div class="ct-toasts">
  <div class="ct-toast ct-toast-info">
    <div class="ct-toast-title">Toast Title</div>
    <div class="ct-toast-text">Toast Text</div>
  </div>
</div>
````

Sticky toasts are ever-so-slightly different: 

````HTML
<div class="ct-toasts">
  <div class="ct-toast ct-toast-sticky ct-toast-info">
    <div class="ct-toast-title ct-toast-title-sticky">Toast Title</div>
    <div class="ct-toast-text ct-toast-text-sticky">Toast Text</div>
  </div>
</div>
````

This allows you to style every element of the toast yourself. 

### Demo
There is an [example] (https://underscoredotspace.github.io/ng-cleantoast/demo/index.html) with styles (background is purely to enhance the opacity/shadow change on hover). 

### TODO
- Better documentation
- Tests!