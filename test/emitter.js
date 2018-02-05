import { emitEvent, eventOfTypes$ } from 'rx-event';

console.log('emit-event');
setTimeout(() => {
  emitEvent('hello');
  emitEvent('hello');
  emitEvent('from emitter');
}, 5000);

eventOfTypes$('hello').subscribe(console.log);
