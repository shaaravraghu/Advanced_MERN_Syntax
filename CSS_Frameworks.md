# CSS Frameworks

## Bootstrap
- Bootstrap is a CSS and JavaScript UI framework.
- It provides ready-made classes and components so you can build responsive sites faster.

### Key Ideas
- Grid system: a 12-column responsive layout system
- Utilities: spacing, colors, typography, display, flexbox, and more
- Components: navbars, cards, buttons, forms, modals, and others
- Responsiveness: mobile-first breakpoints such as `sm`, `md`, `lg`, `xl`, `xxl`
- JavaScript plugins: dropdowns, modals, carousels, and more

### Installation
#### CDN
```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

#### Local Import
```css
@import "bootstrap/dist/css/bootstrap.min.css";
```

### Layout Structure
```html
<div class="container">
  <div class="row">
    <div class="col-4">...</div>
    <div class="col-8">...</div>
  </div>
</div>
```

### Grid Basics
- `container` and `container-fluid` create layout wrappers.
- `row` creates a horizontal grid row.
- `col-*` defines columns.
- Auto layout columns divide space evenly.

### Useful Utility Groups
- Spacing: `m-*`, `p-*`, `mt-*`, `px-*`, `my-*`
- Colors: `bg-*`, `text-*`, `border-*`
- Typography: `text-center`, `fw-bold`, `text-uppercase`
- Display: `d-block`, `d-flex`, `d-none`
- Flexbox: `justify-content-between`, `align-items-center`
- Sizing: `w-100`, `h-auto`, `img-fluid`
- Borders and radius: `border`, `rounded`, `rounded-circle`
- Shadows: `shadow`, `shadow-lg`
- Position: `position-relative`, `position-absolute`
- Gap: `g-1` through `g-5`
- Visibility: `visible`, `invisible`

### Common Components
- Buttons
- Cards
- Navbar
- Forms
- Modal
- Alerts
- Badges
- Accordion
- List groups
- Progress bars
- Spinner
- Footer layouts

### Example Patterns
```html
<button class="btn btn-primary">Primary</button>
<div class="alert alert-success">Success!</div>
<span class="badge bg-primary">New</span>
```

### Modal Example
```html
<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
  Open Modal
</button>
```

### JS Requirement
- Bootstrap JavaScript features only work when the Bootstrap JS bundle is included.

### Interactive Components
- Dropdown
- Carousel
- Tooltip
- Collapse
- Offcanvas
- Toast

## Tailwind CSS
- Tailwind is a utility-first CSS framework.
- You compose styles directly in HTML or JSX using utility classes.
- It is different from Bootstrap because it focuses on low-level utilities instead of pre-built components.

### Why Tailwind is Useful
- Reusable
- Consistent spacing and scale
- Responsive and state-based styling
- More granular control

### Installation
```bash
npm init -y
npm install -D tailwindcss
npx tailwindcss init
```

### Config Example
```js
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Output CSS Link
```html
<link href="../output.css" rel="stylesheet">
```

### Core Utility Areas
- Spacing
- Colors
- Typography
- Width and height
- Display
- Borders and radius
- Shadow
- Image fit
- Positioning
- Overflow and scroll
- Opacity and cursor
- Flexbox and grid

### Common Tailwind Patterns
- `flex`, `grid`, `hidden`
- `justify-between`, `items-center`
- `gap-4`
- `hover:`, `focus:`, `active:`, `disabled:`
- `transition`, `duration-200`, `ease-in-out`
- `group-hover:`
- `peer-hover:`, `peer-focus:`, `peer-checked:`

### Responsive and State Styling
- Tailwind makes responsive layouts and interaction states easy to compose.
- Common variants include hover, focus, active, disabled, group, and peer states.

### Dark Mode
```js
module.exports = {
  darkMode: "class",
}
```

### Animations and Transitions
- Tailwind supports transition utilities, duration controls, easing, and transform scale helpers.



