# The Ultimate GitLab CI/CD Technical Study Guide

Welcome to the definitive study guide for GitLab CI/CD. This comprehensive resource is designed to take you from a foundational understanding of automation to an intermediate/advanced level where you can confidently architect, deploy, and troubleshoot complex automation pipelines. 

This guide is structured to be read sequentially or used as a reference manual for specific topics.

---

## Table of Contents

1. [Introduction to CI/CD](#1-introduction-to-cicd)
2. [Introduction to GitLab CI/CD](#2-introduction-to-gitlab-cicd)
3. [Core Concepts](#3-core-concepts)
4. [Configuration File (`.gitlab-ci.yml`)](#4-configuration-file)
5. [Runners](#5-runners)
6. [Pipeline Execution](#6-pipeline-execution)
7. [Variables and Secrets](#7-variables-and-secrets)
8. [Artifacts and Caching](#8-artifacts-and-caching)
9. [Testing and Build Pipelines](#9-testing-and-build-pipelines)
10. [Deployment](#10-deployment)
11. [Monitoring Pipelines](#11-monitoring-pipelines)
12. [Best Practices](#12-best-practices)
13. [Common Mistakes](#13-common-mistakes)
14. [Real-world Examples](#14-real-world-examples)

---

## 1. Introduction to CI/CD

Before diving into GitLab's specific implementation, it is critical to understand the overarching paradigm of CI/CD. CI/CD stands for Continuous Integration and Continuous Delivery/Deployment. It is the backbone of modern DevOps, enabling teams to ship higher quality code faster and more reliably.

### What is Continuous Integration (CI)?

Continuous Integration is a development practice where developers merge code changes into a central repository multiple times a day. Each merge triggers an automated build and testing sequence.

**The CI Workflow:**
1. A developer commits code and opens a Merge Request (MR) / Pull Request (PR).
2. The CI server detects the change.
3. The server checks out the code, compiles/builds the application, and runs a suite of automated tests (unit tests, linting, security scans).
4. If the build or tests fail, the CI server alerts the team immediately, blocking the merge until the issue is fixed.
5. If successful, the code is deemed safe to merge.

**Primary Goals of CI:**
* **Find and fix bugs faster:** Because changes are small and integrated frequently, identifying the cause of a bug is straightforward.
* **Improve software quality:** Automated testing ensures regressions are caught early.
* **Reduce validation time:** Manual testing is slow; automated testing is rapid and repeatable.

### What is Continuous Delivery (CD)?

Continuous Delivery is the natural extension of Continuous Integration. While CI focuses on building and testing code, Continuous Delivery ensures that the codebase is *always in a deployable state*.

In a Continuous Delivery pipeline, all code changes are automatically built, tested, and prepared for a release to production. However, the final step—deploying to the live production environment—requires a **manual trigger** (a human clicking a "Deploy" button).

### What is Continuous Deployment (CD)?

Continuous Deployment takes Continuous Delivery one step further. In Continuous Deployment, every change that passes all stages of your production pipeline is released to your customers automatically. There is **no human intervention**, and only a failed test will prevent a new change from being deployed to production.

*Note: The acronym "CD" is frequently used to mean both Delivery and Deployment. You must rely on context to know which one a team is using.*

### Benefits of Automation

* **Velocity:** Teams can release new features and patches multiple times a day instead of once a month.
* **Reliability:** Removing manual, error-prone steps reduces deployment failures. Scripts don't forget steps; humans do.
* **Developer Productivity:** Developers spend less time managing environments and manual tests, and more time writing valuable code.
* **Rapid Feedback Loop:** If a change breaks the system, the developer knows within minutes, not days.
* **Auditability:** Every action is logged. You know exactly who triggered a deployment, what code went out, and when it happened.

---

## 2. Introduction to GitLab CI/CD

### What is GitLab CI/CD?

GitLab CI/CD is a continuous integration, continuous delivery, and continuous deployment solution built directly into GitLab. Unlike standalone CI/CD tools (like Jenkins or CircleCI) that require integrations and plugins to connect to your source code repository, GitLab CI/CD is a native feature. If your code is in a GitLab repository, you already have CI/CD out of the box.

### Key Features of GitLab CI/CD

1. **Single Application Ecosystem:** Everything from planning (issues, boards), source code management (Git), CI/CD, security scanning, and package registries (Container Registry, NPM registry) lives in one UI.
2. **Configuration as Code:** Your pipeline configuration is defined in a simple, version-controlled YAML file (`.gitlab-ci.yml`) stored at the root of your repository.
3. **GitLab Auto DevOps:** A feature that automatically detects, builds, tests, deploys, and monitors your applications by evaluating your source code and identifying the framework (e.g., automatically building a Docker image if a `Dockerfile` is present).
4. **GitLab Runners:** A lightweight, highly scalable agent that runs your CI/CD jobs. Runners can run on virtually any OS and can use Docker, Kubernetes, or standard shell execution.
5. **Built-in Container Registry:** Every project gets its own Docker container registry securely integrated with the CI/CD pipeline, making building and pushing images seamless.
6. **Environment Management:** Native tracking of environments (Staging, Production) with deployment histories, rollbacks, and manual approval gates.

---

## 3. Core Concepts

To build effective pipelines, you must understand the three foundational building blocks of GitLab CI/CD: **Pipelines**, **Jobs**, and **Stages**.

### Pipelines

A pipeline is the top-level component of continuous integration, delivery, and deployment. 
A pipeline comprises:
* **Jobs:** What to do (e.g., compile code, run tests, push to registry).
* **Stages:** When to run the jobs (e.g., test after build, deploy after test).

Pipelines are typically triggered by specific events, such as pushing to a branch, creating a tag, opening a Merge Request, or running a scheduled cron job.

**Types of Pipelines:**
* **Basic Pipelines:** Jobs run concurrently in stages, and stages run sequentially.
* **Directed Acyclic Graph (DAG) Pipelines:** Jobs run as soon as their dependencies (`needs`) are met, regardless of stages, speeding up execution.
* **Parent-Child Pipelines:** A single pipeline can trigger sub-pipelines, useful for monorepos or complex microservice architectures.
* **Multi-Project Pipelines:** A pipeline in one GitLab project can trigger a pipeline in another entirely different GitLab project.

### Stages

Stages define the logical order of execution. 
By default, GitLab provides five stages if you don't define your own: `.pre`, `build`, `test`, `deploy`, `.post`.

**Rules of Stages:**
1. Jobs in the same stage run **in parallel** (concurrently), assuming there are enough available Runners.
2. Jobs in the next stage run **only after** all jobs in the previous stage have completed successfully.
3. If *any* job in a stage fails, the pipeline fails, and jobs in subsequent stages are not executed.

### Jobs

Jobs are the fundamental unit of work. Every pipeline is made of jobs.
A job is essentially a script (or sequence of commands) that runs in a specific environment (Runner).

**Characteristics of Jobs:**
* A job must be assigned to a stage. (If not explicitly assigned, it defaults to the `test` stage).
* Jobs execute independently. They do not share state, memory, or disk space unless explicitly configured to do so using Artifacts or Caching.
* A job is defined by a unique name in the YAML file (e.g., `run_unit_tests:`).

---

## 4. Configuration File (`.gitlab-ci.yml`)

The `.gitlab-ci.yml` file is where you configure your pipeline. It must be placed in the root directory of your repository. 

### YAML Syntax Basics

YAML (YAML Ain't Markup Language) is a human-readable data serialization language.
* It is strictly indentation-based. Use **spaces**, not tabs (usually 2 spaces per indentation level).
* Key-value pairs are separated by a colon and a space `key: value`.
* Lists are denoted by hyphens `- item`.

### Core Keywords

Here is a breakdown of the most critical keywords used to construct a `.gitlab-ci.yml` file.

#### `stages`
Defines the order of execution for your pipeline. If a job is assigned to a stage not listed here, the YAML is invalid.

```yaml
stages:
  - lint
  - test
  - build
  - deploy
```

#### Job Definition Structure
A basic job definition looks like this:

```yaml
job_name:
  stage: test
  script:
    - echo "Running tests..."
    - npm run test
```

#### `image`
Specifies the Docker image that the GitLab Runner should use to execute the job. This requires a Docker-based Runner executor.

```yaml
# Global image for all jobs
image: node:18-alpine

test_job:
  # Overrides global image for this specific job
  image: python:3.9
  script:
    - pytest
```

#### `script`
The most critical keyword. It defines the shell commands to be executed by the Runner. It is required for every job.

#### `before_script` and `after_script`
* `before_script`: Commands that run *before* the main `script` executes. Often used to install dependencies or set up environments.
* `after_script`: Commands that run *after* the main `script` executes, regardless of whether the main script succeeded or failed. Often used for cleanup.

```yaml
build_app:
  stage: build
  before_script:
    - echo "Setting up environment"
    - npm install
  script:
    - npm run build
  after_script:
    - echo "Cleaning up temporary files"
    - rm -rf temp_dir/
```

#### `services`
Used to run additional Docker containers alongside your main job container. These are typically databases or external services needed for integration testing.

```yaml
test_db:
  image: node:18
  services:
    - name: postgres:13
      alias: db
  variables:
    POSTGRES_DB: testdb
    POSTGRES_USER: user
    POSTGRES_PASSWORD: password
  script:
    - npm install
    - npm test
```
*Note: The service container is accessible from the main container via the `alias` network hostname.*

#### `include`
Allows you to break a massive `.gitlab-ci.yml` into smaller, reusable files. You can include local files, files from other projects, or remote URLs.

```yaml
include:
  - local: '/templates/.ci-test.yml'
  - project: 'my-group/my-library'
    ref: main
    file: '/templates/.ci-deploy.yml'
```

#### `extends`
A powerful feature for reusing job configuration (DRY principle). It allows a job to inherit configuration from a base job (often a hidden job prefixed with a dot `.`).

```yaml
# Hidden job (acts as a template)
.node_template:
  image: node:18
  before_script:
    - npm ci

# Inherits everything from .node_template
test_frontend:
  extends: .node_template
  stage: test
  script:
    - npm run lint
    - npm run test:unit
```

---

## 5. Runners

Pipelines are definitions. Runners are the compute instances that actually execute those definitions. Without Runners, your CI/CD pipeline does nothing.

### What are GitLab Runners?

GitLab Runner is a lightweight, open-source application written in Go. You can install it on Linux, macOS, Windows, Kubernetes, or even a Raspberry Pi. 

The architecture is a "pull" model:
1. The Runner continuously polls the GitLab instance asking, "Do you have any jobs for me?"
2. If a job matches the Runner's configuration, the GitLab instance hands the job payload to the Runner.
3. The Runner executes the script and streams the logs and status back to GitLab.

### Shared vs. Specific vs. Group Runners

* **Shared Runners:** Maintained by GitLab (or your organization's GitLab admin). They are available to all projects on the instance. Ideal for standard jobs (Docker builds, Node testing). They are a pooled resource.
* **Specific Runners:** Installed and registered for a single specific project. Ideal for projects with unique hardware requirements (e.g., requires a GPU, or runs on a specific internal network) or strict security/compliance constraints.
* **Group Runners:** Available to all projects within a specific GitLab Group. A great middle-ground for teams sharing specific infrastructure.

### Runner Executors

When you register a Runner, you must choose an "executor." The executor defines *how* the job script will be run.

1. **Shell:** The script runs directly on the host machine's shell (bash, powershell). Simplest to set up, but lacks isolation (dependencies installed by one job can affect another).
2. **Docker (Most Common):** The runner pulls the `image` defined in `.gitlab-ci.yml`, creates a fresh, isolated container, runs the script inside it, and destroys the container when done. Ensures clean, reproducible builds.
3. **Kubernetes:** The runner creates a new Pod in a K8s cluster for each job. Extremely scalable.
4. **VirtualBox / Parallels:** Creates a fresh virtual machine for each job. Good for macOS/Windows builds.

### Tags and Routing Jobs

You can attach labels called **tags** to Runners. 
In your `.gitlab-ci.yml`, you can specify tags for a job. The job will *only* be picked up by a Runner that possesses all the required tags.

```yaml
deploy_to_aws:
  stage: deploy
  script:
    - aws s3 sync ./build s3://my-bucket
  tags:
    - aws-cli-installed
    - secure-network
```

---

## 6. Pipeline Execution

Controlling *when* and *how* jobs run is crucial for efficiency and cost management.

### Stage-Based Flow vs. DAG

**Standard Flow:**
```yaml
stages:
  - build
  - test
  - deploy

build_a: stage: build
build_b: stage: build
test_a: stage: test
test_b: stage: test
deploy: stage: deploy
```
* `test_a` and `test_b` will wait until BOTH `build_a` and `build_b` finish. Even if `build_a` finishes in 10 seconds and `build_b` takes 10 minutes, `test_a` is blocked for 10 minutes.

**Directed Acyclic Graph (DAG) with `needs`:**
The `needs` keyword breaks strict stage ordering. A job will start the microsecond its `needs` dependencies are fulfilled.

```yaml
stages:
  - build
  - test

build_a: stage: build
build_b: stage: build

# Starts immediately after build_a finishes! Doesn't wait for build_b.
test_a:
  stage: test
  needs: ["build_a"]

test_b:
  stage: test
  needs: ["build_b"]
```
This dramatically reduces overall pipeline time.

### Parallel Execution

If you need to run the same job multiple times with different variables (e.g., testing against multiple Node versions or multiple OS environments), use `parallel: matrix`.

```yaml
test_multi_env:
  stage: test
  script:
    - echo "Testing on Node $NODE_VERSION and OS $OS"
    - npm test
  parallel:
    matrix:
      - NODE_VERSION: ["14", "16", "18"]
        OS: ["ubuntu", "alpine"]
```
This single definition generates 6 distinct jobs (14/ubuntu, 14/alpine, 16/ubuntu, etc.) that run concurrently.

### Rules and Conditions

The `rules` keyword replaces the older `only`/`except` keywords. It is highly flexible for determining if a job should be added to the pipeline based on branch names, variable presence, or file changes.

```yaml
deploy_prod:
  stage: deploy
  script:
    - ./deploy.sh
  rules:
    # Rule 1: If branch is main, require manual click to deploy
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: manual
    # Rule 2: If it's a tag, deploy automatically
    - if: '$CI_COMMIT_TAG'
      when: always
    # Otherwise, do not add this job to the pipeline
    - when: never
```

**`rules:changes`:**
Run jobs only if specific files changed in the commit. Perfect for monorepos.

```yaml
test_frontend:
  script: npm run test
  rules:
    - changes:
        - frontend/**/*
```

---

## 7. Variables and Secrets

Hardcoding passwords, API keys, or environment-specific configuration in your `.gitlab-ci.yml` is a massive security risk. GitLab provides a robust Variables system to handle data securely.

### Predefined Variables

GitLab injects hundreds of environment variables into your job automatically. You can use these to write dynamic scripts.
Examples:
* `$CI_COMMIT_SHA`: The 40-character commit hash.
* `$CI_COMMIT_SHORT_SHA`: The first 8 characters of the hash (great for Docker image tags).
* `$CI_COMMIT_BRANCH`: The branch name (e.g., `main`).
* `$CI_PIPELINE_ID`: A unique ID for the current pipeline.
* `$CI_PROJECT_NAME`: The name of the repository.

### Defining Custom Variables

**1. In `.gitlab-ci.yml` (For non-sensitive data):**
```yaml
variables:
  DEPLOY_ENV: "staging"
  LOG_LEVEL: "debug"
```

**2. In the GitLab UI (For sensitive data):**
Go to Settings -> CI/CD -> Variables.
These variables are securely injected into the Runner as environment variables.

### Masked and Protected Variables

When creating variables in the UI, you have two critical security checkboxes:
* **Masked:** If the variable value is accidentally printed to the pipeline log (e.g., `echo $MY_SECRET`), GitLab will replace the output with `[MASKED]`.
* **Protected:** The variable is *only* injected into pipelines running on Protected Branches (usually `main`) or Protected Tags. This prevents a developer from opening an MR on a feature branch, modifying the `.gitlab-ci.yml` to echo a production database password, and stealing it. The feature branch simply won't have access to the protected variable.

---

## 8. Artifacts and Caching

These two concepts are frequently confused, but they serve entirely different purposes.

### Caching

**Purpose:** Speed up the pipeline by avoiding redownloading dependencies from the internet on every run.
**Scope:** Specific to a project and job. Not guaranteed to be there (can be cleared).
**Use Case:** `node_modules/`, `.m2/` (Maven), `vendor/` (Go).

```yaml
test_job:
  image: node:18
  cache:
    # Use the branch name as the cache key. 
    # This keeps caches isolated between branches.
    key: $CI_COMMIT_REF_SLUG
    paths:
      - node_modules/
    # If package.json hasn't changed, we don't need to rebuild cache
    policy: pull-push
  script:
    - npm install
    - npm test
```

### Artifacts

**Purpose:** Pass intermediate build results (like compiled binaries, minified CSS/JS, or test reports) from one stage to a subsequent stage, or save them for the user to download from the UI.
**Scope:** Passed to downstream jobs. Guaranteed to exist.
**Use Case:** Passing a built `.jar` file to a deploy job, saving JUnit XML test reports, saving code coverage HTML.

```yaml
build_frontend:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/ # This folder is zipped and uploaded to GitLab
    expire_in: 1 week # Automatically delete after 1 week to save space
    
deploy_frontend:
  stage: deploy
  script:
    # The 'dist/' folder is automatically downloaded and unzipped here!
    - aws s3 sync ./dist/ s3://my-website
```

**Key Differences Summary:**
* **Cache:** "I want to save this so my *future runs* are faster."
* **Artifacts:** "I want to save this so my *next job* can use it, or a *human* can download it."

---

## 9. Testing and Build Pipelines

### Unit Testing and Reports

GitLab CI can parse your test output and display it directly in the Merge Request UI, so reviewers don't have to dig through raw console logs.

To do this, your test framework must output a `JUnit XML` report, and you must define it as an artifact report.

```yaml
unit_tests:
  stage: test
  image: python:3.9
  script:
    - pip install pytest pytest-cov
    - pytest --junitxml=report.xml
  artifacts:
    when: always # Upload artifact even if tests fail
    reports:
      junit: report.xml
```

### Building Docker Images

A very common CI/CD task is building a Docker image and pushing it to a registry.
There are two main ways to do this in GitLab:

**1. Docker-in-Docker (DinD):**
Requires running a Docker daemon inside the Runner container. It requires the runner to run in `--privileged` mode, which has security implications.

```yaml
build_docker_dind:
  image: docker:20.10.16
  services:
    - docker:20.10.16-dind
  variables:
    # Tell docker client to use the DinD service
    DOCKER_HOST: tcp://docker:2375
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
```

**2. Kaniko (Recommended for Kubernetes/Security):**
Kaniko builds container images from a Dockerfile inside a container or Kubernetes cluster without requiring a Docker daemon or privileged access.

```yaml
build_docker_kaniko:
  stage: build
  image:
    name: gcr.io/kaniko-project/executor:debug
    entrypoint: [""]
  script:
    - mkdir -p /kaniko/.docker
    - echo "{\"auths\":{\"$CI_REGISTRY\":{\"username\":\"$CI_REGISTRY_USER\",\"password\":\"$CI_REGISTRY_PASSWORD\"}}}" > /kaniko/.docker/config.json
    - /kaniko/executor --context $CI_PROJECT_DIR --dockerfile $CI_PROJECT_DIR/Dockerfile --destination $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
```

---

## 10. Deployment

### Environments

GitLab has a native "Environments" feature. By declaring an environment in your `.gitlab-ci.yml`, GitLab tracks deployments, allows you to view the live environment directly from the MR, and enables one-click rollbacks from the UI.

```yaml
deploy_staging:
  stage: deploy
  script:
    - echo "Deploying to Staging..."
    - ./deploy-script.sh staging
  environment:
    name: staging
    url: https://staging.myapp.com
```

### Continuous Deployment (Automatic) vs Delivery (Manual)

To achieve Continuous Delivery (requiring manual approval for production), use the `when: manual` rule combined with environment protection.

```yaml
deploy_production:
  stage: deploy
  script:
    - echo "Deploying to Production!"
    - ./deploy-script.sh prod
  environment:
    name: production
    url: https://myapp.com
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: manual # Pipeline pauses here and waits for user to click 'Play'
```

### Dynamic Environments (Review Apps)

Review Apps are dynamic environments spun up automatically for every Merge Request. This allows reviewers to actually *use* the changes before merging.

```yaml
deploy_review_app:
  stage: deploy
  script:
    - echo "Deploying ephemeral environment"
    - helm upgrade --install myapp-$CI_COMMIT_REF_SLUG ./chart --set ingress.host=$CI_COMMIT_REF_SLUG.review.myapp.com
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    url: https://$CI_COMMIT_REF_SLUG.review.myapp.com
    # When MR is closed/merged, trigger this job to clean up
    on_stop: stop_review_app 
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"

stop_review_app:
  stage: deploy
  script:
    - helm uninstall myapp-$CI_COMMIT_REF_SLUG
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    action: stop
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
      when: manual
```

---

## 11. Monitoring Pipelines

### Pipeline Visualization
In the GitLab UI (Build -> Pipelines), you can see a graphical representation of your pipeline.
* **Green Check:** Passed
* **Red Cross:** Failed
* **Orange Pause:** Waiting for manual action
* **Blue Clock:** Running or Pending

### Job Logs
Clicking on any job opens the terminal output. If a pipeline fails, this is your first stop. Search for `ERR`, `Error`, or `Failed`.

### Alerts and Notifications
GitLab integrates natively with Slack, Microsoft Teams, and email. You can configure Project Integrations to send messages when a pipeline on the `main` branch fails, alerting the team immediately.

---

## 12. Best Practices

1. **Keep it DRY:** Use `include` to centralize common logic (like standard linting or security scanning jobs) across multiple projects in your organization.
2. **Use YAML Anchors/Extends:** Instead of copying and pasting `before_script` or `variables` across 10 jobs, use `.templates` and the `extends` keyword.
3. **Fail Fast:** Put your fastest tests (Linting, Unit Tests, Static Code Analysis) in the earliest stages. Don't wait 20 minutes for a massive Docker image to build only to find out there's a missing semicolon.
4. **Pin Versions:** Never use `image: node:latest`. Always pin to a specific major/minor version (e.g., `image: node:18.16.0-alpine`). `latest` can break your pipeline overnight when the base image updates unexpectedly.
5. **Optimize Image Sizes:** Use `alpine` or `slim` Docker images for your jobs. Pulling a 1GB Ubuntu image on every job adds massive overhead to your pipeline duration.
6. **Leverage GitLab Security Scanners:** If you have GitLab Ultimate, simply `include` GitLab's pre-built templates for SAST, DAST, Container Scanning, and Secret Detection.
   ```yaml
   include:
     - template: Security/SAST.gitlab-ci.yml
     - template: Security/Secret-Detection.gitlab-ci.yml
   ```

---

## 13. Common Mistakes

1. **Caching `node_modules` without using `npm ci`:** Using `npm install` with caching can lead to a corrupted dependency tree over time. Always use `npm ci` in pipelines, which strictly adheres to the `package-lock.json` and cleanly reinstalls.
2. **Storing Secrets in the Repository:** Committing AWS Keys or DB passwords to Git. Always use CI/CD Variables.
3. **Artifact Bloat:** Forgetting to set `expire_in` on artifacts. Your GitLab server disk space will fill up rapidly if you save 500MB of compiled binaries forever on every single commit. Use `expire_in: 1 day` for intermediate artifacts.
4. **Mismatched Runner Tags:** Defining `tags: [docker-runner]` in the YAML, but the admin named the tag `docker` on the server. The job will sit in "Pending" forever because it can't find a matching runner.
5. **Over-complicating `script` blocks:** If your `script` block is 50 lines of complex Bash logic with `if/else` statements, you are doing it wrong. Move that logic into a shell script file (e.g., `./scripts/build.sh`), commit the file, and have the YAML execute `script: - ./scripts/build.sh`.

---

## 14. Real-world Examples

### Example 1: Full-Stack Node.js Application

This pipeline installs dependencies, runs linters and tests, builds the production app, and deploys.

```yaml
image: node:18-alpine

stages:
  - prepare
  - test
  - build
  - deploy

# 1. Cache configuration shared across jobs
default:
  cache:
    key: $CI_COMMIT_REF_SLUG
    paths:
      - .npm/

# 2. Install dependencies (runs only once, saves to cache)
install_dependencies:
  stage: prepare
  script:
    - npm ci --cache .npm --prefer-offline

# 3. Code Linting
lint_code:
  stage: test
  needs: ["install_dependencies"]
  script:
    - npm run lint

# 4. Unit Testing
run_unit_tests:
  stage: test
  needs: ["install_dependencies"]
  script:
    - npm run test:unit -- --coverage
  artifacts:
    paths:
      - coverage/
    expire_in: 1 week

# 5. Build Application
build_app:
  stage: build
  needs: ["lint_code", "run_unit_tests"]
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 day

# 6. Deploy to Staging (Automatic on main branch)
deploy_staging:
  stage: deploy
  needs: ["build_app"]
  script:
    - echo "Deploying to staging server..."
    - npx netlify-cli deploy --dir=dist --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH_TOKEN
  environment:
    name: staging
    url: https://staging.myapp.com
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'

# 7. Deploy to Production (Manual gate)
deploy_production:
  stage: deploy
  needs: ["deploy_staging"]
  script:
    - echo "Deploying to production server..."
    - npx netlify-cli deploy --dir=dist --prod --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH_TOKEN
  environment:
    name: production
    url: https://myapp.com
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: manual
```

### Example 2: Infrastructure as Code (Terraform)

Using GitLab CI to plan and apply Terraform infrastructure.

```yaml
image: hashicorp/terraform:1.4

stages:
  - validate
  - plan
  - apply

before_script:
  # Initialize Terraform using GitLab's managed HTTP backend
  - terraform init 
    -backend-config="address=https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/terraform/state/default" 
    -backend-config="lock_address=https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/terraform/state/default/lock" 
    -backend-config="unlock_address=https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/terraform/state/default/lock" 
    -backend-config="username=$GITLAB_USER_LOGIN" 
    -backend-config="password=$GITLAB_ACCESS_TOKEN" 
    -backend-config="lock_method=POST" 
    -backend-config="unlock_method=DELETE" 
    -backend-config="retry_wait_min=5"

fmt_and_validate:
  stage: validate
  script:
    - terraform fmt -check
    - terraform validate

plan:
  stage: plan
  script:
    - terraform plan -out=tfplan
  artifacts:
    paths:
      - tfplan
    expire_in: 1 day

apply:
  stage: apply
  script:
    - terraform apply -auto-approve tfplan
  environment:
    name: production
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: manual
```

---

### Conclusion

GitLab CI/CD is an exceptionally powerful, tightly integrated system. By understanding the core primitives—Runners, Pipelines, Stages, and Jobs—and applying best practices like DAG (`needs`), artifact/cache management, and environment routing, you can orchestrate highly complex software delivery workflows with speed, security, and confidence.

*End of Study Guide*
