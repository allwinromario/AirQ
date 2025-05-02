import axios from 'axios';

// Emulate the frontend registration process
const testFrontendRegistration = async () => {
  try {
    console.log('=== Testing Frontend Registration Flow ===');
    
    // Generate a unique test user
    const timestamp = Date.now();
    const testUser = {
      name: `Frontend Test User ${timestamp}`,
      email: `frontend-test-${timestamp}@example.com`,
      password: 'password123'
    };
    
    console.log('User data:', { ...testUser, password: '********' });
    
    // Create axios instance like the frontend does
    const api = axios.create({
      baseURL: 'http://localhost:5001/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Making POST request to:', 'http://localhost:5001/api/auth/register');
    
    const response = await api.post('/auth/register', testUser);
    
    console.log('Registration response status:', response.status);
    console.log('Registration response data:', response.data);
    
    return {
      success: true,
      status: response.status,
      data: response.data,
      user: { ...testUser, password: '********' }
    };
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};

// This will be called from the command line
testFrontendRegistration()
  .then(result => {
    console.log('\nTest result:', JSON.stringify(result, null, 2));
    process.exit(0);
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });

export default testFrontendRegistration; 