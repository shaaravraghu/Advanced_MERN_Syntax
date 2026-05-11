# JavaScript Async JavaScript

JavaScript is single-threaded, but it handles asynchronous work through the event loop, callbacks, promises, and async/await.

## Why Async Matters
- Network requests take time
- Timers execute later
- File-like browser operations may complete later
- UI should stay responsive during waiting

## Callbacks
A callback is a function passed into another function to run later.

### Example
```js
setTimeout(() => {
  console.log("Later");
}, 1000);
```

### Callback Style
```js
function fetchData(callback) {
  callback("Data ready");
}
```

### Callback Problems
- Nested callbacks can become hard to read
- Error handling gets messy
- Reuse is harder

This is why promises and async/await became the preferred style for most modern async code.

## Promises
A promise represents a value that may be available now, later, or never.

### Promise States
- pending
- fulfilled
- rejected

### Creating a Promise
```js
const p = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Done");
  } else {
    reject("Failed");
  }
});
```

### Consuming a Promise
```js
p.then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
}).finally(() => {
  console.log("Finished");
});
```

### Promise Chaining
```js
fetch("/api/user")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Promise Helpers
- `Promise.all`: waits for all promises and fails fast if one rejects
- `Promise.allSettled`: waits for all and reports every result
- `Promise.race`: settles as soon as one settles
- `Promise.any`: resolves when the first promise fulfills

```js
Promise.all([p1, p2, p3]);
```

### Promise Notes
- Promises flatten callback chains.
- They are the foundation for modern async/await syntax.

## async/await
`async/await` is syntax built on top of promises.

### Example
```js
async function loadUser() {
  try {
    const response = await fetch("/api/user");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

### Key Rules
- `async` makes a function return a promise.
- `await` pauses inside an async function until the promise settles.
- `await` can only be used inside `async` functions, unless top-level await is supported in the environment.

### Why It Feels Better
- Easier to read
- Easier to reason about
- Cleaner error handling with `try/catch`

### Parallel Work
If two async operations do not depend on each other, start them together.
```js
const [user, posts] = await Promise.all([
  fetch("/api/user").then(r => r.json()),
  fetch("/api/posts").then(r => r.json())
]);
```

## Error Handling
Good async code always plans for failure.

### try/catch with async/await
```js
try {
  const response = await fetch("/api/data");
  if (!response.ok) {
    throw new Error("Request failed");
  }
  const data = await response.json();
} catch (error) {
  console.error("Something went wrong", error);
}
```

### Promise Error Handling
```js
fetch("/api/data")
  .then(response => {
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  })
  .catch(error => {
    console.error(error);
  });
```

### Error Practices
- Check `response.ok` for network requests
- Throw meaningful errors
- Avoid swallowing errors silently
- Use `finally` for cleanup

### Common Failure Sources
- Network failure
- Invalid JSON
- Permission denied
- Timeout behavior
- Unexpected response shape

