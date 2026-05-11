# MongoDB and Mongoose Notes

## 1. MongoDB + Mongoose

MongoDB is a NoSQL document database. Mongoose is an ODM that adds structure and modeling to MongoDB data in Node.js applications.

### CRUD
CRUD stands for:
- Create
- Read
- Update
- Delete

#### MongoDB CRUD Idea
- insert documents
- query documents
- update documents
- delete documents

### Schemas
- A schema defines the shape of a document.
- Mongoose schemas add structure, rules, defaults, and validation.

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});
```

### Models
- A model is a compiled version of a schema.
- Models are used to create and query documents.

```js
const User = mongoose.model("User", userSchema);
```

### Validations
Validation helps protect data quality.

Common options:
- `required`
- `unique`
- `min`
- `max`
- `enum`
- `trim`
- `lowercase`
- custom validators

```js
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 }
});
```

### Population
- Population replaces referenced IDs with full documents.
- Useful for relationships between collections.

```js
Post.find().populate("author");
```

### MongoDB Relationships
Common relationship styles:
- one-to-one
- one-to-many
- many-to-many

#### Embedded vs Referenced
- Embedded data is stored inside one document.
- Referenced data points to another document by ID.

#### When to Embed
- data is tightly coupled
- data is read together often
- document size remains reasonable

#### When to Reference
- data is shared
- relationships are many-to-many
- documents would grow too large

### Indexes
- Indexes improve query speed.
- They trade memory and write overhead for faster reads.

#### Intro Notes
- Common fields to index are email, username, and lookup keys.
- Unique indexes help enforce uniqueness.

```js
userSchema.index({ email: 1 }, { unique: true });
```

### Aggregation
Aggregation is MongoDB's data processing pipeline.

Common stages:
- `$match`
- `$group`
- `$project`
- `$sort`
- `$limit`
- `$lookup`

```js
Model.aggregate([
  { $match: { active: true } },
  { $group: { _id: "$category", count: { $sum: 1 } } }
]);
```

### Mongoose Best Practices
- keep schemas focused
- validate at the schema level
- use population only when needed
- index fields used in frequent lookups
- keep relationship design simple at first

---

## 2. SQL Basics

SQL is used to work with relational databases.

### Core Commands
- `SELECT`: read data
- `INSERT`: add data
- `UPDATE`: modify data
- `DELETE`: remove data

```sql
SELECT * FROM users;
INSERT INTO users (name, email) VALUES ('Ava', 'ava@example.com');
UPDATE users SET name = 'Mia' WHERE id = 1;
DELETE FROM users WHERE id = 1;
```

### Joins
Joins combine rows from multiple tables.

Common join types:
- `INNER JOIN`
- `LEFT JOIN`
- `RIGHT JOIN`
- `FULL JOIN`

### Normalization
- Normalization organizes data to reduce redundancy.
- It improves consistency and update safety.

Common ideas:
- separate repeated data into related tables
- use foreign keys for relationships
- avoid unnecessary duplication

### SQL vs NoSQL
Use SQL when:
- data is highly structured
- relationships are important
- transactions matter
- reporting and joins are common

Use NoSQL when:
- schema changes often
- nested document-style data fits naturally
- rapid iteration matters
- horizontal scaling and flexible documents are priorities

### SQL Mindset
- define tables carefully
- use keys and constraints
- filter with `WHERE`
- join instead of duplicating unrelated data

---

## 3. REST API Mastery

REST APIs expose resources over HTTP.

### CRUD Routes
- `GET /items` for reading all items
- `GET /items/:id` for reading one item
- `POST /items` for creation
- `PUT /items/:id` for replacing
- `PATCH /items/:id` for partial update
- `DELETE /items/:id` for deletion

### Versioning
Versioning prevents breaking existing clients when the API changes.

Common styles:
- URI versioning: `/api/v1/users`
- Header versioning
- query parameter versioning

### Pagination
Pagination returns data in chunks.

Common query params:
- `page`
- `limit`
- `offset`

```js
GET /users?page=2&limit=10
```

### Filtering
Filtering narrows results by field values.

```js
GET /products?category=shoes&status=active
```

### Searching
Search usually matches text broadly or partially.

```js
GET /users?search=ava
```

### REST Good Practices
- keep routes resource-oriented
- use HTTP methods consistently
- return useful status codes
- include validation errors clearly
- design for predictable client behavior

---

## 4. EJS Templating

EJS is a simple server-side templating engine for embedding JavaScript into HTML.

### Basic Usage
- EJS lets you render dynamic HTML on the server.
- It is often used with Express.

```ejs
<h1>Hello, <%= name %></h1>
```

### Loops
```ejs
<ul>
  <% items.forEach(item => { %>
    <li><%= item %></li>
  <% }) %>
</ul>
```

### Conditionals
```ejs
<% if (user) { %>
  <p>Welcome back, <%= user.name %></p>
<% } else { %>
  <p>Please log in</p>
<% } %>
```

### Layouts
- Layouts help reuse page structure like headers and footers.
- They keep templates consistent.
- Common tools or patterns may be used to simulate layouts if not built in.

### Form Handling
EJS is often used to render forms and display validation feedback.

#### Typical Ideas
- prefill input values
- show errors next to fields
- preserve submitted data after validation fails

```ejs
<input name="email" value="<%= email || '' %>">
<% if (error) { %>
  <p><%= error %></p>
<% } %>
```

### EJS Notes
- `<% %>` runs JavaScript logic.
- `<%= %>` outputs escaped HTML.
- `<%- %>` outputs unescaped HTML, so use it carefully.

