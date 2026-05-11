# Testing Notes

## 1. Jest

Jest is a JavaScript testing framework commonly used for unit and integration testing.

### Core Ideas
- tests verify expected behavior
- assertions compare expected vs actual
- mocks isolate dependencies

### Common Features
- test runners
- matchers
- spies
- mocks
- snapshots

### Example
```js
test("adds numbers", () => {
  expect(2 + 2).toBe(4);
});
```

### Jest Notes
- keep tests small and focused
- test behavior, not implementation details
- mock external dependencies when needed

---

## 2. Supertest

Supertest is used to test HTTP servers and Express routes.

### Why It Helps
- sends requests to your app in tests
- checks status codes and responses
- works well with Jest

### Example
```js
request(app)
  .get("/users")
  .expect(200);
```

### Supertest Notes
- useful for API route testing
- good for integration testing of Express endpoints
- often paired with a test database or mock server

---

## 3. React Testing Library

React Testing Library focuses on testing components the way users interact with them.

### Core Philosophy
- test what users see and do
- avoid testing internal implementation details when possible

### Common Queries
- by text
- by role
- by label text
- by placeholder
- by test id as a fallback

### Example
```jsx
render(<Button />);
screen.getByRole("button", { name: /save/i });
```

### RTL Notes
- prefer accessible queries
- simulate user behavior
- assert visible outcomes
- keep tests close to real usage

