// Simple API test script
const https = require('http');

// Test contact form submission
const testData = JSON.stringify({
  name: "Test User",
  email: "test@example.com",
  phone: "1234567890",
  message: "This is a test message from the API test script."
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

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
    
    // Test getting projects
    testProjects();
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(testData);
req.end();

function testProjects() {
  console.log('\nTesting projects API...');
  
  const projectOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/projects',
    method: 'GET'
  };
  
  const projectReq = https.request(projectOptions, (res) => {
    console.log(`Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      const projects = JSON.parse(data);
      console.log(`Found ${projects.length} projects`);
      console.log('First project:', projects[0]?.title);
      
      // Test skills
      testSkills();
    });
  });
  
  projectReq.on('error', (e) => {
    console.error(`Problem with projects request: ${e.message}`);
  });
  
  projectReq.end();
}

function testSkills() {
  console.log('\nTesting skills API...');
  
  const skillOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/skills',
    method: 'GET'
  };
  
  const skillReq = https.request(skillOptions, (res) => {
    console.log(`Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      const skills = JSON.parse(data);
      console.log(`Found ${skills.length} skills`);
      console.log('First skill:', skills[0]?.name);
      
      console.log('\n✅ All API tests completed successfully!');
    });
  });
  
  skillReq.on('error', (e) => {
    console.error(`Problem with skills request: ${e.message}`);
  });
  
  skillReq.end();
}
