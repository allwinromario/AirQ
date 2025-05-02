require('dotenv').config();

console.log('=== Environment Variables Check ===');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 
  `${process.env.MONGODB_URI.substring(0, 20)}...${process.env.MONGODB_URI.substring(process.env.MONGODB_URI.indexOf('@'))}` : 
  'not set');
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'set (hidden)' : 'not set');
console.log('JWT_EXPIRE:', process.env.JWT_EXPIRE);
console.log('NODE_ENV:', process.env.NODE_ENV); 