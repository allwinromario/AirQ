// Import axios for making HTTP requests
import axios from 'axios';

// Function to test API connectivity
export const testApiConnection = async () => {
  try {
    console.log('Testing API connection...');
    
    // Test 1: Basic connection test
    const basicTest = await axios.get('http://localhost:5001/api', {
      timeout: 5000
    });
    console.log('Basic connection test:', basicTest.status, basicTest.statusText);
    
    return {
      success: true,
      message: 'API connection successful',
      status: basicTest.status
    };
  } catch (error) {
    console.error('API connection test failed:', error);
    
    return {
      success: false,
      message: 'API connection failed',
      error: error.message,
      details: error.response || 'No response details'
    };
  }
};

// Function to test registration
export const testRegistration = async () => {
  try {
    console.log('Testing registration API...');
    
    // Create a test user with a random email to avoid duplicates
    const testUser = {
      name: 'Test User',
      email: `test${Math.floor(Math.random() * 10000)}@example.com`,
      password: 'test1234'
    };
    
    console.log('Attempting to register test user:', testUser);
    
    // Make direct API call to register endpoint
    const response = await axios.post('http://localhost:5001/api/auth/register', testUser, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('Registration response:', response.status, response.data);
    
    return {
      success: true,
      status: response.status,
      data: response.data,
      user: testUser
    };
  } catch (error) {
    console.error('Registration test failed:', error);
    
    return {
      success: false,
      message: 'Registration test failed',
      error: error.message,
      details: error.response?.data || 'No response details'
    };
  }
};

// Function to debug network details
export const debugNetworkDetails = async () => {
  const info = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    origin: window.location.origin,
    url: window.location.href
  };
  
  console.log('Browser and network details:', info);
  
  return info;
};

// Export a function that runs all tests
export const runAllTests = async () => {
  const results = {
    network: await debugNetworkDetails(),
    connection: await testApiConnection(),
    registration: null
  };
  
  // Only test registration if connection test passed
  if (results.connection.success) {
    results.registration = await testRegistration();
  }
  
  console.log('All test results:', results);
  return results;
}; 