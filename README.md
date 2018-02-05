# rx-event

A very simple but powerful event pub/sub package with only 6 lines of source code. This package is built on top of `Rxjs`, so all the awesome `Rxjs` operators like `filter`, `debounce` are available. I find it much simpler to use than `EventEmitter`

### Installing

```
npm i rx-event --save
```

Or if you use `yarn`

```
yarn add rx-event
```

## How to use

This package comes with 3 named exports and 1 default export

`emitEvent` : emit an event with optional payload

```js
emitEvent('user-request', 'john');
emitEvent('user-fetched', { name: 'John Doe', age: 26 });
emitEvent('user-fetched', { name: 'Jack Davis', age: 40 });
emitEvent('scroll-down');
```

`eventPayloadOfType$`: filter the `event$` to only get the payload of a specific event type

```js
eventPayloadOfType$('user-fetched');
// {name: 'John Doe', age: 26} .
// { name: 'Jack Davis', age: 40}
```

`eventOfTypes$`: filter the `event$` to only get the events whose type is includes in the argument list

```js
eventOfTypes$('click', 'scroll', 'mousedown');
```

`event$`: default export, it's the underlying event stream, which is basiclly a `Rxjs Subject` instance

# Complete examples

```js
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

eventPayloadOfType$('user-fetched').subscribe(user => console.log(user));
/* output
 {name: 'John Doe', age: 26}
 {name: 'Jack Davis', age: 40}
*/

eventOfTypes$('user-request', 'user-fetched').subscribe(events =>
  console.log(events)
);
/* output:
{ type: 'user-request', payload: 'john' }
{ type: 'user-fetched', payload: { name: 'John Doe', age: 26 } }
{ type: 'user-fetched', payload: { name: 'Jack Davis', age: 40 } }
*/

//get the events without payload
event$.filter(event => !event.payload).subscribe(user => console.log(user));
// { type: 'scroll-down' }

//emit an event on page scroll
window.addEventListener('scroll', e => emitEvent('scroll', e));
//debounce the scroll events with 300ms
eventPayloadOfType$('scroll')
  .debounceTime(300)
  .subscribe(e => console.log(e));

//autocomplete example.
document
  .getElementById('#search')
  .addEventListener('change', e => emitEvent('search-changed', e.value));

eventPayloadOfType$('search-changed')
  .debounceTime(500)
  .distinctUntilChanged()
  .switchMap(searchValue => searchWikiPedia(searchValue));

//call the function to emit some events
emitSomeEvents();
```
