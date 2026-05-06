# Comprehensive HTML Study Notes: From Basics to Best Practices

HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web page's appearance/presentation (CSS) or functionality/behavior (JavaScript).

These study notes are designed to take you from a beginner to an intermediate level, focusing on practical understanding, semantic structure, accessibility, and modern best practices.

---

## 1. Introduction to HTML

### What is HTML?

HTML stands for **HyperText Markup Language**.

*   **HyperText:** This refers to the links that connect web pages to one another, either within a single website or between websites. Links are a fundamental aspect of the Web. By uploading content to the Internet and linking it to pages created by other people, you become an active participant in the World Wide Web.
*   **Markup Language:** HTML uses "markup" to annotate text, images, and other content for display in a Web browser. HTML markup includes special "elements" such as `<head>`, `<title>`, `<body>`, `<header>`, `<footer>`, `<article>`, `<section>`, `<p>`, `<div>`, `<span>`, `<img>`, `<aside>`, `<audio>`, `<canvas>`, `<datalist>`, `<details>`, `<embed>`, `<nav>`, `<output>`, `<progress>`, `<video>`, `<ul>`, `<ol>`, `<li>` and many others.

**Key Takeaway:** HTML is *not* a programming language. It cannot perform calculations, run loops, or evaluate conditions. It is strictly a declarative language used to describe the structure and content of a document.

### History and Evolution

The web has evolved significantly since its inception, and HTML has evolved with it:

1.  **HTML 1.0 (1993):** Created by Tim Berners-Lee at CERN. It was extremely basic, supporting text and basic links, but no tables or fonts.
2.  **HTML 2.0 (1995):** The first standard HTML specification. It introduced standard core features like forms.
3.  **HTML 3.2 (1997):** Introduced by the W3C (World Wide Web Consortium). It added support for tables, applets, and text flow around images.
4.  **HTML 4.01 (1999):** A major overhaul. It began to separate styling from structure, encouraging the use of CSS (Cascading Style Sheets).
5.  **XHTML (2000):** HTML rewritten as an XML language. It was extremely strict (e.g., all tags had to be closed in a specific way) and unforgiving of errors.
6.  **HTML5 (2014 - Present):** The modern standard. HTML5 is designed to be backwards compatible, forgiving of minor syntax errors, and packed with new features for modern web applications (video, audio, canvas, semantic tags, local storage, etc.). It is now considered a "Living Standard" maintained by the WHATWG (Web Hypertext Application Technology Working Group).

### Role in Web Development

Web development is built on a fundamental triad of technologies:

1.  **HTML (Structure):** Provides the skeleton and content of the page. It tells the browser "this is a heading," "this is a paragraph," or "this is an image."
2.  **CSS (Presentation):** Provides the styling. It tells the browser "make this heading blue," "put this paragraph in a two-column layout," or "add a border to this image."
3.  **JavaScript (Behavior):** Provides interactivity. It tells the browser "when the user clicks this button, fetch new data and update the paragraph."

HTML is the foundation. Without HTML, there is nothing for CSS to style and nothing for JavaScript to manipulate.

---

## 2. HTML Document Structure

Every standard HTML document follows a specific boilerplate structure. This structure tells the browser how to read and interpret the file.

### The Standard Boilerplate

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A comprehensive guide to HTML.">
    <meta name="author" content="Web Developer">
    <title>My First HTML Page</title>
</head>
<body>
    <!-- The visible content goes here -->
    <h1>Welcome to HTML!</h1>
    <p>This is my first paragraph.</p>
</body>
</html>
```

Let's break down each component:

### `<!DOCTYPE html>`

The document type declaration. 
*   **What it does:** It tells the web browser which version of HTML the page is written in.
*   **Why it's important:** In the past, DOCTYPEs were long and complex. `<!DOCTYPE html>` is the standard for HTML5. It ensures the browser renders the page in "standards mode" rather than "quirks mode" (a mode that emulates the behavior of ancient browsers).

### `<html>`

The root element of an HTML page. All other elements must be descendants of this element.
*   **`lang` attribute:** You should always include the `lang` attribute (e.g., `<html lang="en">` for English, `lang="es"` for Spanish). This is crucial for accessibility (screen readers use it to choose the correct pronunciation) and SEO (search engines use it to determine the page's language).

### `<head>`

The head element acts as a container for metadata (data about data) and links to external resources. **Nothing inside the `<head>` tag is displayed directly on the web page.**

Inside the `<head>`, you typically find:
*   `<title>`: The title of the document, which appears in the browser tab and is used by search engines.
*   `<style>`: Internal CSS styling.
*   `<link>`: Connections to external resources, most commonly CSS stylesheets (`<link rel="stylesheet" href="styles.css">`) or favicons.
*   `<script>`: Internal or external JavaScript files.

### Meta Tags

Meta tags (`<meta>`) provide metadata about the HTML document. They are always placed inside the `<head>` element and are typically used to specify character set, page description, keywords, author of the document, and viewport settings.

*   **`<meta charset="UTF-8">`:** Specifies the character encoding. UTF-8 covers almost all of the characters and symbols in the world. You should *always* include this.
*   **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`:** Crucial for responsive design. It tells the browser to set the width of the page to follow the screen-width of the device, and sets the initial zoom level. Without this, mobile browsers will render the page as if it's on a desktop screen and scale it down, making it unreadable.
*   **`<meta name="description" content="...">`:** Provides a brief description of the page. Search engines often display this in search results.

### `<body>`

The body element contains all the contents of an HTML document, such as headings, paragraphs, images, hyperlinks, tables, lists, etc. **Everything inside the `<body>` is what the user actually sees.**

---

## 3. Basic Tags

### Headings

HTML provides six levels of section headings, `<h1>` through `<h6>`.

*   `<h1>` is the most important heading (usually the main title of the page).
*   `<h6>` is the least important heading.

```html
<h1>Main Page Title (Use only once per page)</h1>
<h2>Section Title</h2>
<h3>Sub-section Title</h3>
<h4>Minor Heading</h4>
<h5>Very Minor Heading</h5>
<h6>Lowest Level Heading</h6>
```

**Best Practices for Headings:**
*   Use headings to create a logical document outline.
*   Do not skip heading levels (e.g., don't jump from `<h1>` to `<h3>`).
*   Only use one `<h1>` per page. It should describe the main topic of the page.
*   Do not use headings just to make text bold or big; use CSS for visual styling instead.

### Paragraphs and Text Formatting

The `<p>` element defines a paragraph. Browsers automatically add a single blank line before and after each `<p>` element.

```html
<p>This is a paragraph of text. It contains multiple sentences. 
The browser will format this as a block of text.</p>

<p>This is another paragraph.</p>
```

#### Line Breaks and Horizontal Rules

Sometimes you need to format text without creating a new paragraph.

*   **`<br>` (Line Break):** Inserts a single line break. It is an "empty" element, meaning it has no closing tag. Use this for poems or addresses where line breaks are part of the content.

```html
<p>
    John Doe<br>
    123 Main Street<br>
    Anytown, USA
</p>
```

*   **`<hr>` (Horizontal Rule):** Represents a thematic break between paragraph-level elements. It usually renders as a horizontal line. Like `<br>`, it is an empty element.

```html
<p>End of chapter 1.</p>
<hr>
<p>Beginning of chapter 2.</p>
```

#### Inline Text Formatting

HTML provides tags to add semantic meaning and basic formatting to parts of text within a paragraph.

*   `<strong>`: Important text (browsers render as **bold**).
*   `<em>`: Emphasized text (browsers render as *italic*).
*   `<b>`: Bold text (visual only, no semantic importance).
*   `<i>`: Italic text (visual only).
*   `<mark>`: Highlighted or marked text.
*   `<small>`: Smaller text (like copyright notices).
*   `<del>`: Deleted text (renders with a strikethrough).
*   `<ins>`: Inserted text (usually renders underlined).
*   `<sub>`: Subscript text (e.g., H<sub>2</sub>O).
*   `<sup>`: Superscript text (e.g., E = mc<sup>2</sup>).

```html
<p>This is <strong>important</strong>, but this is just <em>emphasized</em>.</p>
<p>My favorite chemical is H<sub>2</sub>O, and the area is 10m<sup>2</sup>.</p>
<p>The price was <del>$50</del>, but now it is <ins>$40</ins>.</p>
```

### Links

Links (hyperlinks) are created using the `<a>` (anchor) tag.

The most important attribute is `href` (Hypertext Reference), which indicates the link's destination.

```html
<!-- Linking to another website (Absolute URL) -->
<a href="https://www.google.com">Go to Google</a>

<!-- Linking to another page on the same website (Relative URL) -->
<a href="/about.html">About Us</a>
<a href="../contact.html">Contact (One directory up)</a>

<!-- Opening a link in a new tab/window -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">External Site</a>
```

*(Note: When using `target="_blank"`, it is a security best practice to add `rel="noopener noreferrer"` to prevent the new tab from having access to the original window's JavaScript environment.)*

#### Specialized Links

*   **Email Links:** Open the user's default email client.
*   **Telephone Links:** Initiate a phone call on mobile devices.
*   **Anchor Links:** Jump to a specific section on the *same* page.

```html
<!-- Email link -->
<a href="mailto:support@example.com?subject=Help">Email Support</a>

<!-- Telephone link -->
<a href="tel:+15551234567">Call Us: 555-123-4567</a>

<!-- Anchor link -->
<!-- First, give the target element an id -->
<h2 id="pricing">Pricing Section</h2>
<!-- Then, link to that id -->
<a href="#pricing">Jump to Pricing</a>
```

### Images

The `<img>` tag is used to embed an image in a web page. It is an empty element (no closing tag).

Crucial attributes:
*   `src` (Source): Specifies the path to the image file.
*   `alt` (Alternative Text): Specifies alternate text for the image if it cannot be displayed. **This is absolutely critical for accessibility (screen readers read this to blind users) and SEO.**

```html
<!-- Basic image -->
<img src="cute-cat.jpg" alt="A fluffy orange cat sleeping on a keyboard">

<!-- Image with dimensions and lazy loading -->
<img src="large-hero.png" 
     alt="A beautiful mountain landscape at sunset" 
     width="800" 
     height="400" 
     loading="lazy">
```

*   `width` and `height`: While you can (and usually should) control image size with CSS, providing `width` and `height` attributes in the HTML prevents "Layout Shift" (the page jumping around as images load).
*   `loading="lazy"`: Tells the browser not to load the image until the user scrolls near it, saving bandwidth and improving initial page load time.

#### Figures and Figcaptions

For images that act as independent content (like diagrams, photos with captions, or illustrations), use the semantic `<figure>` and `<figcaption>` elements.

```html
<figure>
    <img src="architecture-diagram.png" alt="System architecture showing client-server interaction">
    <figcaption>Figure 1: High-level system architecture overview.</figcaption>
</figure>
```

---

## 4. Lists

HTML provides three ways to specify lists of information.

### Unordered Lists

An unordered list is a collection of related items that have no special order or sequence. By default, unordered list items are marked with bullets.

*   `<ul>` defines the unordered list.
*   `<li>` defines the list item.

```html
<h3>Grocery List</h3>
<ul>
    <li>Apples</li>
    <li>Bananas</li>
    <li>Milk</li>
    <li>Bread</li>
</ul>
```

### Ordered Lists

An ordered list is used when the sequence of items is important. By default, ordered list items are marked with numbers.

*   `<ol>` defines the ordered list.
*   `<li>` defines the list item.

```html
<h3>Steps to Bake a Cake</h3>
<ol>
    <li>Preheat the oven to 350°F.</li>
    <li>Mix dry ingredients in a bowl.</li>
    <li>Add wet ingredients and stir.</li>
    <li>Pour batter into a pan.</li>
    <li>Bake for 30 minutes.</li>
</ol>
```

**Attributes for `<ol>`:**
*   `type`: Changes the numbering type (`1` for numbers, `A` for uppercase letters, `a` for lowercase letters, `I` for uppercase Roman numerals, `i` for lowercase Roman numerals).
*   `start`: Specifies the starting value of the list.
*   `reversed`: Numbers the list backwards.

```html
<!-- List starting at D (A=1, B=2, C=3, D=4) -->
<ol type="A" start="4">
    <li>Item D</li>
    <li>Item E</li>
</ol>

<!-- Countdown -->
<ol reversed>
    <li>Gold</li>
    <li>Silver</li>
    <li>Bronze</li>
</ol>
```

### Nested Lists

Lists can be nested inside other lists. A list item (`<li>`) can contain a new list (`<ul>` or `<ol>`), along with text and other HTML elements.

```html
<h3>Web Development Skills</h3>
<ul>
    <li>Frontend
        <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
        </ul>
    </li>
    <li>Backend
        <ol>
            <li>Node.js</li>
            <li>Python</li>
            <li>Database Management</li>
        </ol>
    </li>
</ul>
```

### Description Lists

Description lists are used for name/value pairs, like terms and definitions in a dictionary.

*   `<dl>` defines the description list.
*   `<dt>` defines the description term (the name).
*   `<dd>` defines the description details (the value).

```html
<h3>Glossary</h3>
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language. The standard language for creating web pages.</dd>
    
    <dt>CSS</dt>
    <dd>Cascading Style Sheets. Used for describing the presentation of a document.</dd>
    
    <dt>API</dt>
    <dd>Application Programming Interface.</dd>
    <dd>A set of rules that allows different software entities to communicate.</dd>
</dl>
```

---

## 5. Tables

Tables allow web developers to arrange data into rows and columns. **Tables should only be used for tabular data, never for page layout.**

### Table Structure

*   `<table>`: The container for the table.
*   `<tr>`: Table Row.
*   `<th>`: Table Header (used instead of `<td>` for header cells; bold and centered by default).
*   `<td>`: Table Data (a standard cell).

```html
<table>
    <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
    </tr>
    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>30</td>
    </tr>
    <tr>
        <td>Jane</td>
        <td>Smith</td>
        <td>25</td>
    </tr>
</table>
```

### Advanced Table Structure (Semantic)

For complex tables, use semantic grouping tags. This improves accessibility and allows CSS to style sections independently (e.g., keeping a header fixed while the body scrolls).

*   `<thead>`: Groups the header content.
*   `<tbody>`: Groups the body content.
*   `<tfoot>`: Groups the footer content (e.g., totals).

```html
<table>
    <thead>
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Laptop</td>
            <td>1</td>
            <td>$999</td>
        </tr>
        <tr>
            <td>Mouse</td>
            <td>2</td>
            <td>$25</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <!-- Using colspan to merge cells -->
            <td colspan="2"><strong>Total</strong></td>
            <td><strong>$1049</strong></td>
        </tr>
    </tfoot>
</table>
```

### Colspan and Rowspan

You can merge adjacent cells using `colspan` (columns) and `rowspan` (rows).

```html
<table border="1"> <!-- Note: border attribute is outdated, use CSS instead -->
    <tr>
        <th>Name</th>
        <th colspan="2">Phone Numbers</th> <!-- Spans 2 columns -->
    </tr>
    <tr>
        <td>Alice</td>
        <td>555-1234</td>
        <td>555-5678</td>
    </tr>
    <tr>
        <td rowspan="2">Bob</td> <!-- Spans 2 rows downwards -->
        <td>555-9999</td>
        <td>(None)</td>
    </tr>
    <tr>
        <!-- The Bob cell is already taking up the first spot here -->
        <td>555-8888</td>
        <td>(None)</td>
    </tr>
</table>
```

### Accessibility in Tables (`scope`)

For screen readers to properly associate headers with data cells in complex tables, use the `scope` attribute on `<th>` elements.

```html
<table>
    <tr>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
    </tr>
    <tr>
        <th scope="row">Alice</th>
        <td>alice@example.com</td>
    </tr>
</table>
```

---

## 6. Forms

Forms are how you collect user input. They are crucial for interactive websites (login, registration, search, data entry).

### The `<form>` Element

The `<form>` element acts as a container for all the input controls.

*   `action`: Specifies the URL where the form data should be sent when submitted.
*   `method`: Specifies the HTTP method used to send the data.
    *   `GET`: Appends form data to the URL (e.g., `?name=john&age=30`). Used for non-sensitive data, like search queries. Can be bookmarked.
    *   `POST`: Sends data in the HTTP request body. Used for sensitive data (passwords) or large amounts of data. Cannot be bookmarked.

```html
<form action="/submit-data.php" method="POST">
    <!-- Form controls go here -->
</form>
```

### Labels and Accessibility

**Never create an input without a label.** Labels define what the input is for.

*   **Explicit Labeling (Recommended):** Use the `for` attribute on the `<label>` to match the `id` attribute on the `<input>`. Clicking the label will focus the input.

```html
<label for="username">Username:</label>
<input type="text" id="username" name="username">
```

*   **Implicit Labeling:** Wrap the input inside the label.

```html
<label>
    Email Address:
    <input type="email" name="user_email">
</label>
```

### The `<input>` Element

The `<input>` tag is the most versatile form element. Its appearance and behavior change drastically based on its `type` attribute.

**Common Text Inputs:**
```html
<form>
    <!-- Basic text -->
    <label for="fname">First Name:</label>
    <input type="text" id="fname" name="fname" placeholder="e.g. John"><br>

    <!-- Password (hides characters) -->
    <label for="pwd">Password:</label>
    <input type="password" id="pwd" name="pwd"><br>

    <!-- Email (mobile keyboards show '@' symbol; basic validation) -->
    <label for="email">Email:</label>
    <input type="email" id="email" name="email"><br>

    <!-- Number (mobile keyboards show numbers; arrow controls) -->
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" min="0" max="120" step="1"><br>

    <!-- Telephone (mobile keyboards show phone dialer) -->
    <label for="phone">Phone:</label>
    <input type="tel" id="phone" name="phone"><br>
    
    <!-- URL -->
    <label for="website">Website:</label>
    <input type="url" id="website" name="website"><br>
</form>
```

**Selection Inputs:**
```html
<form>
    <p>Choose your favorite language:</p>
    
    <!-- Radio Buttons (Select ONE option from a group) -->
    <!-- Group them by giving them the exact same 'name' attribute -->
    <input type="radio" id="html" name="fav_language" value="HTML">
    <label for="html">HTML</label><br>
    
    <input type="radio" id="css" name="fav_language" value="CSS">
    <label for="css">CSS</label><br>
    
    <input type="radio" id="js" name="fav_language" value="JavaScript">
    <label for="js">JavaScript</label><br>

    <hr>
    <p>Select your interests:</p>

    <!-- Checkboxes (Select ZERO OR MORE options) -->
    <input type="checkbox" id="coding" name="interests" value="Coding" checked>
    <label for="coding">Coding</label><br>
    
    <input type="checkbox" id="music" name="interests" value="Music">
    <label for="music">Music</label><br>
</form>
```

**Specialized Inputs:**
```html
<form>
    <!-- Color picker -->
    <label for="favcolor">Select your favorite color:</label>
    <input type="color" id="favcolor" name="favcolor" value="#ff0000"><br>

    <!-- Date picker -->
    <label for="bday">Birthday:</label>
    <input type="date" id="bday" name="bday"><br>

    <!-- Range slider -->
    <label for="vol">Volume (between 0 and 50):</label>
    <input type="range" id="vol" name="vol" min="0" max="50"><br>

    <!-- File upload -->
    <label for="myfile">Select a file:</label>
    <input type="file" id="myfile" name="myfile" accept=".pdf, .jpg"><br>
</form>
```

**Buttons:**
```html
<form>
    <!-- Submits the form data to the action URL -->
    <input type="submit" value="Submit Form">
    
    <!-- Resets all form inputs to their default values (rarely used nowadays) -->
    <input type="reset" value="Clear Form">
    
    <!-- Generic button, does nothing by default, usually hooked to JavaScript -->
    <input type="button" value="Click Me!" onclick="alert('Hello')">

    <!-- The modern <button> element is generally preferred over <input type="button"> 
         because it can contain child elements like icons. -->
    <button type="submit">
        <img src="send-icon.png" alt="" width="16"> Send Message
    </button>
</form>
```

### Other Form Controls

**Textarea (Multi-line Text):**
```html
<label for="message">Your Message:</label>
<textarea id="message" name="message" rows="4" cols="50" placeholder="Type here..."></textarea>
```

**Select (Dropdown List):**
```html
<label for="cars">Choose a car:</label>
<select id="cars" name="cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="fiat" selected>Fiat</option>
    <option value="audi">Audi</option>
</select>
```

**Grouping Options with Optgroup:**
```html
<label for="food">Choose food:</label>
<select id="food" name="food">
    <optgroup label="Fruits">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
    </optgroup>
    <optgroup label="Vegetables">
        <option value="carrot">Carrot</option>
        <option value="potato">Potato</option>
    </optgroup>
</select>
```

**Fieldset and Legend:**
Used to group related elements within a form, drawing a box around them.
```html
<form>
    <fieldset>
        <legend>Personal Information:</legend>
        <label for="fname">First name:</label>
        <input type="text" id="fname" name="fname"><br><br>
        <label for="lname">Last name:</label>
        <input type="text" id="lname" name="lname"><br><br>
    </fieldset>
</form>
```

### HTML5 Form Validation

HTML5 introduced native form validation, reducing the immediate need for JavaScript validation for basic checks.

*   `required`: The input cannot be empty.
*   `minlength` / `maxlength`: Minimum/maximum character count.
*   `min` / `max`: Minimum/maximum numerical value.
*   `pattern`: A regular expression the input's value must match.

```html
<form>
    <label for="username">Username (min 5 chars):</label>
    <input type="text" id="username" name="username" required minlength="5">

    <label for="zip">Zip Code (5 digits):</label>
    <input type="text" id="zip" name="zip" required pattern="[0-9]{5}" title="Five digit zip code">

    <button type="submit">Submit</button>
</form>
```

---

## 7. Semantic HTML

Semantic HTML refers to the use of HTML tags that convey the *meaning* of the content they contain, rather than just their presentation.

Before HTML5, developers relied heavily on `<div>` tags (which have no semantic meaning) combined with classes (e.g., `<div class="header">`). HTML5 introduced specific tags to describe the layout structure.

### Key Layout Tags

*   **`<header>`:** Represents introductory content, typically a group of introductory or navigational aids. Often contains the logo, site name, and top-level navigation.
*   **`<nav>`:** Represents a section of the page whose purpose is to provide navigation links (e.g., main menu, table of contents). Not all links need a `<nav>`, only major navigation blocks.
*   **`<main>`:** Represents the dominant, main content of the `<body>`. There should only be one `<main>` element visible in a document.
*   **`<article>`:** Represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable (e.g., a blog post, a news article, a forum post).
*   **`<section>`:** Represents a standalone section of functionality or content, typically with a heading. If it makes sense to syndicate the content, use `<article>`; otherwise, use `<section>`.
*   **`<aside>`:** Represents a portion of a document whose content is only indirectly related to the document's main content (e.g., sidebars, call-out boxes).
*   **`<footer>`:** Represents a footer for its nearest sectioning content or sectioning root element. Typically contains copyright data, related documents, or links.

### `<div>` vs `<span>`

These are non-semantic elements. They tell us nothing about their content.

*   **`<div>` (Division):** A block-level generic container. Use it when there is no other suitable semantic tag, primarily for styling or JavaScript grouping purposes.
*   **`<span>`:** An inline generic container. Used to wrap small portions of text or elements for styling without breaking the line.

```html
<!-- Semantic Example -->
<article>
    <header>
        <h2>The Importance of Semantic HTML</h2>
        <p>Published on <time datetime="2023-10-27">Oct 27, 2023</time></p>
    </header>
    <section>
        <p>Semantic HTML is crucial for modern web development.</p>
    </section>
    <footer>
        <p>Author: Jane Doe</p>
    </footer>
</article>

<!-- Non-Semantic Equivalent (AVOID IF POSSIBLE) -->
<div class="article">
    <div class="article-header">
        <div class="title">The Importance of Semantic HTML</div>
        <div class="date">Published on Oct 27, 2023</div>
    </div>
    <div class="article-content">
        <div class="paragraph">Semantic HTML is crucial for modern web development.</div>
    </div>
    <div class="article-footer">
        <div class="author">Author: Jane Doe</div>
    </div>
</div>
```

### Why is Semantic HTML Important?

1.  **Accessibility:** Screen readers use semantic tags as signposts to help visually impaired users navigate a page efficiently (e.g., skipping straight to the `<nav>` or `<main>` content).
2.  **SEO (Search Engine Optimization):** Search engine bots parse semantic tags to understand the context and importance of different parts of your content. Content inside an `<article>` is weighted differently than content in an `<aside>`.
3.  **Maintainability:** Code is much easier for humans to read and understand when it uses descriptive tags like `<header>` rather than endless nested `<div>`s (a problem known as "Divitis").

---

## 8. Multimedia

HTML5 introduced native tags for embedding audio and video, replacing the need for clunky third-party plugins like Flash.

### The `<audio>` Tag

Used to embed sound content in documents.

Attributes:
*   `controls`: Displays the browser's default play/pause, volume, and timeline controls.
*   `autoplay`: Starts playing the audio as soon as it's ready (Note: browsers severely restrict autoplay to prevent annoyance; it usually requires the `muted` attribute to work automatically).
*   `loop`: Restarts the audio automatically when it finishes.
*   `muted`: Mutes the audio by default.

```html
<audio controls>
    <!-- Provide multiple formats for cross-browser compatibility -->
    <source src="music.mp3" type="audio/mpeg">
    <source src="music.ogg" type="audio/ogg">
    <!-- Fallback text if the browser doesn't support the audio element -->
    Your browser does not support the audio element.
</audio>
```

### The `<video>` Tag

Used to embed video content.

Attributes: Same as audio (`controls`, `autoplay`, `loop`, `muted`), plus:
*   `poster`: An image to be shown while the video is downloading, or until the user hits the play button.
*   `width` / `height`: Dimensions of the video player.

```html
<video width="640" height="360" controls poster="video-thumbnail.jpg">
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.webm" type="video/webm">
    
    <!-- Subtitles/Captions -->
    <track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English" default>
    
    Your browser does not support the video tag.
</video>
```
*Note on `<track>`: Used for specifying subtitles, captions, or other text tracks for media.*

### The `<iframe>` Tag

An inline frame is used to embed another document within the current HTML document. This is commonly used for embedding Google Maps, YouTube videos, or external widgets.

```html
<iframe 
    src="https://www.google.com/maps/embed?pb=..." 
    width="600" 
    height="450" 
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy" 
    referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

---

## 9. HTML Attributes

Attributes provide additional information about HTML elements. They are always specified in the start tag and usually come in name/value pairs like `name="value"`.

### Global Attributes

Global attributes can be used on *any* HTML element.

*   `class`: Specifies one or more classnames for an element. Multiple classes are separated by spaces. Used primarily to link the element to CSS styling or JavaScript.
    *   `<p class="highlight text-center">`
*   `id`: Specifies a unique id for an element. **An ID must be unique within the entire HTML document.** Used as a CSS selector, for JavaScript targeting (`document.getElementById()`), and as anchor link targets.
    *   `<div id="main-content">`
*   `style`: Used to add inline CSS styles to an element. (Generally, inline styles are discouraged in favor of external stylesheets for maintainability).
    *   `<p style="color: red; font-size: 20px;">`
*   `title`: Provides extra information about an element, typically displayed as a tooltip when the user hovers the mouse over the element.
    *   `<abbr title="World Health Organization">WHO</abbr>`
*   `hidden`: A boolean attribute indicating that the element is not yet, or is no longer, relevant. The browser won't render it.
    *   `<div hidden>You cannot see me.</div>`
*   `tabindex`: Indicates if its element can be focused, and if/where it participates in sequential keyboard navigation.
*   `contenteditable`: Specifies whether the content of an element is editable by the user.

### Custom Data Attributes (`data-*`)

HTML5 allows you to store custom data privately to the page or application using the `data-*` attributes.

```html
<article
  id="electric-cars"
  data-columns="3"
  data-index-number="12314"
  data-parent="cars">
...
</article>
```
These are incredibly useful in JavaScript. You can access them via the `dataset` property:
`let article = document.getElementById('electric-cars');`
`let cols = article.dataset.columns; // returns "3"`

### Boolean Attributes

Some attributes do not need a value. Their mere presence implies "true," and their absence implies "false."

*   `disabled` (on inputs/buttons)
*   `checked` (on checkboxes/radio buttons)
*   `readonly` (on inputs)
*   `required` (on inputs)

```html
<!-- Valid ways to write a boolean attribute -->
<input type="checkbox" checked>
<input type="text" disabled>
<!-- Also technically valid but redundant -->
<input type="checkbox" checked="checked">
```

---

## 10. Accessibility (a11y Basics)

Web Accessibility (often abbreviated as a11y, because there are 11 letters between 'a' and 'y') means designing and developing websites so that people with disabilities can use them.

HTML is the absolute foundation of accessibility.

### Core Principles of HTML Accessibility

1.  **Use Semantic HTML:** As discussed in Section 7, using `<nav>`, `<main>`, `<button>`, etc., provides automatic structural information to screen readers.
2.  **Alt Text on Images:** Every `<img>` tag must have an `alt` attribute. If the image is purely decorative, use an empty alt tag (`alt=""`) so screen readers ignore it rather than reading the filename.
3.  **Proper Heading Structure:** Screen reader users often navigate by jumping from heading to heading. Headings must follow a logical hierarchy (`<h1>` to `<h2>` to `<h3>`), without skipping levels.
4.  **Descriptive Link Text:** Avoid "Click Here" or "Read More". The link text itself should describe the destination.
    *   *Bad:* `<a href="/report">Click here</a> to view the report.`
    *   *Good:* `View the <a href="/report">Q3 Financial Report</a>.`
5.  **Form Labels:** Ensure every input has a `<label>`. Screen readers cannot determine what a lone text box is for without an explicitly associated label.
6.  **Keyboard Navigability:** Users with motor disabilities may not use a mouse. Your site must be entirely navigable using the `Tab` key. Native interactive elements (buttons, links, inputs) are automatically keyboard focusable. If you build a custom interactive element (e.g., a clickable `<div>`), you must manage focus using `tabindex` and JavaScript (though this is highly discouraged; just use a `<button>`).

### ARIA (Accessible Rich Internet Applications)

Sometimes native HTML isn't enough for complex, custom widgets (like a custom dropdown or tabbed interface). WAI-ARIA (often just called ARIA) provides attributes to bridge this gap.

**Rule #1 of ARIA: No ARIA is better than bad ARIA. Native HTML is always preferred.**

Common ARIA attributes:
*   `aria-label`: Provides a label for an element if there is no visible text.
    *   `<button aria-label="Close dialog">X</button>`
*   `aria-hidden="true"`: Hides an element from screen readers (even if it's visually displayed). Useful for decorative icons next to text.
*   `aria-expanded`: Indicates whether a collapsible menu or panel is currently open (`true`) or closed (`false`).

---

## 11. SEO Basics in HTML

Search Engine Optimization (SEO) ensures your website is easily discoverable by search engines like Google. Proper HTML structure is critical for on-page SEO.

1.  **The `<title>` Tag:** This is the most important SEO element on your page. It dictates the clickable link in search engine results. It should be unique for every page and accurately describe the content (typically under 60 characters).
2.  **Meta Description:** `<meta name="description" content="...">`. This provides the summary text beneath the title in search results. It doesn't directly impact rankings, but a compelling description significantly improves Click-Through Rates (CTR).
3.  **One `<h1>` per Page:** The `<h1>` tag tells the search engine the primary topic of the page. Use it exactly once, and ensure it contains your primary keywords.
4.  **Semantic Structure:** Use `<article>`, `<main>`, and `<section>` so search engines know exactly which parts of the page contain the core content versus sidebars or footers.
5.  **Image Alt Text:** Search engines cannot "see" images. The `alt` text tells Google Image Search what the picture is about.
6.  **Canonical Links:** If you have duplicate content on different URLs, a canonical link tells search engines which is the "master" version to index.
    *   `<link rel="canonical" href="https://example.com/original-page">`

---

## 12. Best Practices

To write professional, maintainable, and clean HTML, follow these rules:

### Clean Structure and Formatting

*   **Indentation:** Consistently indent nested elements. Usually, 2 or 4 spaces are used per indentation level. This makes visualizing the DOM tree much easier.
*   **Lowercase:** Always use lowercase for element names and attributes (`<p>`, not `<P>`). This is the industry standard and looks cleaner.
*   **Quote Attributes:** Always enclose attribute values in double quotes.
    *   *Bad:* `<input type=text required>`
    *   *Good:* `<input type="text" required="required">`

### Separation of Concerns

*   **No Inline Styles:** Avoid the `style` attribute. Move all styling to an external CSS file.
*   **No Inline Scripts:** Avoid attributes like `onclick` or `onmouseover`. Attach event listeners in an external JavaScript file.
*   HTML should handle **Content and Structure only**.

### Maintainability

*   **Comments:** Use comments `<!-- Comment here -->` to explain complex sections of markup or to visually divide large files.
*   **Meaningful Naming:** Give `id` and `class` attributes semantic, meaningful names.
    *   *Bad:* `<div class="red-text big-box">` (What if the design changes to blue?)
    *   *Good:* `<div class="alert-message warning">` (Describes the *purpose*).

---

## 13. Common Mistakes to Avoid

1.  **Forgetting to Close Tags:** While HTML5 is forgiving, failing to close tags (like leaving a `<p>` or `<div>` open) can cause catastrophic layout breakage, especially in complex layouts.
2.  **Using Block Elements inside Inline Elements:** An inline element (like `<span>` or `<a>`) should generally not contain a block-level element (like `<div>` or `<h1>`).
    *   *Invalid:* `<span><h1>Title</h1></span>`
    *   *Valid:* `<h1><span>Title</span></h1>`
    *   *(Exception: HTML5 allows `<a>` tags to wrap block-level elements like whole cards).*
3.  **Divitis:** Using `<div class="header">` instead of `<header>`. Default to semantic tags whenever possible.
4.  **Missing `alt` Attributes:** Never omit the `alt` attribute on an `<img>` tag.
5.  **Using Tables for Layout:** Before CSS was robust, tables were used to structure page columns. Never do this today. Use CSS Flexbox or CSS Grid. Tables are strictly for tabular data.
6.  **Multiple `<h1>` Tags:** Blurs the primary topic of the page for SEO and screen readers.
7.  **Omitting the DOCTYPE:** Triggers quirks mode, making your CSS behave unpredictably across different browsers.

---

## 14. Real-world Examples

### Example 1: A Semantic Blog Post Layout

This example demonstrates how a modern, semantic HTML5 page is structured. Notice the logical flow, semantic tags, and separation of content areas.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A blog post explaining semantic HTML.">
    <title>Understanding Semantic HTML | Tech Blog</title>
</head>
<body>

    <!-- Site Header -->
    <header>
        <h1>My Awesome Tech Blog</h1>
        <nav aria-label="Main Navigation">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/articles">Articles</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <!-- Main Content Area -->
    <main>
        <!-- The self-contained article -->
        <article>
            <header>
                <h2>Why Semantic HTML is a Game Changer</h2>
                <p>By <strong>Jane Webdev</strong> | <time datetime="2023-11-01">November 1, 2023</time></p>
            </header>

            <figure>
                <img src="html-code-screenshot.png" alt="A screenshot of well-formatted HTML code in an editor">
                <figcaption>Clean, readable code is a developer's best friend.</figcaption>
            </figure>

            <section>
                <h3>The Days of Divitis</h3>
                <p>In the early days of web development, we wrapped everything in <code>&lt;div&gt;</code> tags. It made the code hard to read and terrible for screen readers.</p>
            </section>

            <section>
                <h3>The Modern Approach</h3>
                <p>Now, we use tags that describe their content. This improves accessibility, SEO, and developer experience.</p>
                <ul>
                    <li><code>&lt;header&gt;</code> for introductory content.</li>
                    <li><code>&lt;main&gt;</code> for the core content.</li>
                    <li><code>&lt;footer&gt;</code> for concluding data.</li>
                </ul>
            </section>
        </article>
        
        <!-- Related Content Sidebar -->
        <aside>
            <h3>Related Articles</h3>
            <ul>
                <li><a href="/css-grid">Mastering CSS Grid</a></li>
                <li><a href="/a11y-basics">A11y Basics Every Dev Should Know</a></li>
            </ul>
        </aside>
    </main>

    <!-- Site Footer -->
    <footer>
        <p>&copy; 2023 My Awesome Tech Blog. All rights reserved.</p>
        <nav aria-label="Footer Navigation">
            <ul>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
            </ul>
        </nav>
    </footer>

</body>
</html>
```

### Example 2: A Comprehensive Registration Form

This form demonstrates best practices for user input: logical grouping, explicit labels, appropriate input types for mobile keyboards, native HTML5 validation, and accessibility.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Registration</title>
</head>
<body>

    <main>
        <h1>Create Your Account</h1>
        <p>Please fill out the form below to register. Fields marked with an asterisk (*) are required.</p>

        <!-- Form sends a POST request to a secure endpoint -->
        <form action="/api/register" method="POST">
            
            <!-- Grouping Account Info -->
            <fieldset>
                <legend>Account Details</legend>
                
                <div>
                    <label for="username">Username *</label>
                    <input type="text" id="username" name="username" required minlength="4" aria-describedby="username-hint">
                    <small id="username-hint">Must be at least 4 characters long.</small>
                </div>

                <div>
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" required placeholder="you@example.com">
                </div>

                <div>
                    <label for="password">Password *</label>
                    <input type="password" id="password" name="password" required minlength="8">
                </div>
            </fieldset>

            <!-- Grouping Personal Info -->
            <fieldset>
                <legend>Personal Information</legend>

                <div>
                    <label for="dob">Date of Birth</label>
                    <input type="date" id="dob" name="dob">
                </div>

                <div>
                    <label for="country">Country of Residence</label>
                    <select id="country" name="country">
                        <option value="">-- Please Select --</option>
                        <option value="us">United States</option>
                        <option value="ca">Canada</option>
                        <option value="uk">United Kingdom</option>
                        <option value="au">Australia</option>
                    </select>
                </div>
            </fieldset>

            <!-- Grouping Preferences using Checkboxes/Radios -->
            <fieldset>
                <legend>Preferences</legend>

                <p>Would you like to subscribe to our newsletter?</p>
                <div>
                    <input type="radio" id="news-yes" name="newsletter" value="yes" checked>
                    <label for="news-yes">Yes, keep me updated.</label>
                </div>
                <div>
                    <input type="radio" id="news-no" name="newsletter" value="no">
                    <label for="news-no">No, thank you.</label>
                </div>

                <div style="margin-top: 15px;">
                    <input type="checkbox" id="terms" name="terms" required>
                    <label for="terms">I agree to the <a href="/terms" target="_blank">Terms and Conditions</a> *</label>
                </div>
            </fieldset>

            <!-- Submission Area -->
            <div style="margin-top: 20px;">
                <button type="submit">Complete Registration</button>
            </div>

        </form>
    </main>

</body>
</html>
```

---

## Conclusion

HTML is an elegant and powerful language. By mastering the fundamentals outlined in this guide—especially semantic tagging, proper document structure, and accessibility best practices—you will be well on your way to building robust, user-friendly, and modern web applications. The next step in your journey is to pair this structural knowledge with CSS to bring your designs to life!
