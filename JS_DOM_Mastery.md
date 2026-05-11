# JavaScript DOM Mastery

The DOM, or Document Object Model, is the browser's in-memory representation of an HTML document. It turns the page into a tree of objects that JavaScript can inspect, change, and react to.

## What the DOM Gives You
- Access to elements, attributes, text, and structure
- Ability to change content and styles dynamically
- Event handling for interaction
- Traversal across parent, child, and sibling nodes
- Form access and validation support

## DOM Tree Basics
- The browser parses HTML into a tree.
- Every element becomes a node.
- Nodes can be:
  - element nodes
  - text nodes
  - comment nodes
  - document nodes
- DOM manipulation usually means changing nodes, not raw HTML strings.

## Selecting Elements
Selecting is the first step before modifying anything.

### Common Selection Methods
```js
document.getElementById("title");
document.getElementsByClassName("card");
document.getElementsByTagName("li");
document.querySelector(".card");
document.querySelectorAll(".card");
```

### When to Use What
- `getElementById`: fastest and direct for one known element
- `getElementsByClassName`: live HTMLCollection, useful for class groups
- `getElementsByTagName`: live HTMLCollection by tag
- `querySelector`: first match using CSS selector syntax
- `querySelectorAll`: all matches using CSS selector syntax

### Notes on Collections
- `querySelectorAll` returns a static NodeList.
- Some older collection APIs return live collections that update automatically.
- `NodeList` can often be looped with `forEach`, but not every browser historically supported that equally well.

## Modifying Elements
Once selected, elements can be changed in many ways.

### Content
```js
element.textContent = "Hello";
element.innerText = "Hello";
element.innerHTML = "<strong>Hello</strong>";
```

- `textContent` is safe and fast for plain text.
- `innerText` reflects rendered text and respects CSS visibility.
- `innerHTML` parses HTML and should be used carefully because it can create security risks if user input is inserted directly.

### Attributes
```js
element.setAttribute("type", "button");
element.getAttribute("href");
element.removeAttribute("disabled");
element.hasAttribute("aria-label");
```

### Classes
```js
element.classList.add("active");
element.classList.remove("active");
element.classList.toggle("active");
element.classList.contains("active");
```

### Styles
```js
element.style.color = "red";
element.style.backgroundColor = "black";
```

- Prefer classes for larger styling changes.
- Use inline style changes for very specific dynamic updates.

### Creating and Inserting Elements
```js
const li = document.createElement("li");
li.textContent = "New item";
document.querySelector("ul").appendChild(li);
```

Other insertion methods:
```js
parent.append(child);
parent.prepend(child);
parent.before(node);
parent.after(node);
element.remove();
```

### Replacing and Cloning
```js
oldNode.replaceWith(newNode);
const copy = node.cloneNode(true);
```

- `cloneNode(true)` deep clones children.
- `cloneNode(false)` clones only the node itself.

## Traversal
Traversal means moving around the DOM tree.

### Parent and Child Access
```js
element.parentElement;
element.children;
element.firstElementChild;
element.lastElementChild;
element.childNodes;
```

### Siblings
```js
element.nextElementSibling;
element.previousElementSibling;
element.nextSibling;
element.previousSibling;
```

### Helpful Traversal Patterns
- Use `children` when you want element nodes only.
- Use `childNodes` when you need text nodes too.
- `parentElement` is usually more useful than `parentNode` for element work.

## Event Listeners
Event listeners let JavaScript respond to user actions and browser events.

### Basic Pattern
```js
button.addEventListener("click", function () {
  console.log("Clicked");
});
```

### Common Event Types
- `click`
- `dblclick`
- `input`
- `change`
- `submit`
- `keydown`
- `keyup`
- `focus`
- `blur`
- `mouseenter`
- `mouseleave`
- `scroll`
- `load`

### Listener Options
```js
element.addEventListener("click", handler, { once: true });
```

- `once: true` auto-removes the listener after one run.
- A listener can also be removed with `removeEventListener`.

### Event Object
```js
button.addEventListener("click", function (event) {
  console.log(event.target);
  console.log(event.currentTarget);
});
```

- `target` is the actual element that triggered the event.
- `currentTarget` is the element the listener is attached to.

## Bubbling and Delegation
Events often travel through the DOM in phases.

### Event Phases
- Capturing: from top down
- Target: at the actual element
- Bubbling: from target back up

### Bubbling
- Most common browser events bubble upward.
- This makes parent elements able to catch events from their children.

### Delegation
Event delegation means putting one listener on a parent instead of many listeners on children.

```js
document.querySelector("ul").addEventListener("click", function (event) {
  if (event.target.matches("li")) {
    console.log("Item clicked:", event.target.textContent);
  }
});
```

### Why Delegation Matters
- Fewer event listeners
- Better performance for large lists
- Works well for dynamically added elements

### Preventing Default Behavior
```js
form.addEventListener("submit", function (event) {
  event.preventDefault();
});
```

### Stopping Propagation
```js
event.stopPropagation();
event.stopImmediatePropagation();
```

- `stopPropagation` stops bubbling.
- `stopImmediatePropagation` also prevents other listeners on the same element.

## Forms and Inputs
Forms are one of the most common DOM use cases.

### Reading Values
```js
const value = input.value;
```

### Setting Values
```js
input.value = "Hello";
checkbox.checked = true;
```

### Important Form Events
- `submit`
- `input`
- `change`
- `reset`

### Validation APIs
```js
input.required = true;
input.minLength = 3;
input.maxLength = 20;
input.pattern = "[A-Za-z]+";
input.setCustomValidity("Please enter a valid value");
```

### Constraint Validation
- Use built-in HTML validation when possible.
- Use JavaScript for custom feedback and richer UX.
- `checkValidity()` returns whether a field or form is valid.
- `reportValidity()` shows native validation messages.

### Form Data
```js
const formData = new FormData(form);
```

- `FormData` is useful for text fields and file uploads.
- It integrates well with `fetch`.

### Checkbox and Radio Handling
```js
checkbox.checked;
radio.checked;
```

### File Inputs
```js
const file = fileInput.files[0];
```

## DOM Best Practices
- Select once when possible and reuse references.
- Prefer `textContent` over `innerHTML` for plain text.
- Use event delegation for lists and dynamic content.
- Keep rendering updates small and focused.
- Be careful with user-generated HTML.

