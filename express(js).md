# Express.js: The Comprehensive Study Guide

Welcome to the definitive guide on Express.js. This manual is designed for beginner to intermediate developers who want to master backend development using Node.js and Express. It goes beyond simple "Hello World" examples, diving into the core architecture, design patterns, and industry best practices required to build robust, scalable, and production-ready server applications.

---

## Table of Contents
1. [Introduction to Express.js](#1-introduction-to-expressjs)
2. [Setup & Initialization](#2-setup--initialization)
3. [Routing](#3-routing)
4. [Middleware (The Heart of Express)](#4-middleware)
5. [Request and Response Objects](#5-request-and-response-objects)
6. [Handling Forms, JSON, and File Uploads](#6-handling-forms-and-json)
7. [Robust Error Handling](#7-error-handling)
8. [REST API Development](#8-rest-api-development)
9. [Working with Databases (Intro)](#9-working-with-databases)
10. [Authentication (Basic Intro)](#10-authentication)
11. [Environment Variables](#11-environment-variables)
12. [Best Practices](#12-best-practices)
13. [Common Mistakes & Debugging](#13-common-mistakes)
14. [Real-world Examples: Building a Complete API](#14-real-world-examples)

---

## 1. Introduction to Express.js

### What is Express.js?
Express.js is a fast, unopinionated, minimalist web framework for Node.js. It is the de facto standard server framework for Node.js and forms the "E" in the popular MERN (MongoDB, Express, React, Node), MEAN, and MEVN stacks. 

It provides a thin layer of fundamental web application features without obscuring Node.js features that you know and love.

### Why use Express?
- **Minimalist & Unopinionated**: Express doesn't force a specific ORM, template engine, or folder structure on you. You have complete freedom to architect your app as you see fit.
- **Robust Routing**: It provides a highly advanced routing mechanism for handling different HTTP methods and URL paths.
- **Middleware Ecosystem**: The middleware architecture allows you to easily plug in third-party packages to handle parsing, security, logging, and more.
- **High Performance**: Because it is a thin wrapper around Node's core `http` module, it retains the lightning-fast, non-blocking I/O performance of Node.js.

### Express vs Node.js HTTP Module
To understand why Express exists, let's look at how you build a server using purely the core Node.js `http` module vs Express.

**Using raw Node.js `http` module:**
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // We have to manually parse URLs and HTTP methods
    if (req.url === '/' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Welcome to the homepage');
    } else if (req.url === '/api/data' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            // Manual JSON parsing and error handling needed here
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Data received', data: body }));
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
});

server.listen(3000, () => console.log('Server running on port 3000'));
```
*Notice the boilerplate required just to check methods, parse a body, and send JSON.*

**Using Express.js:**
```javascript
const express = require('express');
const app = express();

// Built-in middleware to automatically parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the homepage'); // Automatically sets headers & status
});

app.post('/api/data', (req, res) => {
    // req.body is already parsed!
    res.status(201).json({ message: 'Data received', data: req.body });
});

// Catch-all 404
app.use((req, res) => res.status(404).send('Not Found'));

app.listen(3000, () => console.log('Server running on port 3000'));
```
Express abstracts away the tedious parts of managing HTTP connections, routing, and data parsing, allowing you to focus on business logic.

---

## 2. Setup & Initialization

### Installing Express
First, initialize a new Node.js project. This creates a `package.json` file.
```bash
mkdir my-express-app
cd my-express-app
npm init -y
```

Next, install Express:
```bash
npm install express
```

For a better development experience, install `nodemon`. Nodemon automatically restarts your server when it detects file changes.
```bash
npm install -D nodemon
```

Add a start script in your `package.json`:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### Basic Server Setup
Create a file named `server.js` (or `app.js`).

```javascript
// server.js
const express = require('express');

// 1. Create an Express application instance
const app = express();

// 2. Define a port
const PORT = process.env.PORT || 3000;

// 3. Define a basic route
app.get('/', (req, res) => {
    res.send('Hello, World! Express server is running.');
});

// 4. Start the server
// app.listen binds and listens for connections on the specified host and port.
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
```
Run `npm run dev` to start the server. You can visit `http://localhost:3000` in your browser.

> **Under the Hood:** `app.listen()` is essentially a convenience method. Internally, Express does this:
> `http.createServer(app).listen(PORT, ...)`

---

## 3. Routing

Routing refers to how an application's endpoints (URIs) respond to client requests. Express has a highly flexible and powerful routing API.

### HTTP Methods
Express supports all standard HTTP methods. The most common are:
- `GET`: Retrieve data.
- `POST`: Create new data.
- `PUT`: Update existing data (replaces the whole resource).
- `PATCH`: Partially update existing data.
- `DELETE`: Remove data.

```javascript
app.get('/users', (req, res) => {
    res.send('Get all users');
});

app.post('/users', (req, res) => {
    res.send('Create a new user');
});

app.put('/users/:id', (req, res) => {
    res.send(`Update user with ID ${req.params.id}`);
});

app.delete('/users/:id', (req, res) => {
    res.send(`Delete user with ID ${req.params.id}`);
});
```

### Route Paths
Route paths, in combination with a request method, define the endpoints at which requests can be made. Express uses `path-to-regexp` to match route paths.

**String patterns:**
```javascript
// Matches requests to /about
app.get('/about', (req, res) => res.send('About'));

// Matches /random.text
app.get('/random.text', (req, res) => res.send('Random text'));

// Matches acd and abcd (the 'b' is optional)
app.get('/ab?cd', (req, res) => res.send('ab?cd'));

// Matches abcd, abbcd, abbbcd, etc.
app.get('/ab+cd', (req, res) => res.send('ab+cd'));

// Matches abcd, abxcd, abRANDOMcd, ab123cd (wildcard)
app.get('/ab*cd', (req, res) => res.send('ab*cd'));
```

**Regular Expressions:**
```javascript
// Matches anything with an "a" in it
app.get(/a/, (req, res) => res.send('/a/'));

// Matches only exact strings ending in "fly" (e.g., butterfly, dragonfly, but not butterflyman)
app.get(/.*fly$/, (req, res) => res.send('/.*fly$/'));
```

### Route Parameters (`req.params`)
Route parameters are named URL segments used to capture values at specific positions in the URL. They are prefixed with a colon `:`.

```javascript
// GET /users/123/books/8989
app.get('/users/:userId/books/:bookId', (req, res) => {
    // req.params will be: { "userId": "123", "bookId": "8989" }
    const { userId, bookId } = req.params;
    res.json({ user: userId, book: bookId });
});
```
*Pro Tip:* Route parameters are always strings. If you expect a number, you must convert it (`parseInt(req.params.id, 10)`).

### Query Parameters (`req.query`)
Query string parameters are attached to the end of the URL after a question mark `?` and separated by `&`. They are commonly used for filtering, sorting, or pagination.

```javascript
// GET /products?category=shoes&sort=price_asc&limit=10
app.get('/products', (req, res) => {
    // req.query will be: { category: 'shoes', sort: 'price_asc', limit: '10' }
    const category = req.query.category;
    const sort = req.query.sort;
    const limit = parseInt(req.query.limit, 10);
    
    res.json({ msg: 'Fetched products', category, sort, limit });
});
```

### `app.route()`
You can create chainable route handlers for a route path by using `app.route()`. This helps reduce redundancy and typos.

```javascript
app.route('/book')
    .get((req, res) => {
        res.send('Get a random book');
    })
    .post((req, res) => {
        res.send('Add a book');
    })
    .put((req, res) => {
        res.send('Update the book');
    });
```

### Express Router (`express.Router()`)
As your application grows, defining all routes in `server.js` becomes unmanageable. `express.Router` acts as a "mini-application" to group related routes.

**Example: `routes/users.js`**
```javascript
const express = require('express');
const router = express.Router(); // Create a router instance

// This route is actually relative to where it is mounted (e.g., /api/users/)
router.get('/', (req, res) => {
    res.send('List of users');
});

router.get('/:id', (req, res) => {
    res.send(`Details of user ${req.params.id}`);
});

router.post('/', (req, res) => {
    res.send('Create user');
});

module.exports = router;
```

**Mounting the router in `server.js`:**
```javascript
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');

// Mount the router at the '/api/users' path
app.use('/api/users', userRoutes);

app.listen(3000);
```
Now, requests to `/api/users` and `/api/users/123` will be handled by the `users.js` router.

---

## 4. Middleware

Middleware is the most fundamental concept in Express. If you understand middleware, you understand Express.

### What is Middleware?
Middleware functions are functions that have access to the **request object (`req`)**, the **response object (`res`)**, and the **next middleware function** in the application's request-response cycle.

Middleware can:
1. Execute any code.
2. Make changes to the request and the response objects.
3. End the request-response cycle (by sending a response).
4. Call the next middleware function in the stack.

**Crucial Rule:** If the current middleware function does not end the request-response cycle, it **MUST** call `next()` to pass control to the next middleware function. Otherwise, the request will hang permanently, and the client will eventually time out.

### The Request-Response Cycle
When a request hits your Express server, it passes through a series of middleware functions in the exact order they are defined in your code.

`Client Request -> Middleware 1 -> Middleware 2 -> Route Handler -> Client Response`

### Writing Custom Middleware
Let's write a simple logging middleware that logs the HTTP method, URL, and time of every request.

```javascript
const loggerMiddleware = (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.url}`);
    
    // Pass control to the next middleware or route handler
    next(); 
};

const app = express();

// Apply the middleware globally to all routes
app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.send('Hello');
});
```

Let's write a middleware that checks for authorization.
```javascript
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader === 'secret-token') {
        // User is authorized, attach user info to req, and proceed
        req.user = { role: 'admin' };
        next();
    } else {
        // User is NOT authorized. End the cycle here. Do NOT call next().
        res.status(401).json({ error: 'Unauthorized access' });
    }
};

// Apply middleware only to a specific route
app.get('/dashboard', requireAuth, (req, res) => {
    res.send(`Welcome to the dashboard. Your role is ${req.user.role}`);
});
```

### Types of Middleware

1. **Application-level middleware:** Bound to an instance of the `app` object using `app.use()` or `app.METHOD()`.
   ```javascript
   app.use((req, res, next) => { /* runs on every request */ });
   ```
2. **Router-level middleware:** Bound to an instance of `express.Router()`. Works exactly like application-level but restricted to the router.
   ```javascript
   router.use((req, res, next) => { /* ... */ });
   ```
3. **Error-handling middleware:** Has a unique signature of 4 arguments `(err, req, res, next)`. Covered in depth in section 7.
4. **Built-in middleware:** Provided by Express out-of-the-box.
   - `express.json()`: Parses incoming requests with JSON payloads.
   - `express.urlencoded()`: Parses incoming requests with URL-encoded payloads.
   - `express.static()`: Serves static files (HTML, CSS, images).
5. **Third-party middleware:** Community-created packages you install via npm.
   - `morgan`: Advanced HTTP request logger.
   - `cors`: Enables Cross-Origin Resource Sharing.
   - `helmet`: Secures your app by setting various HTTP headers.

**Example of combining third-party and built-in middleware:**
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Security headers
app.use(helmet());

// Allow cross-origin requests
app.use(cors());

// HTTP request logging
app.use(morgan('dev'));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' folder
app.use(express.static('public'));
```

---

## 5. Request and Response Objects

### The Request Object (`req`)
The `req` object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and more.

**Important Properties:**
- `req.body`: Contains key-value pairs of data submitted in the request body (requires `express.json()` or `express.urlencoded()`).
- `req.params`: An object containing properties mapped to the named route parameters.
- `req.query`: An object containing a property for each query string parameter in the route.
- `req.headers`: An object containing the incoming HTTP headers.
- `req.method`: The HTTP method (GET, POST, etc.) as a string.
- `req.url` / `req.originalUrl`: The path portion of the URL.
- `req.ip`: The remote IP address of the request.
- `req.cookies`: An object containing cookies sent by the request (requires `cookie-parser` middleware).

### The Response Object (`res`)
The `res` object represents the HTTP response that an Express app sends when it gets an HTTP request.

**Important Methods:**
- `res.send([body])`: Sends the HTTP response. The body can be a Buffer, a String, an Object, or an Array. It automatically sets the `Content-Type` header based on the argument.
- `res.json([body])`: Sends a JSON response. This method is identical to `res.send()` with an object or array passed in, but it formats the data properly and explicitly sets the `Content-Type` to `application/json`.
- `res.status(code)`: Sets the HTTP status code for the response. It is chainable (e.g., `res.status(404).send('Not found')`).
- `res.sendFile(path)`: Transfers the file at the given absolute path. Good for serving single HTML files.
- `res.redirect([status,] path)`: Redirects to a URL. Default status is 302 (Found).
- `res.render(view, [locals])`: Renders a view template (requires a template engine like EJS, Pug, or Handlebars).
- `res.cookie(name, value, [options])`: Sets cookie name to value.
- `res.clearCookie(name, [options])`: Clears the cookie specified by name.
- `res.end()`: Ends the response process. Used to quickly end the response without any data. Usually, you use `res.send` or `res.json` instead.
- `res.locals`: An object that contains response local variables scoped to the request. It is useful for exposing data to templates or passing data between middleware.

**Examples:**
```javascript
app.get('/api/example', (req, res) => {
    // Sending a successful JSON response
    res.status(200).json({ success: true, data: [1, 2, 3] });
});

app.get('/unauthorized', (req, res) => {
    // Sending an error status
    res.status(403).send('Forbidden');
});

app.get('/google', (req, res) => {
    // Redirecting
    res.redirect('https://google.com');
});

app.post('/login', (req, res) => {
    // Setting a cookie securely
    res.cookie('sessionId', '12345abcde', { 
        httpOnly: true, 
        secure: true, 
        maxAge: 3600000 // 1 hour
    });
    res.send('Logged in');
});
```

---

## 6. Handling Forms and JSON

Modern web applications constantly receive data from clients. Express provides built-in tools for parsing JSON and standard forms, but requires external libraries for file uploads.

### Parsing JSON
When a client sends data using `fetch` or `axios` with `Content-Type: application/json`, you must parse it.

```javascript
// Add this middleware globally BEFORE your routes
app.use(express.json());

app.post('/api/users', (req, res) => {
    // Now req.body contains the parsed JSON object
    const { username, password } = req.body;
    console.log(`Creating user: ${username}`);
    res.json({ message: 'User created' });
});
```

### Parsing URL-Encoded Data (HTML Forms)
When an HTML `<form>` is submitted using `method="POST"`, the browser sends it as `application/x-www-form-urlencoded`.

```javascript
// Add this middleware globally
// extended: true allows parsing nested objects
app.use(express.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
    // req.body contains the form fields
    const { email, message } = req.body;
    res.send(`Received message from ${email}`);
});
```

### Handling Multipart Form Data (File Uploads)
If your form includes an `<input type="file">`, it uses `multipart/form-data`. Express cannot parse this out of the box. You must use a third-party middleware like **Multer**.

```bash
npm install multer
```

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define directory to save files
        cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
        // Create a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Single file upload
// The 'avatar' argument must match the name attribute in the HTML input field
app.post('/profile', upload.single('avatar'), (req, res) => {
    // req.file contains information about the uploaded file
    // req.body contains any text fields from the form
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    
    console.log(req.file);
    res.send(`File uploaded successfully: ${req.file.filename}`);
});

// Multiple files upload
app.post('/photos', upload.array('photos', 5), (req, res) => {
    // req.files is an array of file objects
    res.send(`${req.files.length} files uploaded.`);
});
```
*Note: Always ensure the upload directory (e.g., `uploads/`) exists or your app will crash.*

---

## 7. Error Handling

Proper error handling is critical for a stable API. If an unhandled error occurs, your Node server can crash, causing downtime.

### Synchronous Errors
Errors occurring in synchronous code inside route handlers and middleware require no extra work. Express catches them and automatically forwards them to the error-handling middleware.

```javascript
app.get('/sync-error', (req, res) => {
    // Express catches this automatically
    throw new Error('Something broke synchronously!');
});
```

### Asynchronous Errors
In Express 4.x, errors occurring in asynchronous code (Promises, async/await, setTimeout) are **NOT** caught automatically by Express. If you don't catch them, your app will crash.

**The wrong way (App crashes):**
```javascript
app.get('/users', async (req, res) => {
    // If db.getUsers() fails, the app crashes!
    const users = await db.getUsers(); 
    res.json(users);
});
```

**The right way (using try/catch and `next`):**
You must pass the error to the `next()` function.
```javascript
app.get('/users', async (req, res, next) => {
    try {
        const users = await db.getUsers();
        res.json(users);
    } catch (error) {
        // Pass the error to Express error handlers
        next(error);
    }
});
```

**Pro Tip: Using Async Handler Wrappers**
Writing try/catch blocks in every route gets tedious. A common pattern is to write a wrapper function (or use a package like `express-async-handler`).

```javascript
// Custom async handler wrapper
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Now you don't need try/catch blocks!
app.get('/users', asyncHandler(async (req, res) => {
    const users = await db.getUsers(); // If this fails, asyncHandler catches it and calls next(err)
    res.json(users);
}));
```
*(Note: Express 5 natively supports async route handlers without needing `next(err)` for promise rejections).*

### Writing Custom Error-Handling Middleware
Error-handling middleware is defined just like regular middleware, except it has **four arguments instead of three**, specifically with the signature `(err, req, res, next)`.

Express knows a middleware is an error handler *only* because it has 4 parameters.

**Important:** Error-handling middleware must be placed at the very end of the middleware stack, after all routes and other `app.use()` calls.

```javascript
const express = require('express');
const app = express();

// ... normal routes ...
app.get('/fail', (req, res, next) => {
    const error = new Error('Database connection failed');
    error.status = 500;
    next(error); // Triggers the error handler below
});

// 1. Catch-all 404 middleware
// This runs if no previous route matched the request
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

// 2. Global Error Handling Middleware
app.use((err, req, res, next) => {
    // Default to 500 if no status code is set
    const statusCode = err.status || 500;
    
    res.status(statusCode);
    
    // Send JSON response
    res.json({
        error: {
            message: err.message,
            // Only leak stack traces in development mode
            stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
        }
    });
});
```

---

## 8. REST API Development

Representational State Transfer (REST) is an architectural style for designing networked applications. Express is perfectly suited for building RESTful APIs.

### Principles of a Good REST API
1. **Resource-Based URIs**: Endpoints should represent nouns (resources), not verbs (actions).
   - Good: `GET /articles`, `POST /articles`
   - Bad: `GET /getArticles`, `POST /createArticle`
2. **Use Standard HTTP Methods**: 
   - `GET`: Read
   - `POST`: Create
   - `PUT`: Update (Replace)
   - `PATCH`: Update (Partial modify)
   - `DELETE`: Remove
3. **Use Standard HTTP Status Codes**:
   - `200 OK`: Successful GET, PUT, PATCH, DELETE.
   - `201 Created`: Successful POST.
   - `204 No Content`: Successful request, but no data to return (often used for DELETE).
   - `400 Bad Request`: Client sent invalid data.
   - `401 Unauthorized`: Client is not authenticated.
   - `403 Forbidden`: Client is authenticated but lacks permission.
   - `404 Not Found`: Resource does not exist.
   - `500 Internal Server Error`: Something went wrong on the server.
4. **Stateless**: Every request from the client must contain all information needed to understand and process it.

### Structuring Controllers
To keep routes clean, we separate the logic into "Controllers".

**File: `controllers/userController.js`**
```javascript
// Mock database array
let users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

// @desc    Get all users
// @route   GET /api/users
const getUsers = (req, res) => {
    res.status(200).json({ success: true, data: users });
};

// @desc    Get single user
// @route   GET /api/users/:id
const getUser = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
};

// @desc    Create new user
// @route   POST /api/users
const createUser = (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ success: false, message: 'Please provide a name' });
    }
    
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    
    res.status(201).json({ success: true, data: newUser });
};

// @desc    Delete user
// @route   DELETE /api/users/:id
const deleteUser = (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    users.splice(userIndex, 1);
    res.status(200).json({ success: true, message: 'User deleted' }); // Or 204
};

module.exports = { getUsers, getUser, createUser, deleteUser };
```

**File: `routes/userRoutes.js`**
```javascript
const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser, deleteUser } = require('../controllers/userController');

// Using router.route for cleaner chaining
router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .delete(deleteUser);

module.exports = router;
```

---

## 9. Working with Databases (Intro)

Express can connect to any database supported by Node.js. 

### MongoDB with Mongoose (NoSQL)
Mongoose is the most popular ODM (Object Data Modeling) library for MongoDB and Node.js.

```bash
npm install mongoose
```

**Database Connection & Schema setup:**
```javascript
const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error', err));

// 2. Define a Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true }
}, { timestamps: true });

// 3. Compile Schema into a Model
const Product = mongoose.model('Product', productSchema);

// 4. Using the model in Express routes
app.post('/api/products', async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error); // Handles validation errors nicely if using global handler
    }
});

app.get('/api/products', async (req, res, next) => {
    try {
        const products = await Product.find({ inStock: true });
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});
```

### PostgreSQL with `pg` (SQL)
For relational databases, you can use raw queries with packages like `pg`, query builders like `knex`, or ORMs like `Prisma` or `Sequelize`.

```bash
npm install pg
```

```javascript
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'myapp',
    password: 'password123',
    port: 5432,
});

app.get('/api/users', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
});
```

---

## 10. Authentication (Basic Intro)

Authentication verifies *who* the user is. Authorization verifies *what* they can access.
JSON Web Tokens (JWT) are a stateless, industry-standard method for API authentication.

```bash
npm install jsonwebtoken bcryptjs
```

### Flow: Registration & Login
1. **Register**: Hash the password with `bcryptjs`, save the user to the DB.
2. **Login**: Find the user, compare the hashed password. If valid, generate a JWT and send it to the client.
3. **Protected Routes**: Client sends the JWT in the `Authorization` header. Express verifies the token using middleware.

**Auth Logic (Abstracted):**
```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'your_super_secret_key'; // Should be in .env

// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    // 1. Check if user exists (Mocked here)
    const user = { id: 1, email: 'test@test.com', passwordHash: '$2a$10$...' }; // Real app checks DB
    
    // 2. Validate password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });
    
    // 3. Generate Token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
});
```

**Auth Middleware:**
To protect a route, create middleware that intercepts the request and verifies the token.

```javascript
const protect = (req, res, next) => {
    let token;
    
    // Check if header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Extract token: "Bearer eyJhb..." -> "eyJhb..."
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ msg: 'Not authorized, no token provided' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Attach user ID to request object
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Not authorized, token failed' });
    }
};

// Protecting a route
app.get('/api/profile', protect, (req, res) => {
    res.send(`Profile data for user ${req.user.id}`);
});
```

---

## 11. Environment Variables

Never hardcode secrets (database URIs, API keys, JWT secrets) in your source code. Use environment variables.

1. Install `dotenv`:
   ```bash
   npm install dotenv
   ```
2. Create a `.env` file at the root of your project:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/test
   JWT_SECRET=supersecret12345
   ```
3. Add `.env` to your `.gitignore` immediately!
4. Load variables at the very top of your entry file (`server.js`):
   ```javascript
   require('dotenv').config();
   const express = require('express');
   
   console.log(`Running in ${process.env.NODE_ENV} mode`);
   const PORT = process.env.PORT || 3000;
   ```

---

## 12. Best Practices

### 1. Project Structure
A scalable Express app separates concerns. Do not put everything in `server.js`.
A standard structure:
```text
my-express-app/
├── config/           # Database connections, env configs
├── controllers/      # Route logic / Business logic
├── middleware/       # Custom middleware (auth, error handlers)
├── models/           # Database models/schemas
├── routes/           # Route definitions (mapping paths to controllers)
├── utils/            # Helper functions
├── .env              # Environment variables
├── app.js            # Express application setup
└── server.js         # Entry point (starting the server)
```

**Why separate `app.js` and `server.js`?**
It makes testing incredibly easy. You can import `app.js` into testing frameworks like Supertest without actually binding to a port and starting the server.

### 2. Clean Code & Architecture
- **Keep Controllers thin:** Move heavy business logic into a "Services" layer if the app gets complex.
- **Data Validation:** Never trust client data. Use libraries like `Joi`, `Zod`, or `express-validator` to validate `req.body` before it reaches your controllers.

### 3. Security
- Use **Helmet**: `app.use(helmet())` sets various HTTP headers to protect against common web vulnerabilities (XSS, Clickjacking).
- **Rate Limiting**: Use `express-rate-limit` to prevent brute-force and DDoS attacks.
  ```javascript
  const rateLimit = require('express-rate-limit');
  const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use('/api/', limiter);
  ```

---

## 13. Common Mistakes

### 1. "Cannot set headers after they are sent to the client"
This is the most common Express error. It happens when you try to send a response more than once for a single request.

**Wrong:**
```javascript
app.get('/test', (req, res) => {
    if (someError) {
        res.status(400).send('Error');
        // BUG: Execution continues, and res.send is called again below!
    }
    res.send('Success'); // Crashes here
});
```

**Fix:** Use `return` to stop execution.
```javascript
app.get('/test', (req, res) => {
    if (someError) {
        return res.status(400).send('Error');
    }
    res.send('Success');
});
```

### 2. Hanging Requests (Client Timeout)
If your route handler doesn't call `res.send()`, `res.json()`, or `res.end()`, and doesn't call `next()`, the request will hang until the browser times out. Always ensure every possible path through your code ends the request-response cycle.

### 3. Blocking the Event Loop
Node.js is single-threaded. If you perform a heavy synchronous task (like massive array sorting, cryptographic hashing without async methods, or synchronous file reading), it blocks *all other users* from accessing your API until it finishes.
Always use async alternatives (e.g., `bcrypt.hash` instead of `bcrypt.hashSync`, `fs.promises.readFile` instead of `fs.readFileSync`).

---

## 14. Real-world Examples

Here is how you tie everything together in a modern, production-ready setup.

### `app.js` (Express Configuration)
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoutes = require('./routes/userRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

// 1. Global Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // Parse JSON bodies

// 2. Mount Routes
app.use('/api/users', userRoutes);

// 3. Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API is running' });
});

// 4. Error Handling Middleware (must be at the end)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
```

### `server.js` (Entry Point)
```javascript
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

// Connect to DB then start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit process with failure
    });
```

### `middleware/errorMiddleware.js`
```javascript
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    // If status code is 200 but we hit an error, change it to 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { notFound, errorHandler };
```

### `controllers/userController.js`
```javascript
// A simple async handler wrapper
const asyncHandler = require('express-async-handler');
const User = require('../models/User'); // Assume Mongoose model exists

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    // req.user.id is populated by the auth middleware
    const user = await User.findById(req.user.id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = { getUserProfile };
```

### Conclusion
By mastering the middleware pipeline, separating your business logic into controllers, and implementing robust asynchronous error handling, you can build highly scalable and maintainable backends with Express.js. Keep practicing by building small CRUD applications and gradually introducing authentication and database integrations!
