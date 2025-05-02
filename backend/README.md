# AirQ Backend with MongoDB Authentication

This is the backend server for the AirQ application with MongoDB integration for user authentication.

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
6. Replace the placeholders in the connection string with your username and password

## Configuration

1. Edit the `.env` file in the backend directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/airq?retryWrites=true&w=majority
   JWT_SECRET=your_strong_secret_key
   JWT_EXPIRY=30d
   ```

   - Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas credentials
   - Generate a strong JWT_SECRET (you can use an online generator or run `require('crypto').randomBytes(32).toString('hex')` in Node.js REPL)

## Installation

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

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

## Authentication

Protected routes require a JWT token. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## CORS

CORS is enabled for all origins in development. For production, you should update the CORS configuration in `server.js` to only allow specific origins. 