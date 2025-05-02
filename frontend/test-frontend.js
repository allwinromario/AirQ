import axios from 'axios';
import { exec } from 'child_process';
import { setTimeout } from 'timers/promises';

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
    
    // Verify the user was saved by making another API call
    console.log('\nWaiting 2 seconds before checking the database...');
    await setTimeout(2000);
    
    console.log('Making a separate request to MongoDB Atlas to check if the user was saved...');
    
    // Use the built-in MongoDB connection checking script
    const checkUsers = () => {
      return new Promise((resolve, reject) => {
        exec('cd ../backend && node check-atlas-users.js', (error, stdout, stderr) => {
          if (error) {
            console.error(`Error checking users: ${error.message}`);
            reject(error);
            return;
          }
          if (stderr) {
            console.error(`stderr: ${stderr}`);
          }
          resolve(stdout);
        });
      });
    };
    
    const usersOutput = await checkUsers();
    const wasUserSaved = usersOutput.includes(testUser.email);
    
    console.log('User saved in database:', wasUserSaved ? 'YES ✅' : 'NO ❌');
    
    return {
      success: true,
      status: response.status,
      data: response.data,
      userSaved: wasUserSaved,
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

// Run the test
testFrontendRegistration()
  .then(result => {
    console.log('\nTest result:', JSON.stringify(result, null, 2));
    process.exit(0);
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  }); 