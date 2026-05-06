# Mastering OAuth 2.0: The Complete Technical Study Guide

Welcome to the comprehensive, professional-grade study guide on OAuth 2.0. This 1000+ line technical manual is designed to take you from a foundational understanding of web security concepts to an intermediate/advanced mastery of OAuth 2.0 architecture, flows, tokens, and real-world implementations.

This document serves as an authoritative reference for backend engineering, API security, and identity management.

---

## Table of Contents

1. [Introduction to Authorization](#1-introduction-to-authorization)
2. [Introduction to OAuth](#2-introduction-to-oauth)
3. [Key Concepts & Terminology](#3-key-concepts--terminology)
4. [OAuth Flows (Grant Types)](#4-oauth-flows-grant-types)
5. [Tokens in OAuth](#5-tokens-in-oauth)
6. [OAuth Flow Step-by-Step (Under the Hood)](#6-oauth-flow-step-by-step-under-the-hood)
7. [Using OAuth in Applications (Identity vs. Access)](#7-using-oauth-in-applications-identity-vs-access)
8. [Security Considerations](#8-security-considerations)
9. [OAuth vs. JWT: Clarifying the Confusion](#9-oauth-vs-jwt-clarifying-the-confusion)
10. [Best Practices for Implementers](#10-best-practices-for-implementers)
11. [Common Mistakes and Anti-Patterns](#11-common-mistakes-and-anti-patterns)
12. [Real-World Examples](#12-real-world-examples)

---

## 1. Introduction to Authorization

Before diving into OAuth, it is absolutely critical to understand the foundational difference between **Authentication** and **Authorization**, as mixing these two up is the source of many security vulnerabilities and architectural flaws.

### Authentication vs. Authorization

**Authentication (AuthN): "Who are you?"**
*   **Purpose:** Verifies the identity of a user, device, or system.
*   **Mechanism:** Credentials (username/password), Biometrics (FaceID), Multi-Factor Authentication (OTP, Security Keys).
*   **Result:** A verified identity.
*   **Question Answered:** "Is this person actually Alice?"

**Authorization (AuthZ): "What are you allowed to do?"**
*   **Purpose:** Determines the permissions and access rights of an authenticated entity.
*   **Mechanism:** Role-Based Access Control (RBAC), Attribute-Based Access Control (ABAC), Access Control Lists (ACLs), OAuth scopes.
*   **Result:** Access granted or denied to a specific resource.
*   **Question Answered:** "Is Alice allowed to read this specific document?"

#### The Classic Analogy: The Hotel Keycard

1.  **Authentication:** You walk up to the hotel reception desk and present your Passport and booking confirmation. The receptionist verifies your identity. You have been authenticated.
2.  **Authorization:** The receptionist hands you a magnetic keycard. This keycard does not have your name on it (it doesn't care who you are anymore). However, it is mathematically programmed to unlock Room 302 and the hotel gym, but it will flash red and deny access if you try to open Room 303 or the Manager's office. This is authorization.

### Why Authorization is Needed (The Dark Ages of the Web)

Imagine it is 2008. You sign up for a new social network called "FriendZone". FriendZone wants to help you find your friends who are already on the platform by checking your Gmail contacts.

**The Pre-OAuth Approach (The Password Anti-Pattern):**
FriendZone asks you: *"Please enter your Gmail address and your Gmail password here, and we will log in as you to fetch your contacts."*

**Why this is a terrible idea:**
1.  **Full Access:** By giving FriendZone your Gmail password, they don't just get your contacts. They can read your private emails, send emails on your behalf, and delete your account.
2.  **No Granularity:** You cannot say "only read my contacts." It's all or nothing.
3.  **No Revocability:** The only way to stop FriendZone from accessing your account in the future is to change your Google password.
4.  **Vulnerability:** If FriendZone is hacked, the attackers now have your Google password.

### Delegated Authorization

To solve this, the industry needed a way for a user to grant a third-party application **temporary, limited access** to their resources **without sharing their password**.

This concept is called **Delegated Authorization**. You delegate a subset of your permissions to a software application. This is exactly the problem OAuth was created to solve.

---

## 2. Introduction to OAuth

### What is OAuth?

**OAuth (Open Authorization)** is an open-standard authorization protocol or framework that describes how unrelated servers and services can safely allow authenticated access to their assets without actually sharing the initial, related, single logon credential.

*Note: The current industry standard is **OAuth 2.0** (RFC 6749). OAuth 1.0 is deprecated and highly complex due to cryptographic signing requirements. Whenever someone says "OAuth", they mean OAuth 2.0.*

OAuth 2.0 provides a secure, standardized way for a user to grant a client application access to their data stored on another server.

### Why OAuth is Used

OAuth provides elegant solutions to the problems of the "Password Anti-Pattern":

1.  **Zero Credential Sharing:** The third-party application never sees your password. It only receives a cryptographic token.
2.  **Granular Permissions (Scopes):** OAuth introduces "scopes." You can grant an application the ability to *read* your contacts, but deny it the ability to *send* emails.
3.  **Easy Revocation:** The Authorization Server provides a dashboard where the user can revoke the third-party application's token at any time, without changing their password.
4.  **Short-Lived Access:** Tokens can be configured to expire in 15 minutes, drastically reducing the attack window if a token is stolen.

### Real-world Examples

You use OAuth every day, likely without realizing it:

*   **Google Login:** When you click "Log in with Google" on Spotify, Spotify is using OAuth (specifically an extension of it called OpenID Connect) to get your basic profile info from Google.
*   **CI/CD Pipelines:** When you grant Vercel or Netlify access to your private GitHub repositories to automatically deploy your code, that is OAuth.
*   **Financial Apps:** When you connect a budgeting app like Mint or YNAB to your bank account using Plaid, they use OAuth to read your transaction history without getting your banking login credentials.
*   **Smart Home:** When you link your Philips Hue smart bulbs to Amazon Alexa, Alexa uses OAuth to get permission to turn your lights on and off.

---

## 3. Key Concepts & Terminology

To understand how OAuth works, you must understand the four primary actors (roles) in the OAuth ecosystem. The OAuth 2.0 specification strictly defines these roles.

Let's use a practical scenario to define them:
**Scenario:** You (the user) want to use a web application called "CanvasApp" to print a photo that you have stored in your "Google Drive".

### 1. Resource Owner
The entity capable of granting access to a protected resource. When the resource owner is a person, it is referred to as an end-user.
*   **In our scenario:** **You**. You own the photos in your Google Drive. Only you have the authority to grant someone else access to them.

### 2. Client
An application making protected resource requests on behalf of the resource owner and with its authorization. The term "client" does not imply any particular implementation characteristics (e.g., whether the application executes on a server, a desktop, or other devices).
*   **In our scenario:** **CanvasApp**. This is the third-party application that wants to access your data.

### 3. Resource Server
The server hosting the protected resources, capable of accepting and responding to protected resource requests using access tokens.
*   **In our scenario:** **Google Drive API**. This is the actual database/server holding your photos. It doesn't care who is asking; it only cares if the requester has a valid token.

### 4. Authorization Server
The server issuing access tokens to the client after successfully authenticating the resource owner and obtaining authorization.
*   **In our scenario:** **Google Accounts (accounts.google.com)**. This is the server that displays the login screen, asks for your consent, and mints the cryptographic tokens.

*(Note: In many architectures, the Authorization Server and Resource Server are owned by the same company (e.g., Google), but they are logically separate entities.)*

### Other Crucial Terminology

*   **Access Token:** A string representing an authorization issued to the client. The token is an opaque string to the client (the client doesn't need to understand it, it just uses it). It acts as the "hotel keycard".
*   **Refresh Token:** A token used to obtain a new access token when the current access token becomes invalid or expires.
*   **Scope:** A mechanism in OAuth 2.0 to limit an application's access to a user's account. Scopes are strings like `read:messages`, `write:files`, `profile`.
*   **Consent Screen:** The webpage generated by the Authorization Server that asks the Resource Owner: "CanvasApp would like to access your photos. Do you allow this?"
*   **Redirect URI (Callback URL):** The URL where the Authorization Server will send the user back to the Client application after the user grants (or denies) consent.

---

## 4. OAuth Flows (Grant Types)

Because clients come in many shapes and sizes (server-side web apps, mobile apps, Single Page Applications, IoT devices, microservices), OAuth provides different mechanisms for acquiring an access token. These mechanisms are called **Flows** or **Grant Types**.

Choosing the correct flow is the most critical architectural decision when implementing OAuth.

### 1. Authorization Code Flow (The Gold Standard)

This is the most common, most secure, and most heavily utilized OAuth flow. It is designed for applications that have a backend server (confidential clients) where source code is hidden from the public.

**Why it's secure:** The Client Application's backend server communicates directly with the Authorization Server to exchange a "code" for a "token." The Access Token is never exposed to the user's web browser, mitigating Cross-Site Scripting (XSS) attacks.

**The Steps (High Level):**
1.  User clicks "Login".
2.  Client redirects User to Authorization Server.
3.  User logs in and grants consent.
4.  Authorization Server redirects User back to Client with an **Authorization Code** in the URL.
5.  Client's frontend sends this Code to its backend.
6.  Client's backend makes a server-to-server HTTP request to the Authorization Server, trading the **Code + Client Secret** for an **Access Token**.
7.  Client's backend uses the Access Token to call the Resource Server.

### 2. Authorization Code Flow with PKCE

PKCE (Proof Key for Code Exchange, pronounced "Pixy") is an extension to the Authorization Code flow.

**The Problem:** Mobile apps and Single Page Applications (SPAs like React/Vue) do not have a secure backend server to hide a "Client Secret". If they used the standard Auth Code flow, they would have to hardcode their Client Secret in the mobile app binary or JavaScript bundle, which malicious users could easily extract. Furthermore, on mobile devices, malicious apps can intercept custom URI schemes (e.g., `myapp://callback`) and steal the Authorization Code.

**The Solution:** PKCE replaces the static "Client Secret" with a dynamic, mathematically generated secret created on the fly for *every single login attempt*.

1.  Client generates a random string (`code_verifier`).
2.  Client hashes it (`code_challenge`).
3.  Client sends `code_challenge` when redirecting the user to login.
4.  When trading the Code for the Token, the Client sends the raw `code_verifier`.
5.  The Authorization Server hashes the verifier and compares it to the original challenge. If they match, it proves the entity requesting the token is the exact same entity that initiated the login.

*Best Practice: Today, PKCE is recommended for ALL applications, even server-side ones, as it adds defense-in-depth against authorization code injection attacks.*

### 3. Client Credentials Flow (Machine-to-Machine)

This flow is completely different from the others because **there is no Resource Owner (user) involved**.

**Use Case:** Server-to-server communication, Microservices, Cron jobs, Daemons.

Example: An automated billing microservice needs to call a PDF generation microservice. No human is sitting at a keyboard to click "Allow".

**How it works:**
1.  The Client (Billing Service) authenticates itself directly to the Authorization Server using its `client_id` and `client_secret`.
2.  The Authorization Server immediately responds with an Access Token.
3.  The Client uses the token to call the Resource API.

It is simple, fast, and secure, provided the `client_secret` is kept safe.

### 4. Implicit Flow (Legacy / Deprecated)

**DO NOT USE THIS FLOW IN MODERN APPLICATIONS.**

The Implicit Flow was created in 2010 for JavaScript-only applications (early SPAs) before browsers had features like CORS.

**How it worked:**
Instead of returning an Authorization Code, the Authorization Server returned the **Access Token directly in the URL hash fragment** (e.g., `https://client.com/callback#access_token=xyz123`).

**Why it is terrible for security:**
1.  The Access Token is visible in the browser's URL bar.
2.  It may be saved in browser history.
3.  It can be leaked via the `Referer` header to external sites.
4.  It is vulnerable to Access Token Injection attacks.

*Modern Standard: If you are building a React, Angular, or Vue application, you MUST use the **Authorization Code Flow with PKCE** instead.*

### 5. Device Authorization Flow

**Use Case:** Devices with limited input capabilities (no keyboard or browser). Examples: Smart TVs, Apple TV, CLI tools (like the GitHub CLI or AWS CLI), IoT devices.

**How it works:**
1.  The TV app requests access.
2.  The Authorization Server gives the TV a URL (e.g., `google.com/device`) and a short code (e.g., `ABCD-1234`).
3.  The TV displays this on screen: "Go to google.com/device on your phone and enter ABCD-1234".
4.  The user does this on their smartphone.
5.  Meanwhile, the TV app is continuously polling the Authorization Server in the background: "Did they approve it yet? Did they approve it yet?"
6.  Once the user approves on their phone, the next poll from the TV returns the Access Token.

---

## 5. Tokens in OAuth

OAuth utilizes two primary types of tokens. Understanding their lifecycle is vital for system stability and security.

### Access Tokens

The Access Token is the master key. It is the artifact that the Client includes in HTTP requests (usually in the `Authorization: Bearer <token>` header) to access the Resource Server.

**Characteristics:**
*   **Format:** The OAuth 2.0 specification does *not* mandate a format for access tokens. They can be opaque strings (e.g., `sk_live_12345`) or structured tokens like JWTs (JSON Web Tokens). (We will discuss JWTs deeply in Section 9).
*   **Lifespan:** Access Tokens should be **short-lived**. Typically, they expire in 15 minutes to 1 hour. This is a security measure; if a token is intercepted, the attacker only has a small window to use it.
*   **Revocation:** While some tokens can be revoked, validating revocation on every API call is slow. This is why short lifespans are preferred.

### Refresh Tokens

Because Access Tokens expire quickly, it would be a terrible user experience if the user had to log in again every 15 minutes. This is where Refresh Tokens come in.

A Refresh Token is a special, highly privileged token used strictly to obtain *new* Access Tokens.

**Characteristics:**
*   **Target:** A Refresh Token is ONLY sent to the Authorization Server. It is NEVER sent to the Resource Server.
*   **Lifespan:** Long-lived. They can last days, weeks, months, or until explicitly revoked by the user.
*   **Security:** If a Refresh Token is stolen, the attacker can generate infinite Access Tokens. Therefore, Refresh Tokens must be guarded with extreme prejudice.

**Refresh Token Rotation (Advanced Security):**
To mitigate stolen refresh tokens, modern Authorization Servers implement "Rotation."
Every time the Client uses a Refresh Token to get a new Access Token, the Authorization Server *also* issues a brand new Refresh Token and invalidates the old one.
If an attacker steals a Refresh Token and uses it, they get a new token. But when the legitimate user tries to use their (now invalidated) old Refresh Token, the Authorization Server detects the anomaly, realizes a theft occurred, and **revokes all tokens associated with that user**, forcing a re-authentication.

---

## 6. OAuth Flow Step-by-Step (Under the Hood)

Let's dissect the HTTP traffic of the **Authorization Code Flow**. This is what actually travels over the network.

**Scenario:** User wants to log into `MyApp.com` using their `Google` account.

#### Step 1: The Redirect (Client -> User Browser -> Auth Server)

MyApp.com generates a login link and redirects the user's browser to Google's Authorization Server.

```http
GET /o/oauth2/v2/auth?
  response_type=code&
  client_id=MY_APP_CLIENT_ID&
  redirect_uri=https://myapp.com/callback&
  scope=profile email contacts.readonly&
  state=xyz_random_csrf_token_890 HTTP/1.1
Host: accounts.google.com
```

*   `response_type=code`: Tells Google we want the Authorization Code flow.
*   `client_id`: Identifies MyApp.com.
*   `redirect_uri`: Where Google should send the user after login. MUST exactly match what is registered in the Google Developer Console.
*   `scope`: What permissions MyApp.com is asking for.
*   `state`: A random string generated by MyApp to prevent Cross-Site Request Forgery (CSRF).

#### Step 2: User Authenticates and Consents

The user sees the Google login screen, enters their password, handles 2FA, and clicks "Allow" on the consent screen. This happens entirely between the User and Google. MyApp is not involved.

#### Step 3: The Callback (Auth Server -> User Browser -> Client)

Google redirects the user's browser back to MyApp's `redirect_uri`, appending the Authorization Code and the exact `state` parameter that was originally sent.

```http
GET /callback?
  code=4/0AX4XfWh...[REDACTED]...abc&
  state=xyz_random_csrf_token_890 HTTP/1.1
Host: myapp.com
```

*   MyApp's server checks if the `state` matches the one it saved in the user's session. If it doesn't, it aborts (CSRF attack).
*   MyApp now has the `code`.

#### Step 4: The Token Exchange (Client Server -> Auth Server)

This is a **Back-Channel** request. It happens directly from MyApp's Node/Python/Java server to Google's server. The browser is not involved.

```http
POST /token HTTP/1.1
Host: oauth2.googleapis.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=4/0AX4XfWh...[REDACTED]...abc&
redirect_uri=https://myapp.com/callback&
client_id=MY_APP_CLIENT_ID&
client_secret=MY_SUPER_SECRET_DO_NOT_SHARE
```

*   `grant_type`: Tells Google what we are trading (a code).
*   `client_secret`: Proves that this request is actually coming from MyApp's backend, not a hacker who intercepted the code.

#### Step 5: The Token Response (Auth Server -> Client Server)

Google verifies the code and the secret, and responds with JSON containing the tokens.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "access_token": "ya29.a0ARrdaM...[REDACTED]...",
  "expires_in": 3599,
  "refresh_token": "1//0gA...[REDACTED]...",
  "scope": "https://www.googleapis.com/auth/contacts.readonly",
  "token_type": "Bearer"
}
```

#### Step 6: Accessing the API (Client Server -> Resource Server)

MyApp.com can now use the `access_token` to fetch the user's contacts.

```http
GET /v1/people/me/connections HTTP/1.1
Host: people.googleapis.com
Authorization: Bearer ya29.a0ARrdaM...[REDACTED]...
```

The Resource Server validates the token, sees it has the `contacts.readonly` scope, and returns the JSON data.

---

## 7. Using OAuth in Applications (Identity vs. Access)

This is the most misunderstood part of OAuth.

**OAUTH IS NOT AN AUTHENTICATION PROTOCOL.**

OAuth says absolutely nothing about *who* the user is. It only provides an access token that says "The bearer of this token is allowed to read contacts." The client application doesn't know the user's name, email, or ID based purely on OAuth.

To solve this, the industry built **OpenID Connect (OIDC)** on top of OAuth 2.0.

### OpenID Connect (OIDC)

OIDC adds an identity layer to OAuth 2.0. When you use "Log in with Google" or "Log in with Apple", you are using OIDC.

How it modifies the flow:
1.  The client requests a special scope called `openid`. It might also ask for `profile` and `email`.
2.  When the Authorization Server returns the Access Token, it *also* returns an **ID Token**.

### The ID Token

The ID Token is always a **JWT (JSON Web Token)**. It contains claims (information) about the authenticated user.

Example decoded ID Token payload:
```json
{
  "iss": "https://accounts.google.com",   // Issuer
  "sub": "10769150350006150715113082367", // Subject (Unique User ID)
  "aud": "MY_APP_CLIENT_ID",              // Audience (Intended for my app)
  "iat": 1690000000,                      // Issued At time
  "exp": 1690003600,                      // Expiration time
  "email": "user@example.com",
  "name": "Jane Doe",
  "picture": "https://url.to.photo"
}
```

**Golden Rule of Tokens:**
*   **Access Token:** Used to talk to APIs (Resource Servers). Your client app shouldn't try to read it.
*   **ID Token:** Used by your Client App to know who logged in. Your client app parses it and creates a local user session. **Never send an ID Token to an API as a credential.**

---

## 8. Security Considerations

Implementing OAuth securely requires meticulous attention to detail.

### 1. Redirect URI Validation (Preventing Open Redirects)
When configuring your Client in the Identity Provider (e.g., Auth0, Google), you must specify an exact `redirect_uri` (e.g., `https://myapp.com/callback`).
**The Threat:** If the Authorization Server allows wildcard subdomains or partial matches, an attacker could manipulate the `redirect_uri` in the initial login link to point to `https://evil.com`. The Authorization Server would send the Authorization Code to the attacker.
**The Fix:** Always use exact, absolute URI matching in your Authorization Server settings.

### 2. The `state` Parameter (Preventing CSRF)
**The Threat:** An attacker logs into their *own* account on MyApp via Google. They intercept the callback URL containing their valid authorization code. They then trick a victim (via a phishing email link) into clicking that exact callback URL. The victim's browser sends the attacker's code to MyApp. MyApp trades it for a token and logs the victim into the *attacker's* account. If the victim enters their credit card into the app, the attacker now has it.
**The Fix:** The `state` parameter. The client generates a random hash, stores it in an HttpOnly cookie, and sends it in the initial request. In the callback, it verifies the state in the URL matches the state in the cookie. If they don't match, abort.

### 3. Token Storage in the Browser
If you have a Single Page Application (React/Vue):
*   **Do NOT store Access or Refresh Tokens in `localStorage` or `sessionStorage`.** Any JavaScript on the page (including malicious third-party scripts via XSS) can read `localStorage` and steal the tokens.
*   **Best Practice (BFF Pattern):** Use a Backend-For-Frontend. Your frontend SPA talks to your own lightweight backend server. The backend server handles the OAuth flow, gets the tokens, stores them securely in memory or an encrypted database, and issues an `HttpOnly`, `Secure`, `SameSite=Strict` session cookie to the SPA. The SPA never touches the tokens.

### 4. Client Secret Protection
The `client_secret` is equivalent to an application's password.
*   Never compile it into a mobile app.
*   Never put it in a frontend JavaScript bundle.
*   Never commit it to version control (GitHub). Use environment variables.

---

## 9. OAuth vs. JWT: Clarifying the Confusion

This is a common interview question and a frequent source of developer confusion.

**OAuth 2.0 is a Protocol/Framework.**
It defines the *process* of how actors communicate, the HTTP endpoints, the redirect flows, and the grant types. It is the rulebook.

**JWT (JSON Web Token) is a Token Format.**
It defines the *structure* of a string. It dictates how to encode a JSON object, sign it cryptographically, and format it as `header.payload.signature`.

**How they relate:**
*   OAuth needs tokens to work (Access Tokens, ID Tokens).
*   OAuth **does not care** what format the Access Token is. It could be a random UUID stored in a database.
*   However, modern OAuth implementations (like Auth0, Okta, and Azure AD) **choose to use JWTs as their Access Tokens** because JWTs are stateless. The Resource Server can verify a JWT cryptographically without needing to query the Authorization Server's database on every request.
*   OIDC (which sits on top of OAuth) **mandates** that the ID Token must be a JWT.

**In short:** You use the OAuth protocol to *obtain* a JWT.

---

## 10. Best Practices for Implementers

If you are building an OAuth Client or Authorization Server, adhere to these rules:

1.  **Always use HTTPS/TLS.** OAuth relies entirely on transport-layer security. Without HTTPS, tokens and codes are sent in plaintext and can be trivially intercepted.
2.  **Enforce Principle of Least Privilege.** When requesting scopes, only ask for what you absolutely need. If you only need to read a user's email, do not ask for full profile and calendar access. Users are more likely to abandon the login if they see excessive permissions.
3.  **Implement PKCE everywhere.** It is no longer just for mobile apps. The OAuth 2.1 specification (currently in draft) mandates PKCE for all Authorization Code flows, including server-side confidential clients.
4.  **Use well-tested libraries.** Do not write your own cryptographic validation or OAuth flow logic from scratch. Use established libraries like `passport-oauth2` for Node, `Authlib` for Python, or SDKs provided by identity providers.
5.  **Handle Token Expiration gracefully.** Your application should anticipate 401 Unauthorized errors from APIs. When received, it should seamlessly use the Refresh Token to get a new Access Token and retry the failed request without bothering the user.

---

## 11. Common Mistakes and Anti-Patterns

*   **Treating the Access Token as user identity.** Remember, Access Tokens are for APIs. Do not decode an Access Token in your frontend to find out the user's name. Use the ID Token (OIDC) or call an `/userinfo` endpoint.
*   **Not validating the JWT Signature.** If you are building a Resource Server that accepts JWT access tokens, you MUST verify the cryptographic signature using the Authorization Server's public keys (usually fetched from a JWKS endpoint). If you don't, anyone can forge a token.
*   **Ignoring the `aud` (Audience) claim.** A Resource Server must check that the token was intended for it. If a token has `aud: "billing_api"` and is sent to the `user_profile_api`, it must be rejected, even if the signature is valid. This prevents tokens stolen from one service from being used against another.
*   **Logging Tokens.** Never write Access Tokens or Refresh Tokens to your application logs (e.g., DataDog, Splunk). If your logging provider is compromised, your users are compromised.

---

## 12. Real-World Examples

To solidify these concepts, let's look at how you would implement a "Log in with GitHub" feature in a Node.js/Express application. GitHub implements standard OAuth 2.0.

### Example: GitHub OAuth Integration (Node.js/Express)

**Prerequisite:** You must register your application on GitHub (Developer Settings -> OAuth Apps) to get a `CLIENT_ID` and `CLIENT_SECRET`. You set the callback URL to `http://localhost:3000/auth/github/callback`.

```javascript
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const app = express();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/auth/github/callback';

// Temporary in-memory store for session states (Use Redis in production)
const stateStore = new Set();

// 1. Initiate Login (Redirect to GitHub)
app.get('/login', (req, res) => {
  // Generate a random state string to prevent CSRF
  const state = crypto.randomBytes(16).toString('hex');
  stateStore.add(state);

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user:email&state=${state}`;
  
  res.redirect(githubAuthUrl);
});

// 2. The Callback Endpoint (GitHub redirects back here)
app.get('/auth/github/callback', async (req, res) => {
  const code = req.query.code;
  const state = req.query.state;

  // Validate state (CSRF Protection)
  if (!stateStore.has(state)) {
    return res.status(403).send('State mismatch. Possible CSRF attack.');
  }
  stateStore.delete(state); // Prevent reuse

  if (!code) {
    return res.status(400).send('Authorization code missing.');
  }

  try {
    // 3. Exchange Code for Access Token (Server-to-Server)
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: REDIRECT_URI
      },
      {
        headers: { Accept: 'application/json' } // Tell GitHub to return JSON
      }
    );

    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
       return res.status(500).send('Failed to obtain access token.');
    }

    // 4. Use the Access Token to fetch User Data (Resource Server)
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const userData = userResponse.data;

    // At this point, you would typically:
    // a. Check if user exists in your local Database using userData.id
    // b. If not, create a new user record.
    // c. Issue a local session cookie to keep the user logged in to YOUR app.
    
    res.send(`<h1>Login Successful!</h1><p>Welcome, GitHub user: ${userData.login}</p>`);

  } catch (error) {
    console.error('OAuth Error:', error.response ? error.response.data : error.message);
    res.status(500).send('Authentication failed.');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### Flow Breakdown of the Code:
1.  **`/login`**: The user visits this route. The server generates a random `state`, saves it, and redirects the browser to `https://github.com/login/oauth/authorize`.
2.  **GitHub Login**: The user logs into GitHub and clicks "Authorize".
3.  **`/auth/github/callback`**: GitHub redirects the browser back here with `?code=XYZ&state=ABC`.
4.  **State Check**: The server verifies `ABC` matches what it saved.
5.  **Token Exchange**: The server makes a POST request to GitHub's token endpoint with the `code` and the `CLIENT_SECRET`. GitHub returns the `access_token`.
6.  **API Call**: The server makes a GET request to `api.github.com/user` passing the `access_token` in the Authorization header. GitHub returns the user's profile JSON.

This complete loop demonstrates the exact mechanism of Delegated Authorization in practice.

---

## Conclusion

Mastering OAuth 2.0 is an essential milestone for any backend engineer. While the terminology can be initially daunting, the underlying concepts—delegated authorization, scopes, front-channel vs. back-channel communication, and the distinction between authentication (OIDC) and authorization (OAuth)—form the bedrock of modern web security architecture.

By strictly adhering to the Authorization Code Flow with PKCE, meticulously validating states and redirect URIs, and keeping tokens out of the browser frontend, you can build secure, scalable integrations that protect both your application and your users' data.
