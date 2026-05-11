# JavaScript Browser APIs

Browser APIs are features provided by the browser environment beyond plain JavaScript. They let you interact with storage, timing, device capabilities, location, and more.

## localStorage and sessionStorage
Both are Web Storage APIs for saving string data in the browser.

### localStorage
- Persists even after the browser is closed.
- Data stays until explicitly removed.

### sessionStorage
- Lives only for the current tab session.
- Data disappears when the tab is closed.

### Basic Operations
```js
localStorage.setItem("theme", "dark");
localStorage.getItem("theme");
localStorage.removeItem("theme");
localStorage.clear();
```

### sessionStorage Example
```js
sessionStorage.setItem("draft", "hello");
```

### Important Notes
- Storage values are always strings.
- Use `JSON.stringify()` to store objects.
- Use `JSON.parse()` to retrieve objects.

```js
const user = { name: "Ava", age: 20 };
localStorage.setItem("user", JSON.stringify(user));

const savedUser = JSON.parse(localStorage.getItem("user"));
```

### Common Use Cases
- Theme preferences
- Auth tokens in simple demos
- Draft form data
- UI preferences

### Caution
- Do not store sensitive secrets in localStorage.
- Any script on the page can usually access it.

## Timers
Timers let you schedule code to run later or repeatedly.

### setTimeout
Runs once after a delay.
```js
const id = setTimeout(() => {
  console.log("Runs once");
}, 1000);
```

### clearTimeout
```js
clearTimeout(id);
```

### setInterval
Runs repeatedly at a fixed delay.
```js
const intervalId = setInterval(() => {
  console.log("Runs every second");
}, 1000);
```

### clearInterval
```js
clearInterval(intervalId);
```

### Timer Notes
- `setTimeout` is good for delayed actions.
- `setInterval` is good for repeated polling or clocks.
- For many repeating tasks, it is often safer to recursively schedule `setTimeout` to avoid drift.

## Geolocation
The Geolocation API gives access to the user's location, with permission.

### Basic Use
```js
navigator.geolocation.getCurrentPosition(
  position => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  },
  error => {
    console.error(error);
  }
);
```

### Watch Position
```js
const watchId = navigator.geolocation.watchPosition(callback, errorCallback);
```

### Stop Watching
```js
navigator.geolocation.clearWatch(watchId);
```

### Notes
- Permission is required.
- It works best over secure contexts.
- Results may vary in accuracy depending on device and environment.

## Events
Browser APIs often expose event-based behavior.

### Common Event Sources
- `window`
- `document`
- DOM elements
- `navigator`
- storage changes in some cases

### Useful Browser Events
- `resize`
- `scroll`
- `online`
- `offline`
- `beforeunload`
- `visibilitychange`
- `storage`

### Example
```js
window.addEventListener("resize", () => {
  console.log("Window resized");
});
```

### Event Handling Best Practices
- Avoid adding duplicate listeners.
- Clean up listeners when components or pages are destroyed.
- Use passive listeners for scroll and touch where appropriate.

