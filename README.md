# AirQ - Air Quality Monitoring Application

AirQ is a web application for monitoring air quality with user authentication using MongoDB.

## Project Structure

- `frontend/` - React.js frontend application
- `backend/` - Node.js Express backend with MongoDB integration

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

## MongoDB Setup

1. Create a free MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (the free tier is sufficient for development)
3. Under "Database Access", create a new database user with read/write permissions
4. Under "Network Access", add your IP address or allow access from anywhere for development
5. Under "Databases", click "Connect" on your cluster, select "Connect your application", and copy the connection string

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/airq?retryWrites=true&w=majority
   JWT_SECRET=your_strong_secret_key
   JWT_EXPIRY=30d
   ```

   - Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas credentials
   - Generate a strong JWT_SECRET (you can use an online generator or run `require('crypto').randomBytes(32).toString('hex')` in Node.js REPL)

4. Start the backend server:
   ```bash
   npm run dev
   ```

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following variables:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

5. Access the application at [http://localhost:8080](http://localhost:8080)

## Features

- User registration and login with MongoDB
- JWT-based authentication
- Air quality monitoring (to be implemented)
- Responsive design

## Tech Stack

- **Frontend**:
  - React
  - Vite
  - Tailwind CSS
  - Axios for API requests

- **Backend**:
  - Node.js
  - Express
  - MongoDB with Mongoose
  - JWT for authentication

## API Endpoints

### Authentication

- **Register a new user**: `POST /api/auth/register`
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Login**: `POST /api/auth/login`
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Get current user**: `GET /api/auth/me` (Requires authentication token)
