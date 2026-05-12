# CSS Fundamentals Syntax

## Flexbox
Flexbox is a one-dimensional layout method for arranging items in rows or columns.

### The Flex Model
- A flex container is the whole area.
- Flex items are the child blocks inside it.
- The main axis is the direction items are aligned in.
- The cross axis is perpendicular to the main axis.
- `flex-direction` controls the main axis direction:
  - `row`: left to right
  - `row-reverse`: right to left
  - `column`: top to bottom
  - `column-reverse`: bottom to top
- Flexbox helps items fit inside the container by shrinking or growing them as needed.

### Flex Container Properties
- `justify-content`: aligns items along the main axis
- `align-items`: aligns items along the cross axis
- `flex-wrap`: controls whether items wrap onto multiple lines
- `align-content`: controls spacing between wrapped lines along the cross axis

### Flex Item Properties
- `align-self`: aligns one item on the cross axis
- `order`: changes item order
- `flex-grow`: controls how much an item grows
- `flex-shrink`: controls how much an item shrinks
- `flex-basis`: sets the initial size before extra space is distributed

### Example
```html
<body>
  <h1>Flexbox Example</h1>
  <div class="flex-container">
    <div class="flex-item3">Item 1</div>
    <div class="flex-item3">Item 2</div>
    <div class="flex-item3">Item 3</div>
  </div>
</body>
```

```css
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 200px;
  border: 2px solid #000;
}

.flex-item1,
.flex-item2,
.flex-item3 {
  padding: 20px;
  margin: 10px;
  border: 1px solid #000;
  text-align: center;
}

.flex-item1 {
  background-color: lightblue;
  flex-grow: 1;
}

.flex-item2 {
  background-color: lightgrey;
  flex-grow: 1;
}

.flex-item3 {
  background-color: lightgreen;
  flex-grow: 2;
}
```

## Media Queries
Media queries help create responsive websites.

### Common Conditions
- `width`
- `min-width`
- `max-width`
- `height`
- `min-height`
- `max-height`
- `orientation`
- `resolution`

### Example
```css
@media (max-width: 600px) {
  .flex-container {
    flex-direction: column;
    height: auto;
  }
}
```

## Transitions
Transitions define movement between two states of an element.

### Transition Properties
- `transition-property`
- `transition-duration`
- `transition-timing-function`
- `transition-delay`

### Example
```css
div:hover {
  background-color: yellow;
  transition-property: background-color;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
}

div:active {
}

transition: font-size 2s ease-in-out 0.2s;
```

## CSS Transform
Transforms apply 2D and 3D transformations.

### Common Transform Functions
- `rotate(45deg)`
- `rotateX`
- `rotateY`
- `rotateZ`
- `scale`
- `translate`
- `skew`

```css
transform: rotate(45deg);
rotate: 45deg;
rotateX: 45deg;
transform: scale(...);
transform: translate(...);
transform: skew(...);
```

## Animations
Animations let you animate CSS elements.

### Keyframes and Animation Properties
- `animation-name`
- `animation-duration`
- `animation-timing-function`
- `animation-delay`
- `animation-iteration-count`
- `animation-direction`
- `animation-fill-mode`
- `animation-play-state`

### Example
```css
@keyframe myName {
  from {
  }
  to {
  }
}

animation-name: myName;
animation-duration: 4s;
animation-timing-function: ease;
animation-delay: 2s;
animation-iteration-count: infinite;
animation-direction: alternate;
animation-fill-mode: forwards;
animation-play-state: running;
animation: myName 4s ease-in-out 2s infinite alternate forwards;

@keyframe percent {
  0% {
  }
  50% {
  }
  100% {
  }
}
```

## Grid Model
CSS Grid is a two-dimensional layout system for rows and columns.

### Basic Grid Setup
```css
.container {
  display: grid;
}
```

### Defining Rows and Columns
```css
.container {
  display: grid;
  grid-template-columns: 100px 200px 1fr;
  grid-template-rows: 100px auto 50px;
}
```

### repeat()
```css
.container {
  grid-template-columns: repeat(3, 1fr);
}
```

### minmax()
```css
.container {
  grid-template-columns: repeat(3, minmax(200px, 1fr));
}
```

### auto-fit and auto-fill
```css
.container {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.container {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
```

### Gap Between Rows and Columns
```css
.container {
  row-gap: 20px;
  column-gap: 20px;
  gap: 20px;
}
```

### Grid Item Positioning
```css
.item {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 4;
}

.item {
  grid-column: 1 / 3;
  grid-row: 2 / 4;
}

.item {
  grid-column: span 2;
  grid-row: span 3;
}
```

### Grid Alignment
```css
.container {
  justify-items: center;
  align-items: center;
  place-items: center;
}

.container {
  justify-content: space-between;
  align-content: center;
  place-content: center;
}
```

### Named Grid Areas
```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 80px auto 80px;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}

.footer {
  grid-area: footer;
}
```

### Auto-Flow and Dense Grids
```css
.container {
  grid-auto-flow: row;
  grid-auto-flow: column;
  grid-auto-flow: dense;
}

.container {
  grid-auto-rows: minmax(100px, auto);
}
```

### Grid and Flexbox Hybrid Example
- Common in MERN frontends.

```css
.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background: #f3f3f3;
  border-radius: 10px;
}
```



