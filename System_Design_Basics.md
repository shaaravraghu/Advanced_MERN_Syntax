# System Design Basics

System design is about building software that stays fast, reliable, and manageable as traffic and data grow.

## Caching
- Caching stores frequently used data in a faster layer.
- It reduces database load and improves latency.

### Common Cache Ideas
- cache reads that repeat often
- invalidate when data changes
- use expiration for freshness

### Cache Patterns
- cache-aside
- read-through
- write-through
- write-back

## Redis
- Redis is an in-memory data store often used for caching, sessions, rate limiting, and queues.
- It is fast because it keeps data in memory.
- It supports TTL, atomic updates, and data structures that work well for backend systems.

### Common Uses
- session storage
- leaderboards
- job queues
- caching API responses
- rate limiting counters

## Queues
- Queues hold tasks that should be processed later.
- They help offload slow work from the request cycle.

### Why Queues Matter
- reduce response time
- smooth traffic spikes
- separate work from user-facing requests

### Common Examples
- email sending
- image processing
- background jobs
- report generation

## Scaling

### Vertical Scaling
- Add more power to one machine.
- Easier at first, but has limits.

### Horizontal Scaling
- Add more machines.
- Better for large systems and resilience.

### Notes
- stateless services are easier to scale horizontally
- shared state often needs Redis, DB, or object storage

## Rate Limiting
- Rate limiting controls how many requests a client can make in a time window.
- It protects against abuse and traffic spikes.

### Common Strategies
- fixed window
- sliding window
- token bucket
- leaky bucket

### Good Reasons to Rate Limit
- login protection
- API abuse prevention
- fair resource usage

## Sharding
- Sharding splits data across multiple database partitions.
- It helps scale large datasets and heavy traffic.

### Notes
- choose shard keys carefully
- avoid hot partitions
- understand query routing costs

## CDNs
- A CDN is a content delivery network.
- It stores cached content closer to users geographically.

### Why CDNs Help
- faster asset delivery
- lower origin load
- better global performance

### Common CDN Use Cases
- static files
- images
- scripts
- videos

## Practical System Design Mindset
- start simple
- identify bottlenecks
- cache what is expensive
- make stateless services where possible
- separate fast paths from slow background work




