# Comprehensive Next.js Study Guide

Welcome to the definitive study guide for Next.js. This 1000+ line technical manual covers Next.js comprehensively, focusing primarily on the foundational paradigms (Pages Router) while establishing the core principles needed for modern React application development. 

---

## Table of Contents
1. [Introduction to Next.js](#1-introduction-to-nextjs)
2. [Setup and Project Structure](#2-setup-and-project-structure)
3. [Routing](#3-routing)
4. [Pages and Layouts](#4-pages-and-layouts)
5. [Data Fetching](#5-data-fetching)
6. [API Routes](#6-api-routes)
7. [Styling](#7-styling)
8. [Images and Optimization](#8-images-and-optimization)
9. [Middleware (Basic Intro)](#9-middleware-basic-intro)
10. [Authentication (Basic Intro)](#10-authentication-basic-intro)
11. [Deployment](#11-deployment)
12. [Performance Optimization](#12-performance-optimization)
13. [Best Practices](#13-best-practices)
14. [Common Mistakes](#14-common-mistakes)
15. [Real-world Examples](#15-real-world-examples)

---

## 1. Introduction to Next.js

### What is Next.js
Next.js is an open-source React framework created by Vercel. It enables developers to build server-side rendered (SSR) and statically generated (SSG) web applications with ease. Unlike standard React, which runs primarily in the browser (Client-Side Rendering), Next.js moves the rendering workload to the server or build step, sending fully formed HTML to the client.

### Why use Next.js over React
Standard React applications (often created via Create React App or Vite) are Single Page Applications (SPAs). They send an empty HTML file and a large JavaScript bundle to the browser. The browser must download and execute the JS before the user sees any content.
**Advantages of Next.js:**
- **Search Engine Optimization (SEO):** Search engine crawlers can easily index the fully rendered HTML.
- **Initial Load Performance:** Users see the page content immediately without waiting for JS to execute.
- **Built-in Routing:** No need for third-party libraries like `react-router-dom`.
- **API Routes:** You can build full-stack applications with backend endpoints in the same repository.
- **Automatic Code Splitting:** Pages only load the JavaScript they need.

### Rendering Strategies: SSR vs CSR vs SSG vs ISR

Understanding rendering strategies is the most critical part of learning Next.js.

#### Client-Side Rendering (CSR)
- **How it works:** The browser downloads an empty HTML skeleton and a JavaScript bundle. React renders the components in the browser.
- **Pros:** Fast subsequent navigation, great for highly interactive dashboards.
- **Cons:** Slow initial load, poor SEO.

#### Server-Side Rendering (SSR)
- **How it works:** The HTML is generated on the server for *each individual request*.
- **When to use:** When data changes constantly and must be up-to-date (e.g., live stock ticker, personalized user feeds).
- **Next.js Implementation:** `getServerSideProps`

#### Static Site Generation (SSG)
- **How it works:** The HTML is generated exactly once during the *build time*. The same HTML is served to every user via a CDN.
- **When to use:** Blogs, marketing pages, documentation, e-commerce product pages.
- **Next.js Implementation:** `getStaticProps`

#### Incremental Static Regeneration (ISR)
- **How it works:** Similar to SSG, but pages can be updated in the background after deployment without a full rebuild.
- **When to use:** Millions of pages where building all at once is impossible, or content that updates periodically but not every second.
- **Next.js Implementation:** `getStaticProps` with a `revalidate` timer.

---

## 2. Setup and Project Structure

### Creating a Next.js app
To create a new Next.js application, run the following command in your terminal:

```bash
npx create-next-app@latest my-next-app
```

During the setup, you will be prompted with several options:
- **TypeScript:** Highly recommended for production apps.
- **ESLint:** Recommended for code quality.
- **Tailwind CSS:** Excellent utility-first CSS framework.
- **`src/` directory:** Helps separate app code from config files.
- **App Router:** The new paradigm (React Server Components). *Note: This guide focuses on the foundational Pages Router concepts requested, which remain heavily used and conceptually vital.*

### Folder Structure Overview (Pages Router)

A typical Next.js (Pages Router) project structure looks like this:

```text
my-next-app/
├── node_modules/         # Dependencies
├── public/               # Static assets (images, fonts, favicon)
│   ├── favicon.ico
│   └── vercel.svg
├── src/                  # (Optional) Source directory
│   ├── components/       # Reusable React components (Button, Navbar, etc.)
│   ├── pages/            # Next.js Pages Router directory
│   │   ├── api/          # Backend API routes
│   │   │   └── hello.js
│   │   ├── _app.js       # Custom App component (Global wrappers/providers)
│   │   ├── _document.js  # Custom Document component (HTML/Body tags)
│   │   └── index.js      # The home page (/)
│   └── styles/           # CSS files
│       ├── globals.css   # Global stylesheet
│       └── Home.module.css # CSS Modules
├── .eslintrc.json        # ESLint configuration
├── next.config.js        # Next.js configuration (webpack, env vars, etc.)
├── package.json          # Project metadata and scripts
└── README.md
```

**Key Directories:**
- `public/`: Any file here can be referenced starting from the base URL (`/`). Example: `<img src="/vercel.svg" />`.
- `pages/`: Every `.js`, `.jsx`, `.ts`, or `.tsx` file here becomes a route automatically.

---

## 3. Routing

Next.js uses a **file-system based router**. This means the structure of your files in the `pages` directory determines the URLs of your application.

### File-based routing

Creating standard routes is as simple as creating files.

- `pages/index.js` -> routes to `/`
- `pages/about.js` -> routes to `/about`
- `pages/contact.js` -> routes to `/contact`

You can also use nested folders to create deeper URL structures:

- `pages/blog/index.js` -> routes to `/blog`
- `pages/blog/first-post.js` -> routes to `/blog/first-post`

### Dynamic routes

When you don't know the exact segment names ahead of time (e.g., user IDs, blog slugs), you can use Dynamic Routes. You create them by wrapping the file or folder name in square brackets: `[param].js`.

#### Example: Single Dynamic Segment
File: `pages/users/[id].js`
Matches: `/users/1`, `/users/abc`, `/users/john-doe`

```jsx
// pages/users/[id].js
import { useRouter } from 'next/router';

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query; // Extracts the dynamic parameter from the URL

  return (
    <div>
      <h1>User Profile: {id}</h1>
    </div>
  );
}
```

#### Catch-All Routes
If you want to catch all routes deep inside a specific path, use three dots inside the brackets: `[...slug].js`.

File: `pages/shop/[...categories].js`
Matches: `/shop/clothes`, `/shop/clothes/tops`, `/shop/clothes/tops/t-shirts`

```jsx
// pages/shop/[...categories].js
import { useRouter } from 'next/router';

export default function ShopCategory() {
  const router = useRouter();
  const { categories } = router.query; // categories is an array: ['clothes', 'tops']

  return (
    <div>
      <h1>Viewing categories: {categories?.join(' / ')}</h1>
    </div>
  );
}
```

#### Optional Catch-All Routes
Wrap the catch-all in another set of brackets to make it optional: `[[...slug]].js`.
This means it will also match the root folder (`/shop`).

### Navigation between pages
Never use standard HTML `<a>` tags for internal links, as they cause a full page refresh. Instead, use the Next.js `<Link>` component.

```jsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      {/* Client-side transition, extremely fast */}
      <Link href="/">Home</Link>
      <Link href="/about">About Us</Link>
      <Link href={`/blog/${post.slug}`}>Dynamic Post</Link>
    </nav>
  );
}
```

---

## 4. Pages and Layouts

### Pages Concept
In Next.js, a page is simply a React Component exported from a file in the `pages` directory. Pages are associated with a route based on their file name.

### Layout Patterns

Because many pages share common elements like a Navbar and Footer, Next.js allows you to implement consistent layouts.

#### 1. Custom `_app.js`
The `_app.js` file is used to initialize all pages. It is the perfect place to keep state when navigating between pages, or to apply a global layout.

```jsx
// pages/_app.js
import '../styles/globals.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  // The 'Component' prop is the active page (e.g., index.js or about.js)
  // 'pageProps' is an object with the initial props preloaded for your page by data fetching methods
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
```

```jsx
// components/Layout.js
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
}
```

#### 2. Per-Page Layouts
Sometimes different pages need entirely different layouts (e.g., an Admin Dashboard vs a public landing page). You can attach a layout property to the page component.

```jsx
// pages/admin/dashboard.js
import AdminLayout from '../../components/AdminLayout';

export default function Dashboard() {
  return <h1>Admin Dashboard</h1>;
}

// Attach the specific layout to this page
Dashboard.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  );
};
```

Update `_app.js` to support per-page layouts:

```jsx
// pages/_app.js
export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}
```

#### Custom `_document.js`
`_document.js` is only rendered on the server. It is used to update the `<html>` and `<body>` tags used to render a Page. This is where you inject custom web fonts or lang attributes.

```jsx
// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Place custom font links here */}
        <meta name="theme-color" content="#000000" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

---

## 5. Data Fetching

Next.js provides specific functions to fetch data. These functions determine how your page will be rendered (SSR vs SSG).

### `getStaticProps` (Static Site Generation)

If you export a function called `getStaticProps` from a page, Next.js will pre-render this page at **build time** using the props returned by the function.

```jsx
// pages/blog.js
export default function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// This function gets called at build time on the server
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds (ISR)
    revalidate: 10, // In seconds
  };
}
```

**Key Points:**
- It *never* runs on the browser.
- You can write direct database queries inside it securely.
- `revalidate` enables Incremental Static Regeneration (ISR).

### `getServerSideProps` (Server-Side Rendering)

If you export `getServerSideProps`, Next.js will pre-render this page on **each request** using the data returned by the function.

```jsx
// pages/profile.js
export default function Profile({ user }) {
  return <h1>Welcome, {user.name}</h1>;
}

// This gets called on every request
export async function getServerSideProps(context) {
  // context contains request and response objects (req, res), routing params, etc.
  const { req, res } = context;
  
  // Extract a cookie to fetch user data
  const sessionToken = req.cookies.sessionToken;

  if (!sessionToken) {
    // Redirect unauthenticated users
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const userRes = await fetch(`https://api.example.com/user?token=${sessionToken}`);
  const user = await userRes.json();

  return {
    props: { user },
  };
}
```

**Key Points:**
- Runs on every single request. Slower than `getStaticProps` because it has to process data before sending a response.
- Best for data that changes constantly or depends on the user (authentication).

### `getStaticPaths` (Dynamic SSG)

If a page has dynamic routes (e.g., `[id].js`) and uses `getStaticProps`, it needs to define a list of paths to be statically generated at build time. You do this with `getStaticPaths`.

```jsx
// pages/posts/[id].js
export default function Post({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}

// 1. Tell Next.js which paths to pre-render at build time
export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { 
    paths, 
    // fallback: false means paths not returned by getStaticPaths will result in a 404 page.
    // fallback: true means Next.js will serve a "loading" state, then generate the HTML in the background.
    // fallback: 'blocking' means the browser will wait until the HTML is generated (SSR-like behavior on first miss).
    fallback: 'blocking' 
  };
}

// 2. Fetch data for a specific path
export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.id}`);
  const post = await res.json();

  if (!post) {
    return { notFound: true }; // Triggers a 404 page
  }

  return {
    props: { post },
    revalidate: 60,
  };
}
```

---

## 6. API Routes

Next.js allows you to build your own API backend within the same application. Any file inside `pages/api/` is treated as an API endpoint instead of a React page.

They are server-side only bundles and won't increase your client-side bundle size.

### Creating Backend APIs

```javascript
// pages/api/hello.js
export default function handler(req, res) {
  // req: instance of http.IncomingMessage, plus some pre-built middlewares
  // res: instance of http.ServerResponse, plus some helper functions

  if (req.method === 'GET') {
    // Respond with JSON
    res.status(200).json({ message: 'Hello from Next.js!' });
  } else if (req.method === 'POST') {
    const { name } = req.body;
    res.status(201).json({ message: `User ${name} created.` });
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

### Dynamic API Routes

Just like pages, API routes can be dynamic.

```javascript
// pages/api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query;

  res.status(200).json({ userId: id, name: `User ${id}` });
}
```

**Use Cases for API Routes:**
- Masking URL of an external API (to hide API keys).
- Securely communicating with a database directly.
- Form submissions.
- Authentication callbacks.

---

## 7. Styling

Next.js supports various ways to style your application out of the box.

### Global Styles
You can add a global stylesheet (e.g., `globals.css`) that applies to the whole application.
**Rule:** Global CSS files can *only* be imported inside `pages/_app.js`.

```jsx
// pages/_app.js
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

### CSS Modules
CSS Modules locally scope CSS by automatically creating a unique class name. This allows you to use the same class name in different files without worrying about collisions.

File naming convention: `Component.module.css`.

```css
/* styles/Button.module.css */
.error {
  color: white;
  background-color: red;
  padding: 10px 20px;
  border-radius: 5px;
}
```

```jsx
// components/Button.js
import styles from '../styles/Button.module.css';

export default function ErrorButton() {
  // styles.error generates a unique class like `Button_error__abc123`
  return <button className={styles.error}>Delete Account</button>;
}
```

### Sass/SCSS
Next.js allows you to use Sass. Simply install `sass` (`npm i sass`) and change `.css` to `.scss` or `.sass`.

### Tailwind CSS
Tailwind is extremely popular with Next.js. After installing it and configuring `tailwind.config.js`, you simply inject the Tailwind directives into `globals.css`.

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 8. Images and Optimization

Images often account for the largest portion of a webpage's weight. Next.js provides a built-in `Image` component (`next/image`) that automatically optimizes images.

### The `<Image>` Component

The Next.js Image component extends the HTML `<img>` element with features for excellent performance:
- **Size Optimization:** Automatically serve correctly sized images for each device using modern formats like WebP and AVIF.
- **Visual Stability:** Prevents Cumulative Layout Shift (CLS) automatically.
- **Faster Page Loads:** Images are lazy-loaded by default. Only loaded when they enter the viewport.
- **Asset Flexibility:** On-demand image resizing, even for images stored on remote servers.

```jsx
import Image from 'next/image';
import profilePic from '../public/me.png';

export default function Profile() {
  return (
    <div>
      {/* Local images automatically get width/height and placeholder blur */}
      <Image 
        src={profilePic} 
        alt="Picture of the author" 
        placeholder="blur" 
      />

      {/* Remote images REQUIRE explicit width and height to prevent CLS */}
      <Image
        src="https://images.unsplash.com/photo-123..."
        alt="Remote image"
        width={500}
        height={300}
      />
    </div>
  );
}
```

### Configuring Remote Image Domains
To protect your application from malicious users, you must explicitly configure which remote domains are allowed to be optimized by the Next.js image loader.

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
};
```

### Font Optimization (`next/font`)
Next.js automatically optimizes web fonts. It downloads font files at build time and self-hosts them, eliminating external network requests to Google Fonts and ensuring zero layout shift.

```jsx
import { Inter } from 'next/font/google';

// Instantiate the font
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    // Apply the font class
    <main className={inter.className}>
      <h1>Hello World</h1>
    </main>
  );
}
```

### Script Optimization (`next/script`)
For third-party scripts (analytics, ads), use `next/script` to control when they load.

```jsx
import Script from 'next/script';

export default function Page() {
  return (
    <>
      {/* strategy="lazyOnload" loads the script during browser idle time */}
      <Script 
        src="https://www.google-analytics.com/analytics.js" 
        strategy="lazyOnload" 
      />
    </>
  );
}
```

---

## 9. Middleware (Basic Intro)

Middleware allows you to run code *before* a request is completed. Based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.

Middleware runs on the **Edge** (a specialized, extremely fast, lightweight runtime), meaning it executes closer to the user.

### Creating Middleware
Create a `middleware.js` or `middleware.ts` file at the root of your project (same level as `pages/`).

```javascript
// middleware.js
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // Check if the user is visiting a protected route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for an auth token in cookies
    const token = request.cookies.get('token');

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ['/admin/:path*'],
};
```

**Common Use Cases:**
- Authentication / Authorization checks.
- A/B Testing (rewriting to different variants).
- Internationalization (i18n) routing based on Accept-Language headers.
- Bot protection.

---

## 10. Authentication (Basic Intro)

Authentication in Next.js is highly dependent on your backend architecture, but the most common and robust library is **NextAuth.js** (now known as Auth.js).

### NextAuth.js
NextAuth.js is designed to work seamlessly with Next.js. It handles session management, OAuth providers (Google, GitHub, Apple), and credentials securely.

**Basic Setup:**
1. Install: `npm install next-auth`
2. Create dynamic API route: `pages/api/auth/[...nextauth].js`

```javascript
// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // Optional: Add JWT strategy or database adapter
  session: { strategy: "jwt" }
})
```

3. Wrap your app in the SessionProvider:

```jsx
// pages/_app.js
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```

4. Use the `useSession` hook on the client:

```jsx
// components/LoginBtn.js
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginBtn() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
```

---

## 11. Deployment

Next.js is designed to be deployed anywhere that supports Node.js, but the creator, Vercel, provides the most optimized hosting experience.

### Deploying to Vercel
1. Push your code to a Git provider (GitHub, GitLab, Bitbucket).
2. Create an account on Vercel.
3. Import your repository.
4. Vercel automatically detects Next.js, configures the build settings, and deploys it.
5. Every push to `main` creates a production deployment. Every push to a branch creates a preview URL.

### Deploying to a Custom Node.js Server
If you want to host on AWS EC2, DigitalOcean, or Heroku, you build the app and start a Node server.

Update `package.json`:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

Commands to run on your server:
```bash
npm run build
npm run start # Starts a production Node.js server on port 3000
```

### Docker Deployment
Next.js provides a standalone output mode that significantly reduces the Docker image size.

```javascript
// next.config.js
module.exports = {
  output: 'standalone',
}
```
You can then write a `Dockerfile` that only copies the minimal required files from the `.next/standalone` directory, ignoring heavy `node_modules`.

---

## 12. Performance Optimization

Next.js provides numerous built-in tools for performance.

### Bundle Analyzer
To see what is making your JavaScript bundles large, use `@next/bundle-analyzer`.

```bash
npm install @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // your Next.js config
})
```
Run `ANALYZE=true npm run build` to generate a visual HTML report of your Webpack chunks.

### Dynamic Imports
To improve initial load time, you can dynamically import heavy components (like rich text editors, charts, or maps) so they are only loaded when needed.

```jsx
import dynamic from 'next/dynamic'
import { useState } from 'react'

// This component will not be included in the initial JS bundle
const HeavyChart = dynamic(() => import('../components/HeavyChart'), {
  loading: () => <p>Loading Chart...</p>,
  ssr: false, // Set to false if the component relies on the `window` object
})

export default function Dashboard() {
  const [showChart, setShowChart] = useState(false)

  return (
    <div>
      <button onClick={() => setShowChart(true)}>View Stats</button>
      {showChart && <HeavyChart />}
    </div>
  )
}
```

---

## 13. Best Practices

1. **Use Absolute Imports / Path Aliases:**
   Instead of `import Button from '../../../components/Button'`, configure path aliases in `jsconfig.json` or `tsconfig.json`.
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/components/*": ["src/components/*"],
         "@/styles/*": ["src/styles/*"]
       }
     }
   }
   ```
   Usage: `import Button from '@/components/Button'`.

2. **Environment Variables:**
   - Next.js has built-in `.env.local` support.
   - Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.
   - Server-only variables (e.g., `DATABASE_URL`) should never have the prefix.

3. **Minimize `getServerSideProps`:**
   SSR blocks the response until the server finishes fetching data. It can be slow. Use SSG (`getStaticProps`) with ISR (`revalidate`) whenever possible. If data is highly user-specific and changes rapidly, consider using SSG for the shell and fetching the data on the client side using SWR or React Query.

4. **Keep Pages Thin:**
   Page components should primarily be responsible for fetching data and rendering layout wrappers. Heavy logic and UI should be abstracted into the `components/` directory.

---

## 14. Common Mistakes

### 1. Hydration Mismatches
**Error:** `Text content did not match. Server: "A" Client: "B"`
**Cause:** The HTML rendered on the server differs from the HTML React attempts to render on the first client pass. Usually caused by using `window` or `Date.now()` without a `useEffect`.
**Fix:** Only use browser-specific logic after the component mounts.
```jsx
// Bad
export default function Time() {
  return <div>{typeof window !== 'undefined' ? window.innerWidth : 0}</div>
}

// Good
export default function Time() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return <div>{width}</div>
}
```

### 2. Using `<a>` instead of `<Link>`
Using standard `<a>` tags causes full page reloads, destroying React state and downloading the JS bundle again. Always use `next/link`.

### 3. Fetching your own API Routes in `getStaticProps` or `getServerSideProps`
**Mistake:** Using `fetch('http://localhost:3000/api/users')` inside `getServerSideProps`.
**Why it's bad:** It adds an unnecessary HTTP network round-trip. Both functions run on the server.
**Fix:** Import the database logic or helper functions directly into the `getServerSideProps` block.

---

## 15. Real-world Examples

### Example 1: The Markdown Blog Architecture (SSG)

A technical blog needs perfect SEO, lightning-fast load times, and doesn't update every minute. The perfect architecture is **Static Site Generation (SSG)**.

**Architecture:**
1. Store blog posts as Markdown (`.md`) or MDX (`.mdx`) files in a `posts/` directory.
2. Use a library like `gray-matter` to parse frontmatter (title, date).
3. In `pages/blog/index.js`, use `getStaticProps` to read the file system, parse all markdown files, sort by date, and pass the list to the page.
4. In `pages/blog/[slug].js`, use `getStaticPaths` to read the file system and generate a path for every markdown file.
5. In the same `[slug].js`, use `getStaticProps` to read the specific markdown file based on the slug, convert markdown to HTML (using `remark`/`rehype`), and pass it to the page.

**Result:** At build time, Next.js generates static HTML for the index and every single blog post. The site can be hosted for free on a CDN.

### Example 2: The SaaS Admin Dashboard (CSR + SSR + API)

An admin dashboard requires authentication, real-time data, and user-specific views. SEO is irrelevant.

**Architecture:**
1. **Authentication:** Use NextAuth.js to handle JWT sessions.
2. **Middleware:** Create `middleware.js` to intercept requests to `/dashboard/*`. If no valid JWT is found, redirect to `/login` instantly at the edge.
3. **App Shell (SSR/SSG):** The `pages/dashboard.js` can be a static shell.
4. **Data Fetching (CSR):** Inside the dashboard components, use a client-side fetching library like **SWR** (created by Vercel) or **React Query**.
   ```jsx
   import useSWR from 'swr';
   
   const fetcher = url => fetch(url).then(res => res.json());
   
   function DashboardStats() {
     const { data, error, isLoading } = useSWR('/api/admin/stats', fetcher);
     
     if (isLoading) return <Spinner />;
     if (error) return <Error />;
     return <StatGrid stats={data} />;
   }
   ```
5. **Backend (API Routes):** Create `/api/admin/stats.js` to securely query the database, ensuring the user's session is validated before returning sensitive data.

**Result:** Fast initial load of the application shell, secure routing via middleware, and dynamic, fresh data fetched client-side with excellent caching and revalidation handled by SWR.

---
*End of Next.js Study Guide. Mastery of these concepts equips you to build enterprise-scale React applications with optimal performance and SEO.*
