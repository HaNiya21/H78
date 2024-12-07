# H78

## Overview
H78 is a healthcare-focused web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). It provides user authentication, interactive charts powered by D3.js, and insights into emerging healthcare technologies. The application is hosted on a single server with NGINX serving the frontend and proxying API calls to the backend.

## Features
- **User Authentication**: Secure login with JWT.
- **Dashboard**: Summaries and technical descriptions of healthcare innovations.
- **Dynamic Charts**: Interactive charts on Summary and Reports pages, using data retrieved via HTTP GET requests.
- **Accessibility**: ADA/WCAG-compliant design with ARIA roles and keyboard navigation.

## Technology Stack
- **Frontend**: React with React Router for navigation.
- **Backend**: Node.js with Express.js.
- **Database**: MongoDB.
- **Authentication**: JWT.
- **Charting**: D3.js.
- **Server**: NGINX to serve the frontend and proxy backend requests.

## Folder Structure
```plaintext
H78/
|-- backend/
|   |-- server.js
|   |-- routes/
|   |   |-- auth.js
|   |   |-- data.js
|   |-- models/
|   |   |-- User.js
|   |-- middleware/
|   |   |-- authMiddleware.js
|   |-- config/
|   |   |-- db.js
|   |-- script/
|   |   |-- createTestUser.js
|   |-- .env
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |   |-- Login.js
|   |   |   |-- Dashboard.js
|   |   |   |-- Summary.js
|   |   |   |-- Reports.js
|   |   |-- App.js
|   |   |-- index.js
|   |   |-- setupTest.js
|   |-- package.json
|   |-- .env
```

## Prerequisites
- Node.js installed.
- MongoDB instance running locally or remotely.
- NGINX installed on the server for deployment.

## Installation and Running Locally

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node server.js
   ```
   The backend runs on port `3000`.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the frontend:
   ```bash
   npm run build
   ```
4. To view the app locally, you can use a simple HTTP server to serve the `build` folder or integrate with the backend for a full-stack setup.

## Deployment Instructions
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Configure NGINX:
   - Serve the frontend build files on port `80`.
   - Proxy API requests to the backend server on port `3000`.
3. Restart NGINX to apply the configuration.
4. Ensure the MongoDB instance is accessible and the backend server is running