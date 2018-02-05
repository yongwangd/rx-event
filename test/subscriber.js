import event$, {
  emitEvent,
  eventPayloadOfType$,
  eventOfTypes$
} from 'rx-event';

function emitSomeEvents() {
  emitEvent('user-request', 'john');
  emitEvent('user-fetched', { name: 'John Doe', age: 26 });
  emitEvent('user-fetched', { name: 'Jack Davis', age: 40 });
  emitEvent('scroll-down');
}

eventOfTypes$('user-request', 'user-fetched').subscribe(events =>
  console.log(events)
);
/* output:
{ type: 'user-request', payload: 'john' }
{ type: 'user-fetched', payload: { name: 'John Doe', age: 26 } }
{ type: 'user-fetched', payload: { name: 'Jack Davis', age: 40 } }
*/

eventPayloadOfType$('user-fetched').subscribe(user => console.log(user));
/* output
 {name: 'John Doe', age: 26}
 {name: 'Jack Davis', age: 40}
*/

//get the events without payload
event$.filter(event => !event.payload).subscribe(user => console.log(user));
// { type: 'scroll-down' }

emitSomeEvents();
