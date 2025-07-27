// Admin Panel JavaScript
const API_BASE = 'http://localhost:5000/api';

// Navigation
document.addEventListener('DOMContentLoaded', function() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.admin-section');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSection = btn.getAttribute('data-section');
      
      // Remove active class from all buttons and sections
      navBtns.forEach(b => b.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      
      // Add active class to clicked button and target section
      btn.classList.add('active');
      document.getElementById(targetSection).classList.add('active');
      
      // Load data for the section
      loadSectionData(targetSection);
    });
  });

  // Load initial data
  loadSectionData('projects');
});

// Load data for specific section
function loadSectionData(section) {
  switch(section) {
    case 'projects':
      loadProjects();
      break;
    case 'skills':
      loadSkills();
      break;
    case 'certifications':
      loadCertifications();
      break;
    case 'messages':
      loadMessages();
      break;
    case 'analytics':
      loadAnalytics();
      break;
  }
}

// Utility functions
function showStatus(elementId, message, isError = false) {
  const statusEl = document.getElementById(elementId);
  statusEl.textContent = message;
  statusEl.className = `status-message ${isError ? 'error' : 'success'}`;
  statusEl.style.display = 'block';
  
  setTimeout(() => {
    statusEl.style.display = 'none';
  }, 3000);
}

function clearForm(formId) {
  document.getElementById(formId).reset();
}

// Projects Management
async function loadProjects() {
  try {
    const response = await fetch(`${API_BASE}/projects`);
    const projects = await response.json();
    displayProjects(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    document.getElementById('projectsList').innerHTML = '<p>Error loading projects</p>';
  }
}

function displayProjects(projects) {
  const container = document.getElementById('projectsList');
  
  if (projects.length === 0) {
    container.innerHTML = '<h3>Existing Projects</h3><p>No projects found.</p>';
    return;
  }

  let html = '<h3>Existing Projects</h3><table class="data-table"><thead><tr><th>Title</th><th>Status</th><th>Technologies</th><th>Featured</th><th>Actions</th></tr></thead><tbody>';
  
  projects.forEach(project => {
    html += `
      <tr>
        <td>${project.title}</td>
        <td><span class="status-badge ${project.status}">${project.status}</span></td>
        <td>${project.technologies.join(', ')}</td>
        <td>${project.featured ? '⭐' : ''}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteProject('${project._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
  
  html += '</tbody></table>';
  container.innerHTML = html;
}

async function deleteProject(id) {
  if (!confirm('Are you sure you want to delete this project?')) return;
  
  try {
    const response = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      showStatus('projectStatus', 'Project deleted successfully');
      loadProjects();
    } else {
      showStatus('projectStatus', 'Error deleting project', true);
    }
  } catch (error) {
    showStatus('projectStatus', 'Error deleting project', true);
  }
}

// Project form submission
document.getElementById('projectForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const projectData = {
    title: formData.get('title'),
    description: formData.get('description'),
    technologies: formData.get('technologies').split(',').map(t => t.trim()).filter(t => t),
    githubUrl: formData.get('githubUrl'),
    liveUrl: formData.get('liveUrl'),
    imageUrl: formData.get('imageUrl'),
    status: formData.get('status'),
    featured: formData.has('featured')
  };

  try {
    const response = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    });

    if (response.ok) {
      showStatus('projectStatus', 'Project added successfully');
      this.reset();
      loadProjects();
    } else {
      showStatus('projectStatus', 'Error adding project', true);
    }
  } catch (error) {
    showStatus('projectStatus', 'Error adding project', true);
  }
});

document.getElementById('clearProjectForm').addEventListener('click', () => {
  clearForm('projectForm');
});

// Skills Management
async function loadSkills() {
  try {
    const response = await fetch(`${API_BASE}/skills`);
    const skills = await response.json();
    displaySkills(skills);
  } catch (error) {
    console.error('Error loading skills:', error);
    document.getElementById('skillsList').innerHTML = '<p>Error loading skills</p>';
  }
}

function displaySkills(skills) {
  const container = document.getElementById('skillsList');
  
  if (skills.length === 0) {
    container.innerHTML = '<h3>Existing Skills</h3><p>No skills found.</p>';
    return;
  }

  let html = '<h3>Existing Skills</h3><table class="data-table"><thead><tr><th>Name</th><th>Category</th><th>Proficiency</th><th>Featured</th><th>Actions</th></tr></thead><tbody>';
  
  skills.forEach(skill => {
    html += `
      <tr>
        <td>${skill.name}</td>
        <td>${skill.category}</td>
        <td>${skill.proficiency}%</td>
        <td>${skill.featured ? '⭐' : ''}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteSkill('${skill._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
  
  html += '</tbody></table>';
  container.innerHTML = html;
}

async function deleteSkill(id) {
  if (!confirm('Are you sure you want to delete this skill?')) return;
  
  try {
    const response = await fetch(`${API_BASE}/skills/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      showStatus('skillStatus', 'Skill deleted successfully');
      loadSkills();
    } else {
      showStatus('skillStatus', 'Error deleting skill', true);
    }
  } catch (error) {
    showStatus('skillStatus', 'Error deleting skill', true);
  }
}

// Skill form submission
document.getElementById('skillForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const skillData = {
    name: formData.get('name'),
    category: formData.get('category'),
    proficiency: parseInt(formData.get('proficiency')),
    icon: formData.get('icon'),
    description: formData.get('description'),
    featured: formData.has('featured')
  };

  try {
    const response = await fetch(`${API_BASE}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skillData)
    });

    if (response.ok) {
      showStatus('skillStatus', 'Skill added successfully');
      this.reset();
      loadSkills();
    } else {
      showStatus('skillStatus', 'Error adding skill', true);
    }
  } catch (error) {
    showStatus('skillStatus', 'Error adding skill', true);
  }
});

document.getElementById('clearSkillForm').addEventListener('click', () => {
  clearForm('skillForm');
});

// Certifications Management
async function loadCertifications() {
  try {
    const response = await fetch(`${API_BASE}/certifications`);
    const certifications = await response.json();
    displayCertifications(certifications);
  } catch (error) {
    console.error('Error loading certifications:', error);
    document.getElementById('certificationsList').innerHTML = '<p>Error loading certifications</p>';
  }
}

function displayCertifications(certifications) {
  const container = document.getElementById('certificationsList');
  
  if (certifications.length === 0) {
    container.innerHTML = '<h3>Existing Certifications</h3><p>No certifications found.</p>';
    return;
  }

  let html = '<h3>Existing Certifications</h3><table class="data-table"><thead><tr><th>Title</th><th>Issuer</th><th>Issue Date</th><th>Featured</th><th>Actions</th></tr></thead><tbody>';
  
  certifications.forEach(cert => {
    const issueDate = new Date(cert.issueDate).toLocaleDateString();
    html += `
      <tr>
        <td>${cert.title}</td>
        <td>${cert.issuer}</td>
        <td>${issueDate}</td>
        <td>${cert.featured ? '⭐' : ''}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteCertification('${cert._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
  
  html += '</tbody></table>';
  container.innerHTML = html;
}

async function deleteCertification(id) {
  if (!confirm('Are you sure you want to delete this certification?')) return;
  
  try {
    const response = await fetch(`${API_BASE}/certifications/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      showStatus('certStatus', 'Certification deleted successfully');
      loadCertifications();
    } else {
      showStatus('certStatus', 'Error deleting certification', true);
    }
  } catch (error) {
    showStatus('certStatus', 'Error deleting certification', true);
  }
}

// Certification form submission
document.getElementById('certificationForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const certData = {
    title: formData.get('title'),
    issuer: formData.get('issuer'),
    issueDate: formData.get('issueDate'),
    expiryDate: formData.get('expiryDate') || null,
    credentialUrl: formData.get('credentialUrl'),
    description: formData.get('description'),
    skills: formData.get('skills').split(',').map(s => s.trim()).filter(s => s),
    featured: formData.has('featured')
  };

  try {
    const response = await fetch(`${API_BASE}/certifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(certData)
    });

    if (response.ok) {
      showStatus('certStatus', 'Certification added successfully');
      this.reset();
      loadCertifications();
    } else {
      showStatus('certStatus', 'Error adding certification', true);
    }
  } catch (error) {
    showStatus('certStatus', 'Error adding certification', true);
  }
});

document.getElementById('clearCertForm').addEventListener('click', () => {
  clearForm('certificationForm');
});

// Messages Management
async function loadMessages() {
  try {
    const response = await fetch(`${API_BASE}/messages`);
    const messages = await response.json();
    displayMessages(messages);
  } catch (error) {
    console.error('Error loading messages:', error);
    document.getElementById('messagesList').innerHTML = '<p>Error loading messages</p>';
  }
}

function displayMessages(messages) {
  const container = document.getElementById('messagesList');
  
  if (messages.length === 0) {
    container.innerHTML = '<p>No messages found.</p>';
    return;
  }

  let html = '<table class="data-table"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th>Date</th></tr></thead><tbody>';
  
  messages.forEach(message => {
    const date = new Date(message.createdAt).toLocaleDateString();
    html += `
      <tr>
        <td>${message.name}</td>
        <td>${message.email}</td>
        <td>${message.phone || 'N/A'}</td>
        <td>${message.message.substring(0, 100)}${message.message.length > 100 ? '...' : ''}</td>
        <td>${date}</td>
      </tr>
    `;
  });
  
  html += '</tbody></table>';
  container.innerHTML = html;
}

// Analytics
async function loadAnalytics() {
  try {
    const response = await fetch(`${API_BASE}/analytics/visitors`);
    const analytics = await response.json();
    displayAnalytics(analytics);
  } catch (error) {
    console.error('Error loading analytics:', error);
    document.getElementById('analyticsData').innerHTML = '<p>Error loading analytics</p>';
  }
}

function displayAnalytics(analytics) {
  const container = document.getElementById('analyticsData');
  
  const html = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
        <h3>Total Visitors</h3>
        <p style="font-size: 2em; font-weight: bold; color: #007bff;">${analytics.total}</p>
      </div>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
        <h3>Today's Visitors</h3>
        <p style="font-size: 2em; font-weight: bold; color: #28a745;">${analytics.today}</p>
      </div>
    </div>
  `;
  
  container.innerHTML = html;
}
