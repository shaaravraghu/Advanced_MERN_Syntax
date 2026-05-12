# CI/CD and Deployment Notes

## 1. CI/CD

CI/CD means Continuous Integration and Continuous Delivery or Deployment.

### GitHub Actions
- GitHub Actions automates workflows inside GitHub repositories.
- It is commonly used for testing, linting, building, and deploying code.

### Workflows
- A workflow is an automated process described in YAML.
- Workflows are usually triggered by pushes, pull requests, schedules, or manual dispatch.

### Automated Tests
- Automated tests run as part of CI to catch issues early.
- They can include unit tests, integration tests, and end-to-end checks.

### Deployments
- Deployment is the act of pushing code to a live environment.
- CI/CD pipelines can deploy automatically after tests pass.

### Typical CI/CD Flow
1. Developer pushes code.
2. Workflow runs lint and tests.
3. Build succeeds.
4. Deployment step sends code to target environment.

### CI/CD Notes
- fail fast
- keep workflows readable
- cache dependencies where useful
- separate test and deploy jobs
- use secrets securely in pipeline settings

---

## 2. AWS Deployment

AWS provides cloud services used to host and scale applications.

### EC2
- EC2 is virtual server hosting on AWS.
- You install your app and dependencies on the instance.
- It is commonly used for backend deployment.

### S3
- S3 stores files and static assets.
- Good for images, uploads, and frontend builds.

### Elastic IP
- An Elastic IP is a static public IP address for an AWS resource.
- Useful when you need a stable address for a server.

### PM2
- PM2 is a process manager for Node.js apps.
- It keeps apps running, restarts them on failure, and supports clustering.

### SSL with NGINX
- NGINX is often used as a reverse proxy in front of Node apps.
- SSL/TLS is configured so traffic is encrypted over HTTPS.
- NGINX can handle certificates, redirects, and proxying traffic to app servers.

### Deployment Flow Example
1. Provision EC2.
2. Install Node, PM2, and NGINX.
3. Pull or upload app code.
4. Start the app with PM2.
5. Configure NGINX to proxy requests.
6. Add SSL certificates.

### AWS Deployment Notes
- keep security groups restrictive
- use environment variables on the server
- store uploads in S3 when appropriate
- monitor app logs and process health








