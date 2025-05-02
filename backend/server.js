require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Express app
const app = express();

// More detailed request logging
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Body:`, req.body);
  
  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Status: ${res.statusCode} - Duration: ${duration}ms`);
  });
  next();
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// More detailed request logging after parsing JSON
app.use((req, res, next) => {
  if (req.body) {
    console.log('Request body after parsing:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Routes

// Default route
app.get('/', (req, res) => {
  res.send('AirQ API is running');
});

// Error handler middleware
app.use(errorHandler);

// Server setup
const PORT = process.env.PORT || 5001;

// Start server without MongoDB connection
const startServer = async () => {
  try {
    console.log('Starting server...');
    console.log('Environment variables:');
    console.log('- NODE_ENV:', process.env.NODE_ENV);
    console.log('- PORT:', PORT);
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    console.error(error);
  }
};

startServer(); 