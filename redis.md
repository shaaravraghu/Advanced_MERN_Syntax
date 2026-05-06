# 🚀 Comprehensive Redis Technical Study Guide

## 📑 Table of Contents

1. [Introduction to Redis](#1-introduction-to-redis)
2. [Core Concepts](#2-core-concepts)
3. [Setup and Installation](#3-setup-and-installation)
4. [Basic Operations](#4-basic-operations)
5. [Data Structures in Depth](#5-data-structures-in-depth)
6. [Caching Strategies and Eviction](#6-caching)
7. [Pub/Sub (Publish/Subscribe)](#7-pubsub)
8. [Persistence (RDB and AOF)](#8-persistence)
9. [Redis with Node.js](#9-redis-with-nodejs)
10. [Performance and Optimization](#10-performance-and-optimization)
11. [Security Basics](#11-security-basics)
12. [Best Practices](#12-best-practices)
13. [Common Mistakes](#13-common-mistakes)
14. [Real-world Examples](#14-real-world-examples)

---

## 1. Introduction to Redis

### What is Redis?
Redis stands for **REmote DIctionary Server**. It is an open-source, in-memory, NoSQL key-value data store. Unlike traditional relational databases (like PostgreSQL or MySQL) that store data on disk, Redis keeps all its data in Random Access Memory (RAM). This architectural choice makes it blazingly fast, capable of millions of requests per second with sub-millisecond latency.

### The In-Memory Database Concept
Because RAM is significantly faster than Solid State Drives (SSDs) or Hard Disk Drives (HDDs), Redis avoids the seek time and rotational latency associated with disk-based databases. 

However, RAM is volatile—if the server crashes or loses power, data in RAM is lost. To mitigate this, Redis offers configurable persistence mechanisms that asynchronously snapshot or log data to disk, balancing extreme speed with data durability.

### Primary Use Cases
Due to its speed and versatile data structures, Redis is not just a cache. It is often referred to as a "data structure server" and is used for:

1.  **Caching:** Storing frequently accessed data (like HTML fragments, API responses, or database query results) to reduce latency and database load.
2.  **Session Storage:** Managing user sessions in web applications. It's fast, allows for easy expiration via TTL (Time-To-Live), and works perfectly in load-balanced, multi-server environments.
3.  **Real-time Analytics:** Tracking page views, unique visitors, or metrics using atomic counters, HyperLogLogs, and Bitmaps.
4.  **Message Queues & Background Jobs:** Using Lists or Redis Streams to queue tasks for background workers (e.g., Celery in Python, Bull in Node.js).
5.  **Leaderboards:** Utilizing Sorted Sets to instantly rank users based on scores.
6.  **Pub/Sub Messaging:** Facilitating real-time communication between microservices or powering chat applications.
7.  **Geospatial Indexing:** Finding nearby points of interest using specialized GEO commands.

---

## 2. Core Concepts

### Key-Value Store Paradigm
At its core, Redis is a giant dictionary (or hash map) hosted on a server. Every piece of data is stored against a unique string identifier known as a **key**. 

```text
Key (String) -> Value (String, List, Set, Hash, Sorted Set, etc.)
```

Keys are binary safe, meaning you can use any binary sequence as a key, from a string like `"user:1000"` to the contents of an image file (though using huge keys is a bad practice).

### Single-Threaded Architecture
One of the most crucial concepts to understand about Redis is that, by default, it uses a **single-threaded event loop** to process commands. 

**Why single-threaded?**
- **No lock overhead:** Since only one command runs at a time, Redis doesn't need complex locking mechanisms to prevent race conditions.
- **CPU isn't the bottleneck:** In an in-memory database, the bottleneck is rarely the CPU; it's usually the network or memory bandwidth.
- **Predictability:** Operations are strictly atomic. When you execute a command, you know no other command is modifying the data simultaneously.

*Note: Modern Redis versions use multiple threads for background tasks (like disk I/O, closing connections, or lazy unlinking), but the core command execution remains single-threaded.*

### Data Structures Overview
Unlike basic Key-Value stores like Memcached that only support strings, Redis supports rich, complex data structures:
- **Strings:** Binary-safe strings, integers, or floats.
- **Lists:** Linked lists of strings.
- **Sets:** Unordered collections of unique strings.
- **Sorted Sets:** Sets ordered by a floating-point score.
- **Hashes:** Maps composed of fields associated with values.
- **Bitmaps:** Operations on string values acting like bit arrays.
- **HyperLogLogs:** Probabilistic data structure for estimating cardinality.
- **Geospatial:** Longitude/latitude coordinates.
- **Streams:** Append-only log data structure.

---

## 3. Setup and Installation

### Installing on Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install redis-server

# To enable Redis to start on boot:
sudo systemctl enable redis-server

# To start the service:
sudo systemctl start redis-server

# Check status:
sudo systemctl status redis-server
```

### Installing on macOS (using Homebrew)
```bash
brew update
brew install redis

# Start Redis in the background:
brew services start redis

# Or run it directly in the terminal:
redis-server
```

### Installing on Windows
Redis does not officially support Windows. However, you can run it using:
1. **WSL2 (Windows Subsystem for Linux):** Install Ubuntu on WSL2 and use the Linux instructions above.
2. **Docker:** (Highly recommended for development on Windows)

### Running via Docker (Cross-platform)
```bash
# Pull and run the latest Redis image
docker run --name my-redis -p 6379:6379 -d redis

# To access the CLI inside the container:
docker exec -it my-redis redis-cli
```

### The Redis CLI
`redis-cli` is the command-line interface used to interact directly with the Redis server.

```bash
# Connect to local Redis (default port 6379)
redis-cli

# Connect to a remote server
redis-cli -h 192.168.1.10 -p 6379 -a "mypassword"

# Ping the server (expected response: PONG)
127.0.0.1:6379> PING
PONG
```

### The Configuration File (`redis.conf`)
Redis behavior is controlled by the `redis.conf` file (usually located at `/etc/redis/redis.conf` on Linux). Important settings include:
- `bind 127.0.0.1`: Which IP addresses Redis listens to.
- `port 6379`: The port Redis listens on.
- `requirepass my_secure_password`: Sets a password for client authentication.
- `maxmemory 256mb`: The maximum amount of RAM Redis can use.
- `maxmemory-policy allkeys-lru`: What to do when max memory is reached.

---

## 4. Basic Operations

Before diving into complex structures, you need to understand foundational commands that apply universally.

### The SET and GET Commands
The most fundamental operations. They work on **String** data types.

```redis
# Set a key 'username' with value 'john_doe'
127.0.0.1:6379> SET username "john_doe"
OK

# Retrieve the value
127.0.0.1:6379> GET username
"john_doe"
```

### Multiple SETs and GETs
Batching commands reduces network round trips (latency).

```redis
# Set multiple keys at once
127.0.0.1:6379> MSET user:1:name "Alice" user:1:age "30" user:2:name "Bob"
OK

# Get multiple keys at once
127.0.0.1:6379> MGET user:1:name user:2:name
1) "Alice"
2) "Bob"
```

### Deletion and Existence
```redis
# Check if a key exists (returns 1 for true, 0 for false)
127.0.0.1:6379> EXISTS username
(integer) 1

# Delete a key
127.0.0.1:6379> DEL username
(integer) 1

# Check type of a key
127.0.0.1:6379> TYPE user:1:name
string
```

### Expiration (TTL - Time To Live)
One of Redis's most powerful features is auto-expiring keys. This is the foundation of caching and session management.

```redis
# Set a key with an expiration of 10 seconds
127.0.0.1:6379> SET session:123 "active" EX 10
OK

# Alternatively, set the expiration on an existing key
127.0.0.1:6379> EXPIRE session:123 10
(integer) 1

# Check remaining Time To Live (TTL) in seconds
127.0.0.1:6379> TTL session:123
(integer) 7

# Remove expiration (make it persistent)
127.0.0.1:6379> PERSIST session:123
(integer) 1
```
*Note: If `TTL` returns `-1`, the key exists but has no expiration. If it returns `-2`, the key does not exist (or has already expired).*

### Key Naming Conventions
Redis has a flat keyspace. There are no tables or schemas. To organize data, developers use colons `:` to create logical "namespaces."

- **Bad:** `SET john_doe_profile "{json_data}"`
- **Good:** `SET user:1000:profile "{json_data}"`

This convention makes it easy to logically group keys and allows UI tools (like Redis Insight) to display keys in a hierarchical folder structure.

---

## 5. Data Structures in Depth

### 5.1 Strings
Redis Strings are binary-safe, meaning they can contain any data type (JPEG images, serialized JSON objects, or plain text), up to 512 MB in size.

**Common Commands:**
- `SET / GET`: Basic assignment and retrieval.
- `INCR / DECR`: Atomically increments/decrements an integer value. Perfect for counters (e.g., page views).
- `INCRBY / DECRBY`: Increment/decrement by a specific amount.
- `APPEND`: Appends a string to the end of the current value.

**Examples:**
```redis
# Atomic Counter
127.0.0.1:6379> SET page_views:home 0
OK
127.0.0.1:6379> INCR page_views:home
(integer) 1
127.0.0.1:6379> INCR page_views:home
(integer) 2

# Increment by a specific amount
127.0.0.1:6379> INCRBY metrics:revenue 50
(integer) 50
```
*Why `INCR` is important:* Since Redis is single-threaded, `INCR` is atomic. If 100 web servers simultaneously execute `INCR page_views`, the count will accurately increase by 100 without race conditions.

### 5.2 Lists
Redis Lists are implemented as **Doubly Linked Lists**. 
- **Pros:** Pushing elements to the head (left) or tail (right) is extremely fast, O(1) time complexity.
- **Cons:** Accessing elements by index in the middle of a massive list is slow, O(N) time complexity.

**Common Commands:**
- `LPUSH / RPUSH`: Add element to the left (head) / right (tail).
- `LPOP / RPOP`: Remove and return element from left / right.
- `LRANGE`: Get a range of elements. `LRANGE list 0 -1` gets all elements.
- `LLEN`: Get the length of the list.
- `LTRIM`: Cap a list to a specific size.

**Examples:**
```redis
# Queueing tasks (FIFO - First In, First Out)
127.0.0.1:6379> LPUSH job_queue "task_1"
(integer) 1
127.0.0.1:6379> LPUSH job_queue "task_2"
(integer) 2

# Workers pop tasks from the right
127.0.0.1:6379> RPOP job_queue
"task_1"

# Keeping only the latest 5 items (e.g., latest logs)
127.0.0.1:6379> LPUSH recent_logs "log_msg"
127.0.0.1:6379> LTRIM recent_logs 0 4
```

### 5.3 Sets
Redis Sets are unordered collections of **unique** strings. If you add the same element multiple times, it only appears once. They are implemented using Hash Tables.

**Common Commands:**
- `SADD`: Add elements to the set.
- `SREM`: Remove elements.
- `SMEMBERS`: Get all elements.
- `SISMEMBER`: Check if an element exists in the set (O(1) lookup).
- `SINTER / SUNION / SDIFF`: Intersect, Union, and Difference operations between multiple sets.

**Examples:**
```redis
# Tracking unique IP addresses visiting a site today
127.0.0.1:6379> SADD unique_visitors:2026-05-05 "192.168.1.1"
(integer) 1
127.0.0.1:6379> SADD unique_visitors:2026-05-05 "10.0.0.5"
(integer) 1
127.0.0.1:6379> SADD unique_visitors:2026-05-05 "192.168.1.1"
(integer) 0  # Already exists!

# Checking membership
127.0.0.1:6379> SISMEMBER unique_visitors:2026-05-05 "10.0.0.5"
(integer) 1

# Finding mutual friends (Intersection)
127.0.0.1:6379> SADD user:1:friends "Alice" "Bob" "Charlie"
127.0.0.1:6379> SADD user:2:friends "Bob" "David" "Eve"
127.0.0.1:6379> SINTER user:1:friends user:2:friends
1) "Bob"
```

### 5.4 Sorted Sets (ZSets)
A Sorted Set is similar to a regular Set, but every member is associated with a floating-point number called a **score**. Elements are ordered from the smallest score to the largest.

**Common Commands:**
- `ZADD`: Add element with a score.
- `ZRANGE / ZREVRANGE`: Get elements sorted by score (ascending/descending).
- `ZRANK`: Get the rank (index) of an element.
- `ZSCORE`: Get the score of an element.
- `ZINCRBY`: Increment the score of an element.

**Examples:**
```redis
# Creating a gaming leaderboard
127.0.0.1:6379> ZADD leaderboard 150 "PlayerOne"
(integer) 1
127.0.0.1:6379> ZADD leaderboard 200 "PlayerTwo"
(integer) 1
127.0.0.1:6379> ZADD leaderboard 50 "PlayerThree"
(integer) 1

# Get top 3 players (descending order)
127.0.0.1:6379> ZREVRANGE leaderboard 0 2 WITHSCORES
1) "PlayerTwo"
2) "200"
3) "PlayerOne"
4) "150"
5) "PlayerThree"
6) "50"

# PlayerOne kills a monster, increase score by 25
127.0.0.1:6379> ZINCRBY leaderboard 25 "PlayerOne"
"175"
```
Sorted sets are heavily used for rate limiters (using timestamps as scores) and priority queues.

### 5.5 Hashes
Hashes are maps between string fields and string values. They represent objects perfectly. Instead of storing a JSON string and having to fetch/parse the whole thing to update one field, you can update individual fields in a Hash.

**Common Commands:**
- `HSET`: Set field(s) in a hash.
- `HGET`: Get a specific field.
- `HMGET`: Get multiple fields.
- `HGETALL`: Get all fields and values.
- `HDEL`: Delete a field.
- `HINCRBY`: Increment an integer field.

**Examples:**
```redis
# Storing a user profile
127.0.0.1:6379> HSET user:1001 name "John Doe" email "john@example.com" age "28"
(integer) 3

# Retrieve just the email
127.0.0.1:6379> HGET user:1001 email
"john@example.com"

# Retrieve the whole object
127.0.0.1:6379> HGETALL user:1001
1) "name"
2) "John Doe"
3) "email"
4) "john@example.com"
5) "age"
6) "28"

# Birthday time! Increment age.
127.0.0.1:6379> HINCRBY user:1001 age 1
(integer) 29
```

---

## 6. Caching

### What is Caching?
Caching is the process of storing copies of frequently accessed data in a temporary, high-speed storage layer (like Redis) so that future requests for that data are served much faster than accessing the primary data store (like a relational DB or an external API).

### Common Caching Strategies

#### 1. Cache-Aside (Lazy Loading)
This is the most common pattern.
- **Read Workflow:** 
  1. The application checks Redis for the data.
  2. If found (**Cache Hit**), return data to the user.
  3. If not found (**Cache Miss**), fetch data from the primary Database.
  4. Store the fetched data in Redis (usually with a TTL).
  5. Return data to the user.
- **Pros:** Only requested data is cached. Cache failures don't break the app (it just falls back to the DB).
- **Cons:** Data can become stale if updated in the DB but not invalidated in the cache. 

#### 2. Write-Through
- **Workflow:** When the application writes data, it writes to the primary Database AND Redis at the same time.
- **Pros:** Data in the cache is never stale.
- **Cons:** Every write operation is penalized with double writing. Caches data that might never be read.

### Cache Eviction Policies
Because RAM is finite, what happens when Redis gets full? You configure `maxmemory` and an **eviction policy** in `redis.conf`.

- **`maxmemory 2gb`**: Tells Redis not to use more than 2GB of RAM.
- **Policies:**
  - **noeviction:** (Default) Returns errors when memory limit is reached.
  - **allkeys-lru:** Evicts the **Least Recently Used** keys out of all keys. (Most common for general caching).
  - **volatile-lru:** Evicts LRU keys, but only those that have an expire (TTL) set.
  - **allkeys-lfu:** Evicts the **Least Frequently Used** keys (tracks access frequency, not just time).
  - **volatile-ttl:** Evicts keys with the shortest remaining TTL.

*Best Practice:* If using Redis strictly as a cache, use `allkeys-lru`. If mixing caching with persistent data (like session tokens that MUST NOT be deleted randomly), use `volatile-lru`.

---

## 7. Pub/Sub (Publish/Subscribe)

Redis provides a messaging paradigm where senders (publishers) do not send messages directly to specific receivers (subscribers). Instead, publishers send messages to "channels," without knowledge of who is listening.

### How it Works
1. A client `SUBSCRIBE`s to a channel (e.g., `news_alerts`). It becomes blocked, listening for messages.
2. Another client `PUBLISH`es a message to `news_alerts`.
3. Redis instantly forwards the message to all subscribed clients.

**Examples:**

*Terminal 1 (Subscriber):*
```redis
127.0.0.1:6379> SUBSCRIBE global_chat
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "global_chat"
3) (integer) 1
```

*Terminal 2 (Publisher):*
```redis
127.0.0.1:6379> PUBLISH global_chat "Hello everyone!"
(integer) 1  # Indicates 1 subscriber received the message
```

*Back to Terminal 1:*
```redis
1) "message"
2) "global_chat"
3) "Hello everyone!"
```

### Important Characteristics and Limitations
- **Fire and Forget:** Pub/Sub messages are **not stored** anywhere in Redis. If a subscriber disconnects and a message is published, that subscriber will never see that message when they reconnect.
- **Use Cases:** Real-time chat apps, live score updates, microservice event broadcasting (where losing a message isn't catastrophic).
- *Alternative:* If you need guaranteed delivery and persistence (Consumer Groups), use **Redis Streams** instead of Pub/Sub.

---

## 8. Persistence

Although Redis is an in-memory database, it needs to save data to disk to survive server restarts or crashes. It offers two main methods, which can be used independently or together.

### 1. RDB (Redis Database Backup)
RDB performs point-in-time snapshots of your dataset at specified intervals.

- **How it works:** Redis forks a child process. The child process writes the current memory state to a temporary `.rdb` file on disk. Once complete, it replaces the old `.rdb` file.
- **Configuration (`redis.conf`):**
  ```text
  save 900 1      # Save if 1 key changed in 900 secs
  save 300 10     # Save if 10 keys changed in 300 secs
  save 60 10000   # Save if 10000 keys changed in 60 secs
  ```
- **Pros:**
  - Compact file size (good for remote backups).
  - Maximizes performance (parent process doesn't do disk I/O).
  - Faster restarts for large datasets compared to AOF.
- **Cons:**
  - **Data Loss Risk:** If Redis crashes, you lose all data written since the last snapshot.

### 2. AOF (Append Only File)
AOF logs every single write operation received by the server. When Redis restarts, it replays these commands to reconstruct the dataset.

- **Configuration:**
  ```text
  appendonly yes
  appendfsync everysec  # Syncs to disk every 1 second (Best balance of speed/safety)
  # appendfsync always  # Very safe, very slow
  # appendfsync no      # Let OS decide, fast but risky
  ```
- **AOF Rewriting:** Since logging every command makes the file grow infinitely, Redis periodically runs a background rewrite. For example, if a key was incremented 100 times, instead of keeping 100 `INCR` commands, the rewrite creates a single `SET key 100` command in the new file.
- **Pros:** High durability. With `everysec`, you lose at most 1 second of data.
- **Cons:** Larger file sizes. Slightly slower performance due to constant disk writes. Slower startup times.

### Hybrid Approach (The Standard)
In production, it is highly recommended to enable **both**. Redis will use AOF to reconstruct data on startup (for maximum durability) but you can keep RDB snapshots for automated off-site backups.

---

## 9. Redis with Node.js

To interact with Redis from a Node.js application, the two most popular libraries are `redis` (official node-redis) and `ioredis` (often preferred for advanced clustering/sentinel support).

We will use the official `redis` v4 library, which natively supports Promises and async/await.

### Installation
```bash
npm install redis
```

### Basic Connection and CRUD
```javascript
const { createClient } = require('redis');

async function main() {
    // 1. Create and Connect
    const client = createClient({
        url: 'redis://localhost:6379' 
        // Or for remote/password protected:
        // url: 'redis://alice:password@cache.example.com:6379'
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();
    console.log('Connected to Redis!');

    // 2. Set Data
    await client.set('app:name', 'MyAwesomeApp');
    
    // Set with expiration (1 hour)
    await client.setEx('temp:token', 3600, 'abc123xyz');

    // 3. Get Data
    const appName = await client.get('app:name');
    console.log('App Name:', appName);

    // 4. Working with Hashes
    await client.hSet('user:99', {
        name: 'Sarah',
        role: 'admin'
    });
    
    const user = await client.hGetAll('user:99');
    console.log('User Details:', user);

    // 5. Cleanup
    await client.disconnect();
}

main();
```

---

## 10. Performance and Optimization

Redis is naturally fast, but poor usage patterns can cripple it.

### 1. Understand Big O Notation
Always read the documentation for the time complexity of a command.
- **O(1) commands are fast:** `GET`, `SET`, `HGET`, `SISMEMBER`, `LPUSH`.
- **O(N) commands can be dangerous:** `SMEMBERS` (where N is the size of the set), `LRANGE`, `HGETALL`. If you run `SMEMBERS` on a set with 1 million items, it will block the entire Redis server while it processes, queuing up all other requests.

### 2. Pipelining
If you need to send 100 independent commands to Redis, sending them one-by-one requires 100 network round-trips. Pipelining allows you to send all 100 commands in a single network request, and read the 100 responses in a single batch.

*Node.js Pipelining Example:*
```javascript
// Instead of 100 individual awaits...
const pipeline = client.multi();
for (let i = 0; i < 100; i++) {
    pipeline.set(`key:${i}`, `value:${i}`);
}
// Execute all at once
const results = await pipeline.exec(); 
```

### 3. NEVER use `KEYS *` in Production
The `KEYS pattern` command searches the entire dataset for matching keys. Because it is an O(N) operation and Redis is single-threaded, running `KEYS *` on a database with millions of keys will freeze the server for seconds, taking down your application.

**Solution:** Use the `SCAN` command. It iterates through the database incrementally using a cursor, allowing other commands to run in between iterations.

### 4. Memory Optimization
- Prefer Hashes over Strings for objects. Storing 100 fields in one hash (`HSET user:1 name "X" age "Y"`) is significantly more memory-efficient than storing 100 individual string keys (`SET user:1:name "X"`, `SET user:1:age "Y"`).
- Set an explicit `maxmemory` limit. Without it, Redis will use all available RAM until the OS kills it via the OOM (Out Of Memory) killer.

---

## 11. Security Basics

Out of the box, Redis is optimized for performance, not security. It assumes it is running on a secure internal network.

### Security Checklist:
1. **Never expose Redis to the open internet:** Ensure it is behind a firewall or inside a VPC.
2. **Bind to specific interfaces:** In `redis.conf`, do not use `bind 0.0.0.0`. Use `bind 127.0.0.1` (if the app is on the same server) or specific internal IP addresses.
3. **Require a Password:** Enable authentication via `requirepass your_strong_password` in `redis.conf`.
4. **Disable Dangerous Commands:** You can rename or completely disable commands that could be destructive or block the server.
   ```text
   # In redis.conf
   rename-command FLUSHALL ""
   rename-command FLUSHDB ""
   rename-command KEYS ""
   ```
5. **Use TLS:** Modern Redis supports encrypted connections (TLS/SSL). Essential if traffic moves across untrusted networks.

---

## 12. Best Practices

1. **Namespace your keys:** Use colons (`:`) to structure keys, e.g., `user:1042:session`.
2. **Always set a TTL on cache data:** Unless data is explicitly meant to be permanent, assign a TTL. This prevents stale data and memory leaks over time.
3. **Use Connection Pooling:** Opening a TCP connection is expensive. Use a library that supports connection pooling so your app reuses existing connections.
4. **Monitor your memory:** Use the `INFO memory` command to keep an eye on `used_memory` and `memory_fragmentation_ratio`.
5. **Separate Cache from Primary Data:** If you use Redis for both ephemeral caching (safe to delete) and critical data (like job queues or session stores), use separate Redis instances or at least separate logical databases (though multiple instances are preferred for scaling).

---

## 13. Common Mistakes

1. **Creating "Big Keys":** Storing a JSON string that is 10MB in size, or a Set with 5 million members. Retrieving or deleting these keys will block the server. Keep values small (under a few KBs). If you must delete a huge key, use `UNLINK` instead of `DEL` (it deletes it asynchronously).
2. **Not handling connection errors in code:** Redis might briefly drop connections or restart. Your application code MUST have retry logic and connection error handlers.
3. **Relying on Redis for strict durability:** If losing 1 second of data is completely unacceptable (e.g., financial transactions), Redis should not be your *only* system of record. Use a relational DB as the source of truth, and Redis for speed.
4. **Ignoring Eviction Policies:** Developers deploy Redis, fill it with data, and crash the server months later because they forgot to set `maxmemory` and an eviction policy.

---

## 14. Real-world Examples

### Example 1: API Response Caching (Node.js/Express)
Implementing the Cache-Aside pattern to reduce load on a slow database or external API.

```javascript
const express = require('express');
const { createClient } = require('redis');
const fetch = require('node-fetch'); // Example HTTP client

const app = express();
const redisClient = createClient();
redisClient.connect();

app.get('/api/github/repos/:username', async (req, res) => {
    const { username } = req.params;
    const cacheKey = `github:repos:${username}`;

    try {
        // 1. Check Cache
        const cachedData = await redisClient.get(cacheKey);
        
        if (cachedData) {
            console.log('Cache Hit!');
            return res.json(JSON.parse(cachedData));
        }

        console.log('Cache Miss! Fetching from API...');
        
        // 2. Fetch from External Source
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await response.json();

        // 3. Store in Cache with TTL (e.g., 3600 seconds = 1 hour)
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(data));

        // 4. Return data
        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### Example 2: Distributed Rate Limiter
A basic implementation to prevent API abuse (e.g., max 10 requests per minute per IP).

```javascript
async function checkRateLimit(ipAddress) {
    const limit = 10;
    const windowSeconds = 60;
    const key = `rate_limit:${ipAddress}`;

    // Using a pipeline to ensure atomic execution of commands
    const multi = redisClient.multi();
    
    // Increment the request count
    multi.incr(key);
    // Set expiration ONLY if the key is new (NX flag prevents overwriting existing TTL)
    multi.expire(key, windowSeconds, 'NX'); 

    const results = await multi.exec();
    const requestCount = results[0]; // The result of the INCR command

    if (requestCount > limit) {
        throw new Error('Too Many Requests. Please try again later.');
    }
    
    return true; // Request allowed
}
```

### Example 3: Express Session Storage
Using `connect-redis` to store Express sessions, allowing user sessions to survive server restarts and work across multiple Node.js instances (Load Balancing).

```javascript
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');

const app = express();

// Initialize client
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "app:sess:",
})

app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: "super_secret_key",
    cookie: {
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

app.get('/login', (req, res) => {
    req.session.userId = "user_789"; // Saves to Redis automatically!
    res.send('Logged in');
});

app.get('/dashboard', (req, res) => {
    if (req.session.userId) {
        res.send(`Welcome back User ${req.session.userId}`);
    } else {
        res.status(401).send('Please login');
    }
});
```

---
*End of Redis Study Guide. Use this document as an ongoing reference for architecture and development.*
