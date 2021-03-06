import event$, { emitEvent, eventPayloadOfType$, eventOfTypes$ } from '../dist';

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

eventPayloadOfType$('user-fetched')
  .map(user => user.name)
  .subscribe(name => console.log(name));
/*
    John Doe
    Jack Davis
*/

//get the events without payload
event$.filter(event => !event.payload).subscribe(user => console.log(user));
// { type: 'scroll-down' }

emitSomeEvents();
