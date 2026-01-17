# iAlerta – Back-end

## Overview

This repository contains the **back-end of iAlerta**, responsible for receiving content in multiple formats, performing **text extraction and normalization**, and integrating with **AI services** to detect AI-generated content.

The application was designed with a strong focus on **data processing pipelines**, **clean architecture** and **software quality**.

---

## Technologies
- Node.js
- Express
- Docker

## Project Architecture

The codebase follows a clear responsibility-driven structure:

```bash
src/
├── config/            # Application and environment configurations
├── controllers/       # HTTP controllers (request/response handling)
├── exceptions/        # Custom application errors and exception handling
├── services/          # Business logic and AI integrations
├── middlewares/       # Request middlewares (upload, validation, auth)
├── routes/            # API route definitions
├── utils/             # Utility functions (parsing, normalization, helpers)
├── tests/             # Unit and integration tests
├── uploads/           # Uploaded files and temporary storage
```
---

## Processing Pipeline

1. Content is received via HTTP request
2. File type and size validation
3. Text extraction:

   * PDFs: **pdf-parse**
   * Plain text: direct reading
4. Text normalization for consistent analysis
5. Content analysis via **Hugging Face APIs**
6. Results returned to the front-end

---

## Middlewares

* File upload handling
* Validation and sanitization
* Text extraction pipeline
* Centralized error handling

---

## AI Integration

* Integration with **Hugging Face APIs**
* Decoupled service layer for AI providers
* Easy extension to support additional models or services

---

## Testing Strategy

* Unit tests for services and utilities
* Integration tests for main API routes
* End-to-end validation of the processing pipeline

---

## Infrastructure & Deployment

* Docker-based containerization
* Automated CI/CD pipelines
* Continuous deployment on **Google Cloud**

---
## Getting Started

### Prerequisites

Make sure you have **Node.js (v18 or higher)** installed on your machine.

You can download it from:
[https://nodejs.org](https://nodejs.org)

To verify the installation:

```bash
node -v
npm -v
```

---

### 1. Clone the repository

```bash
git clone https://github.com/ryannardelli/IAlerta_back_end.git
```

---

### 2. Navigate to the project directory

```bash
cd IAlerta_back_end
```

---

### 3. Install dependencies

```bash
npm install
```

---

### 4. Run the application

```bash
npm run dev
```

## Roadmap

* Result caching
* Monitoring and logging
* Support for additional AI models


