# Production Deployment Notes

## 1. Frontend Deployment

### Vercel
- Vercel is a strong choice for frontend deployment.
- It works especially well with Next.js and React apps.
- It provides previews, Git-based deployments, and global CDN delivery.

### What Usually Goes on Vercel
- frontend apps
- static assets
- Next.js sites
- lightweight serverless endpoints

## 2. Backend Deployment

### Render / AWS
- Render is often used for straightforward app hosting.
- AWS is used when you need more infrastructure control and scale options.

### Backend Considerations
- set environment variables
- use process managers where needed
- monitor logs
- manage restarts and uptime

## 3. CDN Setup

- A CDN caches static assets near users.
- It improves speed and reduces origin server load.
- Common assets:
  - images
  - JavaScript bundles
  - CSS
  - videos

## 4. Environment Variables

- Environment variables keep configuration out of code.
- Use them for API keys, service URLs, database connections, and feature flags.
- Different values are usually used for development, staging, and production.

## 5. Final Project Structure

A clean production-ready structure usually separates concerns clearly.

Typical pieces:
- frontend app
- backend API
- shared utilities
- deployment config
- environment files
- static assets
- documentation

### Good Structural Habits
- keep frontend and backend responsibilities clear
- isolate config from code
- separate reusable modules
- make deployment steps reproducible
- keep secrets out of source control

