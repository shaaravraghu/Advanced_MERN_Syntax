# Mastering WebSockets: A Comprehensive Technical Guide

WebSockets represent a fundamental shift in how web applications communicate, moving from the traditional request-response paradigm of HTTP to a truly real-time, bidirectional, and persistent connection model. 

This guide is designed for backend and real-time systems engineers. It covers everything from the theoretical foundations and network-level handshakes to practical implementation, scaling strategies, and real-world architectures.

---

## Table of Contents

1. [Introduction to WebSockets](#1-introduction-to-websockets)
2. [How WebSockets Work](#2-how-websockets-work)
3. [Core Concepts](#3-core-concepts)
4. [Setup and Basic Implementation](#4-setup-and-basic-implementation)
5. [Events and Messaging](#5-events-and-messaging)
6. [Error Handling](#6-error-handling)
7. [Security Basics](#7-security-basics)
8. [Scaling (Basic Idea)](#8-scaling-basic-idea)
9. [WebSockets vs Socket.IO](#9-websockets-vs-socketio)
10. [Best Practices](#10-best-practices)
11. [Common Mistakes](#11-common-mistakes)
12. [Real-world Examples](#12-real-world-examples)

---

## 1. Introduction to WebSockets

### What are WebSockets?

WebSocket is a computer communications protocol that provides full-duplex communication channels over a single, long-held TCP connection. Standardized by the IETF as RFC 6455 in 2011, the WebSocket API is supported by all modern web browsers and backend technologies.

Unlike HTTP, which is stateless and strictly unidirectional (client requests, server responds), WebSockets allow for a continuous stream of data to flow back and forth between the client and the server at any time, without the overhead of HTTP headers for every message.

**URL Schemes:**
- `ws://` - Standard WebSocket connection (unencrypted, defaults to port 80).
- `wss://` - Secure WebSocket connection over TLS/SSL (encrypted, defaults to port 443).

### Why WebSockets are Needed

Historically, the web was built for document retrieval. If a user wanted new information, they refreshed the page. As the web evolved into interactive applications (chat, live sports scores, stock tickers), developers needed ways to push data from the server to the client.

Before WebSockets, developers used workarounds:

1.  **Short Polling:** The client repeatedly sends AJAX requests to the server at fixed intervals (e.g., every 2 seconds) asking, "Do you have new data?".
    *   *Problem:* Massive network overhead. Most of the time, the answer is "no," wasting bandwidth and server resources with empty HTTP requests and responses.
2.  **Long Polling:** The client sends a request. The server holds the request open until it has new data. Once data is sent, the client immediately opens a new request.
    *   *Problem:* Better than short polling, but still incurs the overhead of establishing HTTP connections and sending HTTP headers repeatedly.
3.  **Server-Sent Events (SSE):** A one-way channel where the server can push data to the client.
    *   *Problem:* It is strictly unidirectional (Server -> Client). The client cannot send data back over the same channel.

WebSockets solve these problems by providing a persistent, bidirectional, low-latency connection.

### HTTP vs. WebSockets

| Feature | HTTP/1.1 | WebSockets |
| :--- | :--- | :--- |
| **Paradigm** | Request / Response (Half-duplex) | Publish / Subscribe or Bidirectional (Full-duplex) |
| **State** | Stateless | Stateful |
| **Connection** | Short-lived (usually closed after response, though keep-alive exists) | Persistent (kept open until explicitly closed) |
| **Overhead** | High (Every message carries full HTTP headers, cookies, etc.) | Very Low (Messages are framed with minimal byte overhead - often just 2-10 bytes) |
| **Latency** | Higher (Needs to establish connection/headers per request) | Extremely Low (Connection is already established) |
| **Initiation** | Client only | Client initiates connection; thereafter, either side can send |
| **Best For** | CRUD operations, static assets, REST APIs | Chat, gaming, live tickers, collaborative editing |

---

## 2. How WebSockets Work

The lifecycle of a WebSocket connection involves two distinct phases: the **Handshake** (which occurs over HTTP) and the **Data Transfer** (which occurs over the raw TCP connection using the WebSocket protocol framing).

### The Handshake Process

WebSockets were cleverly designed to work over the existing web infrastructure (ports 80 and 443) and bypass firewalls and proxies that only understand HTTP. 

Therefore, a WebSocket connection *always begins its life as an HTTP request*.

**Step 1: The Client Request**
The client sends a standard HTTP `GET` request to the server, but includes specific headers requesting an "Upgrade" to the WebSocket protocol.

```http
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
Origin: http://example.com
```

Key Headers:
*   `Upgrade: websocket`: Tells the server we want to switch protocols.
*   `Connection: Upgrade`: Indicates that the connection options are changing.
*   `Sec-WebSocket-Key`: A Base64-encoded random value. This is used to prove that the server actually understands WebSockets and isn't just blindly returning cached data.
*   `Sec-WebSocket-Version`: Specifies the protocol version (13 is the modern standard).

**Step 2: The Server Response**
If the server supports WebSockets, it responds with an HTTP `101 Switching Protocols` status code.

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

Key Header:
*   `Sec-WebSocket-Accept`: The server takes the client's `Sec-WebSocket-Key`, concatenates it with a specific Magic String (`258EAFA5-E914-47DA-95CA-C5AB0DC85B11`), hashes the result using SHA-1, and Base64 encodes it. This proves to the client that the server is a legitimate WebSocket server.

### The Persistent Connection

Once the HTTP 101 response is sent and received, the HTTP protocol is discarded. The underlying TCP socket is kept open, and both parties switch to using the WebSocket binary framing protocol.

**Data Framing:**
Messages are not sent as raw text. They are broken down into "frames". A frame includes:
*   **FIN bit:** Indicates if this is the final fragment of a message.
*   **Opcode:** Tells the receiver what kind of data this is (Text, Binary, Ping, Pong, Close).
*   **Masking bit:** Specifies if the payload is masked. (Client-to-server messages *must* be masked to prevent cache poisoning attacks).
*   **Payload Length:** The size of the data.
*   **Payload Data:** The actual application data.

Because the connection remains open, there is no need to re-authenticate or send HTTP headers (like cookies or User-Agents) with every single message. This results in incredibly efficient communication.

---

## 3. Core Concepts

Before writing code, it is crucial to understand the conceptual model of WebSockets.

### Client-Server Communication (Initiation)

WebSockets are still fundamentally a client-server architecture. 
1.  **A Server cannot initiate a WebSocket connection to a Client.** 
2.  The Client (e.g., the browser) must make the initial HTTP Upgrade request.
3.  Only after the connection is established can the server spontaneously push data to the client.

### Full-Duplex Communication

"Duplex" refers to the ability of two parties to communicate.
*   **Simplex:** One-way communication (e.g., a TV broadcast).
*   **Half-Duplex:** Two-way communication, but only one at a time (e.g., a walkie-talkie. HTTP is effectively half-duplex).
*   **Full-Duplex:** Two-way communication simultaneously (e.g., a telephone call).

WebSockets are full-duplex. The server can send a message to the client at the exact same millisecond the client is sending a message to the server. They do not block each other. This is what enables highly responsive real-time multiplayer games and collaborative tools.

---

## 4. Setup and Basic Implementation

Let's build a basic WebSocket server and client. We will use Node.js and the popular `ws` library for the server, and the native browser API for the client.

### Server-Side Setup (Node.js)

First, initialize a project and install the `ws` package.

```bash
mkdir websocket-demo
cd websocket-demo
npm init -y
npm install ws
```

Create a file named `server.js`:

```javascript
// server.js
const WebSocket = require('ws');

// Create a WebSocket server listening on port 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket server is running on ws://localhost:8080');

// The 'connection' event fires whenever a new client completes the handshake
wss.on('connection', function connection(ws, request) {
    
    console.log(`New client connected from IP: ${request.socket.remoteAddress}`);

    // Send a welcome message to the newly connected client
    ws.send('Welcome to the WebSocket Server!');

    // Listen for incoming messages from THIS specific client
    ws.on('message', function incoming(message) {
        // 'message' is usually a Buffer in Node.js. Convert to string.
        const textMessage = message.toString();
        console.log('Received from client: %s', textMessage);

        // Echo the message back to the client
        ws.send(`Server Echo: ${textMessage}`);
    });

    // Listen for the client disconnecting
    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});
```

Run the server: `node server.js`

### Client-Side Setup (Vanilla JavaScript)

Create an `index.html` file. Modern browsers have a built-in `WebSocket` object; no libraries are needed.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WebSocket Client</title>
    <style>
        body { font-family: sans-serif; max-width: 500px; margin: 20px auto; }
        #log { height: 300px; border: 1px solid #ccc; overflow-y: auto; padding: 10px; margin-bottom: 10px; background: #f9f9f9;}
        .msg { margin-bottom: 5px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
    </style>
</head>
<body>
    <h2>WebSocket Test</h2>
    
    <div>
        <button id="connectBtn">Connect</button>
        <button id="disconnectBtn" disabled>Disconnect</button>
    </div>
    
    <div style="margin-top: 10px;">
        <input type="text" id="messageInput" placeholder="Type a message..." disabled>
        <button id="sendBtn" disabled>Send</button>
    </div>

    <div id="log" style="margin-top: 20px;"></div>

    <script>
        const connectBtn = document.getElementById('connectBtn');
        const disconnectBtn = document.getElementById('disconnectBtn');
        const sendBtn = document.getElementById('sendBtn');
        const messageInput = document.getElementById('messageInput');
        const logDiv = document.getElementById('log');

        let ws = null;

        function log(msg, type = 'info') {
            const div = document.createElement('div');
            div.className = 'msg';
            div.innerHTML = `<strong>[${type.toUpperCase()}]</strong> ${msg}`;
            logDiv.appendChild(div);
            logDiv.scrollTop = logDiv.scrollHeight;
        }

        connectBtn.addEventListener('click', () => {
            // Initiate connection
            ws = new WebSocket('ws://localhost:8080');

            // 1. Connection Opened
            ws.onopen = () => {
                log('Connected to server', 'system');
                connectBtn.disabled = true;
                disconnectBtn.disabled = false;
                sendBtn.disabled = false;
                messageInput.disabled = false;
            };

            // 2. Message Received
            ws.onmessage = (event) => {
                log(event.data, 'server');
            };

            // 3. Connection Closed
            ws.onclose = (event) => {
                log(`Disconnected. Code: ${event.code}, Reason: ${event.reason}`, 'system');
                connectBtn.disabled = false;
                disconnectBtn.disabled = true;
                sendBtn.disabled = true;
                messageInput.disabled = true;
                ws = null;
            };

            // 4. Error Occurred
            ws.onerror = (error) => {
                log('WebSocket Error occurred', 'error');
                console.error(error);
            };
        });

        disconnectBtn.addEventListener('click', () => {
            if (ws) {
                // Close the connection explicitly
                ws.close(1000, "User clicked disconnect"); 
            }
        });

        sendBtn.addEventListener('click', () => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                const text = messageInput.value;
                ws.send(text);
                log(text, 'client (you)');
                messageInput.value = '';
            }
        });
    </script>
</body>
</html>
```

Open `index.html` in your browser. Click "Connect", then send a message. You will see the server echo it back.

---

## 5. Events and Messaging

The WebSocket API is event-driven. You react to state changes and incoming data using event listeners.

### The Four Primary Events

Whether you are on the client or the server, WebSockets emit four primary events:

1.  **`open` / `connection`**: Fired when the handshake is complete and the connection is ready to transmit data.
2.  **`message`**: Fired when data is received over the connection.
3.  **`close`**: Fired when the connection is terminated (either gracefully or due to network failure).
4.  **`error`**: Fired when a network error occurs or connection fails to establish.

### Ready States

A WebSocket object has a `readyState` property representing the connection lifecycle:
*   `0 (CONNECTING)`: The handshake is in progress.
*   `1 (OPEN)`: The connection is established; data can be sent.
*   `2 (CLOSING)`: The connection is going through the closing handshake.
*   `3 (CLOSED)`: The connection has been closed or could not be opened.

Always check `ws.readyState === WebSocket.OPEN` before calling `ws.send()`.

### Sending Structured Data (JSON)

WebSockets only transmit text strings or binary data (ArrayBuffers/Blobs). They do not natively understand objects or arrays. To send structured data, you must serialize it, usually using JSON.

**Sending (Client or Server):**
```javascript
const payload = {
    type: 'USER_JOIN',
    data: {
        username: 'alice',
        room: 'gaming'
    },
    timestamp: Date.now()
};

ws.send(JSON.stringify(payload));
```

**Receiving (Client or Server):**
```javascript
ws.on('message', (rawMessage) => {
    try {
        const message = rawMessage.toString(); // Necessary in Node.js
        const parsed = JSON.parse(message);
        
        switch(parsed.type) {
            case 'USER_JOIN':
                handleUserJoin(parsed.data);
                break;
            case 'CHAT_MSG':
                handleChat(parsed.data);
                break;
            default:
                console.warn('Unknown message type');
        }
    } catch (e) {
        console.error('Failed to parse incoming message as JSON', e);
    }
});
```
*Best Practice:* Always wrap `JSON.parse` in a `try...catch` block. A malicious or buggy client could send invalid JSON, crashing your server if left unhandled.

---

## 6. Error Handling

Because WebSockets maintain long-lived connections over unpredictable networks (like mobile data), connections *will* drop. Your application must be resilient.

### Handling Disconnections

When a connection drops abruptly (e.g., someone drives into a tunnel), the TCP stack might take minutes to realize the connection is dead. We handle this using Ping/Pong heartbeats (covered in Best Practices) and reconnect logic.

### Client-Side Reconnection Strategy

A native WebSocket does not automatically reconnect. You must implement this yourself, usually using an "Exponential Backoff" strategy to prevent overwhelming the server when it comes back online.

```javascript
let ws;
let reconnectInterval = 1000; // Start with 1 second
let maxReconnectInterval = 30000; // Max 30 seconds

function connect() {
    ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
        console.log('Connected');
        reconnectInterval = 1000; // Reset on successful connection
    };

    ws.onclose = (e) => {
        console.log(`Socket closed. Reconnecting in ${reconnectInterval/1000}s...`);
        
        setTimeout(() => {
            connect();
        }, reconnectInterval);

        // Exponential backoff: double the interval, up to the maximum
        reconnectInterval = Math.min(reconnectInterval * 2, maxReconnectInterval);
    };

    ws.onerror = (err) => {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        ws.close(); // Force close to trigger the onclose reconnect logic
    };
}

connect();
```

### Server-Side Error Handling

On the server, you must ensure that a crashing connection doesn't crash the entire Node.js process.

```javascript
wss.on('connection', (ws) => {
    ws.on('error', (error) => {
        // If a socket throws an error (e.g., ECONNRESET when client forcefully disconnects)
        // you MUST have an error listener, otherwise Node.js throws an Unhandled Exception.
        console.error('WebSocket Error on specific connection:', error);
    });
});
```

---

## 7. Security Basics

WebSockets are powerful, which means they present significant security risks if not properly configured.

### 1. Always use WSS (TLS/SSL)
Never use raw `ws://` in production. Data sent over `ws://` is plain text and susceptible to packet sniffing and Man-in-the-Middle (MitM) attacks. Always use `wss://`, which encrypts the data exactly like HTTPS.

### 2. Origin Validation (CORS for WebSockets)
Unlike AJAX requests, standard Cross-Origin Resource Sharing (CORS) policies do not strictly apply to WebSockets. A malicious website can open a WebSocket connection to your server (`ws://your-bank.com/api`).

Your server *must* manually verify the `Origin` header during the handshake.

```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({ 
    port: 8080,
    verifyClient: (info, done) => {
        const origin = info.req.headers.origin;
        // Only allow connections from your specific domain
        if (origin === 'https://my-frontend.com' || origin === 'http://localhost:3000') {
            done(true); // Accept
        } else {
            done(false, 403, 'Forbidden Origin'); // Reject
        }
    }
});
```

### 3. Authentication

Because WebSockets start as HTTP requests, you cannot set custom headers easily in the browser's native `new WebSocket()` constructor.

There are three common ways to authenticate:

**A. URL Query Parameters (Token approach)**
```javascript
// Client
const ws = new WebSocket(`wss://api.example.com?token=${jwtToken}`);
```
*Drawback:* URLs are often logged by reverse proxies (Nginx/AWS ELB), potentially leaking tokens in server logs.

**B. HTTP Cookies**
If the client has a session cookie for your domain, the browser will automatically send it during the HTTP Upgrade request.
*Benefit:* Secure and standard.
*Drawback:* Requires the WebSocket server to share the same domain/subdomain as the web server issuing the cookie, and requires parsing cookies in Node.js.

**C. First Message Authentication (Recommended for APIs)**
The connection opens unauthenticated. The client must immediately send an auth message. If they don't, or if the token is invalid, the server drops the connection.

```javascript
// Server
wss.on('connection', (ws) => {
    ws.isAuthenticated = false;

    // Set a timeout to disconnect if they don't auth quickly
    const authTimeout = setTimeout(() => {
        if (!ws.isAuthenticated) ws.close(4001, 'Unauthorized timeout');
    }, 5000);

    ws.on('message', (msg) => {
        const data = JSON.parse(msg);

        if (!ws.isAuthenticated) {
            if (data.type === 'AUTH' && verifyToken(data.token)) {
                ws.isAuthenticated = true;
                clearTimeout(authTimeout);
                ws.send(JSON.stringify({ type: 'AUTH_SUCCESS' }));
            } else {
                ws.close(4001, 'Invalid credentials');
            }
            return;
        }

        // Handle normal messages here...
    });
});
```

### 4. Rate Limiting and Payload Limits
Prevent Denial of Service (DoS) attacks by limiting message size and frequency.

```javascript
// Limit max payload size (e.g., 10KB)
const wss = new WebSocket.Server({ 
    port: 8080,
    maxPayload: 10240 
});
```

---

## 8. Scaling (Basic Idea)

Scaling WebSockets is fundamentally different from scaling REST APIs.

### The Challenge: Stateful Connections

REST APIs are stateless. You can put an API behind a load balancer and spin up 10 instances. Any instance can handle any request.

WebSockets are stateful. Once Client A connects to Server Instance 1, that TCP socket lives in the memory of Instance 1. If Client B connects to Server Instance 2 and sends a chat message meant for Client A, Instance 2 has no way to deliver it directly.

### Solution: Pub/Sub Architecture (Redis)

To scale horizontally across multiple instances, you need a message broker (commonly Redis Pub/Sub) to act as a backchannel between your servers.

**Architecture Flow:**
1.  Client A is connected to Node 1.
2.  Client B is connected to Node 2.
3.  Client B sends a message to the chat room: "Hello A".
4.  Node 2 receives the message. Node 2 publishes this message to a Redis channel named `room:general`.
5.  All Node instances (Node 1, Node 2, Node 3) are subscribed to the `room:general` Redis channel.
6.  Node 1 receives the message from Redis.
7.  Node 1 checks its local memory, finds Client A's connection, and sends the message down the socket.

### Load Balancers

Your Load Balancer (Nginx, HAProxy, AWS ALB) must be configured to support WebSockets. This usually involves:
1.  Increasing proxy read timeouts (so the connection isn't dropped after 60 seconds of silence).
2.  Ensuring HTTP/1.1 and the `Upgrade` headers are passed through.
3.  **Sticky Sessions (Optional but common):** Ensuring a client re-connects to the same server if the connection drops, though a well-architected Pub/Sub system makes sticky sessions unnecessary.

---

## 9. WebSockets vs Socket.IO

Developers frequently confuse WebSockets with Socket.IO.

*   **WebSocket:** The core, native protocol and standard browser API.
*   **Socket.IO:** A third-party JavaScript library that *wraps* WebSockets and provides a higher-level API.

### What Socket.IO Adds:
1.  **Fallback Mechanisms:** In older networks where WebSockets fail (due to aggressive corporate proxies), Socket.IO automatically degrades to HTTP Long-Polling invisibly.
2.  **Automatic Reconnection:** Built-in logic to handle disconnects and backoffs.
3.  **Rooms and Namespaces:** Built-in APIs to segment users into chat rooms (`io.to('room1').emit()`).
4.  **Acknowledgements:** Send a message and execute a callback on the client when the server receives it.
5.  **Broadcasting:** Easy API to send a message to everyone *except* the sender.

### When to use which?

*   **Use Raw WebSockets (`ws`):**
    *   You need maximum performance, minimal overhead, and minimal library dependencies.
    *   You are building a custom protocol (e.g., a fast multiplayer game using binary data).
    *   Your clients are not just browsers (e.g., IoT devices, C++ desktop apps) where Socket.IO client libraries might not exist.
*   **Use Socket.IO:**
    *   You are building a chat app, collaborative tool, or dashboard.
    *   You want rapid development and don't want to reinvent rooms, reconnections, and broadcasting logic.
    *   *Note:* Socket.IO implements its own custom protocol *on top* of WebSockets. A native browser `new WebSocket()` cannot connect to a Socket.IO server. You must use the Socket.IO client library.

---

## 10. Best Practices

### 1. Implement Ping/Pong Heartbeats
Due to NAT routers and proxies dropping silent connections, you must actively keep the connection alive and detect dead connections.

**Server-side heartbeat pattern:**
```javascript
const wss = new WebSocket.Server({ port: 8080 });

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', function connection(ws) {
  ws.isAlive = true;
  ws.on('pong', heartbeat); // Native ping/pong frames
});

// Run an interval every 30 seconds
const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping(noop); // Sends a binary ping frame. Client auto-replies with pong.
  });
}, 30000);

wss.on('close', function close() {
  clearInterval(interval);
});
```

### 2. Graceful Shutdown
When your server is deploying or scaling down, don't just kill the process. Close WebSockets cleanly so clients know they need to reconnect.

```javascript
process.on('SIGTERM', () => {
    console.log('Server shutting down, closing sockets...');
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.close(1012, 'Server Restarting'); // 1012 is "Service Restart"
        }
    });
    process.exit(0);
});
```

### 3. Maintain Global Client State
In real apps, you need to map a WebSocket connection to a specific User ID.

```javascript
// Simple memory map (for single-server setup)
const clients = new Map(); // Map<UserId, WebSocket>

wss.on('connection', (ws) => {
    // Assuming auth has passed and we have a user object
    const userId = getUserIdFromAuth(ws);
    
    clients.set(userId, ws);

    ws.on('close', () => {
        clients.delete(userId);
    });
});

// Send message to specific user
function sendToUser(userId, message) {
    const ws = clients.get(userId);
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
    }
}
```

---

## 11. Common Mistakes

1.  **Forgetting to clean up listeners:** If you attach event listeners to external services (like a database event emitter) inside the `connection` callback, you MUST remove them inside the `close` callback. Otherwise, you will create a massive memory leak.
2.  **Assuming message delivery:** Raw WebSockets do not guarantee delivery like an HTTP response does. If the connection drops right as you call `.send()`, the message is lost. If you need guaranteed delivery, implement application-level acknowledgements (client replies "got it").
3.  **Blocking the Event Loop:** Node.js is single-threaded. If you receive a WebSocket message and perform heavy synchronous CPU computation (e.g., complex cryptography or massive array sorting), you will freeze the server, and *no other WebSocket connections can send or receive data* during that time. Offload heavy work to Worker Threads.
4.  **Not handling exceptions in message parsing:** Always `try/catch` around `JSON.parse`.

---

## 12. Real-world Examples

### Example A: Basic Chat Room System

This illustrates broadcasting to multiple connected clients.

**Server:**
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message.toString());
        
        // Broadcast the message to all OTHER connected clients
        wss.clients.forEach((client) => {
            // Check if client is open AND is not the client that sent the message
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: 'CHAT',
                    user: parsedMessage.user,
                    text: parsedMessage.text,
                    timestamp: new Date().toISOString()
                }));
            }
        });
    });
});
```

### Example B: Live Data Updates (Ticker)

This illustrates the server spontaneously pushing data to clients at an interval, separate from user input.

**Server:**
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let mockStockPrice = 100.00;

// Simulate price changes every second
setInterval(() => {
    const change = (Math.random() - 0.5) * 2; // -1.0 to +1.0
    mockStockPrice = Math.max(0, mockStockPrice + change);
    
    const payload = JSON.stringify({
        symbol: 'AAPL',
        price: mockStockPrice.toFixed(2),
        time: Date.now()
    });

    // Broadcast to all connected viewers
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(payload);
        }
    });
}, 1000);

wss.on('connection', (ws) => {
    // Send immediate current state upon connection
    ws.send(JSON.stringify({
        symbol: 'AAPL',
        price: mockStockPrice.toFixed(2),
        time: Date.now(),
        note: 'Initial state'
    }));
});
```

### Conclusion

WebSockets are an essential tool in the modern backend engineer's arsenal. By moving past the limitations of request/response, they enable the highly interactive, real-time web applications users expect today. While they introduce complexities regarding connection state, scaling, and network resilience, mastering these patterns is critical for building robust real-time systems.
