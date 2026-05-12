# HTML Markup

## Semantic Structure
HTML5 introduced newer tags that make webpages more structured, readable, and meaningful.

### Structure Tags
- `header`: top part of the webpage
- `nav`: navigation menu
- `main`: main content area
- `section`: logical grouping of content
- `article`: independent piece of content
- `aside`: sidebar content
- `footer`: bottom part of the webpage

### Example Structure
```html
<body>
  <header>
    <h1>My Website</h1>
  </header>

  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
  </nav>

  <main>
    <section>
      <h2>Welcome</h2>
      <p>This is my website.</p>
    </section>

    <article>
      <h2>Blog Post</h2>
      <p>This is an article.</p>
    </article>

    <aside>
      <p>Sidebar info</p>
    </aside>
  </main>

  <footer>
    <p>© 2025 MySite</p>
  </footer>
</body>
```

## Media Tags
- `audio` for sound content
- `video` for video content

```html
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
</audio>

<video controls width="400">
  <source src="movie.mp4" type="video/mp4">
</video>
```

## Form-Related HTML5 Features
- New input types include:
  - `email`
  - `date`
  - `number`
  - `range`
  - `color`
  - `url`
  - `tel`
  - `search`

## Other Useful Tags
- `canvas`: used for drawing shapes with JavaScript
- `svg`: used to display vector graphics
- `details`: used for collapsible content
- `summary`: visible label for a `details` block
- `figure`: wraps media content
- `figcaption`: adds a caption to media

```html
<canvas id="myCanvas" width="200" height="200"></canvas>

<svg width="200" height="100">
  <rect width="200" height="100" fill="blue" />
</svg>

<details>
  <summary>Read More</summary>
  <p>This is hidden content.</p>
</details>

<figure>
  <img src="img.jpg" alt="image">
  <figcaption>This is an image caption.</figcaption>
</figure>
```

## Semantic HTML
- Semantic HTML uses tags that describe meaning, purpose, and structure.
- Examples:
  - `header`
  - `nav`
  - `section`
  - `article`
  - `footer`
  - `main`
  - `aside`
  - `time`
  - `mark`
- Non-semantic tags like `div` and `span` mostly just wrap content.

## Forms
- Forms collect input from users.
- Common parts of a form:
  - `form`: container for the form
  - `action`: URL where the data goes
  - `method`: HTTP method used
  - `input`: collects user data
  - `button type="submit"`: sends the form

### Example
```html
<form action="/submit" method="POST">
  <label>Name:</label>
  <input type="text" name="username">

  <button type="submit">Submit</button>
</form>
```

## Input Types
- `text`
- `email`
- `password`
- `number`
- `tel`
- `date`
- `file`
- `color`
- `range`
- `checkbox`
- `radio`

### Multi-line Input
```html
<textarea name="message" rows="4" cols="30"></textarea>
```

### Select Dropdown
```html
<select name="country">
  <option value="in">India</option>
  <option value="us">USA</option>
  <option value="uk">UK</option>
</select>
```

### Labels
```html
<label for="email">Email:</label>
<input id="email" type="email" name="email">
```

### Validation
- `required` makes a field mandatory
- `pattern` validates input using a regular expression

```html
<input type="email" name="email" required>
<input type="text" name="username" pattern="[A-Za-z]{3,}">
```

## GET vs POST
- `GET`:
  - data appears in the URL
  - useful for search, filters, and non-sensitive data
- `POST`:
  - data stays hidden in the request body
  - useful for login, signup, payments, and file uploads

### GET Example
```html
<form action="/search" method="GET">
  <input type="text" name="q">
  <button>Search</button>
</form>
```

### POST Example
```html
<form action="/login" method="POST">
  <input type="email" name="email">
  <input type="password" name="password">
  <button>Login</button>
</form>
```

### File Upload
```html
<form action="/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="profilePic">
  <button>Upload</button>
</form>
```

## Buttons
- `submit`: sends the form
- `reset`: clears the form

```html
<button type="submit">Submit</button>
<button type="reset">Clear</button>
```

## Media and Embeds
- `img` displays images
- `alt` text is important for accessibility and SEO
- `iframe` embeds external websites
- `picture` supports responsive images

### Image Example
```html
<img src="image.jpg" alt="A beautiful scene" width="300">
```

### Audio Example
```html
<audio controls>
  <source src="audio.mp3" type="audio/mp3">
  Your browser does not support the audio tag.
</audio>
```

### Video Example
```html
<video width="400" controls>
  <source src="movie.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

### Website Embedding
```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="YouTube video player"
  frameborder="0"
  allowfullscreen>
</iframe>
```

### Responsive Images
```html
<picture>
  <source srcset="image-large.webp" media="(min-width: 800px)">
  <source srcset="image-small.webp" media="(max-width: 799px)">
  <img src="fallback.png" alt="Responsive image">
</picture>
```

## JSX Basics
- JSX stands for JavaScript XML.
- It lets you build UI inside JavaScript, especially in React.
- It looks like HTML but behaves like a templating language.

### Key Differences
- `class` becomes `className`
- `for` becomes `htmlFor`
- JSX requires one parent element, often `<>...</>`
- Expressions go inside `{ }`
- Inline styles use objects
- Self-closing tags must be written explicitly

### Examples
```jsx
<>
  <h1>Hello</h1>
  <p>World</p>
</>

<h1>The sum is {10 + 20}</h1>

<p style={{ color: "red", fontSize: "20px" }}>Hello</p>

<img src="photo.png" />
```

### JSX Rule
- Only JavaScript expressions are allowed inside `{ }`.
- HTML cannot be written directly inside those braces.





