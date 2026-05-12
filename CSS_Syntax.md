# CSS Syntax

## What CSS Does
- CSS stands for Cascading Style Sheets.
- It controls how HTML elements look: colors, spacing, layout, fonts, size, and more.

## Basic Syntax
```css
selector {
  property: value;
}
```

## Ways to Add CSS
### Inline Styling
```html
<h1 style="color: red">data</h1>
```

### Internal Stylesheet
```html
<head>
  <style>
    h1 {
      color: red;
    }
  </style>
</head>
```

### External Stylesheet
```html
<!-- style.css -->
h1, h2, h6 {
  color: red;
}

body {
  background-color: red;
}
```

```html
<!-- index.html -->
<head>
  <link rel="stylesheet" href="style.css">
</head>
```

## Cascade Note
- Inline styles override external stylesheet rules for that specific attribute.

## Colors
- `color` changes text color.
- `background-color` changes the background.
- Color systems:
  - RGB: `rgb(0, 255, 0)`
  - Hex: `#ff0000`

## Selectors
- Universal: `*`
- Element: `h1`
- ID: `#myID`
- Class: `.myclass`

### Example
```html
<h1 id="ID_01">data</h1>
<h1 class="Class_01">data</h1>
```

```css
#ID_01 {
  color: red;
}

.Class_01 {
  color: red;
}
```

## VS Code Shortcuts
- `.myclass` and press Enter to generate a class-based snippet.
- `#myid` and press Enter to generate an ID-based snippet.
- `lorem` and press Enter to generate placeholder text.

## Text Properties
- `text-align`: left, right, center
- `text-decoration`: underline, overline, line-through, none
- `font-weight`: normal, bold, bolder, lighter, or numeric values from 100 to 900
- `font-family`: font stack with fallback order
- `font-size`: controls text size
- `line-height`: spacing between lines
- `text-transform`: uppercase, lowercase, capitalize, none

## Units
- `px` is a common absolute unit
- `96px = 1 inch`

## Box Model
- `height`: vertical size of the content box
- `width`: horizontal size of the content box
- `border`: boundary around the content area
- `padding`: space between content and border
- `margin`: space between boxes

```css
height: 50px;
width: 50px;
border-width: 2px;
border-style: solid;
border-color: black;
border: 3px solid black;
padding: 1px 2px 3px 4px;
margin-right: 2px;
```

## Display
- `inline`: only takes as much space as needed
- `block`: takes full width
- `inline-block`: behaves like inline but allows spacing control
- `none`: removes an element from the document flow

## Visibility and Opacity
- `visibility: hidden` hides content without removing layout space.
- `rgba(...)` includes alpha transparency.

## CSS Units
- Absolute units: `px`, `cm`, `mm`, `in`
- Relative units: `%`, `em`, `rem`, `vh`, `vw`

## Positioning
- `static`: default
- `relative`: positioned relative to itself
- `absolute`: positioned relative to nearest positioned ancestor
- `fixed`: positioned relative to the browser viewport
- `sticky`: changes based on scroll position

```css
#box {
  position: static;
  top: 20px;
}
```

## Z-Index
- `z-index` controls stack order when elements overlap.

## Background Images
```css
background-image: url("image.jpg");
background-size: cover;
background-repeat: no-repeat;
```





