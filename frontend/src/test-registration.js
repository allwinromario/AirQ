import axios from 'axios';

// Function to test registration
const testRegistration = async () => {
  try {
    console.log('Testing registration...');
    
    // Generate a unique email
    const testEmail = `test_frontend_${Date.now()}@example.com`;
    
    // User data
    const userData = {
      name: 'Test Frontend User',
      email: testEmail,
      password: 'password123'
    };
    
    console.log('Registering user with data:', { ...userData, password: '******' });
    
    // Make the API call
    const response = await axios.post('http://localhost:5001/api/auth/register', userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Registration response status:', response.status);
    console.log('Registration response data:', response.data);
    
    return {
      success: true,
      message: 'Registration successful',
      data: response.data,
      userData: { ...userData, password: '******' }
    };
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    
    return {
      success: false,
      message: 'Registration failed',
      error: error.response?.data || error.message
    };
  }
};

// Run the test if this script is executed directly
if (typeof window !== 'undefined') {
  // Browser environment
  window.testRegistration = testRegistration;
  console.log('Test function available as window.testRegistration()');
} else {
  // Node.js environment
  testRegistration()
    .then(result => {
      console.log('Test result:', result);
    })
    .catch(err => {
      console.error('Test error:', err);
    });
}

export default testRegistration; 