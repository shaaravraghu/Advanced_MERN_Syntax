# Next.js Notes

## 1. Next.js

Next.js is a React framework for building web apps with routing, rendering strategies, and backend features built in.

### Rendering Concepts

#### SSR
- Server-Side Rendering generates HTML on each request.
- Good for dynamic, personalized, or frequently changing content.

#### SSG
- Static Site Generation builds pages at build time.
- Good for content that rarely changes.

### API Routes
- Next.js can expose backend endpoints in the app.
- API routes are useful for small backend tasks and server-side handlers.

### Middleware
- Middleware runs before a request completes.
- Useful for auth checks, redirects, rewrites, and request filtering.

### App Router
- The App Router is the modern routing system in Next.js.
- It uses nested layouts and server components more naturally.

### Auth with NextAuth
- NextAuth is commonly used for authentication in Next.js apps.
- It helps with providers, sessions, callbacks, and sign-in flows.

### Important Next.js Ideas
- file-based routing
- layouts
- server/client component boundaries
- route handlers
- environment variables
- deployment-friendly defaults

### Practical Notes
- use SSR when freshness matters
- use SSG when content is stable
- use API routes or route handlers for backend logic
- keep auth and rendering concerns separated when possible

