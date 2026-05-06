# Mastering Vercel: The Comprehensive Technical Study Guide

Welcome to the definitive study guide for Vercel. This resource is designed to take you from a fundamental understanding of what Vercel is, all the way to deploying optimized, full-stack applications with advanced serverless and edge capabilities.

Whether you are a frontend developer looking for zero-configuration hosting, or a full-stack engineer building globally distributed APIs, this guide covers the entire Vercel ecosystem in depth.

---

## Table of Contents

1. [Introduction to Vercel](#1-introduction-to-vercel)
2. [Setup and Deployment](#2-setup-and-deployment)
3. [Core Features](#3-core-features)
4. [CI/CD Integration](#4-cicd-integration)
5. [Environment Variables](#5-environment-variables)
6. [Domains and DNS](#6-domains-and-dns)
7. [Performance Optimization](#7-performance-optimization)
8. [Monitoring and Analytics](#8-monitoring-and-analytics-basic-intro)
9. [Security Basics](#9-security-basics)
10. [Best Practices](#10-best-practices)
11. [Common Mistakes](#11-common-mistakes)
12. [Real-world Examples](#12-real-world-examples)

---

## 1. Introduction to Vercel

### What is Vercel?
Vercel is a comprehensive **Frontend Cloud platform** that provides developers with the frameworks, workflows, and infrastructure to build a faster, more personalized Web. Created by the same team behind **Next.js** (the popular React framework), Vercel is designed to optimize the entire developer experience (DX) and end-user performance.

At its core, Vercel is a global network that automatically configures and deploys static websites, single-page applications (SPAs), and serverless backend APIs.

### Why use Vercel?
Vercel has become the industry standard for modern frontend deployments due to several key advantages:

1. **Zero Configuration:** For most popular frameworks (React, Vue, Svelte, Next.js, Nuxt), Vercel requires zero configuration. It automatically detects the framework, knows the correct build commands, and configures the output directory.
2. **Global Edge Network:** Your content is automatically distributed across Vercel's global CDN (Content Delivery Network), ensuring users access your site from a server geographically close to them.
3. **Painless CI/CD:** Vercel integrates deeply with Git (GitHub, GitLab, Bitbucket). Every push to a repository automatically triggers a build and deployment.
4. **Preview Environments:** Every Git branch gets a unique, live URL. This allows teams to review changes before merging them into production.
5. **Serverless & Edge Functions:** You can write backend APIs alongside your frontend code, and Vercel automatically deploys them to serverless environments (AWS Lambda) or edge environments (V8 Isolates).

### Vercel vs Traditional Hosting

To understand Vercel's value, we must contrast it with traditional web hosting models:

#### Traditional Hosting (cPanel, Shared Hosting, VPS like EC2)
- **Infrastructure:** You rent a specific server or virtual machine in a single data center (e.g., US-East).
- **Setup:** You must configure the operating system, web server (Nginx/Apache), Node.js environment, SSL certificates, and auto-scaling rules.
- **Deployment:** Often involves FTP, SSH, or complex custom Jenkins/GitHub Actions pipelines to move code to the server.
- **Scaling:** Requires manual intervention or complex auto-scaling configurations. If traffic spikes, your server might crash.

#### Vercel (Frontend Cloud / Serverless PaaS)
- **Infrastructure:** Serverless. You don't manage any servers. Your code is distributed globally.
- **Setup:** Connect your Git repository. Vercel handles SSL, CDN, routing, and environment setup automatically.
- **Deployment:** Git-push to deploy. Vercel handles the build process on their build servers and distributes the output.
- **Scaling:** Infinite and automatic. Serverless functions scale from 0 to thousands of concurrent requests instantly and scale back to 0 when not in use.

### The Architecture of a Vercel Deployment

When you deploy to Vercel, the following process occurs:
1. **Analyze:** Vercel inspects your code and detects the framework (e.g., Vite, Next.js).
2. **Build:** Vercel spins up a secure container, installs your dependencies (`npm install`), and runs your build command (`npm run build`).
3. **Process:** The build output is separated into Static Assets, Serverless Functions, and Edge Functions.
4. **Deploy:** 
   - Static assets (HTML, CSS, JS, Images) are deployed to the Global Edge Network (CDN).
   - Serverless functions are deployed to specific regions (usually Washington D.C. by default, but configurable).
   - Edge functions are deployed globally to all Edge nodes.

---

## 2. Setup and Deployment

### Creating an Account
Vercel is deeply integrated with Git providers. The best way to create an account is via Single Sign-On (SSO):
1. Go to [vercel.com/signup](https://vercel.com/signup).
2. Choose "Continue with GitHub" (or GitLab / Bitbucket).
3. Authorize the Vercel application. This allows Vercel to read your repositories for deployment.

### Deploying a Project (Via the Web UI)

The easiest way to deploy is through the Vercel Dashboard:
1. Click **Add New...** -> **Project**.
2. Vercel will display a list of your Git repositories.
3. Find the repository you want to deploy and click **Import**.
4. **Configure Project:**
   - **Project Name:** The name of your Vercel project (dictates the default URL).
   - **Framework Preset:** Usually auto-detected (e.g., Create React App, Vite, Next.js).
   - **Root Directory:** If your app is not in the root of the repo (e.g., a monorepo), specify the path here.
   - **Build and Output Settings:** Override the default `npm run build` command or output directory if necessary.
   - **Environment Variables:** Add any required `.env` variables.
5. Click **Deploy**. Vercel will build and launch your application.

### The Vercel CLI

While the dashboard is great, the Vercel CLI (Command Line Interface) provides powerful tools for local development and manual deployments.

#### Installation
```bash
# Install the Vercel CLI globally
npm i -g vercel
```

#### Authentication
```bash
# Log in to your Vercel account via the CLI
vercel login
```

#### Linking and Deploying Locally
If you have a local project not yet connected to Git, you can deploy directly from your machine.

```bash
cd my-awesome-project

# Initialize a Vercel project and deploy to a Preview environment
vercel
```

During the first run of `vercel`, the CLI will prompt you:
1. *Set up and deploy "~/my-awesome-project"?* (Y/n)
2. *Which scope do you want to deploy to?* (Select your team/personal account)
3. *Link to existing project?* (N)
4. *What's your project's name?* (my-awesome-project)
5. *In which directory is your code located?* (./)

To deploy straight to **Production** from the CLI, use:
```bash
vercel --prod
```

### Project Configuration (`vercel.json`)

While Vercel is zero-config for most apps, you can customize the platform's behavior using a `vercel.json` file in the root of your project. 

This file controls routing, redirects, headers, and serverless function configurations.

**Example `vercel.json` for an SPA (Single Page Application like React/Vite):**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```
*Note: The `rewrites` rule above tells Vercel to route all traffic to `index.html`, which is strictly necessary for client-side routing (like React Router) to work properly on page refresh.*

### Ignoring Files During Build (`.vercelignore`)

Similar to `.gitignore`, you can prevent Vercel from uploading specific files to their build servers using `.vercelignore`. This speeds up the upload phase of your deployment.

**Example `.vercelignore`:**
```text
README.md
docs/
.vscode/
tests/
cypress/
```

---

## 3. Core Features

Vercel is not just a static file host; it is a powerful platform for running backend logic. It divides backend execution into two primary models: Serverless Functions and Edge Functions.

### Serverless Functions

#### What are they?
Serverless functions are pieces of backend code that run on demand. Vercel abstracts away the underlying infrastructure (AWS Lambda). You simply write a function, export it, and Vercel handles the provisioning, scaling, and execution.

- **Scaling:** Scales instantly from 0 to handle thousands of requests.
- **Pricing:** You pay only for the compute time you use (measured in GB-seconds).
- **Cold Starts:** If a function hasn't been called recently, the cloud provider must spin up a new container. This takes a few hundred milliseconds and is known as a "cold start."

#### Creating a Serverless Function
Vercel uses file-system-based routing for APIs. Any file inside the `/api` directory is automatically exposed as an API endpoint.

**Example: `/api/hello.js` (Node.js)**
```javascript
// This function will be available at: https://your-domain.com/api/hello

export default function handler(request, response) {
  // request.query contains URL query parameters
  const { name = 'World' } = request.query;

  // Send a JSON response
  response.status(200).json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString()
  });
}
```

#### Request and Response Objects
Vercel provides helper methods on the standard Node.js `IncomingMessage` and `ServerResponse` objects.
- `req.query`: An object containing the request's query string.
- `req.cookies`: An object containing cookies sent by the request.
- `req.body`: An object containing the body parsed by standard body parsers (JSON, urlencoded).
- `res.status(code)`: Sets the status code.
- `res.json(obj)`: Sends a JSON response.
- `res.redirect(url)`: Redirects the request.

#### Limits and Constraints
- **Execution Timeout:** By default, functions timeout after 10 seconds (Hobby plan) or 15 seconds (Pro plan, configurable up to 300s).
- **Memory Limit:** 1024 MB (Hobby/Pro).
- **Payload Size:** Maximum request body size is 4.5 MB.
- **State:** Serverless functions are stateless. Do not rely on saving files to the local disk (`/tmp` is available but ephemeral). Use an external database (Postgres, Redis, MongoDB) for persistence.

### Edge Functions (Basic Intro)

#### What are Edge Functions?
While Serverless functions run in a specific geographic region (e.g., US-East), **Edge Functions** run on Vercel's Global Edge Network, close to the user making the request. 

They use a specialized runtime built on **V8 Isolates** (similar to Cloudflare Workers), rather than a full Node.js environment.

**Advantages:**
- **Zero Cold Starts:** Edge functions start almost instantly.
- **Ultra-low Latency:** Executed geographically close to the user.
- **Cheaper:** Consume fewer resources than full serverless functions.

**Disadvantages:**
- **Limited APIs:** They do not have access to full Node.js APIs (like `fs` or `child_process`). They rely on Web Standard APIs (Fetch, Request, Response, Crypto).
- **Execution Limits:** Strict CPU time limits (usually 50ms).

#### Writing an Edge Function
To create an edge function, you export a configuration object specifying the runtime.

**Example: `/api/edge-hello.js`**
```javascript
export const config = {
  runtime: 'edge', // Specify the Edge runtime
};

export default function handler(request) {
  // Edge functions use standard Web Fetch API Request/Response objects
  return new Response(JSON.stringify({ message: "Hello from the Edge!" }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
```

#### Edge Middleware
Middleware allows you to run code *before* a request is completed. It is perfect for authentication, A/B testing, bot protection, and localization. Middleware *always* runs on the Edge.

**Example: `middleware.js` (at the root of your project)**
```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check if the user has an auth token
  const token = request.cookies.get('auth-token');

  // If trying to access the dashboard without a token, redirect to login
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Otherwise, continue the request
  return NextResponse.next();
}

// Specify which paths the middleware should run on
export const config = {
  matcher: '/dashboard/:path*',
};
```

---

## 4. CI/CD Integration

Vercel's CI/CD (Continuous Integration and Continuous Deployment) is what truly sets it apart from traditional hosting. It is built entirely around Git workflows.

### GitHub / GitLab / Bitbucket Integration

When you import a repository, Vercel installs an app/webhook in your Git provider. This creates a bi-directional integration.

#### The Deployment Workflow
1. **Push to Branch:** You create a feature branch (`git checkout -b feature-a`) and push to GitHub.
2. **Preview Deployment:** Vercel intercepts the push event, builds the branch, and deploys it to a unique URL (e.g., `my-app-feature-a-username.vercel.app`).
3. **Pull Request (PR):** You open a PR on GitHub. Vercel comments on the PR with the Preview URL, build logs, and performance metrics.
4. **Merge to Main:** Once reviewed, you merge the PR into the `main` (or `master`) branch.
5. **Production Deployment:** Vercel automatically builds the `main` branch and promotes it to your production domains (e.g., `my-app.com`).

### Deployment URLs and Aliases

Vercel automatically assigns multiple URLs to every deployment:
- **Deployment URL:** A unique, immutable URL for that exact build (e.g., `my-app-9xj34z.vercel.app`). Even if you deploy again, this URL will always show this specific version of the code.
- **Branch URL:** Always points to the latest deployment for a specific branch (e.g., `my-app-git-feature-a.vercel.app`).
- **Project URL:** The default preview URL (e.g., `my-app-username.vercel.app`).
- **Production URL:** Your custom domains assigned to the main branch.

### Deploy Hooks

Sometimes you need to trigger a deployment without pushing code to Git. For example, if you are using a Headless CMS (like Sanity, Contentful, or Strapi), you want to rebuild your static site when an editor publishes a new article.

Vercel provides **Deploy Hooks**.
1. Go to Project Settings -> Git -> Deploy Hooks.
2. Create a new hook (e.g., "CMS Trigger").
3. Vercel provides a unique URL: `https://api.vercel.com/v1/integrations/deploy/prj_xyz/hook_abc`.
4. You configure your CMS to send a `POST` request to this URL whenever content changes. Vercel will trigger a new production build.

### Ignore Build Step

To save build minutes, Vercel allows you to skip builds if no relevant files changed. For example, in a monorepo or if you only updated a `README.md`.

You can configure an "Ignored Build Step" command in Project Settings -> Git.
If the command exits with code `1`, the build proceeds. If it exits with code `0`, the build is canceled.

**Example command:**
```bash
# Only build if files in the `src/` directory or `package.json` changed
git diff --quiet HEAD^ HEAD ./src ./package.json
```

---

## 5. Environment Variables

Modern applications rely on environment variables to manage configuration across different environments (e.g., database connection strings, API keys, feature flags) without hardcoding secrets into the source code.

### Managing Env Vars in Vercel

You manage environment variables in the Vercel Dashboard under **Project Settings -> Environment Variables**.

Vercel allows you to scope variables to specific environments:
- **Production:** Used when the `main` branch is built.
- **Preview:** Used for all branch deployments and Pull Requests.
- **Development:** Used when running the Vercel CLI locally (`vercel dev`).

### Best Practices for Environment Variables

1. **Never commit `.env` files to Git.** Ensure `.env`, `.env.local`, etc., are in your `.gitignore`.
2. **Use precise scoping.** Do not use your production database URL for preview environments. Set up a separate staging database and assign its URL strictly to the "Preview" environment.
3. **Prefix public variables.** In frameworks like Next.js or Vite, environment variables are only available to the server/Node.js environment by default for security. 
   - To expose a variable to the frontend in Next.js, prefix it with `NEXT_PUBLIC_` (e.g., `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`).
   - In Vite, prefix it with `VITE_` (e.g., `VITE_API_URL`).

### Pulling Env Vars Locally

When working locally, you need the same environment variables that Vercel uses. Instead of manually copying them from the dashboard, use the CLI:

```bash
# Pulls Development environment variables into a .env.local file
vercel env pull .env.local
```

### System Environment Variables

Vercel automatically injects several system variables into your deployments, which you can use in your code:
- `VERCEL_URL`: The domain of the current deployment (useful for constructing absolute URLs in API routes).
- `VERCEL_ENV`: Returns `production`, `preview`, or `development`.
- `VERCEL_GIT_COMMIT_SHA`: The hash of the git commit being deployed.

**Example usage in an API route:**
```javascript
export default function handler(req, res) {
  const isProd = process.env.VERCEL_ENV === 'production';
  const dbUrl = isProd ? process.env.PROD_DB_URL : process.env.STAGING_DB_URL;
  // Connect to DB...
}
```

---

## 6. Domains and DNS

Vercel makes managing custom domains and SSL certificates incredibly simple.

### Adding a Custom Domain

1. Go to **Project Settings -> Domains**.
2. Enter your domain (e.g., `myapp.com` or `app.myapp.com`).
3. Click **Add**.

Vercel will ask if you want to add the `www` subdomain as well and automatically configure a redirect (e.g., `www.myapp.com` redirects to `myapp.com`). This is a crucial SEO best practice.

### DNS Configuration

Once added, you must configure your DNS provider (e.g., GoDaddy, Namecheap, Cloudflare, Route53) to point to Vercel.

Vercel provides two methods:

#### 1. A Record and CNAME (Recommended for external DNS)
If you want to keep your DNS management with your registrar:
- **Apex Domain (`myapp.com`):** Create an **A Record** pointing to Vercel's Anycast IP (`76.76.21.21`).
- **Subdomain (`www.myapp.com` or `app.myapp.com`):** Create a **CNAME Record** pointing to `cname.vercel-dns.com`.

#### 2. Vercel Nameservers (Easiest)
You can transfer DNS management entirely to Vercel. 
- Change the Nameservers at your registrar to Vercel's nameservers (e.g., `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).
- Vercel will automatically manage all DNS records for your Vercel deployments.

### SSL/TLS Certificates
Vercel automatically provisions, manages, and renews SSL/TLS certificates via Let's Encrypt for every domain you add. This happens in the background, requiring zero configuration. HTTPS is enforced automatically.

### Redirects and Rewrites

You can manage URL routing at the edge using `vercel.json` or your framework's configuration file (e.g., `next.config.js`).

**Redirects** change the URL in the user's browser and return a 301 (Permanent) or 302 (Temporary) status code. Good for SEO when migrating old URLs.

```json
// vercel.json
{
  "redirects": [
    { "source": "/old-blog", "destination": "/blog", "permanent": true },
    { "source": "/twitter", "destination": "https://twitter.com/myhandle", "permanent": false }
  ]
}
```

**Rewrites** proxy the request behind the scenes. The URL in the user's browser stays the same, but Vercel fetches content from the destination. Good for proxying APIs to avoid CORS issues.

```json
// vercel.json
{
  "rewrites": [
    { "source": "/api/external/:path*", "destination": "https://api.external.com/v1/:path*" }
  ]
}
```

---

## 7. Performance Optimization

Vercel is built to deliver content globally at lightning speed. Understanding how caching works on Vercel is key to building performant apps.

### Global CDN (Vercel Edge Network)

Static assets (HTML, CSS, JS, images) are automatically cached on Vercel's Edge Network. When a user requests your site, the DNS routes them to the nearest Edge Node (Point of Presence or PoP) using Anycast routing.

### Caching Serverless Responses

By default, Serverless Functions are dynamic—they compute a new response for every request. However, you can cache API responses on the Edge Network using the `Cache-Control` header.

**Example: Caching an API response for 60 seconds**
```javascript
export default function handler(req, res) {
  // s-maxage tells the Vercel CDN to cache this response for 60 seconds.
  // stale-while-revalidate tells the CDN to serve stale content while updating the cache in the background.
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=86400');
  
  const data = fetchHeavyDataFromDatabase();
  res.status(200).json(data);
}
```

#### SWR (Stale-While-Revalidate)
Vercel heavily promotes the SWR caching strategy. 
1. **First Request (Cache Miss):** The request hits the serverless function, takes 2 seconds to execute. Response is cached.
2. **Second Request (within 60s):** Served instantly from the Edge Cache.
3. **Third Request (after 60s):** The cache is now "stale". Vercel *instantly* serves the stale cached data to the user, but simultaneously triggers a background execution of the serverless function to update the cache.
4. **Fourth Request:** Served instantly with the newly updated data.

This ensures the user almost never experiences the latency of a database query or a "cold start", while still keeping data relatively fresh.

### Image Optimization

Serving unoptimized, large images is the #1 cause of poor web performance. Vercel provides a built-in Image Optimization API.

If you use Next.js, the `next/image` component uses this automatically:
```jsx
import Image from 'next/image'

export default function Avatar() {
  return (
    <Image 
      src="/profile.jpg" 
      alt="Profile" 
      width={500} 
      height={500} 
      // Vercel automatically resizes, compresses to WebP/AVIF, and caches this image at the edge.
    />
  )
}
```
For other frameworks, you can manually use the `/_vercel/image` endpoint to optimize images on the fly.

---

## 8. Monitoring and Analytics (Basic Intro)

Vercel provides built-in tools to monitor application health and performance without needing complex third-party setups.

### Vercel Web Analytics
Vercel Analytics provides privacy-friendly, cookieless tracking of your website traffic. It shows:
- Visitors and Pageviews
- Top Pages, Referrers, Operating Systems, and Browsers.
- Easy to enable via the dashboard, requiring a tiny script injection.

### Speed Insights (Core Web Vitals)
Speed Insights tracks actual user performance metrics, known as Core Web Vitals, which impact SEO and user experience:
- **LCP (Largest Contentful Paint):** Loading speed.
- **FID/INP (Interaction to Next Paint):** Interactivity/Responsiveness.
- **CLS (Cumulative Layout Shift):** Visual stability (do elements jump around as they load?).

Vercel provides a score (0-100) based on real user data (RUM - Real User Monitoring), helping you pinpoint which specific pages are slow.

### Runtime Logs
In the Vercel Dashboard, the "Logs" tab provides real-time streaming logs from your Build process, Serverless Functions, and Edge Functions. 

You can filter logs by:
- Environment (Production, Preview)
- HTTP Status Code (e.g., 500 errors)
- Request path

For enterprise applications, Vercel supports **Log Drains**, allowing you to forward all logs to services like Datadog, New Relic, or Logtail for long-term retention and advanced querying.

---

## 9. Security Basics

Vercel handles infrastructure security automatically, but application security remains the developer's responsibility.

### Built-in Infrastructure Security
- **DDoS Protection:** Vercel automatically mitigates Distributed Denial of Service attacks at the edge before they hit your functions.
- **SSL/TLS:** Every deployment is served over HTTPS.
- **Vercel Firewall:** (Available on Pro/Enterprise) Allows you to block specific IP addresses or geographic regions.

### Securing Preview Deployments
Preview URLs are public by default (anyone with the link can view them). If you are working on confidential features, you can restrict access:
- **Vercel Authentication:** Require users to be logged into your Vercel team to view preview deployments.
- **Password Protection:** Require a shared password to access preview links.

### CORS (Cross-Origin Resource Sharing)
If you build an API on Vercel (`api.myproject.com`) and call it from a different frontend domain (`myfrontend.com`), the browser will block the request due to CORS.

You must explicitly allow the origin in your serverless functions or `vercel.json`.

**Example CORS implementation in a Serverless Function:**
```javascript
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'https://myfrontend.com'); // Or '*' for public APIs
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Actual API logic
  res.status(200).json({ data: "Success" });
}
```

---

## 10. Best Practices

### Use Turborepo for Monorepos
If your project consists of multiple apps (e.g., a marketing site, a web app, and shared UI components) in a single Git repository, use **Turborepo** (created by Vercel). 
Vercel's build infrastructure recognizes Turborepo and utilizes **Remote Caching**. If a component hasn't changed since the last build, Vercel will skip building it, drastically reducing deployment times.

### Keep Dependencies Lean
Serverless functions have a 50MB zipped deployment limit. If you import heavy libraries (like `puppeteer` or large data-science modules) inside an API route, your deployment may fail. 
- Only import what you need.
- Avoid using bulky native binaries inside serverless functions.

### Database Connection Pooling
Serverless functions scale by creating new instances. If 1,000 users hit your API simultaneously, Vercel spins up 1,000 function instances.
If each instance opens a direct connection to your Postgres database, you will quickly exhaust the database's connection limit (resulting in `too many clients already` errors).

**Best Practice:** Use a connection pooler (like PgBouncer, Prisma Accelerate, or serverless-friendly databases like Supabase or Neon) to manage database connections efficiently.

### Use `vercel dev` for Local Development
Never guess how your code will behave in production. Use the Vercel CLI's local development server.

```bash
vercel dev
```
This command:
1. Replicates the Vercel Edge Network locally.
2. Injects your Vercel environment variables.
3. Maps your `/api` directory exactly as it will function in production.
4. Executes your framework's local dev server (e.g., `vite dev` or `next dev`).

---

## 11. Common Mistakes

1. **Relying on File System State:** Writing files to `./data.json` inside a serverless function will fail or disappear on the next request. **Rule of thumb: Serverless functions are stateless. Use a database.**
2. **Long-Running Processes:** Attempting to run a heavy video rendering job or a 5-minute web scrape in a serverless function will result in a **Timeout Error** (functions die after 10-15 seconds).
   - *Fix:* Use background jobs, message queues (like Upstash Kafka/QStash), or offload heavy tasks to a dedicated long-running server.
3. **Leaking Environment Variables:** Prefixing a secret API key with `NEXT_PUBLIC_` or `VITE_` makes it visible in the browser source code, compromising your security. Only prefix safe, public variables (like analytics IDs).
4. **Forgetting to return a response:** In Node.js serverless functions, if you don't call `res.status().json()` or `res.end()`, the function will hang until it hits the timeout limit, resulting in a 504 Gateway Timeout and wasting compute resources.
5. **Ignoring Cold Starts:** If your database is in `eu-central-1` (Frankfurt) but your Vercel functions are deployed in `us-east-1` (Washington D.C.), every API call incurs massive latency. Ensure your Vercel Function Region matches your Database Region in the project settings.

---

## 12. Real-world Examples

### Example 1: Deploying a React App (Vite)

**1. Create the app:**
```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
```

**2. Configure Routing:**
Client-side SPAs need all URLs to point to `index.html`. Create a `vercel.json` in the root:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**3. Deploy:**
```bash
# Push to GitHub, import via Vercel Dashboard, OR use CLI:
vercel
```
Vercel automatically detects Vite, sets the build command to `npm run build`, and output dir to `dist`.

### Example 2: Deploying a Full-Stack Node API

Let's say you want to build a standalone API without a frontend framework.

**1. Setup Project:**
```bash
mkdir my-vercel-api
cd my-vercel-api
npm init -y
npm i cors
mkdir api
```

**2. Create an Endpoint (`api/users.js`):**
```javascript
const cors = require('cors');

// Helper to wrap CORS middleware for serverless
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
};

// Initialize CORS
const corsMiddleware = cors({
  methods: ['GET', 'HEAD'],
  origin: '*' // Be cautious in production
});

export default async function handler(req, res) {
  // Run CORS middleware
  await runMiddleware(req, res, corsMiddleware);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Mock Database Call
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];

  // Cache response at the edge for 5 minutes
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');
  
  return res.status(200).json(users);
}
```

**3. Deploy:**
```bash
vercel --prod
```
Your API is now globally available and cached at the edge!

---
*End of Vercel Study Guide. Remember to regularly consult the [official Vercel documentation](https://vercel.com/docs) as platform limits and capabilities evolve rapidly.*
