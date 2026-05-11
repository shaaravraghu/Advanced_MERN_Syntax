# React Router

React Router handles navigation inside React single-page applications.

## Routes
- Routes map URLs to components.
- They let the app change views without a full page reload.

### Basic Idea
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

## Nested Routes
- Nested routes help build layouts with shared UI.
- A parent route can render a layout and child routes can render inside it.

### Useful Concepts
- layout route
- outlet
- nested children

## Protected Routes
- Protected routes block unauthorized users from seeing certain pages.
- They usually check authentication state before rendering the route content.

### Common Pattern
- If user is authenticated, render the page.
- Otherwise, redirect to login.

## Router Notes
- Use route params for dynamic pages.
- Use links instead of plain anchors for in-app navigation.
- Keep route layout logic separate from page content when possible.

## Things People Often Forget
- browser back and forward behavior
- 404 / not found routes
- redirect handling
- preserving intended destination after login

