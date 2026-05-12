# React Architecture

Good React architecture makes code easier to read, scale, and maintain.

## Folder Structure
There is no single perfect structure, but a clear feature-oriented layout often works well.

Common patterns:
- `components/` for reusable UI pieces
- `pages/` for route-level screens
- `hooks/` for custom hooks
- `context/` for context providers
- `store/` for global state
- `utils/` for helper functions
- `assets/` for images and static files
- `services/` or `api/` for network code

## Feature-Based Thinking
- Group related files together.
- Keep logic near the feature it serves.
- Avoid giant folders full of unrelated components.

## Compound Components
- Compound components are related components that work together through shared state or context.
- Example: a `Tabs` component with `Tabs.List`, `Tabs.Trigger`, and `Tabs.Panel`.
- This pattern helps create expressive APIs.

## Functions as Props
- Passing functions as props lets children notify parents or customize behavior.
- This is also called callback props.

```jsx
<Button onClick={handleSave} />
```

## Dynamic Component Styling
React components often change classes based on state or props.

```jsx
<div className={isActive ? "card active" : "card"} />
```

Common styling strategies:
- class toggling
- inline styles for small dynamic values
- CSS modules
- utility classes
- CSS-in-JS

## Controlled Inputs
- A controlled input is tied to React state.
- The input value comes from state and changes through state updates.

```jsx
const [name, setName] = useState("");

<input
  value={name}
  onChange={e => setName(e.target.value)}
/>
```

Benefits:
- single source of truth
- validation is easier
- form state is predictable








