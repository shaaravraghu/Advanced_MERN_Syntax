# DevOps Foundations and Docker Notes

## 1. DevOps Foundations

DevOps is the practice of connecting development and operations so software can be delivered reliably, repeatedly, and with less friction.

### Servers
- A server is a machine or process that responds to requests.
- It can host APIs, databases, static files, or full applications.
- In deployment contexts, you usually care about CPU, memory, disk, network, and uptime.

### Load Balancers
- Load balancers distribute traffic across multiple servers.
- They improve availability, scale, and resilience.
- Common strategies include round robin, least connections, and IP-based routing.

### DNS Records
DNS maps human-readable names to IP addresses and other routing data.

Common record types:
- `A`: maps a name to an IPv4 address
- `AAAA`: maps a name to an IPv6 address
- `CNAME`: alias from one hostname to another
- `MX`: mail exchange record
- `TXT`: arbitrary text, often used for verification or security
- `NS`: nameserver record

### Reverse Proxy
- A reverse proxy sits in front of backend servers.
- It receives client requests and forwards them to the appropriate server.
- Common uses:
  - SSL termination
  - load balancing
  - caching
  - request compression
  - hiding backend topology

---

## 2. Docker

Docker packages applications and their dependencies into portable containers.

### Images
- An image is a read-only template used to create containers.
- Images are built from a `Dockerfile`.
- Images can be shared through registries like Docker Hub.

### Containers
- A container is a running instance of an image.
- Containers are isolated, lightweight, and easy to start or stop.
- The same image can run many containers.

### Volumes
- Volumes persist data outside a container's writable layer.
- They are useful for databases, uploads, and any state you do not want to lose when a container is removed.

### Dockerfile
A `Dockerfile` describes how an image should be built.

Common instructions:
- `FROM`
- `WORKDIR`
- `COPY`
- `RUN`
- `EXPOSE`
- `CMD`

### docker-compose
- Docker Compose defines and runs multi-container applications.
- It is useful for apps with an API, database, cache, and frontend.

### Dockerizing a MERN App
Typical flow:
1. Build a backend image.
2. Build a frontend image or serve frontend through a web server.
3. Connect services with Compose.
4. Use environment variables for config.
5. Mount volumes for persistent data where needed.

### Docker Good Practices
- keep images small
- use `.dockerignore`
- avoid shipping secrets in images
- pin versions where practical
- separate development and production config



