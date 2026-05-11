# JavaScript AJAX and Network

AJAX means making asynchronous network requests from the browser without reloading the page.

## XMLHTTPRequest
`XMLHttpRequest` is the older browser API for network calls, but it is still useful to understand because many patterns were built around it.

### Basic Flow
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

### Important Parts
- `open(method, url)`
- `send()`
- `onload`
- `onerror`
- `status`
- `responseText`

### Ready State
`XMLHttpRequest` has a readyState flow, which helps track request progress.

## fetch()
`fetch()` is the modern browser API for network requests.

### Basic GET Request
```js
fetch("/api/users")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### With async/await
```js
async function loadUsers() {
  const response = await fetch("/api/users");
  const data = await response.json();
  console.log(data);
}
```

### Request Methods
```js
fetch("/api/users", { method: "POST" });
fetch("/api/users/1", { method: "PUT" });
fetch("/api/users/1", { method: "PATCH" });
fetch("/api/users/1", { method: "DELETE" });
```

### Headers and Body
```js
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ name: "Ava" })
});
```

### Important Fetch Notes
- `fetch` only rejects on network errors, not on HTTP error codes.
- You should check `response.ok` or `response.status`.
- `response.json()` also returns a promise.
- `fetch` does not automatically stringify objects.

### Common Response Methods
- `response.json()`
- `response.text()`
- `response.blob()`
- `response.arrayBuffer()`
- `response.formData()`

### Query Parameters
```js
fetch("/api/users?limit=10&sort=desc");
```

## Axios
Axios is a popular HTTP client library built on promises and designed to make requests easier to work with.

### Why Axios Is Popular
- Cleaner syntax
- Automatic JSON parsing
- Better error handling ergonomics
- Request and response interceptors
- Built-in timeout support
- Request cancellation

### Basic Usage
```js
import axios from "axios";

axios.get("/api/users")
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

### Async/Await with Axios
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

### Common Methods
- `axios.get(url, config)`
- `axios.post(url, data, config)`
- `axios.put(url, data, config)`
- `axios.patch(url, data, config)`
- `axios.delete(url, config)`

### POST Example
```js
axios.post("/api/users", {
  name: "Ava",
  email: "ava@example.com"
});
```

### Config Options
```js
axios.get("/api/users", {
  params: { page: 2 },
  headers: { Authorization: "Bearer token" },
  timeout: 5000
});
```

### Interceptors
Interceptors let you modify requests or responses globally.

```js
axios.interceptors.request.use(config => {
  config.headers.Authorization = "Bearer token";
  return config;
});
```

### Error Handling in Axios
- Axios rejects for HTTP status codes outside the success range.
- That makes its failure handling slightly more convenient than raw `fetch`.
- The error object can include:
  - `error.response`
  - `error.request`
  - `error.message`

### Axios vs fetch
- `fetch` is built into the browser.
- Axios adds more convenience features.
- `fetch` needs manual `response.ok` checks.
- Axios automatically parses JSON in typical cases.

## REST API Requests
REST APIs use HTTP methods and resource-based URLs to communicate with servers.

### Typical Resource Patterns
- `GET /users`
- `GET /users/1`
- `POST /users`
- `PUT /users/1`
- `PATCH /users/1`
- `DELETE /users/1`

### REST Principles
- Resources are identified by URLs
- HTTP methods define action
- Responses use standard status codes
- JSON is the most common payload format

### Common Headers
- `Content-Type`
- `Accept`
- `Authorization`

### Example Request
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

### Important Response Handling
- Check status codes
- Parse payload carefully
- Handle empty responses
- Handle validation errors from the server

### CRUD Mapping
- Create = `POST`
- Read = `GET`
- Update = `PUT` or `PATCH`
- Delete = `DELETE`

### Practical Notes
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

