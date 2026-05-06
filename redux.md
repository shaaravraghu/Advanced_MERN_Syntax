# Comprehensive Guide to Redux and State Management

This comprehensive guide covers Redux from its fundamental principles to modern, production-ready usage with Redux Toolkit (RTK). Designed for developers moving from basic React state management to robust, scalable global state, this manual provides detailed explanations, best practices, and real-world examples.

---

## Table of Contents

1. [Introduction to Redux](#1-introduction-to-redux)
2. [Core Concepts](#2-core-concepts)
3. [Redux Data Flow](#3-redux-data-flow)
4. [Setting up Redux](#4-setting-up-redux)
5. [Actions](#5-actions)
6. [Reducers](#6-reducers)
7. [Combining Reducers](#7-combining-reducers)
8. [Redux Toolkit (Important)](#8-redux-toolkit-important)
9. [Middleware](#9-middleware)
10. [Async State Management](#10-async-state-management)
11. [Integration with React](#11-integration-with-react)
12. [Debugging](#12-debugging)
13. [Best Practices](#13-best-practices)
14. [Common Mistakes](#14-common-mistakes)
15. [Real-world Examples](#15-real-world-examples)

---

## 1. Introduction to Redux

### What is Redux?

Redux is an open-source JavaScript library for managing and centralizing application state. It is most commonly used with libraries such as React or Angular for building user interfaces. Similar to (and inspired by) Facebook's Flux architecture, it was created by Dan Abramov and Andrew Clark.

Redux helps you write applications that:
- Behave consistently across client, server, and native environments.
- Are easy to test.
- Can be debugged easily with powerful developer tools.

### Why State Management is Needed

In a typical React application, state is managed locally within components. Data is passed down the component tree via "props". As an application grows, managing state this way introduces several critical problems:

1. **Prop Drilling**: Passing data through multiple layers of components that don't need the data themselves, just to get it to a deeply nested child component.
2. **Inconsistent State**: When multiple, unrelated components need to share the same data, keeping that data synchronized across the application becomes extremely difficult without a single source of truth.
3. **Complex Component Hierarchies**: Components become tightly coupled to the data they pass, making refactoring and component reuse challenging.
4. **Testing Difficulties**: Testing components requires mocking all the props passed down from parents.

Redux solves this by moving the state out of individual components and into a centralized, global object called the "Store". Components can access the state they need directly from the store, and they can trigger state updates from anywhere in the application.

### When to Use Redux

Redux is powerful, but it adds boilerplate and complexity. You should consider using Redux when:

- You have large amounts of application state that are needed in many places in the app.
- The state is updated frequently over time.
- The logic to update that state is complex.
- The app has a medium-to-large-sized codebase, and might be worked on by many people.
- You need to see how the state is updated over time (time-travel debugging).
- You want to cache data from an API to avoid unnecessary re-fetches.

Conversely, **do NOT use Redux if:**
- Your app is simple.
- State is mostly localized to single components or immediate children.
- You don't have complex data flows.
- You are just starting to learn React (learn React's built-in state first).

---

## 2. Core Concepts

Redux revolves around three fundamental principles:
1. **Single source of truth**: The global state of your application is stored in an object tree within a single store.
2. **State is read-only**: The only way to change the state is to emit an action, an object describing what happened.
3. **Changes are made with pure functions**: To specify how the state tree is transformed by actions, you write pure reducers.

### The Store

The **Store** is the object that brings actions and reducers together. It holds the application state, allows access to state via `getState()`, allows state to be updated via `dispatch(action)`, and registers listeners via `subscribe(listener)`.

Crucially, an application should only have **one** Redux store.

### Actions

An **Action** is a plain JavaScript object that describes an intention to change the state. Actions are the only way to get data into the store. Any data, whether from UI events, network callbacks, or other sources, needs to eventually be dispatched as an action.

Actions must have a `type` property that indicates the type of action being performed. Types are typically defined as string constants.

### Reducers

A **Reducer** is a function that determines changes to an application's state. It uses the action it receives to determine this change. It takes two arguments: the current state and the action, and returns the new state.

` (previousState, action) => newState `

Reducers must be **pure functions**. This means:
- They do not mutate the state directly; they return a *new* object representing the new state.
- They do not have side effects (like making API calls or routing transitions).
- Given the same arguments, they should always calculate and return the same result.

### Dispatch

**Dispatching** is the act of sending an action to the Redux store to trigger a state change. You call `store.dispatch(action)`. This is the only way to trigger a state change in Redux.

---

## 3. Redux Data Flow

Redux architecture revolves around a strict **unidirectional data flow**. This means that all data in an application follows the exact same lifecycle pattern, making the logic of your app more predictable and easier to understand.

The lifecycle in any Redux app follows these steps:

### 1. Initial Setup
- A Redux store is created using a root reducer function.
- The store calls the root reducer once, and saves the return value as its initial `state`.
- When the UI is first rendered, UI components access the current state of the Redux store, and use that data to decide what to render.
- UI components also subscribe to any future store updates so they can know if the state has changed.

### 2. Updates (The Loop)
- **Event**: Something happens in the application, such as a user clicking a button.
- **Dispatch**: The app code dispatches an action to the Redux store, like `dispatch({ type: 'counter/incremented' })`.
- **Reducer Execution**: The store runs the reducer function again with the `previousState` and the current `action`, and saves the return value as the `newState`.
- **Subscription Trigger**: The store notifies all parts of the UI that are subscribed that the store has been updated.
- **Re-render**: Each UI component that needs data from the changed portions of the store checks to see if the state it needs has changed. If it has, the component forces a re-render with the new data.

### Visualizing the Flow

```text
       UI (React Component)
              |
              | 1. User clicks button
              v
       Action Creator
              |
              | 2. Returns Action { type: 'INCREMENT', payload: 1 }
              v
           Dispatch
              |
              | 3. Sends Action to Store
              v
         Redux Store
              |
              | 4. Passes state and action to Reducer
              v
           Reducer
              |
              | 5. Calculates new state
              v
         Redux Store
              |
              | 6. Saves new state, notifies subscribers
              v
       UI (React Component)
              |
              | 7. Re-renders with new state
```

This strict directionality guarantees that views never directly change the data. Instead, they signal a desire to change data via actions, and the reducers handle the actual data transformation in an isolated, testable manner.

---

## 4. Setting up Redux

*(Note: This section covers the classic setup. In modern development, you should always use Redux Toolkit, which is covered in Section 8. However, understanding the raw setup is crucial for understanding how Redux works under the hood).*

### Installation

To use Redux with React, you need both the `redux` library and the `react-redux` binding library.

```bash
npm install redux react-redux
```

### Creating a Store

To create a basic store, you need a reducer.

```javascript
// store.js
import { createStore } from 'redux';

// A simple reducer
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

// Create the store
const store = createStore(counterReducer);

export default store;
```

### Connecting to the App

To make the Redux store available to your React components, you use the `<Provider>` component from `react-redux`. You wrap your entire application tree in this provider.

```javascript
// index.js or main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

By wrapping `<App />` in `<Provider store={store}>`, any component anywhere in the React tree can now access the Redux store.

---

## 5. Actions

Actions are plain JavaScript objects that transmit payloads of information from your application to your store. They are the *only* source of information for the store.

### Action Structure

An action must have a `type` property. It's highly recommended to use string constants for action types so they can be easily tracked and debugged.

```javascript
const INCREMENT_ACTION = {
  type: 'INCREMENT'
};
```

Actions can also carry data necessary to perform the state update. This data is conventionally placed in a property called `payload`. This convention is known as Flux Standard Action (FSA).

```javascript
const ADD_TODO_ACTION = {
  type: 'ADD_TODO',
  payload: {
    id: 1,
    text: 'Learn Redux'
  }
};
```

### Action Creators

Action creators are exactly that—functions that create actions. It's easy to conflate the terms "action" and "action creator", so do your best to use the proper terms.

Instead of writing out action objects directly every time you want to dispatch them, you use an action creator function.

```javascript
// actionTypes.js
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

// actions.js
import { ADD_TODO, REMOVE_TODO } from './actionTypes';

// Action Creator
export function addTodo(text) {
  return {
    type: ADD_TODO,
    payload: {
      id: Date.now(), // generating a simple ID
      text: text,
      completed: false
    }
  };
}

export function removeTodo(id) {
  return {
    type: REMOVE_TODO,
    payload: id
  };
}
```

Using action creators makes your code more portable, easier to test, and reduces boilerplate when dispatching the same action from multiple places in your application.

---

## 6. Reducers

Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe *what happened*, but don't describe how the application's state changes.

### Pure Functions

The most critical rule of reducers is that they must be **pure functions**.
- A pure function always returns the exact same output for the exact same inputs.
- A pure function produces no side effects (no API calls, no DOM manipulation, no mutating outside variables).
- **A pure function MUST NOT mutate its arguments.**

In Redux, this means you cannot modify the `state` object directly. You must return a completely new object that copies the old state and applies the necessary changes.

**Bad (Mutating State):**
```javascript
function badReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    // MUTATION! This will break React/Redux updates
    state.items.push(action.payload);
    return state;
  }
  return state;
}
```

**Good (Immutable Updates):**
```javascript
function goodReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    // Creates a new object, copies old state, creates a new array for items
    return {
      ...state,
      items: [...state.items, action.payload]
    };
  }
  return state;
}
```

### Handling Multiple Actions

A reducer typically uses a `switch` statement to handle different action types. It must always have a `default` case that returns the current state unmodified if the action type is not recognized.

```javascript
const initialState = {
  todos: [],
  filter: 'ALL'
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      // ALWAYS return current state if action is unrecognized
      return state;
  }
}
```

Notice how nested updates require careful use of the spread operator (`...`) to ensure that every level of the object being modified is copied, not just mutated. This is a common source of bugs in classic Redux.

---

## 7. Combining Reducers

As an application grows, a single reducer function becomes completely unmanageable. It will end up thousands of lines long with hundreds of `switch` cases.

Redux provides a utility called `combineReducers` that allows you to split your root reducer into multiple smaller reducers, each managing an independent part of the state tree. These smaller reducers are often called "slice reducers".

### State Shape Mapping

The `combineReducers` helper function turns an object whose values are different reducing functions into a single reducing function you can pass to `createStore`.

```javascript
import { combineReducers, createStore } from 'redux';

// Slice Reducer 1
function usersReducer(state = [], action) {
  switch(action.type) {
    case 'ADD_USER': return [...state, action.payload];
    default: return state;
  }
}

// Slice Reducer 2
function postsReducer(state = [], action) {
  switch(action.type) {
    case 'ADD_POST': return [...state, action.payload];
    default: return state;
  }
}

// Combine them
const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer
});

// The resulting state shape will be:
// {
//   users: [],
//   posts: []
// }

const store = createStore(rootReducer);
```

When an action is dispatched, `combineReducers` calls **every** slice reducer with the current action. Each slice reducer checks if it needs to respond to that action type. If not, it returns its current slice of state. `combineReducers` then gathers all the returned slices and constructs the new root state object.

---

## 8. Redux Toolkit (Important)

**This is the modern, official, and highly recommended way to write Redux logic.**

Classic Redux (as shown in sections 4-7) requires a lot of boilerplate: defining action types, action creators, massive switch statements, and carefully writing immutable update logic.

**Redux Toolkit (RTK)** was created to solve these problems. It includes utilities that simplify common use cases like store setup, creating reducers, immutable update logic, and even creating entire "slices" of state at once.

### Installation

```bash
npm install @reduxjs/toolkit react-redux
```

### configureStore

`configureStore` replaces `createStore`. It automatically sets up the Redux DevTools Extension, adds Thunk middleware by default for async logic, and turns on development checks to catch accidental mutations.

```javascript
// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  // Middleware and devtools are configured automatically!
});

export default store;
```

### createSlice

`createSlice` is the most powerful feature of RTK. It accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.

Crucially, **`createSlice` uses a library called Immer under the hood.** Immer allows you to write "mutative" code inside your reducers, which it automatically translates into safe immutable updates. You no longer need to write complex spread operations!

```javascript
// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter', // This namespace is used for the generated action types
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      // action.payload contains the passed data
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export the reducer to be used in configureStore
export default counterSlice.reducer;
```

### Building the Store with Slices

```javascript
// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});
```

With RTK, your code is shorter, easier to read, and significantly less prone to bugs caused by accidental state mutation.

---

## 9. Middleware

In Redux, middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. You can use Redux middleware for logging, crash reporting, talking to an asynchronous API, routing, and more.

Without middleware, `store.dispatch` only accepts plain JavaScript objects.

### How Middleware Works

Middleware intercepts actions before they reach the reducer. A middleware can:
- Simply pass the action forward to the next middleware (or reducer).
- Modify the action before passing it forward.
- Block the action entirely.
- Dispatch new actions.
- Perform asynchronous side effects.

### Example: A Simple Logger Middleware

Here is what a custom middleware looks like under the hood. It uses currying (functions returning functions).

```javascript
const loggerMiddleware = storeAPI => next => action => {
  console.group(action.type);
  console.log('Dispatching action:', action);
  
  // Call the next middleware in the chain, or the reducer if this is the last one
  const result = next(action); 
  
  console.log('Next state:', storeAPI.getState());
  console.groupEnd();
  
  return result;
};
```

### Redux Thunk

The most common middleware in Redux is **Redux Thunk**. It allows you to write action creators that return a *function* instead of an action object. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods `dispatch` and `getState` as parameters.

Redux Toolkit includes Redux Thunk by default when you use `configureStore`.

```javascript
// A thunk action creator
const fetchUserThunk = (userId) => {
  // Returns a function (the "thunk")
  return async (dispatch, getState) => {
    // Dispatch an action to indicate loading has started
    dispatch({ type: 'user/fetchStarted' });
    
    try {
      // Perform the async operation
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      
      // Dispatch an action with the result
      dispatch({ type: 'user/fetchSucceeded', payload: data });
    } catch (error) {
      // Dispatch an action with the error
      dispatch({ type: 'user/fetchFailed', payload: error.toString() });
    }
  };
};

// You dispatch it like a normal action
// store.dispatch(fetchUserThunk(123));
```

---

## 10. Async State Management

Managing asynchronous data (like fetching from an API) in Redux requires a specific pattern. Because reducers must be pure synchronous functions, side effects must happen *outside* the reducer, usually inside middleware like Thunks.

The standard pattern for an API request involves three distinct actions:
1. **Pending/Request**: Dispatched immediately before the request starts. Sets an `isLoading` flag to true.
2. **Fulfilled/Success**: Dispatched when the request succeeds. Carries the fetched data. Sets `isLoading` to false.
3. **Rejected/Failure**: Dispatched if the request fails. Carries an error message. Sets `isLoading` to false.

### createAsyncThunk in Redux Toolkit

Redux Toolkit abstracts this standard pattern using `createAsyncThunk`. It automatically generates the pending, fulfilled, and rejected action types, and dispatches them for you based on the promise you return.

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Create the thunk
// First argument: action type prefix
// Second argument: payload creator callback that returns a promise
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Server error!');
      }
      const data = await response.json();
      return data; // This becomes action.payload in fulfilled action
    } catch (error) {
      // Allows sending a custom error payload
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: [],
    loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // standard synchronous reducers go here
  },
  // 2. Handle the thunk lifecycle actions in extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        // Add fetched users to the state
        state.entities = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = 'failed';
        // action.payload contains what we passed to rejectWithValue
        // If we didn't use rejectWithValue, use action.error.message
        state.error = action.payload || action.error.message;
      });
  },
});

export default usersSlice.reducer;
```

This pattern makes async state management incredibly predictable and resilient.

*(Note: For enterprise-level applications, look into RTK Query, which is built on top of Redux Toolkit and completely automates data fetching, caching, and state management without having to write thunks or reducers manually).*

---

## 11. Integration with React

To use Redux inside your React components, `react-redux` provides two primary hooks: `useSelector` and `useDispatch`.

### useSelector

`useSelector` allows you to extract data from the Redux store state.

- The selector function takes the entire Redux state as an argument, reads a value, and returns that result.
- Whenever an action is dispatched, `useSelector` will force a re-render of the component if the selected data has changed.

```javascript
import React from 'react';
import { useSelector } from 'react-redux';

export const CounterComponent = () => {
  // Extracting the 'value' from the 'counter' slice of state
  const count = useSelector((state) => state.counter.value);
  
  // Extracting loading state from users
  const loadingStatus = useSelector((state) => state.users.loading);

  return (
    <div>
      <h2>Current Count: {count}</h2>
      {loadingStatus === 'pending' && <p>Loading users...</p>}
    </div>
  );
};
```

**Important Note on Memoization:** `useSelector` uses strict `===` reference equality checks by default to determine if the component should re-render. If you return a new object or array from your selector every time, it will force a re-render *every time any action is dispatched anywhere*, causing massive performance issues.

**Bad (Returns new array every time):**
```javascript
// Will re-render on every state change!
const incompleteTodos = useSelector(state => 
  state.todos.filter(todo => !todo.completed)
);
```

**Better (Select only what you need, or use Reselect):**
For derived data like filtering an array, you should use memoized selectors (like the `reselect` library, which is included in RTK as `createSelector`).

### useDispatch

`useDispatch` returns the `dispatch` function from the Redux store. You use it to dispatch actions.

```javascript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './counterSlice';
import { fetchUsers } from './usersSlice';

export const ControlsComponent = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter.value);

  return (
    <div>
      <p>Count is: {count}</p>
      
      {/* Dispatching synchronous RTK actions */}
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      
      {/* Dispatching an async thunk */}
      <button onClick={() => dispatch(fetchUsers())}>Fetch Users</button>
    </div>
  );
};
```

---

## 12. Debugging

One of Redux's greatest strengths is its debugging capabilities, specifically the **Redux DevTools Extension** (available for Chrome, Firefox, and Edge).

Because Redux maintains a single immutable state tree, and state changes are triggered by discrete action objects, it is possible to track the exact history of the application state.

### Using Redux DevTools

When you use RTK's `configureStore`, the DevTools are automatically enabled. 

Features of the DevTools:
1. **Action Log**: Shows a chronological list of every action dispatched in the app.
2. **State Inspector**: Allows you to view the exact state tree at the time a specific action was dispatched.
3. **Diff Viewer**: Shows exactly which fields in the state changed as a result of an action.
4. **Time-Travel Debugging**: You can click "Jump" on any past action to instantly revert the application UI to the state it was in at that exact moment in time. This is incredibly powerful for reproducing complex UI bugs.
5. **Action Dispatcher**: You can write JSON payloads directly in the browser extension to dispatch custom actions and see how your app responds.

---

## 13. Best Practices

### Folder Structure

There are two common ways to organize Redux code:

**1. Type-based (Classic, Not Recommended)**
Folders are organized by Redux construct: `/actions`, `/reducers`, `/constants`. This means to add a new feature, you have to edit files in 3 different folders. It scales poorly.

**2. Feature Folders / Ducks Pattern (Recommended)**
Organize code by feature. All Redux logic for a specific domain (like 'users' or 'cart') lives in a single folder, often in a single file called a "slice". This is how RTK encourages you to structure your app.

```text
src/
  app/
    store.js         <-- Store configuration
  features/
    auth/
      authSlice.js   <-- Reducer, actions, thunks for auth
      AuthModal.jsx  <-- React components related to auth
    cart/
      cartSlice.js
      CartView.jsx
```

### Avoiding Complexity

- **Keep State Flat / Normalized**: Deeply nested state (e.g., `state.users[0].posts[0].comments[0]`) makes updating state incredibly difficult and leads to performance issues. Instead, "normalize" your data like a database. Keep a flat object mapping IDs to entities. RTK provides `createEntityAdapter` to help with this.
- **Calculate Derived Data in Selectors**: Do not store derived data (like the total price of a cart) in the Redux store. Store the raw data (items in cart) and calculate the total inside a selector (`useSelector`). This prevents data desync issues.
- **Don't put everything in Redux**: Use Redux for *global* state (user auth, cached API data, global UI themes). Do not use Redux for localized state (whether a specific dropdown is open, current text in an input field). Use React's `useState` for local component UI state.

---

## 14. Common Mistakes

1. **Mutating State directly in standard reducers**: This breaks React's change detection and components will not re-render. Always use immutable updates (or use RTK which handles it via Immer).
2. **Putting Non-Serializable Data in State**: Do not put Promises, Functions, or React Element references in the Redux store. The store must only contain plain JSON-serializable data (objects, arrays, strings, numbers). Breaking this rule breaks time-travel debugging and state persistence.
3. **Overusing `useSelector`**: Grabbing the entire root state (`const state = useSelector(state => state)`) forces the component to re-render on *every single action* dispatched to the store. Always select the narrowest slice of state possible.
4. **Multiple Stores**: An application should only ever have one Redux store.
5. **Massive Component Files**: Writing all your slice logic, thunks, and React component UI in one giant file. Separate your Redux logic into `.slice.js` files, and keep your React components in `.jsx/.tsx` files.

---

## 15. Real-world Examples

### Example 1: Comprehensive Counter App (RTK)

This example demonstrates a complete RTK setup for a simple feature.

```javascript
// --- 1. features/counter/counterSlice.js ---
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1; },
    decrement: state => { state.value -= 1; },
    reset: state => { state.value = 0; },
    addAmount: (state, action) => { state.value += action.payload; }
  }
});

export const { increment, decrement, reset, addAmount } = counterSlice.actions;
export default counterSlice.reducer;

// --- 2. app/store.js ---
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

// --- 3. features/counter/Counter.jsx ---
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, addAmount } from './counterSlice';

export function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('5');

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      
      <div style={{ marginTop: '10px' }}>
        <input 
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
          type="number" 
        />
        <button onClick={() => dispatch(addAmount(Number(amount) || 0))}>
          Add Amount
        </button>
      </div>
    </div>
  );
}

// --- 4. index.js (App entry) ---
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Counter } from './features/counter/Counter';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Counter />
  </Provider>
);
```

### Example 2: API Data Management (Users Fetching)

This example demonstrates managing complex async state using `createAsyncThunk`.

```javascript
// --- 1. features/users/usersSlice.js ---
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete user thunk (optimistic update concept)
export const deleteUser = createAsyncThunk(
  'users/delete',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete');
      return userId; // Return the ID so the reducer knows what to remove
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    deleteStatus: 'idle'
  },
  reducers: {
    // We can clear the list synchronously
    clearUsers: (state) => {
      state.list = [];
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle Fetching
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      // Handle Deleting
      .addCase(deleteUser.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        // Remove the user from the list immutably (Immer handles it)
        state.list = state.list.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        // Handle error (maybe show a toast notification in a real app)
        console.error('Delete failed:', action.payload);
      });
  }
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;


// --- 2. app/store.js ---
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import counterReducer from '../features/counter/counterSlice'; // From previous example

export const store = configureStore({
  reducer: {
    users: usersReducer,
    counter: counterReducer
  }
});


// --- 3. features/users/UsersList.jsx ---
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser, clearUsers } from './usersSlice';

export function UsersList() {
  const dispatch = useDispatch();
  
  // Extract state
  const users = useSelector(state => state.users.list);
  const status = useSelector(state => state.users.status);
  const error = useSelector(state => state.users.error);
  const deleteStatus = useSelector(state => state.users.deleteStatus);

  // Fetch users on component mount if idle
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  // UI rendering based on state
  let content;

  if (status === 'loading') {
    content = <div className="spinner">Loading users...</div>;
  } else if (status === 'failed') {
    content = <div className="error-alert">Error: {error}</div>;
  } else if (status === 'succeeded') {
    if (users.length === 0) {
      content = <div>No users found.</div>;
    } else {
      content = (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map(user => (
            <li key={user.id} style={{ 
              padding: '10px', 
              margin: '5px 0', 
              background: '#f4f4f4',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <strong>{user.name}</strong> ({user.email})
              </div>
              <button 
                onClick={() => dispatch(deleteUser(user.id))}
                disabled={deleteStatus === 'loading'}
                style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      );
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>System Users</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => dispatch(fetchUsers())} style={{ marginRight: '10px' }}>
          Refresh Data
        </button>
        <button onClick={() => dispatch(clearUsers())}>
          Clear List
        </button>
      </div>

      {content}
      
      {deleteStatus === 'loading' && (
        <p style={{ color: 'orange', fontSize: '12px' }}>Deleting user in background...</p>
      )}
    </div>
  );
}

// --- 4. Main App Component Integration ---
// You would render <UsersList /> inside your <Provider> setup just like the Counter app.
```

---

## Conclusion

Redux, especially when combined with Redux Toolkit, provides a robust and predictable architecture for managing state in complex JavaScript applications. 

By enforcing a strict unidirectional data flow, requiring pure functions for state updates, and providing powerful abstraction tools like `createSlice` and `createAsyncThunk`, Redux makes it possible to build large-scale applications where state changes are easily traceable, debuggable, and maintainable over time.

Always remember the golden rule: **Do not mutate state.** Let Redux Toolkit handle the immutable updates for you, and keep your components focused on rendering data and dispatching actions.
