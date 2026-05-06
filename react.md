# Comprehensive React Development Guide: From Fundamentals to Real-World Mastery

Welcome to the comprehensive study notes on React. This guide is designed to take you from a beginner to an intermediate level, focusing on practical understanding, real-world patterns, and best practices. It covers all the essential concepts you need to build robust, scalable, and maintainable frontend applications.

---

## Table of Contents
1. [Introduction to React](#1-introduction-to-react)
2. [Setup and Environment](#2-setup-and-environment)
3. [JSX (JavaScript XML)](#3-jsx-javascript-xml)
4. [Components](#4-components)
5. [Props (Properties)](#5-props-properties)
6. [State](#6-state)
7. [Event Handling](#7-event-handling)
8. [Conditional Rendering](#8-conditional-rendering)
9. [Lists and Keys](#9-lists-and-keys)
10. [Forms](#10-forms)
11. [Hooks](#11-hooks)
12. [Component Lifecycle](#12-component-lifecycle)
13. [Styling in React](#13-styling-in-react)
14. [Routing](#14-routing)
15. [API Calls](#15-api-calls)
16. [Performance Optimization](#16-performance-optimization)
17. [Best Practices](#17-best-practices)
18. [Common Mistakes](#18-common-mistakes)
19. [Real-world Examples](#19-real-world-examples)

---

## 1. Introduction to React

### What is React?
React is a declarative, efficient, and flexible JavaScript library for building user interfaces. Created by Facebook (now Meta) in 2013, React allows developers to compose complex UIs from small and isolated pieces of code called "components."

Unlike full-fledged frameworks like Angular, React is technically just a UI library. It focuses exclusively on the "View" layer of the MVC (Model-View-Controller) architecture.

### Why Use React?
- **Component-Based Architecture**: Build encapsulated components that manage their own state, then compose them to make complex UIs.
- **Declarative Paradigm**: You describe *what* you want the UI to look like, and React takes care of *how* to update the DOM.
- **Virtual DOM**: React keeps a lightweight representation of the real DOM in memory. When state changes, it updates the Virtual DOM, compares it to the previous version (diffing), and efficiently updates only the changed parts in the real DOM (reconciliation).
- **Huge Ecosystem**: A massive community, countless libraries, and strong corporate backing.
- **Learn Once, Write Anywhere**: React patterns translate to React Native for mobile app development.

### SPA (Single Page Application) Concept
Traditional websites (Multi-Page Applications) request a new HTML document from the server for every page transition.
React is typically used to build **Single Page Applications (SPAs)**.
- In an SPA, the server sends a single HTML file (usually `index.html`).
- All routing and UI transitions are handled by JavaScript running in the browser.
- Data is fetched asynchronously via APIs, providing a much faster, app-like user experience without full page reloads.

---

## 2. Setup and Environment

To build React applications, you need a Node.js environment. React projects are usually set up using a bundler (like Webpack or Vite) and a transpiler (like Babel) to convert modern JSX and ES6+ code into browser-compatible JavaScript.

### Prerequisites
- Node.js installed (LTS version recommended)
- A package manager like `npm` (comes with Node) or `yarn` / `pnpm`.

### Creating a React App

Historically, `create-react-app` (CRA) was the standard. However, **Vite** is now the recommended, much faster alternative for standard React apps. For full-stack React, **Next.js** or **Remix** are standard.

#### Using Vite (Recommended for standard SPAs)
```bash
# Create a new Vite + React project
npm create vite@latest my-react-app -- --template react

# Move into the directory
cd my-react-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

#### Using Next.js (For SEO-friendly / Full-stack apps)
```bash
npx create-next-app@latest my-next-app
```

### Project Structure Breakdown (Vite)
A typical Vite + React project structure looks like this:
- `/node_modules/`: Installed third-party packages.
- `/public/`: Static assets that don't need to go through the bundler (e.g., `favicon.ico`).
- `/src/`: Where all your React code lives.
  - `main.jsx` / `main.tsx`: The entry point of your app. This renders the root component into the DOM.
  - `App.jsx` / `App.tsx`: The root component of your application.
  - `index.css`: Global styles.
- `index.html`: The single HTML file that hosts your app. In Vite, it's located in the root directory.
- `package.json`: Project metadata, scripts, and dependencies.
- `vite.config.js`: Configuration for the Vite bundler.

---

## 3. JSX (JavaScript XML)

### What is JSX?
JSX is a syntax extension for JavaScript. It allows you to write HTML-like markup directly inside your JavaScript files. While it looks like HTML, it is fundamentally JavaScript.

Under the hood, JSX is compiled by tools like Babel into standard JavaScript objects (`React.createElement()` calls).

### Syntax Rules
JSX is stricter than HTML. You must follow these rules:

1. **Return a single root element**: A component can only return one parent element. If you have multiple elements, wrap them in a `div` or a React Fragment (`<> ... </>`).
   ```jsx
   // WRONG
   function BadComponent() {
     return (
       <h1>Title</h1>
       <p>Content</p>
     );
   }

   // CORRECT
   function GoodComponent() {
     return (
       <>
         <h1>Title</h1>
         <p>Content</p>
       </>
     );
   }
   ```

2. **Close all tags**: Every tag must be closed, including self-closing tags like `<img>` or `<input>`.
   ```jsx
   // WRONG
   <img src="logo.png">
   <input type="text">

   // CORRECT
   <img src="logo.png" />
   <input type="text" />
   ```

3. **camelCase for Attributes**: Since JSX is JavaScript, HTML attributes must be written in camelCase.
   - `class` becomes `className` (because `class` is a reserved JS keyword).
   - `for` becomes `htmlFor`.
   - `onclick` becomes `onClick`.
   - `tabindex` becomes `tabIndex`.

### Embedding Expressions
You can embed any valid JavaScript expression inside JSX by wrapping it in curly braces `{}`.

```jsx
function Welcome() {
  const name = "Alice";
  const user = { firstName: "Bob", lastName: "Smith" };
  
  // A function returning a string
  const formatName = (u) => `${u.firstName} ${u.lastName}`;

  return (
    <div className="welcome-container">
      <h1>Hello, {name}!</h1>
      <p>Welcome back, {formatName(user)}.</p>
      <p>2 + 2 = {2 + 2}</p>
      
      {/* You can also use expressions for attributes */}
      <img src={user.avatarUrl} alt={`${name}'s avatar`} />
    </div>
  );
}
```
*Note: You cannot put statements (like `if` statements or `for` loops) directly inside JSX curly braces. You must use expressions (like ternary operators or array `.map()`).*

---

## 4. Components

Components are the fundamental building blocks of React applications. They let you split the UI into independent, reusable pieces.

### Functional Components
Modern React is built almost entirely using functional components. A functional component is simply a JavaScript function that returns JSX.

```jsx
// A simple functional component
function Greeting() {
  return <h1>Hello from a component!</h1>;
}

// Arrow function syntax
const Button = () => {
  return <button className="btn">Click Me</button>;
};
```

### Component Structure
A component file typically contains:
1. **Imports**: Bringing in other components, CSS, hooks, or assets.
2. **Logic**: JavaScript code, hooks, state initialization, and helper functions before the `return` statement.
3. **Return**: The JSX that defines what the component will render.
4. **Export**: Making the component available to be used in other files.

```jsx
import React, { useState } from 'react';
import './Card.css'; // 1. Imports

function Card() {
  // 2. Logic and State
  const [isActive, setIsActive] = useState(false);
  const toggleActive = () => setIsActive(!isActive);

  // 3. Return JSX
  return (
    <div className={`card ${isActive ? 'active' : ''}`} onClick={toggleActive}>
      <h2>Interactive Card</h2>
      <p>Click to toggle active state.</p>
    </div>
  );
}

export default Card; // 4. Export
```

### Reusability and Composition
Components can render other components. This allows you to compose complex UIs from simple blocks.

```jsx
// Building blocks
const Header = () => <header><h1>My App</h1></header>;
const Sidebar = () => <nav>Links go here</nav>;
const Content = () => <main>Main application content</main>;

// Composition
function Dashboard() {
  return (
    <div className="layout">
      <Header />
      <div className="main-area">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}
```

*Historical Note: Class Components*
Before React 16.8 (Hooks), class components were required if you needed state or lifecycle methods. Today, they are considered legacy, though you may still see them in older codebases.
```jsx
// Legacy Class Component Example
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

---

## 5. Props (Properties)

Components often need data to be dynamic. `props` (short for properties) allow you to pass data from a parent component down to a child component.

### Passing Data
You pass props exactly like you pass attributes to an HTML tag.

```jsx
function App() {
  return (
    <div>
      {/* Passing strings, numbers, and booleans */}
      <UserProfile 
        name="John Doe" 
        age={30} 
        isPremium={true} 
      />
    </div>
  );
}
```

### Accessing Props
Props are passed to the child component as an object (usually named `props`).

```jsx
function UserProfile(props) {
  return (
    <div className="profile">
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Status: {props.isPremium ? "Premium Member" : "Free Tier"}</p>
    </div>
  );
}
```

### Destructuring Props
It is highly common and recommended to destructure the props object directly in the function parameters for cleaner code.

```jsx
function UserProfile({ name, age, isPremium }) {
  return (
    <div className="profile">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Status: {isPremium ? "Premium Member" : "Free Tier"}</p>
    </div>
  );
}
```

### The `children` Prop
React components accept a special prop called `children`. It represents whatever content is placed *between* the opening and closing tags of the component.

```jsx
function Card({ title, children }) {
  return (
    <div className="card-wrapper">
      <div className="card-header">{title}</div>
      <div className="card-body">
        {children} {/* Renders the nested content */}
      </div>
    </div>
  );
}

// Usage
function App() {
  return (
    <Card title="User Information">
      {/* This content becomes the 'children' prop */}
      <img src="avatar.jpg" alt="User" />
      <p>Email: user@example.com</p>
    </Card>
  );
}
```

### Props are Read-Only
**Crucial Rule**: A component must never modify its own props. Whether you declare a component as a function or a class, it must act like a pure function with respect to its props.

### Props vs. State
- **Props**: Data passed *into* the component from outside (its parent). Props are immutable from the perspective of the receiving component.
- **State**: Data managed *inside* the component. State is mutable and is used to keep track of information that changes over time (like user input or API data).

---

## 6. State

State allows React components to change their output over time in response to user actions, network responses, and anything else. When state changes, React automatically re-renders the component to reflect the new state.

### The `useState` Hook
To add state to a functional component, we use the `useState` hook.

```jsx
import { useState } from 'react';

function Counter() {
  // useState returns an array with two items:
  // 1. The current state value (count)
  // 2. A function to update that state (setCount)
  const [count, setCount] = useState(0); // 0 is the initial state

  return (
    <div>
      <p>You clicked {count} times</p>
      {/* Calling setCount updates the state and triggers a re-render */}
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### Updating State is Asynchronous
State updates in React are batched and asynchronous. If you read the state immediately after calling the setter function, you will see the old value.

```jsx
const [score, setScore] = useState(0);

const handleScore = () => {
  setScore(score + 1);
  console.log(score); // This will log the OLD score, not the updated one!
};
```

### Functional State Updates
If your new state depends on the previous state, you should use a functional update. You pass a callback function to the state setter. The callback receives the most up-to-date previous state as an argument.

```jsx
// Safe update when relying on previous state
const incrementTwice = () => {
  // If we just did setCount(count + 1) twice, it would only increment by 1
  // because both calls would use the same 'count' value from the current render.
  
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1);
  // This correctly increments by 2
};
```

### State with Arrays and Objects (Immutability)
State in React should be treated as **immutable**. You should never directly modify an object or array stored in state. Instead, you must create a *new* copy with the desired changes and pass it to the setter function.

```jsx
// Working with Objects
const [user, setUser] = useState({ name: 'Alice', age: 25 });

const updateAge = () => {
  // WRONG: user.age = 26; setUser(user);
  
  // CORRECT: Spread the old object, then overwrite the specific property
  setUser({ ...user, age: 26 });
};

// Working with Arrays
const [items, setItems] = useState(['Apple', 'Banana']);

const addItem = (newItem) => {
  // WRONG: items.push(newItem); setItems(items);
  
  // CORRECT: Create a new array with the old items and the new item
  setItems([...items, newItem]);
};

const removeItem = (itemToRemove) => {
  // CORRECT: Use filter to create a new array without the item
  setItems(items.filter(item => item !== itemToRemove));
};
```

---

## 7. Event Handling

Handling events with React elements is very similar to handling events on DOM elements. There are some syntax differences:
- React events are named using camelCase, rather than lowercase (e.g., `onClick` instead of `onclick`).
- With JSX you pass a function as the event handler, rather than a string.

### Basic Event Handling
```jsx
function SubmitButton() {
  function handleClick() {
    alert('Button was clicked!');
  }

  return (
    // Pass the function reference, don't call it! 
    // i.e., onClick={handleClick}, NOT onClick={handleClick()}
    <button onClick={handleClick}>
      Submit
    </button>
  );
}
```

### The Synthetic Event Object
React wraps the native browser event in a "SyntheticEvent" to ensure cross-browser compatibility. Your event handler will receive this synthetic event object as its first argument.

```jsx
function Form() {
  function handleSubmit(e) {
    // Prevent the default browser behavior (page reload on form submit)
    e.preventDefault();
    console.log('Form submitted!');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit Form</button>
    </form>
  );
}
```

### Passing Arguments to Event Handlers
If you need to pass an argument to an event handler, you must use an inline arrow function, or a curried function.

```jsx
function List() {
  const deleteItem = (id) => {
    console.log(`Deleting item ${id}`);
  };

  return (
    <ul>
      <li>
        Item 1 
        {/* We use an inline arrow function to pass the ID */}
        <button onClick={() => deleteItem(1)}>Delete</button>
      </li>
      <li>
        Item 2 
        <button onClick={() => deleteItem(2)}>Delete</button>
      </li>
    </ul>
  );
}
```

---

## 8. Conditional Rendering

In React, you can create distinct components that encapsulate behavior you need. Then, you can render only some of them, depending on the state of your application.

### If/Else Statements
You can use standard JavaScript `if/else` logic outside of the JSX `return` statement.

```jsx
function UserGreeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign in.</h1>;
}
```

### Ternary Operator (`condition ? true : false`)
The ternary operator is the most common way to conditionally render elements inline inside JSX.

```jsx
function AuthPanel({ isAuth }) {
  return (
    <div className="panel">
      {isAuth ? (
        <button>Logout</button>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
}
```

### Logical AND (`&&`)
If you want to render something *only* if a condition is true, and render nothing otherwise, use the logical AND operator.

```jsx
function Notifications({ messages }) {
  return (
    <div>
      <h2>Dashboard</h2>
      {/* If messages.length > 0 is true, the alert will render */}
      {messages.length > 0 && (
        <div className="alert">You have {messages.length} unread messages.</div>
      )}
    </div>
  );
}
```
*Warning: Be careful with numbers. `0 && <Component />` will render `0` to the DOM. Always evaluate to a boolean, e.g., `messages.length > 0 && ...`*

### Preventing Rendering (`return null`)
If you want a component to hide itself, you can simply return `null`.

```jsx
function WarningBanner({ warn }) {
  if (!warn) {
    return null; // The component renders nothing
  }

  return <div className="warning">Warning!</div>;
}
```

---

## 9. Lists and Keys

Rendering lists of data is a core task in web development. In React, we use the JavaScript `map()` array method to transform arrays of data into arrays of React elements.

### Rendering Lists
```jsx
function NumberList({ numbers }) {
  // Transform the array of numbers into an array of <li> elements
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
  );
  
  return <ul>{listItems}</ul>;
}

// Inline approach (more common)
function TechStack() {
  const skills = ['React', 'TypeScript', 'Node.js'];
  
  return (
    <ul>
      {skills.map(skill => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  );
}
```

### The Importance of Keys
A "key" is a special string attribute you must include when creating lists of elements. Keys help React identify which items have changed, been added, or been removed. They are crucial for performance and state management.

#### Rules for Keys:
1. **Keys must be unique among siblings**: They don't need to be globally unique, just unique within that specific array.
2. **Keys must be stable**: Do not use randomly generated keys like `Math.random()`. They will change on every render, destroying component state and degrading performance.
3. **Avoid using array index as a key (if possible)**: Using the index (e.g., `map((item, index) => <div key={index}>)`) is an anti-pattern if the order of items might change (e.g., sorting, adding/removing items). It can lead to severe bugs where state is mixed up between elements. Use unique IDs from your data (like database IDs) instead.

```jsx
// Best Practice: Using unique IDs from data
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

function UserList() {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## 10. Forms

HTML form elements work slightly differently from other DOM elements in React, because form elements naturally keep some internal state.

### Controlled Components
In React, mutable state is typically kept in the state property of components, and only updated with state setter functions. 

We can combine the two by making the React state the "single source of truth". An input form element whose value is controlled by React is called a "controlled component".

```jsx
import { useState } from 'react';

function SimpleForm() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    // Update state on every keystroke
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`A name was submitted: ${inputValue}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        {/* value is tied to state, onChange updates state */}
        <input type="text" value={inputValue} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

### Handling Multiple Inputs
When you have multiple controlled inputs, you can assign a `name` attribute to each element and let the handler function choose what to do based on `e.target.name`.

```jsx
function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dynamically update the specific field in the state object
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <form>
      <input 
        name="username" 
        value={formData.username} 
        onChange={handleChange} 
        placeholder="Username" 
      />
      <input 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="Email" 
      />
    </form>
  );
}
```

### Uncontrolled Components
Sometimes, building controlled components becomes tedious. The alternative is **uncontrolled components**, where form data is handled by the DOM itself. To write an uncontrolled component, instead of writing an event handler for every state update, you use a `ref` to get form values from the DOM.

```jsx
import { useRef } from 'react';

function UncontrolledForm() {
  // Create a reference
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Access the value directly from the DOM node
    alert(`Submitted: ${inputRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" ref={inputRef} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```
*Note: In modern React development, controlled components are preferred as they allow for immediate validation and conditional UI updates based on input.*

---

## 11. Hooks

Hooks were introduced in React 16.8. They allow you to use state and other React features without writing a class.

### Rules of Hooks
1. **Only call Hooks at the top level**: Don't call Hooks inside loops, conditions, or nested functions. This ensures Hooks are called in the same order each time a component renders.
2. **Only call Hooks from React function components** or from custom Hooks. Don't call them from regular JavaScript functions.

### `useState`
(Already covered in depth in the [State](#6-state) section).

### `useEffect`
The `useEffect` Hook lets you perform side effects in function components. Side effects include data fetching, setting up subscriptions, or manually changing the DOM.

```jsx
import { useState, useEffect } from 'react';

function DocumentTitleUpdater() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  }); // Runs after EVERY render

  return (
    <button onClick={() => setCount(count + 1)}>
      Click to update title
    </button>
  );
}
```

#### The Dependency Array
You can control *when* a `useEffect` runs by providing a dependency array as the second argument.
- `useEffect(() => {...})`: No array. Runs after every render.
- `useEffect(() => {...}, [])`: Empty array. Runs **only once** after the initial render (similar to `componentDidMount`).
- `useEffect(() => {...}, [prop, state])`: Array with values. Runs only if `prop` or `state` has changed between renders.

#### Cleanup Function
If your effect creates a subscription or a timer, you must clean it up to prevent memory leaks. You do this by returning a function from your effect.

```jsx
useEffect(() => {
  const timer = setInterval(() => console.log('Tick'), 1000);

  // Cleanup function: runs before the component unmounts,
  // or before the effect runs again.
  return () => {
    clearInterval(timer);
  };
}, []); // Empty array means run once, cleanup on unmount
```

### `useContext`
Context provides a way to pass data through the component tree without having to pass props down manually at every level ("prop drilling").

```jsx
import { createContext, useContext } from 'react';

// 1. Create the Context
const ThemeContext = createContext('light');

function App() {
  // 2. Provide the Context value
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <div><ThemedButton /></div>;
}

function ThemedButton() {
  // 3. Consume the Context using useContext
  const theme = useContext(ThemeContext);
  return <button className={theme}>I am styled by theme: {theme}</button>;
}
```

### `useRef`
`useRef` returns a mutable ref object. It is used for two main purposes:
1. **Accessing DOM elements**: As seen in the Uncontrolled Components section.
2. **Storing mutable values that do NOT cause re-renders**: Unlike state, updating a `ref.current` value does not trigger a component re-render.

```jsx
function Timer() {
  const [count, setCount] = useState(0);
  const timerId = useRef(null);

  const start = () => {
    timerId.current = setInterval(() => setCount(c => c + 1), 1000);
  };

  const stop = () => {
    clearInterval(timerId.current);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

### Custom Hooks
A custom Hook is a JavaScript function whose name starts with "use" and that may call other Hooks. It is a mechanism to reuse stateful logic.

```jsx
// A custom hook to track window width
import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

// Usage
function ResponsiveComponent() {
  const width = useWindowWidth();
  return <div>Window width is: {width}px</div>;
}
```

---

## 12. Component Lifecycle

While functional components use hooks instead of lifecycle methods, understanding the conceptual lifecycle of a component is crucial.

1. **Mounting**: The component is inserted into the DOM.
   - Initial state is created.
   - The component renders.
   - `useEffect(..., [])` runs.
2. **Updating**: The component re-renders due to a change in props or state.
   - The component renders.
   - `useEffect(..., [deps])` runs if dependencies changed.
3. **Unmounting**: The component is removed from the DOM.
   - The cleanup function returned by `useEffect` runs.

```jsx
function LifecycleDemo({ data }) {
  useEffect(() => {
    console.log("1. Component Mounted");
    
    return () => {
      console.log("3. Component Will Unmount");
    };
  }, []); // Run once on mount

  useEffect(() => {
    console.log("2. Component Updated (data changed)");
  }, [data]); // Run on mount and whenever 'data' changes

  return <div>Lifecycle Example</div>;
}
```

---

## 13. Styling in React

There are several ways to style React components.

### 1. Plain CSS (Global)
You can import a `.css` file directly. This applies styles globally.
```jsx
import './App.css';

function App() {
  return <div className="app-container">Hello</div>;
}
```
*Drawback: Class names can clash across different components.*

### 2. Inline Styles
Styles are passed as an object using camelCased properties.
```jsx
function Banner() {
  const styles = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px'
  };

  // Alternatively, pass the object directly
  return <div style={styles}>Alert!</div>;
}
```
*Drawback: No pseudo-classes (like `:hover`), verbose syntax.*

### 3. CSS Modules
CSS Modules locally scope CSS classes to avoid conflicts. You name your file `[name].module.css`.

```css
/* Button.module.css */
.btn {
  background-color: red;
}
```
```jsx
// Button.jsx
import styles from './Button.module.css';

function Button() {
  // React hashes the class name (e.g., Button_btn__xyz)
  return <button className={styles.btn}>Click</button>;
}
```

### 4. Styled Components / Emotion (CSS-in-JS)
Using tagged template literals to write CSS directly inside JS. Highly popular for component libraries.
```jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${props => props.primary ? "blue" : "gray"};
  color: white;
  padding: 10px;
  border-radius: 4px;
  &:hover {
    opacity: 0.8;
  }
`;

function App() {
  return <StyledButton primary>Click Me</StyledButton>;
}
```

### 5. Utility-First (Tailwind CSS)
Applying utility classes directly in JSX. Currently the industry favorite for rapid styling.
```jsx
function Card() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <p className="text-gray-700 text-base">Tailwind Card</p>
    </div>
  );
}
```

---

## 14. Routing (React Router)

Since React builds Single Page Applications, we need a way to navigate between different "pages" without triggering a browser reload. **React Router** is the standard library for this.

### Basic Setup (React Router v6)
```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() { return <h2>Home Page</h2>; }
function About() { return <h2>About Page</h2>; }

function App() {
  return (
    // Wrap the app in BrowserRouter
    <BrowserRouter>
      <nav>
        {/* Use Link instead of <a> tags to prevent full page reloads */}
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      {/* Define route definitions */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### URL Parameters and Navigation
You can pass dynamic parameters in URLs and access them via hooks.

```jsx
import { useParams, useNavigate } from 'react-router-dom';

// Route definition: <Route path="/users/:id" element={<UserProfile />} />

function UserProfile() {
  const { id } = useParams(); // Retrieves the :id from the URL
  const navigate = useNavigate();

  const goHome = () => {
    // Programmatic navigation
    navigate('/');
  };

  return (
    <div>
      <h2>Viewing profile for user {id}</h2>
      <button onClick={goHome}>Back to Home</button>
    </div>
  );
}
```

---

## 15. API Calls

React has no built-in HTTP client. You use standard JavaScript APIs (`fetch`) or libraries like `axios`. API calls should be performed inside `useEffect` (to run after render) or inside event handlers (like form submission).

### Fetching Data on Mount
A standard pattern involves state for the data, a loading flag, and an error object.

```jsx
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function inside the effect
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers(); // Call the async function
  }, []); // Empty dependency array -> runs once on mount

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

*Modern Best Practice: For complex applications, use data fetching libraries like **React Query** (TanStack Query) or **SWR**. They handle caching, background updates, deduplication, and loading states automatically.*

---

## 16. Performance Optimization

React is fast by default, but complex applications can experience performance bottlenecks, usually due to unnecessary re-renders.

### When does React Re-render?
A component re-renders when:
1. Its state changes.
2. Its props change.
3. Its parent component re-renders.

### `React.memo` (Memoizing Components)
If a component renders the exact same result given the exact same props, you can wrap it in `React.memo`. This prevents the component from re-rendering when its parent re-renders, *unless* its own props have changed.

```jsx
import React from 'react';

const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  console.log("Rendered ExpensiveComponent");
  return <div>{data}</div>;
});
```

### `useMemo` (Memoizing Values)
If you have an expensive calculation inside a component, use `useMemo` to cache the result so it isn't recalculated on every render.

```jsx
import { useMemo } from 'react';

function DataProcessor({ items, filter }) {
  // filterItems will only run when 'items' or 'filter' change
  const filteredData = useMemo(() => {
    console.log("Calculating...");
    return items.filter(item => item.includes(filter));
  }, [items, filter]);

  return <div>Result count: {filteredData.length}</div>;
}
```

### `useCallback` (Memoizing Functions)
When passing callback functions to child components (especially components wrapped in `React.memo`), use `useCallback`. This prevents the function from being recreated on every parent render, which would break the child's `React.memo` optimization.

```jsx
import { useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  // This function reference remains the same across renders
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []); // Dependencies array

  return <ChildComponent onClick={handleClick} />;
}
```

---

## 17. Best Practices

1. **Keep Components Small**: Single Responsibility Principle. A component should ideally do one thing. If it grows too large, break it into smaller sub-components.
2. **Lift State Up**: If multiple components need access to the same state, move that state to their closest common ancestor.
3. **Use Meaningful Names**: Components should be PascalCase (`UserProfile`), while helper functions and instances should be camelCase (`handleLogin`).
4. **Avoid Deep Prop Drilling**: If you are passing props through 5 layers of components that don't use the data, consider using Context API or state management tools like Redux or Zustand.
5. **Absolute Imports**: Configure your bundler to use absolute imports (`import Button from '@/components/Button'`) rather than relative hell (`import Button from '../../../../components/Button'`).
6. **Destructure Props**: It makes it immediately obvious what a component requires.

---

## 18. Common Mistakes

- **Mutating State Directly**: 
  - *Wrong*: `state.count = 1;` 
  - *Right*: `setCount(1);`
- **Missing Dependencies in `useEffect`**: If your effect uses a variable from the component scope, it *must* be in the dependency array. Failing to do so causes stale closures (the effect uses an old value of the variable).
- **Index as Key**: Using map index as a key in a list that can be sorted, filtered, or altered. This causes unpredictable UI bugs.
- **Overusing State**: Don't put data in state if it can be derived from existing state.
  - *Wrong*: `const [firstName, setFirst] = useState('John'); const [fullName, setFull] = useState('John Doe');`
  - *Right*: `const [firstName, setFirst] = useState('John'); const fullName = firstName + ' Doe';`
- **Infinite Loops in useEffect**: Updating a state variable inside a `useEffect` that triggers that same `useEffect` to run again.

---

## 19. Real-world Examples

### Example 1: Full Todo Application
This example brings together State, Event Handling, Lists, Keys, and Forms.

```jsx
import React, { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Add a new todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: crypto.randomUUID(), // Generate a unique ID
      text: inputValue,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputValue(''); // Clear input
  };

  // Toggle completion status
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>React Todo List</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Add a new task..."
          style={{ padding: '8px', width: '70%' }}
        />
        <button type="submit" style={{ padding: '8px' }}>Add</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid #ccc' }}>
            <span 
              onClick={() => toggleComplete(todo.id)}
              style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && <p>No tasks yet. Add one above!</p>}
    </div>
  );
}

export default TodoApp;
```

### Example 2: API Search Interface
This example demonstrates `useEffect`, debouncing (conceptually), API calls, and conditional rendering.

```jsx
import React, { useState, useEffect } from 'react';

function UserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If the query is empty, clear results and don't fetch
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Implementing a simple delay/debounce
    const delayTimer = setTimeout(async () => {
      setLoading(true);
      try {
        // We'll use JSONPlaceholder for a mock API
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?name_like=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    }, 500); // Wait 500ms after user stops typing to fetch

    // Cleanup function clears the timer if the query changes before 500ms
    return () => clearTimeout(delayTimer);
  }, [query]); // Re-run effect whenever query changes

  return (
    <div>
      <h2>User Directory Search</h2>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..." 
      />

      {loading && <p>Searching...</p>}
      
      {!loading && results.length === 0 && query.trim() !== '' && (
        <p>No users found matching "{query}"</p>
      )}

      <ul>
        {results.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearch;
```

---
*End of React Study Guide. By mastering these concepts, you are well-equipped to build dynamic, scalable frontend applications.*
