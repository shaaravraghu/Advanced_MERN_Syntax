# Realtime Tech Notes

## 1. WebSockets

WebSockets provide a persistent, bidirectional connection between client and server.

### What Makes WebSockets Different
- Unlike HTTP, the connection stays open.
- Both sides can send messages at any time.
- Great for chat, live updates, collaboration, and gaming.

### Core Ideas
- client initiates the connection
- server accepts the upgrade
- connection remains open until closed
- messages are framed efficiently

### Common Uses
- chat apps
- live notifications
- collaborative editing
- dashboards
- multiplayer games

### Important Notes
- use `ws://` for insecure connections
- use `wss://` for secure connections
- authenticate early in the connection lifecycle
- handle disconnects and reconnections gracefully

---

## 2. Socket.IO

Socket.IO is a higher-level realtime library built on top of WebSocket-like transport with fallbacks and extra features.

### Why People Use It
- easier event-based API
- automatic reconnection
- fallback transports
- rooms and namespaces
- acknowledgment support

### Rooms
- Rooms are logical groups of sockets.
- Useful for chat rooms, live sessions, and shared channels.

```js
socket.join("room1");
io.to("room1").emit("message", "Hello room");
```

### Events
- Socket.IO uses named events for communication.
- You emit and listen for custom events.

```js
socket.emit("message", data);
socket.on("message", handler);
```

### Auth
- Authenticate the socket connection before joining sensitive rooms.
- Common approaches include token-based auth during handshake.

### Socket.IO Best Practices
- namespace your events clearly
- validate payloads
- handle disconnects
- clean up listeners
- don’t trust client data blindly

---

## 3. Pub/Sub and Redis Intro

Pub/Sub means publish and subscribe.

### Basic Idea
- A publisher sends a message to a channel.
- Subscribers listening to that channel receive the message.

### Why It Matters
- useful for realtime fan-out
- helps when multiple app servers need to share events
- often used with sockets and background jobs

### Redis Intro
- Redis is often used as a Pub/Sub broker.
- It can also support caching, sessions, queues, and rate limiting.

### Practical Notes
- Pub/Sub messages are transient unless backed by persistence elsewhere.
- It is good for live event distribution, not durable message storage.

