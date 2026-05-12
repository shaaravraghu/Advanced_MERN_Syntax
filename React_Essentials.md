# React Essentials

## Core Idea
React is a component-based UI library. The main mental model is to describe the UI as a function of state and props.

## JSX Behind the Scenes
- JSX looks like HTML but compiles to JavaScript.
- Under the hood, JSX becomes React element creation calls.
- React elements are plain JavaScript objects that describe what should appear on screen.
- JSX must return a single root element.
- Tags must be closed properly.
- Use `className` instead of `class`.
- Use `htmlFor` instead of `for`.

### Example
```jsx
const element = <h1>Hello</h1>;
```

This becomes conceptually similar to:
```js
React.createElement("h1", null, "Hello");
```

## Functional Components
- Functional components are JavaScript functions that return JSX.
- They are the standard way to write React UI today.
- They can accept props and use hooks.

```jsx
function Greeting() {
  return <h1>Hello from React</h1>;
}
```

## Props
- Props are inputs passed from parent to child components.
- Props are read-only from the child's point of view.
- They make components reusable and configurable.

```jsx
function UserCard({ name, role }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}
```

## State
- State is data managed inside a component.
- When state changes, React re-renders the component.
- Use state for values that change over time and affect the UI.

## Conditional Rendering
- Render different UI based on values, status, or user actions.

```jsx
return isLoggedIn ? <Dashboard /> : <Login />;
```

Common patterns:
- `&&` for optional rendering
- `if/else` before return
- ternary expressions inside JSX

## Events
- React events use camelCase names like `onClick`, `onChange`, and `onSubmit`.
- Event handlers are passed as functions, not strings.

```jsx
<button onClick={handleClick}>Click</button>
```

## Rendering Ideas
- React updates the UI by comparing the previous render with the new one.
- Keep renders predictable.
- Derive UI from state whenever possible.




