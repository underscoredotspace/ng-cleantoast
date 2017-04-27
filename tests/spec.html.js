describe('Testing toasts Service', function(){
  var ToastService
  var toastFunc = function(toast) {
    return toast
  }
  
  beforeEach(function() {
    module('ngCleanToast')

    inject(function($injector) {
      ToastService = $injector.get('toasts')
    })
  })

  it('sticky should be less than 0', function() {
    sticky = ToastService.sticky
    expect(sticky).toBeLessThan(0)
  })

  it('defaultTimeout should be 3000', function() {
    defaultTimeout = ToastService._defaultTimeout
    expect(defaultTimeout).toBe(3000)
  })
  
  it('types[] should contain predefined types', function() {
    var types = ToastService.types
    expect(types).toContain('info')
    expect(types).toContain('warn')
    expect(types).toContain('error')
    expect(types).toContain('debug')
    expect(types.length).toEqual(4)
  })

  it('type() should return type id from name', function() {
    typeInfo = ToastService.type('info')
    typeWarn = ToastService.type('warn')
    typeError = ToastService.type('error')
    typeDebug = ToastService.type('debug')

    expect(typeInfo).toBe(0)
    expect(typeWarn).toBe(1)
    expect(typeError).toBe(2)
    expect(typeDebug).toBe(3)
  })

  it('addType() should add new type', function() {
    ToastService.addType('test')
    var types = ToastService.types
    typeID = ToastService.type('test')

    expect(types).toContain('test')
    expect(types.length).toEqual(5)
    expect(typeID).toBe(4)
  })

  it('_setListener() should create new toast listener', function() {
    expect(ToastService._listener).toBe(null)

    ToastService._setListener(toastFunc)
    expect(ToastService._listener).toBe(toastFunc)
  })

  it('new() should run _listener()', function() {
    ToastService._setListener(toastFunc)
    expect(ToastService._listener).toBe(toastFunc)

    spyOn(ToastService, '_listener')
    ToastService.create()

    expect(ToastService._listener).toHaveBeenCalled()
  })
})

describe('testing ctToasts directive', function() {
  var ToastService, elem, scope;

  beforeEach(function() {
    module('ngCleanToast')

    inject(function($rootScope, $compile, $injector) {
      ToastService = $injector.get('toasts')
      elem = angular.element('<ct-toasts></ct-toasts>')

      scope = $rootScope
      $compile(elem)(scope)
      scope.$digest()
    })
  })

  it('should create empty ct-toasts block', function() {
    expect(elem.length).toBe(1)

    hasClass = elem.hasClass('ct-toasts')
    expect(hasClass).toBeTruthy()
    expect(elem[0].innerText).toEqual('')
  })

  it('should create a new warn toast in DOM', function() {
    testToast = {type: ToastService.type('warn'), title: 'Title', text: 'text'}
    ToastService.create(testToast.type, testToast.title, testToast.text, testToast.timeout)
    scope.$digest()

    expect(elem.children().length).toEqual(1)

    classList = elem.children()[0].classList.value
    expect(classList).toContain('ct-toast')
    expect(classList).toContain('ct-toast-warn')
    expect(classList).not.toContain('ct-sticky')

    toast = scope.toasts[0]

    expect(toast.sticky).toBeUndefined()
    expect(toast.timeout).toBe(ToastService._defaultTimeout)
    expect(toast.timer).not.toBeUndefined()
    expect(toast.pause).toEqual(jasmine.any(Function))
    expect(toast.pause()).toBeLessThan(4000)
    expect(toast.pause()).toBeGreaterThan(3000)
    expect(toast.clear).toEqual(jasmine.any(Function))
    expect(toast.resume).toEqual(jasmine.any(Function))
    expect(toast.startTime).toEqual(jasmine.any(Number))
    expect(toast.title).toBe(testToast.title)
    expect(toast.text).toBe(testToast.text)
    expect(toast.type).toBe(ToastService.types[testToast.type])
  })

  it('should create a new sticky info toast in DOM', function() {
    testToast = {type: ToastService.type('info'), title: 'Title', text: 'text', timeout: ToastService.sticky}
    ToastService.create(testToast.type, testToast.title, testToast.text, testToast.timeout)
    scope.$digest()

    expect(angular.element(elem).children().length).toEqual(1)

    classList = angular.element(elem).children()[0].classList.value
    expect(classList).toContain('ct-toast')
    expect(classList).toContain('ct-toast-info')
    expect(classList).toContain('ct-sticky')

    toast = scope.toasts[0]

    expect(toast.sticky).toBeTruthy()
    expect(toast.timeout).toBe(ToastService.sticky)
    expect(toast.timer).toBeUndefined()
    expect(toast.pause).toBeUndefined()
    expect(toast.clear).toEqual(jasmine.any(Function))
    expect(toast.resume).toBeUndefined()
    expect(toast.startTime).toBeUndefined()
    expect(toast.title).toBe(testToast.title)
    expect(toast.text).toBe(testToast.text)
    expect(toast.type).toBe(ToastService.types[testToast.type])
  })
})