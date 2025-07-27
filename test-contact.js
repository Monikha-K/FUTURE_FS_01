// Test contact form API
const http = require('http');

const testData = JSON.stringify({
  name: "Test User",
  email: "test@example.com",
  phone: "1234567890",
  message: "This is a test message."
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(testData)
  }
};

console.log('Testing contact form API...');

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
    if (res.statusCode === 201) {
      console.log('✅ Contact form is working!');
    } else {
      console.log('❌ Contact form has issues');
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Connection error: ${e.message}`);
  console.log('The server might not be running on port 5000');
});

req.write(testData);
req.end();
