# Vue.js Comprehensive Study Guide: Beginner to Intermediate

Welcome to the definitive study guide for Vue.js. This document is designed to take you from a fundamental understanding of what Vue is, through the core concepts of the framework, all the way to intermediate patterns involving routing, state management, and real-world application structure. 

This guide primarily focuses on **Vue 3**, the current major version of the framework, while acknowledging the two primary ways of writing Vue components: the **Options API** (traditional, highly structured) and the **Composition API** (modern, flexible, often used with `<script setup>`).

---

## Table of Contents

1. [Introduction to Vue.js](#1-introduction-to-vuejs)
2. [Setup and Environment](#2-setup-and-environment)
3. [Vue Instance and App Structure](#3-vue-instance-and-app-structure)
4. [Templates and Syntax](#4-templates-and-syntax)
5. [Components](#5-components)
6. [Data and Reactivity](#6-data-and-reactivity)
7. [Methods and Computed Properties](#7-methods-and-computed-properties)
8. [Watchers](#8-watchers)
9. [Event Handling](#9-event-handling)
10. [Forms and v-model](#10-forms-and-v-model)
11. [Lifecycle Hooks](#11-lifecycle-hooks)
12. [Routing (Vue Router)](#12-routing-vue-router-basics)
13. [State Management (Vuex & Pinia)](#13-state-management-intro-to-vuex)
14. [API Calls](#14-api-calls)
15. [Styling in Vue](#15-styling-in-vue)
16. [Best Practices](#16-best-practices)
17. [Common Mistakes](#17-common-mistakes)
18. [Real-world Examples](#18-real-world-examples)

---

## 1. Introduction to Vue.js

### What is Vue.js?
Vue.js (pronounced /vjuː/, like **view**) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.

Vue is famously known as the **"Progressive JavaScript Framework"**. This means that Vue is designed from the ground up to be incrementally adoptable. 
- You can use Vue to enhance a single HTML element in a legacy application without build tools.
- You can use Vue to build an entire Single Page Application (SPA) with routing, state management, and build tools.

### Why use Vue?
1. **Approachable:** If you know standard HTML, CSS, and JavaScript, you can start building Vue applications immediately. The learning curve is notoriously gentle.
2. **Versatile:** An incrementally adoptable ecosystem that scales between a library and a full-featured framework.
3. **Performant:** Vue 3 features a highly optimized reactivity system built on ES6 Proxies and a very lightweight Virtual DOM implementation.
4. **Single-File Components (SFCs):** Vue allows you to author components in a cohesive `.vue` file containing the logic (JavaScript/TypeScript), template (HTML), and styling (CSS).

### Comparison with React and Angular (Basic)

| Feature | Vue.js | React | Angular |
| :--- | :--- | :--- | :--- |
| **Type** | Progressive Framework | UI Library | Full MVC Framework |
| **Learning Curve** | Gentle / Easy | Moderate | Steep |
| **Architecture** | Component-based (SFCs) | Component-based (JSX) | Component-based (TypeScript) |
| **Reactivity** | Proxies (Mutable state) | Immutable state (useState) | RxJS / Zone.js (Signals in newer versions) |
| **Corporate Backing** | Community / Open Source | Meta (Facebook) | Google |

**Summary:** 
- Choose **React** for massive ecosystems, JSX preferences, or React Native.
- Choose **Angular** for rigid, enterprise-scale standards out of the box.
- Choose **Vue** for the best balance of structure, developer experience (DX), and ease of adoption.

---

## 2. Setup and Environment

There are multiple ways to set up a Vue project, depending on your needs.

### 1. The CDN Approach (No Build Step)
For simple pages or adding Vue to an existing server-rendered app (like Django or Laravel), you can include Vue via a CDN script tag.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">{{ message }}</div>

  <script>
    const { createApp, ref } = Vue

    createApp({
      setup() {
        const message = ref('Hello Vue!')
        return { message }
      }
    }).mount('#app')
  </script>
</body>
</html>
```

### 2. Creating a Project with Vite (Recommended)
For building Single Page Applications (SPAs), the recommended build tool is **Vite**. It is incredibly fast and provides Hot Module Replacement (HMR).

To create a new Vue project with Vite, run the following command in your terminal:

```bash
npm create vue@latest
```

This command will prompt you with several optional features:
- TypeScript support?
- JSX support?
- Vue Router for Single Page Application routing?
- Pinia for state management?
- Vitest for Unit Testing?
- ESLint for code quality?

Once created, navigate into the directory, install dependencies, and start the dev server:

```bash
cd my-vue-app
npm install
npm run dev
```

### Typical Folder Structure (Vite/CLI)

```text
my-vue-app/
├── node_modules/       # Dependencies
├── public/             # Static assets (favicon, etc.)
├── src/                # Your application code
│   ├── assets/         # Images, fonts, global CSS
│   ├── components/     # Reusable Vue components
│   ├── App.vue         # Root component
│   └── main.js         # Entry point (initializes Vue app)
├── index.html          # Main HTML file serving the app
├── package.json        # Project metadata and scripts
└── vite.config.js      # Vite configuration
```

---

## 3. Vue Instance and App Structure

Every Vue application starts by creating a new **application instance** with the `createApp` function.

### The Entry Point (`main.js` or `main.ts`)

```javascript
import { createApp } from 'vue'
import App from './App.vue'

// 1. Create the app instance
const app = createApp(App)

// 2. Register global plugins (Router, Store, etc.)
// app.use(router)

// 3. Mount the app to the DOM
app.mount('#app')
```

- `createApp(App)`: Creates a Vue application instance. `App` is the root component.
- `.mount('#app')`: Connects the Vue application to an actual HTML element in your `index.html` (usually `<div id="app"></div>`).

### Single-File Components (SFCs)

Vue utilizes a custom file format called `.vue`. An SFC cleanly separates your component into three sections:

```vue
<script setup>
// JavaScript / TypeScript logic goes here
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <!-- HTML markup goes here -->
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
/* CSS styling goes here */
button {
  font-weight: bold;
}
</style>
```

- `<script>`: Contains component logic. Using `<script setup>` provides syntactic sugar that makes the Composition API much cleaner.
- `<template>`: Contains the HTML structure.
- `<style scoped>`: Contains CSS. The `scoped` attribute ensures these styles only apply to this specific component, preventing global CSS leaks.

---

## 4. Templates and Syntax

Vue uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the underlying component instance's data.

### Text Interpolation

The most basic form of data binding is text interpolation using "Mustache" syntax (double curly braces):

```html
<span>Message: {{ msg }}</span>
```
Whenever the `msg` property changes, the HTML will update automatically. You can also use full JavaScript expressions inside mustaches:

```html
<p>{{ number + 1 }}</p>
<p>{{ ok ? 'YES' : 'NO' }}</p>
<p>{{ message.split('').reverse().join('') }}</p>
```

### Directives

Directives are special attributes with a `v-` prefix. They apply reactive behavior to the DOM.

#### `v-bind` (Binding Attributes)
Mustaches cannot be used inside HTML attributes. Instead, use `v-bind`:

```html
<div v-bind:id="dynamicId"></div>
<img v-bind:src="imageUrl" alt="Dynamic Image">

<!-- Shorthand (Highly Recommended) -->
<div :id="dynamicId"></div>
<img :src="imageUrl">
```

#### `v-if`, `v-else-if`, `v-else` (Conditional Rendering)
Used to conditionally render a block of elements. The block will only be rendered if the directive's expression returns a truthy value.

```vue
<template>
  <div v-if="type === 'A'">Type A</div>
  <div v-else-if="type === 'B'">Type B</div>
  <div v-else>Not A or B</div>
</template>
```

#### `v-show`
Similar to `v-if`, but instead of adding/removing the element from the DOM, `v-show` merely toggles the CSS `display` property (`display: none`).

```html
<h1 v-show="isVisible">Hello!</h1>
```
*Tip:* Use `v-if` if the condition rarely changes (cheaper initial load). Use `v-show` if the element is toggled very frequently (cheaper to toggle).

#### `v-for` (List Rendering)
Used to render a list of items based on an array or object. It requires a specific syntax `item in items`.

```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' }
])
</script>
```
**CRITICAL BEST PRACTICE:** Always provide a unique `:key` attribute when using `v-for`. This helps Vue's Virtual DOM track elements efficiently during updates.

---

## 5. Components

Components allow us to split the UI into independent, reusable pieces.

### Creating and Registering Components

**ChildComponent.vue**
```vue
<template>
  <div class="child">
    <h2>I am a child component!</h2>
  </div>
</template>

<style scoped>
.child { border: 1px solid blue; padding: 10px; }
</style>
```

**ParentComponent.vue**
```vue
<script setup>
// Importing automatically registers the component in <script setup>
import ChildComponent from './ChildComponent.vue'
</script>

<template>
  <div>
    <h1>Parent</h1>
    <!-- Using the component -->
    <ChildComponent />
  </div>
</template>
```

### Props (Passing Data down to children)

Props are custom attributes you can register on a component. When a value is passed to a prop attribute, it becomes a property on that component instance.

**Child (Receiving Props)**
```vue
<script setup>
const props = defineProps({
  title: String,
  likes: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <h4>{{ title }}</h4>
  <p>Likes: {{ likes }}</p>
</template>
```

**Parent (Passing Props)**
```vue
<template>
  <ChildComponent title="My First Post" :likes="42" />
  <ChildComponent title="Another Post" /> <!-- likes defaults to 0 -->
</template>
```

### Custom Events (Emitting Data up to parents)

Data in Vue flows one way: downwards (Parent -> Child via props). If a child needs to communicate back to the parent, it must emit an event.

**Child Component**
```vue
<script setup>
const emit = defineEmits(['update'])

function notifyParent() {
  // Emit the 'update' event with a payload
  emit('update', 'New data from child')
}
</script>

<template>
  <button @click="notifyParent">Send to Parent</button>
</template>
```

**Parent Component**
```vue
<script setup>
import ChildComponent from './ChildComponent.vue'

function handleChildUpdate(payload) {
  console.log("Child said:", payload)
}
</script>

<template>
  <ChildComponent @update="handleChildUpdate" />
</template>
```

### Slots (Content Distribution)

Slots allow you to pass HTML content into a component, rather than just data via props.

**CardComponent.vue (Child)**
```vue
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header">Default Header</slot>
    </div>
    <div class="card-body">
      <!-- Default slot -->
      <slot>Default body content</slot>
    </div>
  </div>
</template>
```

**App.vue (Parent)**
```vue
<template>
  <CardComponent>
    <template #header>
      <h2>Special Offer!</h2>
    </template>
    
    <!-- This goes into the default slot -->
    <p>Get 50% off today only.</p>
  </CardComponent>
</template>
```

---

## 6. Data and Reactivity

Vue's core feature is its unobtrusive reactivity system. When state changes, the UI updates automatically.

In Vue 3, using the Composition API, we declare reactive state using `ref` and `reactive`.

### `ref` (For Primitives and Objects)
`ref` takes an inner value and returns a reactive and mutable ref object. The inner value is accessed via the `.value` property.

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const text = ref('Hello')

function increment() {
  count.value++ // Must use .value in JavaScript
}
</script>

<template>
  <!-- Vue automatically unwraps refs in the template, so no .value is needed -->
  <button @click="increment">Count is: {{ count }}</button>
  <p>{{ text }}</p>
</template>
```

### `reactive` (For Objects only)
`reactive` makes an object itself reactive. It is a deep proxy of the object. You don't need `.value` to access properties.

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({
  user: {
    name: 'Alice',
    age: 25
  },
  isLoggedIn: true
})

function haveBirthday() {
  state.user.age++ // Direct access, no .value
}
</script>

<template>
  <p>{{ state.user.name }} is {{ state.user.age }} years old.</p>
</template>
```
*Note:* If you destructure a `reactive` object, the destructured variables lose their reactivity. Use `toRefs` if destructuring is necessary, or generally prefer `ref` for simplicity.

---

## 7. Methods and Computed Properties

### Methods
Methods are standard functions used to handle events or perform logic. They run every time they are called.

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

// This is a method
function calculateSomething(val) {
  console.log('Calculating...')
  return val * 2
}
</script>

<template>
  <p>{{ calculateSomething(count) }}</p>
</template>
```

### Computed Properties
Computed properties (`computed`) are for derived state. They evaluate logic based on reactive dependencies and **cache the result**. They only re-evaluate when one of their dependencies changes.

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// A computed property
const fullName = computed(() => {
  console.log('Computing full name...') // Only runs when firstName or lastName changes
  return `${firstName.value} ${lastName.value}`
})
</script>

<template>
  <p>Name: {{ fullName }}</p>
  <p>Name again: {{ fullName }}</p> <!-- Uses cached value -->
</template>
```

**Rule of Thumb:**
- Need to calculate a value based on existing data? Use `computed`.
- Need to perform an action (like changing data, API calls) or pass arguments? Use a function (method).

---

## 8. Watchers

Computed properties allow us to compute derived values declaratively. However, sometimes we need to perform "side effects" in reaction to state changes (e.g., mutating the DOM, making an API call, changing another piece of state). This is what `watch` is for.

### Basic Watcher
```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')

// Watch the 'question' ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      const data = await res.json()
      answer.value = data.answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>
```

### Deep Watchers and Immediate Watchers
If you are watching a reactive object and want to trigger on nested property changes, use `{ deep: true }`.
If you want the watcher to run immediately on component creation as well as when data changes, use `{ immediate: true }`.

```javascript
watch(
  someObject,
  (newValue, oldValue) => {
    // triggers on nested property changes
  },
  { deep: true, immediate: true }
)
```

---

## 9. Event Handling

Vue uses the `v-on` directive (shorthand `@`) to listen to DOM events.

### Inline Handlers
```html
<button @click="count++">Add 1</button>
```

### Method Handlers
```vue
<script setup>
import { ref } from 'vue'
const name = ref('Vue')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` is the native DOM event
  if (event) {
    alert(event.target.tagName)
  }
}
</script>

<template>
  <button @click="greet">Greet</button>
</template>
```

### Event Modifiers
Vue provides modifiers to easily handle common DOM event tasks like `event.preventDefault()` or `event.stopPropagation()`.

```html
<!-- Prevent default form submission -->
<form @submit.prevent="onSubmit"></form>

<!-- Stop event propagation (bubbling) -->
<div @click.stop="doThis"></div>

<!-- Chain modifiers -->
<a @click.stop.prevent="doThat"></a>

<!-- Only trigger if event.target is the element itself -->
<div @click.self="doThat">...</div>
```

### Key Modifiers
Listen for specific keyboard keys easily.

```html
<!-- Trigger submit when pressing Enter -->
<input @keyup.enter="submit" />

<!-- Other common keys -->
<input @keyup.esc="clear" />
<input @keyup.space="jump" />
```

---

## 10. Forms and `v-model`

`v-model` creates two-way data bindings on form input, textarea, and select elements. It automatically syncs the input's value with the component's reactive state.

### Text Inputs
```vue
<script setup>
import { ref } from 'vue'
const message = ref('')
</script>

<template>
  <input v-model="message" placeholder="edit me" />
  <p>Message is: {{ message }}</p>
</template>
```

### Checkboxes
```vue
<script setup>
import { ref } from 'vue'
const checkedNames = ref([]) // Array for multiple checkboxes
</script>

<template>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>

  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>

  <p>Checked names: {{ checkedNames }}</p>
</template>
```

### Radios
```vue
<script setup>
import { ref } from 'vue'
const picked = ref('')
</script>

<template>
  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>

  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>

  <p>Picked: {{ picked }}</p>
</template>
```

### Select (Dropdown)
```vue
<script setup>
import { ref } from 'vue'
const selected = ref('')
</script>

<template>
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <p>Selected: {{ selected }}</p>
</template>
```

### `v-model` Modifiers
- `.lazy`: Syncs after `change` events instead of `input` events (waits until user clicks away).
- `.number`: Automatically typecasts the input as a Number.
- `.trim`: Automatically trims whitespace from the input.

```html
<input v-model.number="age" type="number" />
<input v-model.trim="username" />
<input v-model.lazy="searchQuery" />
```

---

## 11. Lifecycle Hooks

Each Vue component instance goes through a series of initialization steps when it's created. Along the way, it runs functions called **lifecycle hooks**, giving you the opportunity to add custom code at specific stages.

In the Composition API, lifecycle hooks are imported functions prefixed with `on`.

| Options API Hook | Composition API Hook | Purpose |
| :--- | :--- | :--- |
| `beforeCreate` | (Not needed, use setup) | Before instance is initialized |
| `created` | (Not needed, use setup) | Instance created, reactivity active |
| `beforeMount` | `onBeforeMount` | Right before mounting to DOM |
| `mounted` | `onMounted` | Component is in DOM. Good for API calls. |
| `beforeUpdate` | `onBeforeUpdate` | Reactive data changed, before DOM updates |
| `updated` | `onUpdated` | DOM has updated to match new state |
| `beforeUnmount` | `onBeforeUnmount` | Before component is destroyed (cleanup) |
| `unmounted` | `onUnmounted` | Component is destroyed from DOM |

### Example
```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const windowWidth = ref(window.innerWidth)

function onResize() {
  windowWidth.value = window.innerWidth
}

// Set up listeners when component enters the screen
onMounted(() => {
  console.log('Component is mounted!')
  window.addEventListener('resize', onResize)
})

// Clean up listeners when component is removed
// CRITICAL: Prevents memory leaks!
onUnmounted(() => {
  console.log('Component is unmounted!')
  window.removeEventListener('resize', onResize)
})
</script>
```

---

## 12. Routing (Vue Router Basics)

Vue Router is the official routing library for Vue.js. It allows you to map URLs to specific Vue components, creating Single Page Applications (SPAs).

### 1. Installation
If not installed via Vite during setup:
```bash
npm install vue-router@4
```

### 2. Router Setup (`src/router/index.js`)
```javascript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// Lazy load component for better performance
const AboutView = () => import('../views/AboutView.vue')
const UserProfile = () => import('../views/UserProfile.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      // Dynamic routing
      path: '/user/:id',
      name: 'user',
      component: UserProfile
    }
  ]
})

export default router
```

### 3. Registering the Router (`main.js`)
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router) // Register router
app.mount('#app')
```

### 4. Navigating (`App.vue`)
Use `<router-link>` to navigate instead of `<a>` tags. Use `<router-view>` to tell Vue where to inject the component for the current route.

```vue
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link :to="{ name: 'user', params: { id: 123 }}">User Profile</router-link>
  </nav>

  <main>
    <!-- The routed component renders here -->
    <router-view />
  </main>
</template>
```

### 5. Accessing Route Data inside a Component
```vue
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()   // Contains data about current URL (params, query)
const router = useRouter() // Contains methods to navigate programmatically

console.log('User ID:', route.params.id)

function goHome() {
  router.push('/')
}

// Watch route changes (useful if navigating from /user/1 to /user/2)
watch(() => route.params.id, (newId) => {
  console.log('Fetching data for new user:', newId)
})
</script>
```

---

## 13. State Management (Intro to Vuex & Pinia)

In complex applications, passing props deep down a component tree ("prop drilling") becomes unmanageable. State management solves this by providing a centralized store.

**Vuex** was the official state management library for Vue 2 and early Vue 3. 
**Pinia** is now the officially recommended state management library for Vue 3. It is lighter, faster, fully typed, and has a simpler API without Mutations.

### Pinia (Modern Recommended Approach)

**1. Setup Pinia (`main.js`)**
```javascript
import { createPinia } from 'pinia'
app.use(createPinia())
```

**2. Defining a Store (`src/stores/counter.js`)**
Pinia uses the same Composition API mental model.

```javascript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  
  // Getters
  const doubleCount = computed(() => count.value * 2)
  
  // Actions
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

**3. Using the Store in Components**
```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

// Initialize the store
const counter = useCounterStore()
</script>

<template>
  <div>
    <h2>Count: {{ counter.count }}</h2>
    <h2>Double: {{ counter.doubleCount }}</h2>
    <button @click="counter.increment()">Increment globally</button>
  </div>
</template>
```

### Vuex (Legacy / Older Codebases)
If you are working on an older project, you will encounter Vuex. Vuex uses a strict pattern of State -> Getters -> Mutations (sync) -> Actions (async).

```javascript
// store/index.js (Vuex example)
import { createStore } from 'vuex'

export default createStore({
  state() {
    return { count: 0 }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  }
})
```

---

## 14. API Calls

Vue is completely agnostic to how you make HTTP requests. You can use native `fetch()` or a library like `axios`.

The standard pattern is to trigger API calls in the `onMounted` lifecycle hook and store the response in reactive data.

### Example using `fetch`

```vue
<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const loading = ref(true)
const error = ref(null)

async function fetchUsers() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) throw new Error('Network response was not ok')
    users.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div>
    <h1>Users</h1>
    <div v-if="loading">Loading users...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
    <button @click="fetchUsers">Refresh</button>
  </div>
</template>

<style scoped>
.error { color: red; }
</style>
```

---

## 15. Styling in Vue

### 1. Global Styling
Styles placed in standard `<style>` tags (or imported in `main.js` like `import './assets/main.css'`) apply globally.

### 2. Scoped Styling
By adding the `scoped` attribute, Vue automatically appends a unique data attribute to elements in the component (e.g., `data-v-f3f3eg9`) and scopes the CSS to only affect those elements.

```vue
<template>
  <div class="container">Local styling</div>
</template>

<style scoped>
/* Only applies to .container inside this specific component */
.container {
  background: blue;
}
</style>
```

### 3. CSS Modules
You can also use `<style module>`. This compiles CSS classes into an object exposed as `$style` in the template. This completely prevents CSS naming collisions.

```vue
<template>
  <p :class="$style.redText">This is red</p>
</template>

<style module>
.redText {
  color: red;
}
</style>
```

### 4. Class and Style Bindings
Vue provides special enhancements for `class` and `style` bindings using objects and arrays.

```vue
<script setup>
import { ref } from 'vue'
const isActive = ref(true)
const hasError = ref(false)
const textColor = ref('purple')
</script>

<template>
  <!-- Object Syntax for Classes -->
  <div :class="{ active: isActive, 'text-danger': hasError }">
    Toggle me
  </div>

  <!-- Array Syntax for Classes -->
  <div :class="[isActive ? 'active' : '', 'base-class']"></div>

  <!-- Style Binding -->
  <div :style="{ color: textColor, fontSize: '20px' }">
    Inline Styles
  </div>
</template>
```

---

## 16. Best Practices

1. **Use Single-File Components (SFCs):** Keep your HTML, JS, and CSS cohesive in `.vue` files.
2. **Use `<script setup>`:** It is the modern standard for Vue 3, offering better TypeScript support, cleaner code, and fewer boilerplate lines than the Options API.
3. **Component Naming:**
   - Multi-word component names (e.g., `TodoList.vue` instead of `Todo.vue`) to avoid collision with future HTML elements.
   - PascalCase for component filenames and imports (`import MyComponent from './MyComponent.vue'`).
   - PascalCase in templates (`<MyComponent />`) is preferred in SFCs.
4. **Prop Validation:** Always validate props to catch errors early.
   ```javascript
   defineProps({
     status: {
       type: String,
       required: true,
       validator: (value) => ['pending', 'success', 'failed'].includes(value)
     }
   })
   ```
5. **Keep Components Small:** Break large components down into smaller, reusable pieces.
6. **Always use `:key` with `v-for`:** Ensure keys are unique (like database IDs), never use the array index as a key if the array can change order.

---

## 17. Common Mistakes

1. **Mutating Props Directly:**
   Props are strictly one-way down. Attempting to modify a prop inside a child component will result in a warning.
   *Fix:* Emit an event to the parent asking it to change the data, or create a local copy of the prop data if it's an initial value.
2. **Memory Leaks:**
   Adding global event listeners (`window.addEventListener`) or `setInterval` in `onMounted` and forgetting to remove them in `onUnmounted`.
3. **Destructuring Reactivity:**
   Destructuring a `reactive` object removes its reactivity.
   ```javascript
   const state = reactive({ count: 0 })
   let { count } = state // count is now a disconnected primitive 0
   ```
   *Fix:* Use `toRefs(state)` if destructuring is absolutely required.
4. **Using Arrow Functions for Options API methods/lifecycles:**
   In the Options API, `this` must point to the component instance. Arrow functions capture `this` from the surrounding context, breaking Vue's binding.
   *(Note: This doesn't apply to Composition API `<script setup>` since it doesn't use `this`.)*

---

## 18. Real-world Examples

### Example 1: A Complete Todo Application

This example demonstrates state management, component splitting, directives, and computed properties.

**TodoApp.vue (Parent)**
```vue
<script setup>
import { ref, computed } from 'vue'
import TodoItem from './TodoItem.vue'

const nextId = ref(3)
const newTodoText = ref('')
const todos = ref([
  { id: 1, text: 'Learn Vue 3', done: true },
  { id: 2, text: 'Build an app', done: false }
])

const filter = ref('all') // 'all', 'active', 'done'

// Computed property to filter todos
const filteredTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter(t => !t.done)
  if (filter.value === 'done') return todos.value.filter(t => t.done)
  return todos.value
})

function addTodo() {
  if (newTodoText.value.trim() === '') return
  todos.value.push({
    id: nextId.value++,
    text: newTodoText.value,
    done: false
  })
  newTodoText.value = ''
}

function removeTodo(todoToRemove) {
  todos.value = todos.value.filter(t => t.id !== todoToRemove.id)
}
</script>

<template>
  <div class="todo-app">
    <h1>My Vue Todos</h1>
    
    <form @submit.prevent="addTodo">
      <input v-model="newTodoText" placeholder="What needs to be done?" />
      <button type="submit">Add</button>
    </form>

    <div class="filters">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
      <button :class="{ active: filter === 'active' }" @click="filter = 'active'">Active</button>
      <button :class="{ active: filter === 'done' }" @click="filter = 'done'">Done</button>
    </div>

    <ul v-if="filteredTodos.length">
      <TodoItem 
        v-for="todo in filteredTodos" 
        :key="todo.id"
        :todo="todo"
        @remove="removeTodo(todo)"
      />
    </ul>
    <p v-else>No todos to show!</p>
  </div>
</template>

<style scoped>
.todo-app { max-width: 400px; margin: 0 auto; font-family: sans-serif; }
.filters { margin: 15px 0; display: flex; gap: 10px; }
.active { font-weight: bold; background: #42b883; color: white; border: none; padding: 5px 10px; border-radius: 4px; }
</style>
```

**TodoItem.vue (Child)**
```vue
<script setup>
// Define props
const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

// Define emits
defineEmits(['remove'])
</script>

<template>
  <li class="todo-item">
    <label :class="{ 'is-done': todo.done }">
      <!-- Mutating the object's property directly is technically allowed since 
           we are just modifying a property of the passed object reference, 
           but in strict architectures you would emit an event for this too. -->
      <input type="checkbox" v-model="todo.done" />
      {{ todo.text }}
    </label>
    <button class="delete-btn" @click="$emit('remove')">X</button>
  </li>
</template>

<style scoped>
.todo-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
.is-done { text-decoration: line-through; color: #888; }
.delete-btn { color: red; border: none; background: none; cursor: pointer; }
</style>
```

### Example 2: Reusable UI Component (Modal)

A common pattern for a reusable Modal using Slots.

**Modal.vue**
```vue
<script setup>
defineProps({
  isOpen: Boolean,
  title: String
})

defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <!-- Teleport moves the modal HTML to the <body> tag to avoid CSS positioning issues -->
    <div v-if="isOpen" class="modal-mask" @click.self="$emit('close')">
      <div class="modal-container">
        <header class="modal-header">
          <slot name="header">
            <h3>{{ title }}</h3>
          </slot>
          <button class="close-btn" @click="$emit('close')">&times;</button>
        </header>

        <main class="modal-body">
          <slot>Default Modal Body</slot>
        </main>

        <footer class="modal-footer">
          <slot name="footer">
            <button @click="$emit('close')">Close</button>
          </slot>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-mask {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); display: flex;
  align-items: center; justify-content: center; z-index: 9999;
}
.modal-container {
  background: white; border-radius: 8px; width: 400px;
  max-width: 90%; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  display: flex; flex-direction: column;
}
.modal-header { padding: 15px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
.modal-body { padding: 20px; }
.modal-footer { padding: 15px; border-top: 1px solid #eee; display: flex; justify-content: flex-end; }
.close-btn { background: none; border: none; font-size: 24px; cursor: pointer; }
</style>
```

**App.vue (Using the Modal)**
```vue
<script setup>
import { ref } from 'vue'
import Modal from './components/Modal.vue'

const showModal = ref(false)
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <button @click="showModal = true">Show Settings</button>

    <Modal :isOpen="showModal" title="User Settings" @close="showModal = false">
      <!-- Passing content into the default slot -->
      <p>Here you can configure your user preferences.</p>
      
      <!-- Overriding the footer slot -->
      <template #footer>
        <button class="save" @click="showModal = false">Save Changes</button>
        <button @click="showModal = false">Cancel</button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.save { background: #42b883; color: white; border: none; padding: 5px 10px; margin-right: 10px; cursor: pointer; }
</style>
```

---

This guide covers the core fundamentals, intermediate techniques, and modern best practices required to build robust web applications using Vue.js 3. By understanding reactivity, component architecture, and the Composition API, you are well-equipped to tackle real-world frontend engineering tasks.
