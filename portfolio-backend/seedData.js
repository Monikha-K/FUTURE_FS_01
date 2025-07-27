const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Certification = require('./models/Certification');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected for seeding');
    seedData();
  }).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

async function seedData() {
  try {
    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Certification.deleteMany({});
    
    console.log('Cleared existing data');

    // Seed Projects
    const projects = [
      {
        title: "Personal Finance Tracker",
        description: "A comprehensive Python-based application for tracking salary, budget, and expenses with interactive bar charts and smart alerts to help users manage their finances effectively.",
        technologies: ["Python", "Matplotlib", "Pandas", "Tkinter"],
        imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
        status: "completed",
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-02-28')
      },
      {
        title: "Travel Blog – Madurai City",
        description: "An engaging blog-style website that beautifully showcases the rich attractions, cultural heritage, and hidden gems of Madurai city with responsive design and interactive features.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
        imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
        status: "completed",
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-03-20')
      },
      {
        title: "Library Management System",
        description: "A robust command-line based library management system built in C, featuring book cataloging, member management, and efficient search and borrowing functionalities.",
        technologies: ["C Programming", "File Handling", "Data Structures"],
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: false,
        status: "completed",
        startDate: new Date('2023-11-01'),
        endDate: new Date('2023-12-15')
      },
      {
        title: "Portfolio Website",
        description: "A modern, responsive portfolio website with MongoDB integration, dynamic content management, and visitor analytics. Features include contact forms, project showcases, and admin panel.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express", "MongoDB"],
        imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
        status: "in-progress",
        startDate: new Date('2025-01-01')
      }
    ];

    await Project.insertMany(projects);
    console.log('Projects seeded successfully');

    // Seed Skills
    const skills = [
      {
        name: "C",
        category: "programming",
        proficiency: 85,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        description: "Strong foundation in C programming with experience in system programming and data structures",
        yearsOfExperience: 2,
        featured: true
      },
      {
        name: "C++",
        category: "programming",
        proficiency: 80,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        description: "Object-oriented programming and advanced C++ features",
        yearsOfExperience: 1.5,
        featured: true
      },
      {
        name: "Python",
        category: "programming",
        proficiency: 75,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        description: "Data analysis, automation, and application development",
        yearsOfExperience: 1,
        featured: true
      },
      {
        name: "JavaScript",
        category: "programming",
        proficiency: 70,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        description: "Modern JavaScript ES6+, DOM manipulation, and async programming",
        yearsOfExperience: 1,
        featured: true
      },
      {
        name: "HTML5",
        category: "web-development",
        proficiency: 90,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        description: "Semantic HTML, accessibility, and modern web standards",
        yearsOfExperience: 2,
        featured: true
      },
      {
        name: "CSS3",
        category: "web-development",
        proficiency: 85,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        description: "Responsive design, Flexbox, Grid, and CSS animations",
        yearsOfExperience: 2,
        featured: true
      },
      {
        name: "Node.js",
        category: "web-development",
        proficiency: 65,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        description: "Server-side JavaScript, Express.js, and API development",
        yearsOfExperience: 0.5,
        featured: false
      },
      {
        name: "MongoDB",
        category: "database",
        proficiency: 60,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        description: "NoSQL database design, queries, and aggregation",
        yearsOfExperience: 0.5,
        featured: false
      },
      {
        name: "Git",
        category: "tools",
        proficiency: 80,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        description: "Version control, branching, merging, and collaboration",
        yearsOfExperience: 1.5,
        featured: true
      },
      {
        name: "VS Code",
        category: "tools",
        proficiency: 95,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        description: "Advanced IDE usage, extensions, and productivity tools",
        yearsOfExperience: 2,
        featured: false
      }
    ];

    await Skill.insertMany(skills);
    console.log('Skills seeded successfully');

    // Seed Certifications
    const certifications = [
      {
        title: "Mastering Data Structures and Algorithms in C",
        issuer: "Udemy",
        issueDate: new Date('2024-02-15'),
        credentialUrl: "https://www.udemy.com/certificate/UC-47d9b051-06cf-4f98-91eb-c0a24163b4f0/",
        description: "Comprehensive course covering advanced data structures and algorithms implementation in C programming language.",
        skills: ["Data Structures", "Algorithms", "C Programming"],
        imageUrl: "https://logoeps.com/wp-content/uploads/2013/03/udemy-vector-logo.png",
        featured: true
      },
      {
        title: "Introduction to C",
        issuer: "SoloLearn",
        issueDate: new Date('2024-01-10'),
        credentialUrl: "https://www.sololearn.com/certificates/CC-D6PSDHLE",
        description: "Foundational course covering C programming fundamentals, syntax, and basic programming concepts.",
        skills: ["C Programming", "Programming Fundamentals"],
        imageUrl: "https://cdn.worldvectorlogo.com/logos/sololearn.svg",
        featured: true
      },
      {
        title: "Introduction to C++",
        issuer: "SoloLearn",
        issueDate: new Date('2024-01-25'),
        credentialUrl: "https://www.sololearn.com/certificates/CC-NWYPKBEF",
        description: "Comprehensive introduction to C++ programming, object-oriented programming concepts, and advanced features.",
        skills: ["C++", "OOP", "Programming"],
        imageUrl: "https://cdn.worldvectorlogo.com/logos/sololearn.svg",
        featured: true
      },
      {
        title: "Data Visualization with Power BI",
        issuer: "Great Learning",
        issueDate: new Date('2024-03-10'),
        credentialUrl: "https://olympus.mygreatlearning.com/courses/30824/certificate?pb_id=581",
        description: "Advanced course on creating interactive dashboards and data visualizations using Microsoft Power BI.",
        skills: ["Power BI", "Data Visualization", "Analytics"],
        imageUrl: "https://cdn.worldvectorlogo.com/logos/great-learning.svg",
        featured: false
      },
      {
        title: "C Programming Training",
        issuer: "IIT Bombay (Spoken Tutorial)",
        issueDate: new Date('2024-01-05'),
        credentialUrl: "https://drive.google.com/file/d/1fSdSDZh0puksl_Be5XmqxxhRj0s6Km3s/view?usp=drivesdk",
        description: "Comprehensive C programming training program conducted by IIT Bombay through Spoken Tutorial project.",
        skills: ["C Programming", "System Programming"],
        imageUrl: "https://cdn.worldvectorlogo.com/logos/c-1.svg",
        featured: false
      },
      {
        title: "C++ Programming Training",
        issuer: "IIT Bombay (Spoken Tutorial)",
        issueDate: new Date('2024-01-20'),
        credentialUrl: "https://drive.google.com/file/d/1Bq28X66bjBjJljBSFDUlmHAunxeSsnPS/view?usp=drivesdk",
        description: "Advanced C++ programming training covering object-oriented programming and advanced C++ features.",
        skills: ["C++", "Object-Oriented Programming", "Advanced Programming"],
        imageUrl: "https://cdn.worldvectorlogo.com/logos/c.svg",
        featured: false
      }
    ];

    await Certification.insertMany(certifications);
    console.log('Certifications seeded successfully');

    console.log('All data seeded successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}
