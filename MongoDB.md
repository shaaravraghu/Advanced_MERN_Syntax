# Comprehensive MongoDB Study Guide: From Beginner to Intermediate

Welcome to the definitive guide on MongoDB. This comprehensive document is designed to take you from a fundamental understanding of NoSQL databases to a confident, intermediate level of proficiency with MongoDB. 

This guide focuses on practical knowledge, real-world application, and deep conceptual understanding, covering everything from basic CRUD operations to schema design, aggregation, and integration with Node.js.

---

## Table of Contents
1. [Introduction to MongoDB](#1-introduction-to-mongodb)
2. [Core Concepts](#2-core-concepts)
3. [Setup and Installation](#3-setup-and-installation)
4. [CRUD Operations](#4-crud-operations)
5. [Querying Data](#5-querying-data)
6. [Indexing](#6-indexing)
7. [Aggregation Framework](#7-aggregation-framework)
8. [Schema Design](#8-schema-design)
9. [Relationships in MongoDB](#9-relationships-in-mongodb)
10. [Data Validation](#10-data-validation)
11. [Performance Optimization](#11-performance-optimization)
12. [Security Basics](#12-security-basics)
13. [MongoDB with Node.js](#13-mongodb-with-nodejs)
14. [Best Practices](#14-best-practices)
15. [Common Mistakes](#15-common-mistakes)
16. [Real-world Examples](#16-real-world-examples)

---

## 1. Introduction to MongoDB

### What is MongoDB?
MongoDB is a highly popular, open-source, non-relational database management system (often categorized under "NoSQL"). Instead of using tables and rows as in traditional relational databases, MongoDB uses collections and documents. Documents consist of key-value pairs which are the basic unit of data in MongoDB. Collections contain sets of documents and function as the equivalent of relational database tables.

Key features of MongoDB include:
- **Document-Oriented:** Data is stored in flexible, JSON-like documents.
- **High Performance:** Support for embedded data models reduces I/O activity on database systems.
- **Rich Query Language:** Supports complex queries, aggregations, and text search.
- **High Availability:** MongoDB's replica sets provide automatic failover and data redundancy.
- **Horizontal Scalability:** Sharding distributes data across a cluster of machines.

### NoSQL vs. SQL Database Comparison

Understanding the difference between SQL (Relational) and NoSQL (Non-Relational) is critical for architectural decisions.

| Feature | SQL (e.g., PostgreSQL, MySQL) | NoSQL (MongoDB) |
| :--- | :--- | :--- |
| **Data Structure** | Table-based (Rows and Columns) | Document-based (Key-Value, JSON-like) |
| **Schema** | Rigid, pre-defined schema. | Dynamic, flexible schema. |
| **Scaling** | Vertically scalable (add more CPU/RAM). | Horizontally scalable (add more servers/sharding). |
| **Transactions**| ACID compliant (historically stronger). | Supports ACID (multi-document transactions added in v4.0). |
| **Queries** | SQL (Structured Query Language). | MongoDB Query Language (MQL - object-based). |
| **Relationships**| Defined by primary/foreign keys (JOINs). | Embedded documents or references ($lookup). |

### When to use MongoDB

MongoDB is an excellent choice when:
1. **You are building an application with rapidly changing requirements:** The flexible schema allows you to modify the data structure without downtime or complex migrations.
2. **You are handling large volumes of unstructured or semi-structured data:** E-commerce product catalogs, content management systems, and IoT telemetry data fit perfectly into the document model.
3. **You need horizontal scalability:** When your data volume or throughput needs exceed the capacity of a single server, MongoDB's native sharding makes scaling out straightforward.
4. **You are using a Javascript/JSON heavy stack (MEAN/MERN):** Storing data in JSON-like formats maps seamlessly to frontend and backend Javascript objects, eliminating the need for complex ORM mapping layers.

### When NOT to use MongoDB

MongoDB might not be the best choice when:
1. **Your data is highly relational:** If your application relies heavily on deep, complex JOIN operations across dozens of tables, a traditional RDBMS like PostgreSQL will perform better.
2. **You require strict, complex ACID transactions across multiple systems:** While MongoDB supports multi-document transactions, relational databases have decades of optimization for complex transactional workloads (e.g., core banking systems).

---

## 2. Core Concepts

To work effectively with MongoDB, you must understand its hierarchy and data formatting.

### Database, Collections, Documents

MongoDB structures data in a specific hierarchy:

1. **Database:** The highest level container. A single MongoDB server can host multiple databases. Each database has its own set of files on the file system.
   - *SQL Equivalent:* Database

2. **Collection:** A grouping of MongoDB documents. A collection exists within a single database. Collections do not enforce a schema (though validation rules can be applied). This means documents within the same collection can have different fields.
   - *SQL Equivalent:* Table

3. **Document:** A record in a MongoDB collection. It represents a single entity and consists of field-and-value pairs.
   - *SQL Equivalent:* Row

4. **Field:** A name-value pair within a document.
   - *SQL Equivalent:* Column

### BSON Format

While we interact with MongoDB using JSON (JavaScript Object Notation), internally, MongoDB stores data in a format called **BSON** (Binary JSON).

BSON extends the JSON model to provide additional data types, ordered fields, and to be highly efficient for encoding and decoding within different languages.

**Common BSON Data Types:**
- `String`: Most common for storing text. Must be UTF-8 valid.
- `Integer`: Used to store numerical values (32-bit or 64-bit depending on the server).
- `Boolean`: `true` or `false`.
- `Double`: Floating point values.
- `Min/Max keys`: Used to compare values against the lowest and highest BSON elements.
- `Arrays`: Sets of values or lists (`[1, 2, 3]`).
- `Object`: Embedded documents (`{ address: { city: "NY" } }`).
- `Null`: Null values.
- `Date`: Stores the current date or time in UNIX time format (64-bit integer representing milliseconds since epoch).
- `ObjectId`: A unique identifier for the document, generated automatically if not provided.

#### The `_id` Field
Every MongoDB document requires an `_id` field. It acts as the primary key. If you insert a document without an `_id` field, MongoDB will automatically generate an `ObjectId` for it.

An `ObjectId` is a 12-byte alphanumeric string consisting of:
- A 4-byte timestamp (seconds since Unix epoch)
- A 5-byte random value generated once per process
- A 3-byte incrementing counter, initialized to a random value

---

## 3. Setup and Installation

### MongoDB Atlas (Recommended for Beginners)
MongoDB Atlas is the fully managed cloud database service developed by the creators of MongoDB. It is the easiest way to get started without installing anything locally.
1. Go to mongodb.com/atlas and create an account.
2. Build a new Cluster (the free shared cluster is sufficient for learning).
3. Under "Database Access", create a database user and password.
4. Under "Network Access", allow access from anywhere (`0.0.0.0/0`) for development purposes.
5. Click "Connect" to get your connection string.

### Local Installation
You can run MongoDB locally using MongoDB Community Edition.

**Windows/macOS:**
1. Download the installer from the official MongoDB website.
2. Follow the installation wizard.
3. Install **MongoDB Compass** (a graphical user interface for MongoDB) when prompted.

**Docker (Developer Favorite):**
If you have Docker installed, you can spin up a MongoDB instance in seconds:
```bash
docker run --name my-mongo -p 27017:27017 -d mongo
```

### MongoDB Shell (mongosh)
The MongoDB Shell is a fully functional JavaScript and Node.js 14.x REPL environment for interacting with MongoDB deployments. 

Connect to local instance:
```bash
mongosh
```

Connect to Atlas instance:
```bash
mongosh "mongodb+srv://cluster0.example.mongodb.net/myFirstDatabase" --apiVersion 1 --username <your_username>
```

---

## 4. CRUD Operations

CRUD stands for Create, Read, Update, and Delete. These are the four basic functions of persistent storage.

Let's assume we have a database named `library` and a collection named `books`. In the shell, switch to the database:
```javascript
use library
```

### Create (Insert)

To add new documents to a collection, we use insert operations. If the collection does not exist, MongoDB creates it.

**1. `insertOne()`**
Inserts a single document into a collection.

```javascript
db.books.insertOne({
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
    genres: ["Fantasy", "Adventure"],
    publishedYear: 1937,
    available: true
})
```
*Returns:* A document containing `acknowledged: true` and the `insertedId`.

**2. `insertMany()`**
Inserts multiple documents into a collection.

```javascript
db.books.insertMany([
    {
        title: "1984",
        author: "George Orwell",
        pages: 328,
        genres: ["Dystopian", "Sci-Fi"],
        publishedYear: 1949,
        available: false
    },
    {
        title: "Dune",
        author: "Frank Herbert",
        pages: 412,
        genres: ["Sci-Fi", "Adventure"],
        publishedYear: 1965,
        available: true
    }
])
```

### Read (Find)

Reading data is done using the `find()` and `findOne()` methods.

**1. `find()`**
Selects documents in a collection and returns a cursor to the selected documents. By default, an empty `find()` returns all documents.

```javascript
// Return all books
db.books.find()

// Return books by a specific author
db.books.find({ author: "George Orwell" })
```

**2. `findOne()`**
Returns a single document that satisfies the specified query criteria. If multiple documents satisfy the query, this method returns the first document according to the natural order which reflects the order of documents on the disk.

```javascript
db.books.findOne({ available: true })
```

### Update

Updating allows modifying existing documents. Update operations take a filter to select the document(s) and an update document containing update operators.

**1. `updateOne()`**
Updates a single document that matches the filter.

```javascript
// Update the 'available' status of "1984"
db.books.updateOne(
    { title: "1984" }, // Filter
    { $set: { available: true } } // Update operator
)
```

**2. `updateMany()`**
Updates all documents that match the filter.

```javascript
// Mark all "Sci-Fi" books as unavailable
db.books.updateMany(
    { genres: "Sci-Fi" },
    { $set: { available: false } }
)
```

**3. `replaceOne()`**
Replaces the entire document matching the filter with a completely new document (except for the `_id`).

```javascript
db.books.replaceOne(
    { title: "Dune" },
    {
        title: "Dune: Special Edition",
        author: "Frank Herbert",
        pages: 450
        // Notice we omitted genres, publishedYear, and available. 
        // They are completely removed in the replacement document.
    }
)
```

### Delete

Removing documents from collections.

**1. `deleteOne()`**
Deletes the first document that matches the filter.

```javascript
db.books.deleteOne({ title: "The Hobbit" })
```

**2. `deleteMany()`**
Deletes all documents that match the filter.

```javascript
// Delete all books published before 1950
db.books.deleteMany({ publishedYear: { $lt: 1950 } })
```

---

## 5. Querying Data

MongoDB provides a powerful and expressive query language. You use query operators to perform advanced searches.

### Comparison Operators

Used to compare values.

- `$eq`: Matches values that are equal to a specified value.
- `$gt`: Matches values that are greater than a specified value.
- `$gte`: Matches values that are greater than or equal to a specified value.
- `$lt`: Matches values that are less than a specified value.
- `$lte`: Matches values that are less than or equal to a specified value.
- `$ne`: Matches all values that are not equal to a specified value.
- `$in`: Matches any of the values specified in an array.
- `$nin`: Matches none of the values specified in an array.

**Examples:**
```javascript
// Find books with more than 300 pages
db.books.find({ pages: { $gt: 300 } })

// Find books in the Sci-Fi OR Fantasy genre
db.books.find({ genres: { $in: ["Sci-Fi", "Fantasy"] } })

// Find books published between 1950 and 2000
db.books.find({ publishedYear: { $gte: 1950, $lte: 2000 } })
```

### Logical Operators

Used to combine multiple query conditions.

- `$and`: Joins query clauses with a logical AND.
- `$or`: Joins query clauses with a logical OR.
- `$not`: Inverts the effect of a query expression.
- `$nor`: Joins query clauses with a logical NOR.

**Examples:**
```javascript
// Explicit $and (though comma separation implies AND implicitly)
db.books.find({ 
    $and: [
        { pages: { $gt: 300 } },
        { available: true }
    ]
})

// Find books that are EITHER Sci-Fi OR have less than 200 pages
db.books.find({
    $or: [
        { genres: "Sci-Fi" },
        { pages: { $lt: 200 } }
    ]
})
```

### Element and Array Operators

- `$exists`: Matches documents that have the specified field.
- `$type`: Selects documents if a field is of the specified type.
- `$all`: Matches arrays that contain all elements specified in the query.
- `$size`: Selects documents if the array field is a specified size.
- `$elemMatch`: Selects documents if element in the array field matches all the specified `$elemMatch` conditions.

**Examples:**
```javascript
// Find books where the 'translator' field exists
db.books.find({ translator: { $exists: true } })

// Find books that have EXACTLY 2 genres listed
db.books.find({ genres: { $size: 2 } })

// Find books where genres array contains both "Fantasy" and "Magic"
db.books.find({ genres: { $all: ["Fantasy", "Magic"] } })
```

### Projection

Projection determines which fields are returned in the matching documents. This is crucial for optimizing bandwidth and memory. By default, MongoDB returns all fields.

Syntax: `db.collection.find({ query }, { projection })`

- `1` or `true` includes the field.
- `0` or `false` excludes the field.

```javascript
// Return ONLY title and author. 
// _id is included by default unless explicitly excluded.
db.books.find({ pages: { $gt: 300 } }, { title: 1, author: 1 })

// Return title and author, explicitly exclude _id
db.books.find({ pages: { $gt: 300 } }, { _id: 0, title: 1, author: 1 })
```

### Sorting, Skipping, and Limiting

Often, you don't just want data; you want it paginated and ordered.

- `.sort()`: Orders the results. `1` is ascending, `-1` is descending.
- `.limit()`: Restricts the number of documents returned.
- `.skip()`: Skips a specified number of documents (used for pagination).

```javascript
// Get the top 5 longest books, sorted by pages descending
db.books.find()
    .sort({ pages: -1 })
    .limit(5)

// Pagination: Page 2 (assuming 10 items per page)
db.books.find()
    .sort({ publishedYear: 1 })
    .skip(10) // Skip page 1
    .limit(10) // Take page 2
```

---

## 6. Indexing (Basic Intro)

Indexes support the efficient execution of queries in MongoDB. Without indexes, MongoDB must perform a *collection scan*, i.e., scan every document in a collection, to select those documents that match the query statement. If an appropriate index exists, MongoDB uses the index to limit the number of documents it must inspect.

### The Concept
Think of an index like the index at the back of a book. Instead of reading the whole book to find where "MongoDB" is mentioned, you look at the index, which tells you the exact page number.

### Creating an Index

**1. Single Field Index**
```javascript
// Create an index on the 'author' field in ascending order
db.books.createIndex({ author: 1 })
```

**2. Compound Index**
Indexes multiple fields. The order of fields matters (Index Prefix Rule).
```javascript
// Index on author (ascending) and publishedYear (descending)
db.books.createIndex({ author: 1, publishedYear: -1 })
```
*Note:* This index helps queries searching for `author` AND `publishedYear`, or just `author`. It does NOT efficiently help queries searching *only* for `publishedYear`.

**3. Unique Index**
Ensures no two documents have the same value for the indexed field.
```javascript
db.users.createIndex({ email: 1 }, { unique: true })
```

### Viewing and Dropping Indexes

```javascript
// View all indexes on a collection
db.books.getIndexes()

// Drop an index
db.books.dropIndex("author_1") // drop by name
```

### Query Plan (`explain()`)
To see if your query is using an index, use the `.explain()` method.
```javascript
db.books.find({ author: "George Orwell" }).explain("executionStats")
```
Look for `totalDocsExamined` vs `nReturned`. If `totalDocsExamined` is massive and `nReturned` is small, you likely need an index. You want to see `IXSCAN` (Index Scan) rather than `COLLSCAN` (Collection Scan).

---

## 7. Aggregation Framework (Basic Idea)

The Aggregation Framework is an advanced way to query data. It processes data records and returns computed results. 

It is modeled on the concept of data processing pipelines. Documents enter a multi-stage pipeline that transforms the documents into aggregated results.

### Core Pipeline Stages

- `$match`: Filters the documents (similar to `find()`). Place this as early as possible to reduce the pipeline workload.
- `$group`: Groups input documents by a specified identifier expression and applies accumulator expressions (like sum, avg).
- `$project`: Reshapes each document in the stream (adds, removes, or renames fields).
- `$sort`: Reorders the document stream.
- `$limit`: Passes the first n documents unmodified to the pipeline.
- `$lookup`: Performs a left outer join to an unsharded collection in the same database.
- `$unwind`: Deconstructs an array field from the input documents to output a document for each element.

### Aggregation Examples

**Example 1: Average pages per author**
```javascript
db.books.aggregate([
    // Stage 1: Group by author and calculate average pages
    {
        $group: {
            _id: "$author", // The grouping key
            averagePages: { $avg: "$pages" },
            totalBooks: { $sum: 1 }
        }
    },
    // Stage 2: Sort by average pages descending
    {
        $sort: { averagePages: -1 }
    }
])
```

**Example 2: Complex reporting**
Find authors who have written more than 2 Sci-Fi books, and return only the author name and count.
```javascript
db.books.aggregate([
    // 1. Filter for Sci-Fi books only
    { $match: { genres: "Sci-Fi" } },
    
    // 2. Group by author, counting the books
    { 
        $group: { 
            _id: "$author", 
            sciFiBookCount: { $sum: 1 } 
        } 
    },
    
    // 3. Filter the grouped results (HAVING clause in SQL)
    { $match: { sciFiBookCount: { $gt: 2 } } },
    
    // 4. Clean up the output structure
    { 
        $project: { 
            _id: 0, // Remove original _id
            authorName: "$_id", // Rename _id to authorName
            bookCount: "$sciFiBookCount" 
        } 
    }
])
```

---

## 8. Schema Design

Unlike SQL databases, MongoDB does not enforce a rigid schema. This "schema-less" or "flexible schema" nature requires careful design planning based on **how your application accesses data**, not just how data relates to itself.

There are two primary ways to model data in MongoDB: Embedded and Referenced.

### Embedded Data Models (Denormalized)
In embedded models, you capture related data in a single document structure. You embed child documents directly into the parent document.

**Pros:**
- Better read performance (one query to retrieve all data).
- Natural representation of data for applications.
- Atomic updates within a single document.

**Cons:**
- Can lead to large documents (MongoDB has a 16MB document size limit).
- Duplication of data if the embedded data is shared across multiple parents.

**Example: User with Addresses**
```json
{
  "_id": ObjectId("5f1b..."),
  "name": "Jane Doe",
  "email": "jane@example.com",
  "addresses": [
    {
      "type": "home",
      "street": "123 Main St",
      "city": "Springfield"
    },
    {
      "type": "work",
      "street": "456 Office Blvd",
      "city": "Capital City"
    }
  ]
}
```

### Referenced Data Models (Normalized)
In referenced models, you store relationships between data by including links or references from one document to another. The application resolves these references to access the related data (using multiple queries or the `$lookup` aggregation).

**Pros:**
- Avoids data duplication.
- Keeps documents small.
- Better for many-to-many relationships or hierarchal data that grows boundlessly.

**Cons:**
- Requires more read queries to retrieve full data representations.
- No atomic operations spanning multiple documents.

**Example: Books and Authors**
```json
// Collection: authors
{
  "_id": ObjectId("author_1"),
  "name": "George Orwell",
  "born": 1903
}

// Collection: books
{
  "_id": ObjectId("book_1"),
  "title": "1984",
  "author_id": ObjectId("author_1") // Reference to the author
}
```

---

## 9. Relationships in MongoDB

How do we decide between embedding and referencing for different relationship types?

### 1-to-1 Relationships
- **Embed:** If the relationship is tightly coupled and the child entity isn't accessed independently. (e.g., User and UserProfile).
- **Reference:** If one of the entities is very large and rarely needed.

### 1-to-Many Relationships
- **One-to-Few (Embed):** E.g., A blog post and its 10-20 tags. Embed the tags array inside the post.
- **One-to-Many (Embed or Reference):** E.g., A blog post and its comments. If comments are capped (e.g., top 100), embed. If comments can grow to thousands, reference them to avoid hitting the 16MB limit.
- **One-to-Squillions (Reference):** E.g., An IoT sensor and its logs. You cannot embed millions of logs in a sensor document. The logs must have a reference to the sensor `sensor_id`.

### Many-to-Many Relationships
Almost always use **References**.
E.g., Students and Courses. A student takes many courses, a course has many students.
You would typically store arrays of references in one or both documents.

```json
// Student Document
{
  "name": "Alice",
  "enrolledCourses": [ObjectId("course_1"), ObjectId("course_2")]
}
```

### The Golden Rule of MongoDB Schema Design
**Structure your data to match your application's read/write patterns.** 
If your app constantly needs to fetch a user and their recent posts together, embed the recent posts in the user object. Data that is read together should be stored together.

---

## 10. Data Validation (Basic Intro)

While MongoDB is flexible, you often want to enforce data integrity at the database level. Starting in version 3.6, MongoDB supports JSON Schema validation.

You can apply validation rules when creating a collection or updating an existing one.

```javascript
db.createCollection("users", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "username", "email", "age" ],
         properties: {
            username: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            email: {
               bsonType: "string",
               pattern: "^.+@.+\\..+$",
               description: "must be a valid email string and is required"
            },
            age: {
               bsonType: "int",
               minimum: 18,
               description: "must be an integer greater than or equal to 18"
            }
         }
      }
   }
})
```
If you attempt to insert a document that violates these rules, MongoDB will throw a write error.

---

## 11. Performance Optimization

Database performance is crucial as your application scales. Here are the core areas to focus on:

1. **Indexes are Mandatory:** Every query your application runs frequently MUST be supported by an index. Ensure your queries achieve `IXSCAN` and avoid `COLLSCAN`. Use the ESR (Equality, Sort, Range) rule for compound indexes.
2. **Limit Returned Data:** Always use projections to return only the fields your application needs. Never return a 10MB document if you only need the title string.
3. **Avoid Large Documents:** The maximum BSON document size is 16 megabytes. Documents close to this limit require more RAM and increase network bandwidth overhead. Refactor unbounded arrays (like comments) into referenced collections.
4. **Connection Pooling:** In your application code (e.g., Node.js), reuse database connections. Do not open and close a connection for every single database request. The MongoDB drivers handle connection pooling automatically; ensure you instantiate the client only once.
5. **Pagination:** Never load an entire collection into memory. Use `.skip()` and `.limit()` for small datasets, or cursor-based pagination (e.g., `find({ _id: { $gt: last_seen_id } }).limit(20)`) for large datasets, as massive `.skip()` operations degrade performance heavily.

---

## 12. Security Basics

A secured MongoDB deployment is critical to prevent data breaches.

1. **Enable Access Control (Authentication):** Never run a MongoDB server in production without authentication. Users must log in with a username and password.
2. **Role-Based Access Control (RBAC):** Apply the principle of least privilege. Give applications a user account that only has permissions to read/write to the specific database it needs, not admin access.
3. **Network Isolation:** 
   - Never expose port 27017 directly to the public internet.
   - Use VPCs, firewalls, and IP Whitelisting (in Atlas) so only your application servers can connect to the database server.
4. **Encryption:**
   - **In Transit:** Enforce TLS/SSL connections so data cannot be intercepted over the network.
   - **At Rest:** Ensure the underlying hard drives where MongoDB stores files are encrypted. (Atlas does this by default).

---

## 13. MongoDB with Node.js

To use MongoDB in a real application, you connect via a driver. In the Node.js ecosystem, there are two dominant approaches: the official MongoDB native driver, and Mongoose (an ODM).

### Approach 1: Official `mongodb` Driver
The native driver gives you direct, low-level access to the database using the same commands you use in the shell.

**Installation:**
```bash
npm install mongodb
```

**Usage Example:**
```javascript
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Select DB and Collection
    const database = client.db('testdb');
    const users = database.collection('users');

    // Create
    const result = await users.insertOne({ name: 'Alice', age: 28 });
    console.log(`User inserted with _id: ${result.insertedId}`);

    // Read
    const user = await users.findOne({ name: 'Alice' });
    console.log(user);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
```

### Approach 2: Mongoose (ODM - Object Data Modeling)
Mongoose is a popular library that sits on top of the native driver. It provides schema validation, model compilation, and middleware (hooks) out of the box. It makes MongoDB feel a bit more structured.

**Installation:**
```bash
npm install mongoose
```

**Usage Example:**
```javascript
const mongoose = require('mongoose');

// 1. Connect
mongoose.connect('mongodb://localhost:27017/testdb');

// 2. Define a Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 18 },
  createdAt: { type: Date, default: Date.now }
});

// 3. Compile Model
const User = mongoose.model('User', userSchema);

async function run() {
  // Create
  const newUser = new User({ name: 'Bob', age: 25 });
  await newUser.save();
  console.log('User saved!');

  // Read
  const users = await User.find({ age: { $gte: 20 } });
  console.log(users);
}

run();
```

---

## 14. Best Practices

- **Update Operators:** Always use update operators (e.g., `$set`, `$inc`, `$push`) instead of fetching a document, modifying it in your application, and saving the whole document back. This prevents race conditions.
- **`ObjectId` as Timestamps:** `ObjectId` inherently contains the creation timestamp. You can use it to sort by creation date or extract the date, rather than always needing a separate `createdAt` field.
- **Understand the Working Set:** Your "working set" is the data and indexes accessed most frequently. For optimal performance, your server's RAM should be large enough to hold your entire working set.
- **Graceful Error Handling:** Always handle database connection drops and timeouts gracefully in your application logic.

---

## 15. Common Mistakes

1. **Treating MongoDB like a Relational Database:** Porting a 3rd Normal Form SQL schema directly into MongoDB. This results in horrific performance due to excessive `$lookup` operations or multiple round-trip queries.
2. **Unbounded Array Growth:** Embedding data that grows infinitely (like a chat log in a user document). Eventually, the document will hit the 16MB limit, crashing the application.
3. **Forgetting to Index:** Deploying to production without indexes. The database works fine with 100 test documents, but grinds to a halt with 1 million production documents.
4. **"Data is arbitrary, so schema doesn't matter":** Just because MongoDB doesn't force a schema doesn't mean you shouldn't have one. Code expecting a string but finding an object will crash. Use Data Validation or Mongoose.

---

## 16. Real-world Examples

### Scenario 1: E-Commerce Product Catalog
An e-commerce product is a perfect fit for a document database because products have varying attributes. A laptop has RAM and CPU; a t-shirt has size and color. In SQL, this requires complex EAV (Entity-Attribute-Value) tables. In MongoDB, it's trivial.

```json
{
  "_id": ObjectId("prod_1001"),
  "name": "ThinkPad X1 Carbon",
  "category": "Electronics",
  "price": 1200.00,
  "stock": 45,
  "attributes": {
    "cpu": "Intel i7",
    "ram": "16GB",
    "storage": "512GB SSD"
  },
  "reviews": [ // Bounded array (e.g. keep only latest 5, reference the rest)
    { "user": "John", "rating": 5, "comment": "Great machine." }
  ]
}
```

### Scenario 2: Simple Blog API Backend (Express/Mongoose)
A skeleton of how you structure a route for a simple blog post creation.

```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// Schema & Model
const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  author: String,
  date: { type: Date, default: Date.now }
});
const Post = mongoose.model('Post', PostSchema);

// Create Route
app.post('/api/posts', async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read Route
app.get('/api/posts', async (req, res) => {
  try {
    // Only return posts with specific tags, sort by newest
    const filter = req.query.tag ? { tags: req.query.tag } : {};
    const posts = await Post.find(filter)
                            .sort({ date: -1 })
                            .limit(10);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ... Connect to DB and start server
```

---
*End of Guide. MongoDB is a powerful tool when used correctly. The key to mastering it lies in understanding its document model constraints and designing your schema around your application's query patterns.*
