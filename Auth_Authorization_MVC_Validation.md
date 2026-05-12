# Authentication, Authorization, MVC, and Validation Notes

## 1. Authentication Basics

Authentication answers the question: "Who are you?"

### Sessions vs JWT

#### Sessions
- The server stores session data.
- The browser usually stores a session ID in a cookie.
- Good for server-controlled login state.
- Easy to revoke by deleting server session data.

#### JWT
- JWT stands for JSON Web Token.
- The token itself carries encoded claims.
- The server usually does not need to store session state for every request.
- Good for stateless APIs and distributed systems.

#### Main Difference
- Sessions are server-side state.
- JWTs are client-held tokens with signed claims.

#### When to Prefer Each
- Use sessions when you want simple server-managed browser auth.
- Use JWTs when you need stateless auth or mobile/API clients.

### Access and Refresh Tokens

#### Access Token
- Short-lived token used to access protected resources.
- Sent on most authenticated requests.

#### Refresh Token
- Longer-lived token used to get a new access token.
- Should be protected more carefully than access tokens.

#### Typical Flow
1. User logs in.
2. Server issues access token and refresh token.
3. Access token is used for requests.
4. When access token expires, refresh token requests a new one.

#### Notes
- Access tokens should be short-lived.
- Refresh tokens should have rotation and revocation strategies where possible.

### bcrypt Hashing
- `bcrypt` hashes passwords before storage.
- Never store plaintext passwords.
- Hashing is one-way, unlike encryption.

#### Common Pattern
```js
const hash = await bcrypt.hash(password, 10);
const ok = await bcrypt.compare(password, hash);
```

#### Why bcrypt
- slow by design
- includes salt handling
- widely used for password storage

### Login, Register, Logout

#### Register
- Validate input
- Check for duplicate accounts
- Hash password
- Store user

#### Login
- Find the user
- Compare passwords
- Issue session or tokens

#### Logout
- Clear the session or invalidate tokens
- Remove cookies if used

### Storing JWT Securely
- Avoid storing sensitive tokens in unsafe places.
- Prefer secure, httpOnly cookies for browser-based apps when possible.
- Avoid localStorage for high-value auth tokens if you can.

### Secure Cookies
Secure cookies help protect auth data.

#### Important Cookie Flags
- `httpOnly`: JavaScript cannot access it
- `secure`: only sent over HTTPS
- `sameSite`: reduces CSRF risk
- `maxAge` or `expires`: controls lifetime

#### Example Idea
```js
res.cookie("token", jwt, {
  httpOnly: true,
  secure: true,
  sameSite: "strict"
});
```

### Authentication Best Practices
- hash passwords
- use short-lived access tokens
- rotate refresh tokens when possible
- clear cookies on logout
- use HTTPS in production

---

## 2. Authorization

Authorization answers the question: "What are you allowed to do?"

### RBAC
RBAC means Role-Based Access Control.

Common roles:
- admin
- user

#### Idea
- Admins can access broader or privileged actions.
- Regular users get limited access.

### Permission-Based Access
- Permissions are finer-grained than roles.
- A role may contain several permissions.
- Useful when access rules become more complex.

Examples:
- `user:create`
- `user:delete`
- `post:edit`
- `report:view`

### Route Guards
- Route guards block or allow access to routes.
- In Express, this is usually middleware.
- In React or frontend routing, this may be conditional route rendering.

#### Server-Side Guard Example
```js
function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).send("Unauthorized");
  next();
}
```

#### Role Guard Example
```js
function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) return res.status(403).send("Forbidden");
    next();
  };
}
```

### Authorization Best Practices
- authenticate first, authorize second
- keep rules centralized
- return 401 for unauthenticated, 403 for unauthorized
- avoid spreading auth checks everywhere manually

---

## 3. MVC Architecture

MVC stands for Model, View, Controller.

### Controllers
- Controllers handle request/response logic.
- They coordinate input, business rules, and output.

### Models
- Models represent data and database logic.
- In MongoDB apps, this is often a schema/model layer.

### Services
- Services hold reusable business logic.
- They keep controllers thin and focused.

### Routes
- Routes define URL paths and connect them to controllers.
- They should stay small and declarative.

### Views
- Views are optional in API-only apps.
- They are used when rendering HTML server-side.

### Practical MVC Shape
- route receives request
- controller validates and delegates
- service performs business logic
- model talks to the database
- view renders output if needed

### Why MVC Helps
- separation of concerns
- easier testing
- easier maintenance
- better team collaboration

### Good Practice
- keep controllers thin
- keep services reusable
- do not put database logic directly inside routes if you can avoid it

---

## 4. Validation

Validation checks whether incoming data is acceptable before using it.

### Server-Side Validation
- Done on the backend.
- Essential because the client can be bypassed.
- Protects the database and business rules.

### Client-Side Validation
- Done in the browser.
- Improves user experience.
- Should never be the only line of defense.

### express-validator
`express-validator` helps validate and sanitize request data in Express.

#### Common Ideas
- check required fields
- validate length and format
- normalize values
- collect errors in one place

#### Example Pattern
```js
body("email").isEmail();
body("password").isLength({ min: 8 });
```

#### Error Handling Pattern
- run validators
- inspect validation result
- return errors before continuing

### Validation Best Practices
- validate early
- sanitize input where needed
- show useful error messages
- validate on both client and server when possible
- never trust raw request data





