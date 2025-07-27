// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, setting up contact form...');

  const contactForm = document.getElementById('contactForm');
  const statusMsg = document.getElementById('statusMsg');

  console.log('Contact form element:', contactForm);
  console.log('Status message element:', statusMsg);

  if (contactForm) {
    console.log('Contact form found, adding event listener...');

    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      console.log('Form submitted!');

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value || '',
        message: document.getElementById('message').value
      };

      console.log('Form data:', formData);

      // Validate required fields
      if (!formData.name || !formData.email || !formData.message) {
        statusMsg.textContent = 'Please fill in all required fields.';
        statusMsg.style.color = 'red';
        statusMsg.style.display = 'block';
        return;
      }

      // Show loading state
      statusMsg.textContent = 'Sending message...';
      statusMsg.style.color = '#666';
      statusMsg.style.display = 'block';

      try {
        console.log('Sending request to /api/contact...');

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response error:', errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Response result:', result);

        statusMsg.textContent = result.message || 'Message sent successfully!';
        statusMsg.style.color = 'green';
        statusMsg.className = 'status-message success';
        statusMsg.style.display = 'block';
        contactForm.reset();

      } catch (error) {
        console.error('Contact form error:', error);
        statusMsg.textContent = 'Failed to send message. Please try again.';
        statusMsg.style.color = 'red';
        statusMsg.className = 'status-message error';
        statusMsg.style.display = 'block';
      }
    });
  } else {
    console.log('Contact form not found!');
  }
});

// Visitor Tracking
function trackVisitor(page) {
  fetch('http://localhost:5000/api/visitors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page: page })
  }).catch(err => console.log('Visitor tracking failed:', err));
}

// Track page visit
trackVisitor(window.location.pathname);

// Dynamic content loading functions
async function loadProjects() {
  try {
    const response = await fetch('http://localhost:5000/api/projects');
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error('Failed to load projects:', error);
    return [];
  }
}

async function loadSkills() {
  try {
    const response = await fetch('http://localhost:5000/api/skills');
    const skills = await response.json();
    return skills;
  } catch (error) {
    console.error('Failed to load skills:', error);
    return [];
  }
}

async function loadCertifications() {
  try {
    const response = await fetch('http://localhost:5000/api/certifications');
    const certifications = await response.json();
    return certifications;
  } catch (error) {
    console.error('Failed to load certifications:', error);
    return [];
  }
}
