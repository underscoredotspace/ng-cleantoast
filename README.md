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

.controller('demoController', function(toasts) {
  // your code...
})
````

New toasts are created using: 

````javascript
toasts.create(type, title, text, timeout);
````

Built-in types are `info`, `warn`, `success` and `error`. They can be accessed via `toasts.types()` like `toasts.types('info')`. Custom types can be added with `toasts.addType('myNiceType')`. 

![A wild Toast has appeared!] (screenshot.png)

`title` and `text` are optional, but empty strings are needed if they are not required: 

````javascript
// Creates a new toast without a title
toasts.create(toasts.type('info'), '', 'Hello');
````

`timeout` is the number of milliseconds (1000th of 1s) before the toast will disappear. This is optional and will default to 3000ms (3s) if not passed. You may also create sticky toasts that don't disappear until they are clicked on, by passing `toasts.sticky` (or any negative number) as the timeout value. 

Sticky toasts have their own style classes so you can make them stand out. See the examples below. 

### Placement
You will need to tell the browser where to show toasts, by placing an element or attribute in a DIV or other tag:

````html
<ct-toasts></ct-toasts>
````

OR

````html
<div ct-toasts></div>
````

#### Placement CSS
It's convention that a toast pops up above some other content, but not blocking anything important. In the demo, the `ct-toasts` element has fixed positioning and uses a very high `z-index`. 

If you follow this pattern, the initial `height` of `ct-toasts` should be `0`, and `max-height` should be no more than the view height (minus any `top`/`margin`/`padding` etc. to prevent unexpected scrolling). This example shows top-right placement of the toasts: 

````css
.ct-toasts {
  position: fixed;
  z-index: 1000;
  width: 200px;
  height: 0;
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
There is an [example](https://underscoredotspace.github.io/ng-cleantoast/demo) with styles (background is purely to enhance the opacity/shadow change on hover). 

### Tests
Jasmine tests are included in the tests folder, or you can run the tests (for the current repository code) [here](https://underscoredotspace.github.io/ng-cleantoast/tests). 