'use strict';
var outsideBind = require('../../../plugins/tungsten-event-outside');
describe('outside_events', function() {
  var elem, type, obj, handler;
  beforeEach(function() {
    elem = document.createElement('div');
    type = 'click';
    obj = {};
    handler = function() {};
  });
  afterEach(function() {
    elem = undefined, type = undefined, obj = undefined, handler = undefined;
  });
  it('should call bindVirtualEvent when event is suffixed with -outside', function() {
    // Sinon needed for more robust stubs
    obj.bindEventFn = function(el, eventName, selector, method) {
      method({
        eventId: null
      });
    };
    spyOn(obj, 'bindEventFn').and.callThrough();
    outsideBind(elem, type + '-outside', '', handler, {}, obj.bindEventFn);
    expect(obj.bindEventFn.calls.count()).to.equal(2);
  });
  it('should not call bindVirtualEvent when event is not suffixed with -outside', function() {
    var spy = jasmine.createSpy('spy');
    outsideBind(elem, type + '-foo', '', handler, {}, spy);
    expect(spy.calls.count()).to.equal(0);
  });
});
