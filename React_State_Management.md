# React State Management

State management is about deciding where data lives, who can read it, and how it changes.

## Context API
Context is useful for sharing values across a component tree without prop drilling.

Common uses:
- theme
- authenticated user
- locale
- app-wide settings

### Concept
```jsx
const ThemeContext = createContext();
```

### Notes
- Good for low-frequency global values.
- Not ideal for very high-frequency updates across large trees.

## Redux Concepts
- Redux stores application state in a central store.
- State changes happen through actions.
- Reducers are pure functions that describe how state changes.
- The store is read-only from components; updates go through dispatched actions.

Core terms:
- store
- action
- reducer
- dispatch
- selector

## Redux Toolkit
Redux Toolkit is the modern recommended way to use Redux.

### Why It Helps
- less boilerplate
- safer reducer logic with Immer
- simpler store configuration
- better developer experience

### Core Ideas
- `createSlice` for reducers and actions together
- `configureStore` for store setup
- `createAsyncThunk` for async flows

## React Query
React Query is for server state, not local UI state.

### What Server State Means
- fetched from an API
- cached
- synced
- refetched
- invalidated

### Why It Is Useful
- handles loading and error states
- caches data automatically
- reduces manual fetch boilerplate
- supports stale data and refetching patterns

### Good Fit
- lists from APIs
- detail views
- mutation workflows
- background refresh

### Important Distinction
- Use React state or Redux for client state.
- Use React Query for remote server state.

