# Node.js and Express.js Backend Notes

## 1. Node.js Deep Dive

Node.js is a JavaScript runtime built on Chrome's V8 engine. It is designed for fast, non-blocking server-side applications.

### Event Loop
- Node.js uses a single-threaded event loop to manage asynchronous work.
- The event loop lets Node handle many operations without blocking the main thread.
- I/O tasks are usually delegated to the system or libuv, then callbacks are queued when ready.

#### Event Loop Phases
- timers
- pending callbacks
- idle, prepare
- poll
- check
- close callbacks

#### Important Ideas
- Synchronous code runs first.
- Microtasks and promise callbacks are handled with high priority.
- `setTimeout` and `setImmediate` do not always run in the same order.
- CPU-heavy work can block the event loop and slow the app.

### Buffer
- A Buffer is a raw binary data container.
- Buffers are useful for files, streams, network packets, and binary APIs.

```js
const buf = Buffer.from("hello");
console.log(buf.toString());
```

### Streams
Streams let you process data piece by piece instead of loading everything into memory at once.

#### Types of Streams
- readable
- writable
- duplex
- transform

#### Why Streams Matter
- memory efficient
- good for large files
- useful for request/response piping

#### Example
```js
const fs = require("fs");
const readStream = fs.createReadStream("big-file.txt");
readStream.on("data", chunk => {
  console.log(chunk.toString());
});
```

### fs Module
- `fs` gives file-system access.
- It supports synchronous and asynchronous methods.

#### Common Methods
- `readFile`
- `writeFile`
- `appendFile`
- `unlink`
- `mkdir`
- `readdir`
- `stat`

#### Async Example
```js
const fs = require("fs");

fs.readFile("notes.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

#### Sync Example
```js
const data = fs.readFileSync("notes.txt", "utf8");
```

### npm
- npm is Node's package manager.
- It installs and manages third-party dependencies.

#### Important Files
- `package.json`: project metadata and scripts
- `package-lock.json`: exact dependency tree

#### Common Commands
- `npm init`
- `npm install`
- `npm install <package>`
- `npm install -D <package>`
- `npm uninstall <package>`
- `npm run <script>`

### dotenv
- `dotenv` loads environment variables from a `.env` file into `process.env`.
- This keeps secrets out of source code.

```js
require("dotenv").config();
console.log(process.env.PORT);
```

#### Best Practice
- Store secrets in `.env`
- Add `.env` to `.gitignore`
- Use environment variables for ports, keys, and database URLs

### Modules
Node supports modular code organization.

#### CommonJS
```js
const fs = require("fs");
module.exports = myValue;
```

#### ES Modules
```js
import fs from "fs";
export default myValue;
```

#### Notes
- CommonJS is traditional in Node.
- ES Modules are the modern standard.
- Use one module system consistently within a project.

---

## 2. Express.js Essentials

Express is a web framework for Node.js that simplifies routing, middleware, and request handling.

### Creating a Server
```js
const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

### Routing
- Routes map HTTP methods and paths to handlers.
- Common methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`

```js
app.get("/users", (req, res) => {
  res.send("All users");
});

app.post("/users", (req, res) => {
  res.send("Create user");
});
```

### Middleware Deep Dive
Middleware is a function that runs between request and response.

#### What Middleware Can Do
- read or modify `req` and `res`
- end the response
- call `next()` to continue
- handle errors

#### Common Middleware Types
- application-level middleware
- router-level middleware
- built-in middleware
- third-party middleware
- error-handling middleware

#### Example
```js
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
```

#### Built-in Middleware
- `express.json()`
- `express.urlencoded({ extended: true })`
- `express.static()`

### Params and Queries

#### Route Params
```js
app.get("/users/:id", (req, res) => {
  res.send(req.params.id);
});
```

#### Query Strings
```js
app.get("/search", (req, res) => {
  res.send(req.query.term);
});
```

### Cookies and Sessions
- Cookies are small pieces of data stored in the browser.
- Sessions store server-side state and usually use a cookie as the session identifier.

#### Cookie Uses
- auth tokens
- preferences
- tracking identifiers

#### Session Uses
- logged-in state
- temporary user data
- server-managed carts

### Error Handling
Express uses special error middleware.

```js
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});
```

#### Best Practices
- validate input early
- return proper status codes
- keep errors consistent
- avoid leaking sensitive stack traces in production

### Express Notes People Often Forget
- order of middleware matters
- `next()` is required to continue
- route handlers can be arrays or separate functions
- `res.status(...).json(...)` is a common response pattern




