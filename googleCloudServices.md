# Google Cloud Platform (GCP): The Definitive Technical Study Guide

Welcome to the comprehensive technical study guide for Google Cloud Platform (GCP). This guide is designed for beginner to intermediate engineers, cloud architects, and developers looking to master the foundational and core services of GCP.

This guide spans end-to-end cloud infrastructure, covering compute, storage, networking, security, deployment, and real-world architectural patterns.

---

## Table of Contents

1. [Introduction to Cloud Computing](#1-introduction-to-cloud-computing)
2. [Introduction to Google Cloud Platform](#2-introduction-to-google-cloud-platform)
3. [Core Services](#3-core-services)
   - [Compute Engine](#compute-engine-gce)
   - [App Engine](#app-engine-gae)
   - [Cloud Functions](#cloud-functions)
4. [Storage Services](#4-storage-services)
   - [Cloud Storage](#cloud-storage-gcs)
   - [Databases](#databases)
5. [Networking](#5-networking)
   - [Virtual Private Cloud (VPC)](#virtual-private-cloud-vpc)
   - [Cloud Load Balancing](#cloud-load-balancing)
6. [Identity and Access Management (IAM)](#6-identity-and-access-management-iam)
7. [Deployment](#7-deployment)
8. [Monitoring and Logging](#8-monitoring-and-logging)
9. [Security Basics](#9-security-basics)
10. [Pricing](#10-pricing)
11. [Best Practices](#11-best-practices)
12. [Common Mistakes](#12-common-mistakes)
13. [Real-world Examples](#13-real-world-examples)

---

## 1. Introduction to Cloud Computing

### What is Cloud Computing?
Cloud computing is the on-demand delivery of IT resources (compute, storage, databases, networking) over the Internet with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical data centers and servers, you access technology services on an as-needed basis from a cloud provider like Google.

**Key Characteristics (NIST Model):**
- **On-demand self-service:** Provision computing capabilities automatically without human interaction.
- **Broad network access:** Capabilities are available over the network and accessed through standard mechanisms.
- **Resource pooling:** Provider's computing resources are pooled to serve multiple consumers using a multi-tenant model.
- **Rapid elasticity:** Capabilities can be elastically provisioned and released, scaling rapidly outward and inward.
- **Measured service:** Cloud systems automatically control and optimize resource use by leveraging a metering capability (pay per use).

### Service Models
1. **IaaS (Infrastructure as a Service):** The most fundamental building blocks. Provides access to networking features, computers (virtual or dedicated hardware), and data storage space. (e.g., VMs, Disks, Virtual Networks). You manage OS, data, apps.
2. **PaaS (Platform as a Service):** Removes the need to manage the underlying infrastructure (usually hardware and operating systems) and allows you to focus on the deployment and management of your applications. (e.g., App Engine, Managed Databases).
3. **SaaS (Software as a Service):** Provides a completed product that is run and managed by the service provider. (e.g., Google Workspace, Salesforce).
4. **FaaS (Function as a Service) / Serverless:** Focus strictly on individual functions. Triggered by events. The infrastructure is entirely abstracted. (e.g., Cloud Functions).

### Deployment Models
- **Public Cloud:** Resources are shared globally over the internet (e.g., GCP, AWS).
- **Private Cloud:** Infrastructure operated solely for a single organization (On-premises or hosted privately).
- **Hybrid Cloud:** Combines public and private clouds, bound together by technology that allows data and application portability.
- **Multi-Cloud:** Using multiple public cloud providers (e.g., combining GCP for analytics and AWS for compute).

### Benefits of Cloud Services
- **Trade capital expense for variable expense:** Pay only when you consume resources.
- **Benefit from massive economies of scale:** Lower variable costs than you can get on your own.
- **Stop guessing capacity:** Eliminate guessing on infrastructure capacity needs. Scale up or down instantly.
- **Increase speed and agility:** Resources are a click away, reducing time to make resources available from weeks to minutes.
- **Stop spending money running and maintaining data centers:** Focus on projects that differentiate your business, not the infrastructure.
- **Go global in minutes:** Easily deploy your application in multiple regions around the world with just a few clicks.

---

## 2. Introduction to Google Cloud Platform

### What is GCP?
Google Cloud Platform (GCP) is a suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products, such as Google Search, Gmail, Google Drive, and YouTube.

### Why Choose GCP?
- **Global Network:** GCP possesses one of the largest and most advanced software-defined networks globally (Jupiter network, B4).
- **Data Analytics and AI/ML:** Industry-leading tools like BigQuery, TensorFlow, and Vertex AI.
- **Open Source:** Deep commitment to open source. Google created Kubernetes and heavily contributes to ecosystems like Apache Beam.
- **Security:** End-to-end security model, from custom hardware (Titan security chip) to software architecture.
- **Pricing:** Customer-friendly pricing models like Sustained Use Discounts (SUD) and per-second billing.

### The GCP Resource Hierarchy
Resources in GCP are organized hierarchically:
1. **Organization:** The root node representing the company (e.g., `company.com`).
2. **Folders:** Used to group projects (e.g., `Engineering`, `Marketing`, or `Prod`, `Dev`).
3. **Projects:** The core organizational layer. All resources belong to a project. Projects represent trust boundaries and billing boundaries.
4. **Resources:** The actual services being consumed (e.g., Compute Engine VMs, Cloud Storage buckets).

*Note: IAM policies flow down the hierarchy. A policy applied at the Folder level affects all Projects within that Folder.*

### Interacting with GCP
There are four primary ways to interact with GCP:
1. **Google Cloud Console:** The web-based graphical user interface.
2. **Cloud SDK (gcloud CLI):** Command-line tool for managing resources.
3. **Cloud Shell:** A browser-based interactive shell environment with the Cloud SDK pre-installed and authenticated.
4. **Cloud Client Libraries & REST APIs:** Accessing GCP services programmatically via code (Python, Node.js, Go, Java, etc.).

---

## 3. Core Services

### Compute Engine (GCE)
Compute Engine is GCP's Infrastructure-as-a-Service (IaaS) offering, allowing you to create and run virtual machines (VMs) on Google's infrastructure.

**Key Concepts:**
- **Machine Families:**
    - **General-purpose (E2, N1, N2, N2D):** Best price-performance for standard workloads (web servers, small DBs).
    - **Compute-optimized (C2, C2D):** Highest performance per core (HPC, gaming servers).
    - **Memory-optimized (M1, M2, M3):** Large memory footprints (in-memory databases like SAP HANA).
    - **Accelerator-optimized (A2, G2):** GPUs for ML/AI and rendering workloads.
- **Custom Machine Types:** If predefined types don't fit, you can create a VM with the exact vCPU and memory required.
- **Pricing Models:**
    - **On-Demand:** Standard pay-as-you-go.
    - **Spot VMs (formerly Preemptible VMs):** Highly affordable (up to 91% discount) but can be terminated by Compute Engine at any time if resources are needed elsewhere. Ideal for fault-tolerant, batch, or stateless workloads.
    - **Committed Use Discounts (CUD):** Discount for committing to 1 or 3 years of usage.
- **Disks:**
    - **Persistent Disks (PD):** Network-attached storage (Standard HDD, Balanced SSD, Performance SSD, Extreme PD). They survive VM termination.
    - **Local SSDs:** Physically attached to the server hosting the VM. Extremely fast but ephemeral (data is lost if the VM stops).
- **Instance Groups:**
    - **Managed Instance Groups (MIGs):** Create multiple identical VMs from an Instance Template. Supports autoscaling, auto-healing, multi-zone deployments, and rolling updates.
    - **Unmanaged Instance Groups:** Grouping of heterogeneous VMs (mostly used for legacy load balancing).

**Practical Example: Launching a VM with NGINX**
You can launch a VM and install software using a Startup Script.

```bash
gcloud compute instances create my-web-server \
    --zone=us-central1-a \
    --machine-type=e2-micro \
    --tags=http-server \
    --metadata=startup-script='#! /bin/bash
      apt-get update
      apt-get install -y nginx
      systemctl start nginx'
```
*(Note: You would also need a firewall rule to allow HTTP traffic via the `http-server` tag).*

### App Engine (GAE)
App Engine is a Platform-as-a-Service (PaaS) offering that allows developers to build and deploy highly scalable applications without managing the underlying infrastructure.

**Standard Environment vs. Flexible Environment:**
| Feature | Standard Environment | Flexible Environment |
| :--- | :--- | :--- |
| **Architecture** | Runs applications in language-specific sandboxes. | Runs applications within Docker containers on Compute Engine VMs. |
| **Startup Time** | Milliseconds (can scale to 0 instances). | Minutes (always requires at least 1 instance). |
| **Languages** | Specific versions (Python, Java, Node.js, Go, Ruby, PHP). | Any language (bring your own Dockerfile). |
| **Network Access**| No SSH access. | SSH access to underlying VMs. |
| **Use Case** | Apps with sudden, extreme traffic spikes. | Apps needing custom libraries, background processes, or specific OS packages. |

**Practical Example: Simple App Engine Node.js `app.yaml`**
```yaml
runtime: nodejs20
env: standard
instance_class: F1
automatic_scaling:
  min_instances: 0
  max_instances: 5
```
Deployment command: `gcloud app deploy`

### Cloud Functions
Cloud Functions is a serverless, event-driven compute service (FaaS). You write single-purpose functions that are attached to events emitted from your cloud infrastructure and services.

**Key Concepts:**
- **Gen 1 vs. Gen 2:** Gen 2 is built on top of Cloud Run, offering longer execution times (up to 60 mins for HTTP), larger instances (up to 16GB RAM), and concurrent requests per instance.
- **Triggers:**
    - **HTTP Triggers:** Invoked via standard HTTP requests.
    - **Background Triggers:** Invoked via events like Pub/Sub messages, Cloud Storage object creation/deletion, or Firestore document updates.

**Practical Example: Cloud Function (Node.js) triggered by HTTP**

*`index.js`*
```javascript
const functions = require('@google-cloud/functions-framework');

functions.http('helloWorld', (req, res) => {
  const name = req.query.name || 'World';
  res.send(`Hello, ${name}! Welcome to Cloud Functions.`);
});
```
Deployment command:
```bash
gcloud functions deploy helloWorld \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-central1 \
  --source=. \
  --entry-point=helloWorld \
  --trigger-http \
  --allow-unauthenticated
```

---

## 4. Storage Services

### Cloud Storage (GCS)
Cloud Storage is GCP's enterprise-ready, globally scalable object storage. It is not a file system; data is stored as immutable objects within "buckets".

**Key Concepts:**
- **Buckets:** The basic containers that hold your data. Bucket names must be globally unique across all of GCP.
- **Objects:** The individual pieces of data (files) you store.
- **Namespaces:** Flat hierarchy, though folders are simulated using prefixes in the object name (e.g., `images/2023/photo.jpg`).
- **Storage Classes:**
    1. **Standard:** Best for frequently accessed data ("hot" data). High availability.
    2. **Nearline:** For data accessed less than once a month (e.g., backups).
    3. **Coldline:** For data accessed less than once a quarter (e.g., disaster recovery).
    4. **Archive:** For data accessed less than once a year (e.g., regulatory compliance archives). Lowest storage cost, highest retrieval cost.
- **Object Versioning:** Keeps older versions of an object when it's deleted or overwritten. Prevents accidental data loss.
- **Lifecycle Management:** Automates moving objects between storage classes or deleting them based on rules (e.g., "Move to Coldline after 90 days").

**Practical Example: Hosting a Static Website**
1. Create a bucket: `gsutil mb gs://my-static-site-bucket`
2. Make it public: `gsutil iam ch allUsers:objectViewer gs://my-static-site-bucket`
3. Upload files: `gsutil cp -r ./website-files/* gs://my-static-site-bucket`
4. Set main page: `gsutil web set -m index.html -e 404.html gs://my-static-site-bucket`

### Databases

#### Cloud Firestore
Firestore is a fast, fully managed, serverless, cloud-native NoSQL document database. It is the successor to Cloud Datastore.

- **Data Model:** Data is stored in Documents, which are organized into Collections. Documents contain key-value pairs (fields).
- **Real-time Updates:** Clients can listen to data changes in real-time.
- **Offline Support:** Mobile and web SDKs cache data locally, allowing apps to function without a network connection.
- **ACID Transactions:** Supports multi-document, fully ACID transactions.

#### BigQuery (Basic Intro)
BigQuery is Google's fully managed, serverless enterprise data warehouse designed for analytics over petabytes of data.

- **Architecture:** Separates compute (Dremel execution engine) and storage (Capacitor columnar storage).
- **Interaction:** You query data using standard SQL.
- **Pricing:** You pay for storage (GB/month) and for compute (per TB of data processed by queries).
- **Use Case:** Analyzing logs, business intelligence dashboards, machine learning model training data.

#### Other notable databases:
- **Cloud SQL:** Managed relational databases (MySQL, PostgreSQL, SQL Server).
- **Cloud Spanner:** Horizontally scalable, globally distributed relational database (NewSQL). Used for massive, global transactions.
- **Cloud Bigtable:** Wide-column NoSQL database. Extremely high throughput, low latency. Used for IoT, time-series data.
- **Memorystore:** Managed in-memory data store (Redis, Memcached).

---

## 5. Networking

### Virtual Private Cloud (VPC)
A VPC is a secure, individual, private cloud-computing model hosted within a public cloud. In GCP, a VPC is **global**.

**Key Concepts:**
- **Global VPC:** Unlike AWS where a VPC is tied to a specific region, a GCP VPC spans the globe.
- **Subnets:** Subnets are regional resources. A single VPC can have subnets in different regions (e.g., one subnet in `us-central1`, another in `europe-west1`). VMs in these subnets can communicate privately via internal IPs without traversing the public internet.
- **IP Addressing:** VMs can have an Internal IP (for VPC communication) and an optional External IP (for internet communication).
- **Firewall Rules:** VPC firewalls are stateful. They govern traffic to/from VMs based on:
    - IP ranges (CIDR blocks)
    - Network Tags (applied to VMs, e.g., `allow-web`)
    - Service Accounts (more secure than tags, tightly couples firewall rules to identity).
- **Cloud NAT (Network Address Translation):** Allows VMs without external IP addresses to access the internet for updates/downloads, while preventing inbound connections from the internet.
- **VPC Peering:** Connects two separate VPC networks privately.
- **Shared VPC:** Allows an organization to connect resources from multiple projects to a common VPC network.

### Cloud Load Balancing
GCP Load Balancers distribute user traffic across multiple instances of your applications. They use a single global Anycast IP address.

**Types of Load Balancers:**
1. **Global External Application Load Balancer (HTTP/HTTPS):** Operates at Layer 7. Used when traffic is HTTP/HTTPS. Routes traffic based on URL paths (e.g., `/api` goes to a backend service, `/images` goes to Cloud Storage). Balances traffic globally to the region closest to the user.
2. **Global External Proxy Load Balancer (TCP/SSL):** Layer 4 proxy for non-HTTP traffic.
3. **External Network Load Balancer (TCP/UDP):** Regional, Layer 4 pass-through load balancer. Extremely fast.
4. **Internal Load Balancers:** For distributing traffic within a VPC (e.g., balancing traffic from a web tier to an internal database tier).

---

## 6. Identity and Access Management (IAM)

IAM lets you grant granular access to specific Google Cloud resources and prevents unwanted access to other resources. **IAM answers "Who can do What on Which resource."**

**Core Concepts:**
1. **Principal (Who):** The identity requesting access. Can be a Google Account, Service Account, Google Group, or Google Workspace domain.
2. **Role (What):** A collection of permissions. You cannot assign permissions directly to a user; you assign them a Role.
    - **Basic Roles:** Owner, Editor, Viewer. *(Avoid using these in production as they apply broadly to all resources in a project).*
    - **Predefined Roles:** Created and maintained by Google (e.g., `roles/compute.instanceAdmin`, `roles/storage.objectViewer`). Granular and service-specific.
    - **Custom Roles:** User-defined roles containing a specific list of permissions tailored to specific needs.
3. **Policy:** Binds Principals to Roles. A policy is attached to a Resource.

**Service Accounts:**
A Service Account is a special type of Google account intended to represent a non-human user that needs to authenticate and be authorized to access data in Google APIs.
- VMs, Cloud Functions, and App Engine applications run *as* a service account.
- **Default Service Accounts:** Created automatically by GCP. Often have broad permissions (like Editor). Best practice is to replace them.
- **User-managed Service Accounts:** Created by you, with precise, minimal permissions assigned (Principle of Least Privilege).
- **Service Account Keys:** JSON files containing credentials. They are highly sensitive and should never be committed to source code. Modern applications should use **Workload Identity Federation** instead of keys where possible.

---

## 7. Deployment

Deploying applications on GCP depends on the level of control and abstraction required:

- **Static Content:** Cloud Storage + HTTP(S) Load Balancer + Cloud CDN.
- **Serverless / Event-Driven:** Cloud Functions.
- **Containerized Apps (Serverless):** **Cloud Run**. (Highly recommended for modern web apps and APIs). It scales to zero, runs any Docker container, and bills only for execution time.
- **Container Orchestration:** **Google Kubernetes Engine (GKE)**. Managed Kubernetes for complex, microservices architectures.
- **Traditional Servers:** Compute Engine (VMs).

**CI/CD Ecosystem:**
- **Cloud Source Repositories:** Private Git repositories hosted on GCP. (Though GitHub/GitLab are often integrated instead).
- **Artifact Registry:** Next-generation container registry to store, manage, and secure Docker images and language packages (Maven, npm).
- **Cloud Build:** Serverless continuous integration and continuous delivery (CI/CD) platform. Executes builds as a series of build steps specified in a `cloudbuild.yaml` file.

**Infrastructure as Code (IaC):**
Always deploy infrastructure using code rather than clicking through the Console.
- **Terraform:** The industry standard for IaC. GCP has an excellent Terraform provider.
- **Google Cloud Deployment Manager:** GCP's native IaC tool (using YAML/Jinja2/Python), though Terraform is generally preferred in the industry.

---

## 8. Monitoring and Logging

GCP provides an integrated suite formerly known as Stackdriver.

### Cloud Logging
Centralized repository for all logs across GCP services.
- **Log Explorer:** UI to query and analyze logs using a specialized query language.
- **Log Routers and Sinks:** By default, logs are kept for a limited time (e.g., 30 days). A Log Sink allows you to continuously export logs to:
    - **Cloud Storage:** For long-term, cheap compliance archiving.
    - **BigQuery:** For complex analysis using SQL.
    - **Pub/Sub:** For real-time streaming to third-party tools (like Splunk or Datadog).

### Cloud Monitoring
Provides visibility into the performance, uptime, and overall health of cloud-powered applications.
- **Metrics Explorer:** Visualize metrics (CPU usage, network traffic, custom app metrics).
- **Dashboards:** Create custom visualizations grouping related metrics.
- **Uptime Checks:** Probes your web endpoints continuously from locations worldwide to ensure they are responsive.
- **Alerting Policies:** Notify you (via Email, Slack, PagerDuty, Webhooks) when a metric violates a specific condition (e.g., "CPU utilization > 80% for 5 minutes").

---

## 9. Security Basics

### Shared Responsibility Model
Security in the cloud is shared. Google is responsible for the security *of* the cloud (physical data centers, network infrastructure, host OS). You are responsible for security *in* the cloud (your application code, data, IAM permissions, firewall configurations).

### Key Security Concepts
- **Encryption at Rest:**
    - By default, all data written to GCP storage is encrypted by Google before being written to disk (Google-managed keys).
    - **CMEK (Customer-Managed Encryption Keys):** You manage the encryption keys using Cloud Key Management Service (KMS).
    - **CSEK (Customer-Supplied Encryption Keys):** You create and manage keys outside of GCP and provide them on-demand.
- **Encryption in Transit:** Data moving between Google data centers, and between users and Google, is encrypted by default.
- **VPC Service Controls:** Defines security perimeters around GCP services to mitigate data exfiltration risks.
- **Identity-Aware Proxy (IAP):** Implements a Zero Trust access model. It allows you to guard applications running on GCP, restricting access based on user identity and context (device, IP) without needing a VPN.
- **Cloud Armor:** Enterprise DDoS defense and Web Application Firewall (WAF) that attaches to the Global Load Balancer.

---

## 10. Pricing

GCP pricing is designed to be flexible and cost-effective.

### Core Principles
- **Pay-as-you-go:** No upfront capital expenditure.
- **Per-second billing:** For Compute Engine, Kubernetes Engine, App Engine, etc.
- **Free Tier:** Many services offer a generous "Always Free" tier (e.g., 1 e2-micro VM, 5GB Cloud Storage, 2M Cloud Function invocations per month).

### Discount Mechanisms
1. **Sustained Use Discounts (SUD):** Automatic discounts applied when you run a specific VM in a given month for a significant portion of the month. The longer it runs, the cheaper the hourly rate gets. (Applicable to certain machine families).
2. **Committed Use Discounts (CUD):** Massive discounts (up to 70%) if you commit to paying for a specific amount of vCPU and memory for 1 or 3 years, regardless of actual usage.

### Cost Management Tools
- **Pricing Calculator:** Tool to estimate monthly costs before provisioning.
- **Billing Budgets and Alerts:** **CRITICAL**. Always set a budget alert on your project to notify you if spending exceeds a certain threshold. *Note: Budgets do not stop spending; they only alert. To stop spending automatically, you must use a Cloud Function triggered by a Pub/Sub billing alert to disable billing.*
- **Cost Table and Billing Export:** Export daily billing data to BigQuery for deep granular analysis.

---

## 11. Best Practices

1. **Adopt Infrastructure as Code (IaC):** Use Terraform to provision and manage everything. It provides version control, auditability, and repeatability for infrastructure.
2. **Principle of Least Privilege (PoLP):** Never use the primitive roles (Owner/Editor) in production. Assign granular, predefined roles. Use Workload Identity instead of service account keys.
3. **Use Labels and Tags:** Label resources (e.g., `environment: prod`, `team: frontend`) to accurately track costs and automate resource management.
4. **Design for Failure:** Assume instances will fail. Use Managed Instance Groups, load balancing, and multi-zone/multi-region deployments to ensure high availability.
5. **Decouple Applications:** Use services like Pub/Sub (messaging queue) to decouple microservices. This allows different parts of the system to scale independently and handles bursty traffic gracefully.
6. **Set up Billing Alerts immediately:** The very first thing you do in a new project is set a budget alert.

---

## 12. Common Mistakes

- **Publicly Exposing Resources:** Accidentally leaving Cloud Storage buckets public, or opening VM firewall rules to `0.0.0.0/0` on sensitive ports (like 22 for SSH or 3306 for databases). Always restrict to known IPs or use IAP.
- **Hardcoding Credentials:** Storing Service Account Keys, API keys, or database passwords in source code. Use **Secret Manager** to securely store and access secrets.
- **Using Default Service Accounts in Production:** The Compute Engine default service account has the Project Editor role. If a VM is compromised, the attacker has broad control over the entire project. Always create custom service accounts.
- **Ignoring Resource Cleanup:** Leaving unused VMs running, or forgetting about orphaned Persistent Disks and unattached static IP addresses. These incur continuous charges.
- **Over-provisioning:** Spinning up an `e2-standard-8` (8 cores, 32GB RAM) for a small internal testing app that requires 1 core. Start small and scale up. Let Cloud Monitoring's "Rightsizing Recommendations" guide you.

---

## 13. Real-world Examples

### Example 1: Deploying a Modern Web Application
**Scenario:** A company needs to deploy a scalable e-commerce website with a frontend, backend API, and a relational database.

**Architecture:**
1. **Frontend (React/Vue):** Built and compiled into static HTML/CSS/JS. Uploaded to a **Cloud Storage Bucket**.
2. **CDN & Routing:** A **Global Application Load Balancer** sits at the edge.
   - It caches static assets at edge nodes using **Cloud CDN** to deliver the frontend quickly.
   - It routes traffic starting with `/api` to the backend.
3. **Backend API (Node.js/Python):** Containerized using Docker and deployed to **Cloud Run**. Cloud Run automatically scales based on incoming HTTP requests, even scaling to zero when there's no traffic.
4. **Database:** **Cloud SQL (PostgreSQL)**. Cloud Run connects to Cloud SQL via a private VPC connector for security.
5. **CI/CD:** Code is pushed to GitHub. **Cloud Build** triggers, builds the Docker image, pushes it to **Artifact Registry**, and deploys the new revision to Cloud Run.

### Example 2: Cloud-based Backend for a Mobile App
**Scenario:** A mobile application where users upload photos, and the app generates thumbnails and performs image analysis.

**Architecture:**
1. **Authentication:** Users authenticate securely via **Firebase Authentication**.
2. **Direct Upload:** Mobile app uses temporary Signed URLs to upload full-size images directly to a **Cloud Storage Bucket** (bypassing the need for a backend server to handle large file transfers).
3. **Event-Driven Processing:** The upload to Cloud Storage acts as a trigger. An Eventarc event fires and triggers a **Cloud Function** (Gen 2).
4. **Processing Logic:** The Cloud Function downloads the image, resizes it to create a thumbnail, uploads the thumbnail to a different "processed" bucket, and calls the **Cloud Vision API** to tag the image.
5. **Metadata Storage:** The generated tags and image URLs are stored as a document in **Firestore**.
6. **Real-time Sync:** The mobile app, which is listening to Firestore via real-time subscriptions, instantly updates the UI with the new thumbnail and tags.

---
*End of Study Guide*
