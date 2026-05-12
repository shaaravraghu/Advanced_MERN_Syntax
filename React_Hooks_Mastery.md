# React Hooks Mastery

Hooks let functional components use state, lifecycle behavior, refs, memoization, and custom reusable logic.

## useState
`useState` stores local component state.

```jsx
const [count, setCount] = useState(0);
```

### Notes
- Returns the current value and an updater function.
- Updating state triggers a re-render.
- Use the functional form when the next state depends on the previous one.

```jsx
setCount(prev => prev + 1);
```

## useEffect
`useEffect` runs side effects after render.

Common side effects:
- fetching data
- subscriptions
- timers
- DOM interaction
- syncing with browser APIs

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

## Dependency Arrays
- The dependency array controls when the effect runs.
- No dependency array means the effect runs after every render.
- An empty array means the effect runs once after mount.
- Dependencies should include every reactive value used inside the effect.

## Cleanup
Cleanup prevents leaks and stale work.

```jsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id);
}, []);
```

Use cleanup for:
- timers
- event listeners
- subscriptions
- aborted async operations

## useRef
`useRef` stores a mutable value that persists across renders without causing re-renders.

```jsx
const inputRef = useRef(null);
```

Common uses:
- focusing inputs
- storing DOM nodes
- keeping mutable values
- tracking previous values

## useMemo
`useMemo` memoizes a computed value.

```jsx
const filtered = useMemo(() => heavyFilter(items), [items]);
```

Use it when:
- computation is expensive
- result should not be recomputed on every render

## useCallback
`useCallback` memoizes a function reference.

```jsx
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []);
```

Useful when:
- passing callbacks to memoized children
- preventing unnecessary re-renders caused by changing function identities

## Custom Hooks
- Custom hooks are reusable functions that start with `use`.
- They let you extract shared logic from components.

```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}
```

### Custom Hook Guidelines
- Name them with `use`.
- Keep them focused.
- Combine hooks and business logic cleanly.







