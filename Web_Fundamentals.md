# Web Fundamentals

## Difference Between Web and Internet
- **Internet**: the physical network of computers, servers, databases, cables, routers, satellites, and more.
- **Web**: also called the World Wide Web, a service that runs on the Internet using the HTTP protocol.
- Other protocol examples include:
  - SMTP for email
  - FTP for file transfer
  - RTSP for video streaming

## How the Web Works
1. A browser such as Chrome, Edge, or Firefox sends a request over the Internet.
2. A web server receives the request and responds with HTML, JavaScript, CSS, or other files.
3. The browser processes those files and displays the page.

## Must-Know Full Forms
- **DNS**: Domain Name System
- **IP**: Internet Protocol
- **HTTP**: HyperText Transfer Protocol
- **HTTPS**: HyperText Transfer Protocol Secure
- **URL**: Uniform Resource Locator
- **HTML**: HyperText Markup Language
- **CSS**: Cascading Style Sheets
- **JS**: JavaScript
- **TCP**: Transmission Control Protocol
- **FTP**: File Transfer Protocol
- **SMTP**: Simple Mail Transfer Protocol

## Client vs Server
- **Client**: any device or software that requests information.
- **Server**: a computer that responds to client requests and provides services.

## Request
- A request is a message sent by a client to a server asking for resources or an action.
- A request usually includes:
  - URL
  - Method
  - Headers
  - Body
- Common HTTP methods:
  - `GET`: fetch data
  - `POST`: send data
  - `PUT`: update entire data
  - `PATCH`: update part of the data
  - `DELETE`: remove data

## Response
- A response is the message sent back by the server after processing a request.
- A response usually includes:
  - Status code
  - Headers
  - Body
- Important status codes:
  - `200` / `201`: successful request
  - `301` / `302`: redirect
  - `400`: bad request
  - `401`: unauthorized
  - `403`: forbidden
  - `404`: not found
  - `500`: server error

## Domain Name Server (DNS)
- DNS is the phonebook of the Internet.
- It converts human-friendly website names into IP addresses.

## Internet Protocol (IP) and Port
- IP is the unique numeric address of a device connected to a network.
- A port is the virtual doorway on a device or server where a specific service runs.
- Example:
  - `localhost` usually refers to `127.0.0.1`
  - `3000` can be the port for a frontend or backend app
- Common local ports:
  - React: `3000`
  - Node: `5000`
  - Express: `8000`

## HTTP and HTTPS
- HTTP and HTTPS are protocols that define how data moves between client and server.
- Standard ports:
  - HTTP: `80`
  - HTTPS: `443`
- HTTPS uses SSL/TLS encryption.

## Browser Rendering Pipeline
Browsers typically go through these stages to display a webpage:
1. **HTML Parsing**: the DOM is created as a tree structure.
2. **CSS Parsing**: the CSSOM is built from styling rules.
3. **DOM + CSSOM**: combined into the render tree.
4. **Layout / Reflow**: the browser calculates sizes and positions.
5. **Paint**: the visual content is drawn.
6. **Composite**: the final rendering is assembled using the GPU.








