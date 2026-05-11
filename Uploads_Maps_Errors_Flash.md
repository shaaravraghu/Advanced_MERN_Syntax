# File Uploads, Maps, Error Handling, and Flash Messages

## 1. File Uploads

File uploads let users send images or other files from the browser to the server.

### Multer
- Multer handles multipart form data in Express.
- Commonly used for file uploads.

#### Core Ideas
- parse incoming files
- store files on disk or in memory
- attach file info to the request

#### Typical Use
```js
const upload = multer({ dest: "uploads/" });
app.post("/upload", upload.single("image"), (req, res) => {
  res.send(req.file);
});
```

### Cloudinary
- Cloudinary is a cloud media service for images and videos.
- It is useful for storing, transforming, and delivering media.

#### Why It Helps
- offloads storage
- provides image transformations
- gives CDN-backed delivery

#### Common Flow
1. User uploads file.
2. Server receives file through Multer.
3. Server uploads file to Cloudinary.
4. Cloudinary returns a URL and metadata.

### Cloud Storage Patterns
Common file upload patterns:
- upload to local disk first, then cloud
- upload directly to cloud through server
- store only metadata and cloud URL in the database

### Good Practices
- validate file type and size
- restrict upload paths
- rename files safely
- clean up temporary files
- store URLs, not binary blobs, unless needed

---

## 2. MapBox and Geocoding

Mapbox is a mapping platform used for maps, geocoding, and location-based features.

### API Integration
- Use Mapbox APIs through HTTP requests.
- Typically you need an access token.
- Integrate it into backend or frontend depending on the feature.

### Coordinates from Address
Geocoding converts an address into geographic coordinates.

#### Example Flow
1. User enters address.
2. App sends address to geocoding API.
3. API returns latitude and longitude.
4. App stores coordinates and renders the map.

### Rendering Maps
- Use returned coordinates to center the map.
- Add markers for locations.
- Keep map rendering separate from data fetching when possible.

### Notes
- Geocoding can be forward or reverse.
- Forward geocoding: address to coordinates.
- Reverse geocoding: coordinates to address.

---

## 3. Error Handling and Flash Messages

### Centralized Error Middleware
- Centralized error middleware keeps error handling consistent.
- In Express, error middleware has four parameters: `err`, `req`, `res`, `next`.

#### Example Shape
```js
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});
```

### Stack Traces
- Stack traces help locate where an error happened.
- Show them in development.
- Hide sensitive details in production responses.

### Flash Messages
- Flash messages show one-time feedback to users.
- Common for success, warning, and error notifications after redirects.

### flash-connect
- `flash-connect` is used to support flash messaging in some Express setups.
- It helps store a message temporarily and display it on the next request.

### Flash Message Flow
1. User submits a form.
2. Server processes the action.
3. Server sets a flash message.
4. Browser redirects.
5. Next page shows the message once.

### Good Practices
- keep error responses consistent
- avoid exposing stack traces publicly
- use flash messages for user-friendly feedback after redirects
- keep server errors logged even if user messages stay short

