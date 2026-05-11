# JavaScript Notes: DOM, Browser APIs, Async JavaScript, and Network Requests

## 1. DOM Mastery

The DOM, or Document Object Model, is the browser's in-memory representation of an HTML document. It turns the page into a tree of objects that JavaScript can inspect, change, and react to.

### What the DOM Gives You
- Access to elements, attributes, text, and structure
- Ability to change content and styles dynamically
- Event handling for interaction
- Traversal across parent, child, and sibling nodes
- Form access and validation support

### DOM Tree Basics
- The browser parses HTML into a tree.
- Every element becomes a node.
- Nodes can be:
  - element nodes
  - text nodes
  - comment nodes
  - document nodes
- DOM manipulation usually means changing nodes, not raw HTML strings.

### Selecting Elements
Selecting is the first step before modifying anything.

#### Common Selection Methods
```js
document.getElementById("title");
document.getElementsByClassName("card");
document.getElementsByTagName("li");
document.querySelector(".card");
document.querySelectorAll(".card");
```

#### When to Use What
- `getElementById`: fastest and direct for one known element
- `getElementsByClassName`: live HTMLCollection, useful for class groups
- `getElementsByTagName`: live HTMLCollection by tag
- `querySelector`: first match using CSS selector syntax
- `querySelectorAll`: all matches using CSS selector syntax

#### Notes on Collections
- `querySelectorAll` returns a static NodeList.
- Some older collection APIs return live collections that update automatically.
- `NodeList` can often be looped with `forEach`, but not every browser historically supported that equally well.

### Modifying Elements
Once selected, elements can be changed in many ways.

#### Content
```js
element.textContent = "Hello";
element.innerText = "Hello";
element.innerHTML = "<strong>Hello</strong>";
```

- `textContent` is safe and fast for plain text.
- `innerText` reflects rendered text and respects CSS visibility.
- `innerHTML` parses HTML and should be used carefully because it can create security risks if user input is inserted directly.

#### Attributes
```js
element.setAttribute("type", "button");
element.getAttribute("href");
element.removeAttribute("disabled");
element.hasAttribute("aria-label");
```

#### Classes
```js
element.classList.add("active");
element.classList.remove("active");
element.classList.toggle("active");
element.classList.contains("active");
```

#### Styles
```js
element.style.color = "red";
element.style.backgroundColor = "black";
```

- Prefer classes for larger styling changes.
- Use inline style changes for very specific dynamic updates.

#### Creating and Inserting Elements
```js
const li = document.createElement("li");
li.textContent = "New item";
document.querySelector("ul").appendChild(li);
```

Other insertion methods:
```js
parent.append(child);
parent.prepend(child);
parent.before(node);
parent.after(node);
element.remove();
```

#### Replacing and Cloning
```js
oldNode.replaceWith(newNode);
const copy = node.cloneNode(true);
```

- `cloneNode(true)` deep clones children.
- `cloneNode(false)` clones only the node itself.

### Traversal
Traversal means moving around the DOM tree.

#### Parent and Child Access
```js
element.parentElement;
element.children;
element.firstElementChild;
element.lastElementChild;
element.childNodes;
```

#### Siblings
```js
element.nextElementSibling;
element.previousElementSibling;
element.nextSibling;
element.previousSibling;
```

#### Helpful Traversal Patterns
- Use `children` when you want element nodes only.
- Use `childNodes` when you need text nodes too.
- `parentElement` is usually more useful than `parentNode` for element work.

### Event Listeners
Event listeners let JavaScript respond to user actions and browser events.

#### Basic Pattern
```js
button.addEventListener("click", function () {
  console.log("Clicked");
});
```

#### Common Event Types
- `click`
- `dblclick`
- `input`
- `change`
- `submit`
- `keydown`
- `keyup`
- `focus`
- `blur`
- `mouseenter`
- `mouseleave`
- `scroll`
- `load`

#### Listener Options
```js
element.addEventListener("click", handler, { once: true });
```

- `once: true` auto-removes the listener after one run.
- A listener can also be removed with `removeEventListener`.

#### Event Object
```js
button.addEventListener("click", function (event) {
  console.log(event.target);
  console.log(event.currentTarget);
});
```

- `target` is the actual element that triggered the event.
- `currentTarget` is the element the listener is attached to.

### Bubbling and Delegation
Events often travel through the DOM in phases.

#### Event Phases
- Capturing: from top down
- Target: at the actual element
- Bubbling: from target back up

#### Bubbling
- Most common browser events bubble upward.
- This makes parent elements able to catch events from their children.

#### Delegation
Event delegation means putting one listener on a parent instead of many listeners on children.

```js
document.querySelector("ul").addEventListener("click", function (event) {
  if (event.target.matches("li")) {
    console.log("Item clicked:", event.target.textContent);
  }
});
```

#### Why Delegation Matters
- Fewer event listeners
- Better performance for large lists
- Works well for dynamically added elements

#### Preventing Default Behavior
```js
form.addEventListener("submit", function (event) {
  event.preventDefault();
});
```

#### Stopping Propagation
```js
event.stopPropagation();
event.stopImmediatePropagation();
```

- `stopPropagation` stops bubbling.
- `stopImmediatePropagation` also prevents other listeners on the same element.

### Forms and Inputs
Forms are one of the most common DOM use cases.

#### Reading Values
```js
const value = input.value;
```

#### Setting Values
```js
input.value = "Hello";
checkbox.checked = true;
```

#### Important Form Events
- `submit`
- `input`
- `change`
- `reset`

#### Validation APIs
```js
input.required = true;
input.minLength = 3;
input.maxLength = 20;
input.pattern = "[A-Za-z]+";
input.setCustomValidity("Please enter a valid value");
```

#### Constraint Validation
- Use built-in HTML validation when possible.
- Use JavaScript for custom feedback and richer UX.
- `checkValidity()` returns whether a field or form is valid.
- `reportValidity()` shows native validation messages.

#### Form Data
```js
const formData = new FormData(form);
```

- `FormData` is useful for text fields and file uploads.
- It integrates well with `fetch`.

#### Checkbox and Radio Handling
```js
checkbox.checked;
radio.checked;
```

#### File Inputs
```js
const file = fileInput.files[0];
```

### DOM Best Practices
- Select once when possible and reuse references.
- Prefer `textContent` over `innerHTML` for plain text.
- Use event delegation for lists and dynamic content.
- Keep rendering updates small and focused.
- Be careful with user-generated HTML.

---

## 2. Browser APIs

Browser APIs are features provided by the browser environment beyond plain JavaScript. They let you interact with storage, timing, device capabilities, location, and more.

### localStorage and sessionStorage
Both are Web Storage APIs for saving string data in the browser.

#### localStorage
- Persists even after the browser is closed.
- Data stays until explicitly removed.

#### sessionStorage
- Lives only for the current tab session.
- Data disappears when the tab is closed.

#### Basic Operations
```js
localStorage.setItem("theme", "dark");
localStorage.getItem("theme");
localStorage.removeItem("theme");
localStorage.clear();
```

#### sessionStorage Example
```js
sessionStorage.setItem("draft", "hello");
```

#### Important Notes
- Storage values are always strings.
- Use `JSON.stringify()` to store objects.
- Use `JSON.parse()` to retrieve objects.

```js
const user = { name: "Ava", age: 20 };
localStorage.setItem("user", JSON.stringify(user));

const savedUser = JSON.parse(localStorage.getItem("user"));
```

#### Common Use Cases
- Theme preferences
- Auth tokens in simple demos
- Draft form data
- UI preferences

#### Caution
- Do not store sensitive secrets in localStorage.
- Any script on the page can usually access it.

### Timers
Timers let you schedule code to run later or repeatedly.

#### setTimeout
Runs once after a delay.
```js
const id = setTimeout(() => {
  console.log("Runs once");
}, 1000);
```

#### clearTimeout
```js
clearTimeout(id);
```

#### setInterval
Runs repeatedly at a fixed delay.
```js
const intervalId = setInterval(() => {
  console.log("Runs every second");
}, 1000);
```

#### clearInterval
```js
clearInterval(intervalId);
```

#### Timer Notes
- `setTimeout` is good for delayed actions.
- `setInterval` is good for repeated polling or clocks.
- For many repeating tasks, it is often safer to recursively schedule `setTimeout` to avoid drift.

### Geolocation
The Geolocation API gives access to the user's location, with permission.

#### Basic Use
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

#### Watch Position
```js
const watchId = navigator.geolocation.watchPosition(callback, errorCallback);
```

#### Stop Watching
```js
navigator.geolocation.clearWatch(watchId);
```

#### Notes
- Permission is required.
- It works best over secure contexts.
- Results may vary in accuracy depending on device and environment.

### Events
Browser APIs often expose event-based behavior.

#### Common Event Sources
- `window`
- `document`
- DOM elements
- `navigator`
- storage changes in some cases

#### Useful Browser Events
- `resize`
- `scroll`
- `online`
- `offline`
- `beforeunload`
- `visibilitychange`
- `storage`

#### Example
```js
window.addEventListener("resize", () => {
  console.log("Window resized");
});
```

#### Event Handling Best Practices
- Avoid adding duplicate listeners.
- Clean up listeners when components or pages are destroyed.
- Use passive listeners for scroll and touch where appropriate.

---

## 3. Async JavaScript

JavaScript is single-threaded, but it handles asynchronous work through the event loop, callbacks, promises, and async/await.

### Why Async Matters
- Network requests take time
- Timers execute later
- File-like browser operations may complete later
- UI should stay responsive during waiting

### Callbacks
A callback is a function passed into another function to run later.

#### Example
```js
setTimeout(() => {
  console.log("Later");
}, 1000);
```

#### Callback Style
```js
function fetchData(callback) {
  callback("Data ready");
}
```

#### Callback Problems
- Nested callbacks can become hard to read
- Error handling gets messy
- Reuse is harder

This is why promises and async/await became the preferred style for most modern async code.

### Promises
A promise represents a value that may be available now, later, or never.

#### Promise States
- pending
- fulfilled
- rejected

#### Creating a Promise
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

#### Consuming a Promise
```js
p.then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
}).finally(() => {
  console.log("Finished");
});
```

#### Promise Chaining
```js
fetch("/api/user")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

#### Promise Helpers
- `Promise.all`: waits for all promises and fails fast if one rejects
- `Promise.allSettled`: waits for all and reports every result
- `Promise.race`: settles as soon as one settles
- `Promise.any`: resolves when the first promise fulfills

```js
Promise.all([p1, p2, p3]);
```

#### Promise Notes
- Promises flatten callback chains.
- They are the foundation for modern async/await syntax.

### async/await
`async/await` is syntax built on top of promises.

#### Example
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

#### Key Rules
- `async` makes a function return a promise.
- `await` pauses inside an async function until the promise settles.
- `await` can only be used inside `async` functions, unless top-level await is supported in the environment.

#### Why It Feels Better
- Easier to read
- Easier to reason about
- Cleaner error handling with `try/catch`

#### Parallel Work
If two async operations do not depend on each other, start them together.
```js
const [user, posts] = await Promise.all([
  fetch("/api/user").then(r => r.json()),
  fetch("/api/posts").then(r => r.json())
]);
```

### Error Handling
Good async code always plans for failure.

#### try/catch with async/await
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

#### Promise Error Handling
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

#### Error Practices
- Check `response.ok` for network requests
- Throw meaningful errors
- Avoid swallowing errors silently
- Use `finally` for cleanup

#### Common Failure Sources
- Network failure
- Invalid JSON
- Permission denied
- Timeout behavior
- Unexpected response shape

---

## 4. AJAX + Network

AJAX means making asynchronous network requests from the browser without reloading the page.

### XMLHTTPRequest
`XMLHttpRequest` is the older browser API for network calls, but it is still useful to understand because many patterns were built around it.

#### Basic Flow
```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "/api/users");
xhr.onload = () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(JSON.parse(xhr.responseText));
  } else {
    console.error("Request failed");
  }
};
xhr.onerror = () => console.error("Network error");
xhr.send();
```

#### Important Parts
- `open(method, url)`
- `send()`
- `onload`
- `onerror`
- `status`
- `responseText`

#### Ready State
`XMLHttpRequest` has a readyState flow, which helps track request progress.

### fetch()
`fetch()` is the modern browser API for network requests.

#### Basic GET Request
```js
fetch("/api/users")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

#### With async/await
```js
async function loadUsers() {
  const response = await fetch("/api/users");
  const data = await response.json();
  console.log(data);
}
```

#### Request Methods
```js
fetch("/api/users", { method: "POST" });
fetch("/api/users/1", { method: "PUT" });
fetch("/api/users/1", { method: "PATCH" });
fetch("/api/users/1", { method: "DELETE" });
```

#### Headers and Body
```js
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ name: "Ava" })
});
```

#### Important Fetch Notes
- `fetch` only rejects on network errors, not on HTTP error codes.
- You should check `response.ok` or `response.status`.
- `response.json()` also returns a promise.
- `fetch` does not automatically stringify objects.

#### Common Response Methods
- `response.json()`
- `response.text()`
- `response.blob()`
- `response.arrayBuffer()`
- `response.formData()`

#### Query Parameters
```js
fetch("/api/users?limit=10&sort=desc");
```

### Axios
Axios is a popular HTTP client library built on promises and designed to make requests easier to work with.

#### Why Axios Is Popular
- Cleaner syntax
- Automatic JSON parsing
- Better error handling ergonomics
- Request and response interceptors
- Built-in timeout support
- Request cancellation

#### Basic Usage
```js
import axios from "axios";

axios.get("/api/users")
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

#### Async/Await with Axios
```js
import axios from "axios";

async function loadUsers() {
  try {
    const response = await axios.get("/api/users");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

#### Common Methods
- `axios.get(url, config)`
- `axios.post(url, data, config)`
- `axios.put(url, data, config)`
- `axios.patch(url, data, config)`
- `axios.delete(url, config)`

#### POST Example
```js
axios.post("/api/users", {
  name: "Ava",
  email: "ava@example.com"
});
```

#### Config Options
```js
axios.get("/api/users", {
  params: { page: 2 },
  headers: { Authorization: "Bearer token" },
  timeout: 5000
});
```

#### Interceptors
Interceptors let you modify requests or responses globally.

```js
axios.interceptors.request.use(config => {
  config.headers.Authorization = "Bearer token";
  return config;
});
```

#### Error Handling in Axios
- Axios rejects for HTTP status codes outside the success range.
- That makes its failure handling slightly more convenient than raw `fetch`.
- The error object can include:
  - `error.response`
  - `error.request`
  - `error.message`

#### Axios vs fetch
- `fetch` is built into the browser.
- Axios adds more convenience features.
- `fetch` needs manual `response.ok` checks.
- Axios automatically parses JSON in typical cases.

### REST API Requests
REST APIs use HTTP methods and resource-based URLs to communicate with servers.

#### Typical Resource Patterns
- `GET /users`
- `GET /users/1`
- `POST /users`
- `PUT /users/1`
- `PATCH /users/1`
- `DELETE /users/1`

#### REST Principles
- Resources are identified by URLs
- HTTP methods define action
- Responses use standard status codes
- JSON is the most common payload format

#### Common Headers
- `Content-Type`
- `Accept`
- `Authorization`

#### Example Request
```js
fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer token"
  },
  body: JSON.stringify({
    name: "Ava",
    role: "admin"
  })
});
```

#### Important Response Handling
- Check status codes
- Parse payload carefully
- Handle empty responses
- Handle validation errors from the server

#### CRUD Mapping
- Create = `POST`
- Read = `GET`
- Update = `PUT` or `PATCH`
- Delete = `DELETE`

#### Practical Notes
- Use `GET` for safe reads.
- Use `POST` for creation.
- Use `PUT` when replacing a full resource.
- Use `PATCH` when updating part of a resource.
- Use `DELETE` for removal.

### Deep Network Notes
- Requests are asynchronous because the browser must not block the UI.
- Network failures and HTTP failures are not the same thing.
- Always expect:
  - latency
  - retries
  - partial failures
  - malformed data
- Design UI states for:
  - loading
  - success
  - empty
  - error
  - retry

