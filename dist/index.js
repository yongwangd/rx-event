'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitEvent = exports.eventOfTypes$ = exports.eventPayloadOfType$ = undefined;

var _Rx = require('rxjs/Rx');

var event$ = new _Rx.Subject();

var eventPayloadOfType$ = exports.eventPayloadOfType$ = function eventPayloadOfType$(type) {
  return event$.filter(function (event) {
    return event.type == type;
  }).map(function (event) {
    return event.payload;
  });
};
var eventOfTypes$ = exports.eventOfTypes$ = function eventOfTypes$() {
  for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
    types[_key] = arguments[_key];
  }

  return event$.filter(function (evt) {
    return types.includes(evt.type);
  });
};
var emitEvent = exports.emitEvent = function emitEvent(type, payload) {
  return event$.next(payload !== undefined ? { type: type, payload: payload } : { type: type });
};

exports.default = event$;