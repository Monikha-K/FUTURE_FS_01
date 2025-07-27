# Portfolio Website - Monikha K

A modern, responsive portfolio website with MongoDB integration, dynamic content management, and visitor analytics.

## Features

### Frontend
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Dynamic Content**: Projects, skills, and certifications loaded from MongoDB
- **Interactive UI**: Smooth animations and hover effects
- **Contact Form**: Functional contact form with backend integration
- **Visitor Counter**: Real-time visitor tracking and analytics

### Backend
- **Node.js & Express**: RESTful API server
- **MongoDB Integration**: Database storage for all portfolio data
- **CRUD Operations**: Full create, read, update, delete functionality
- **Admin Panel**: Web-based interface for content management
- **Visitor Analytics**: Track page visits and user engagement

### Pages
1. **Home** (`index.html`) - Landing page with hero section and stats
2. **About** (`about.html`) - Personal information and background
3. **Skills** (`skills.html`) - Technical skills with proficiency levels
4. **Projects** (`projects.html`) - Portfolio projects with filtering
5. **Certifications** (`certifications.html`) - Professional certifications
6. **Resume** (`resume.html`) - Resume preview and download
7. **Contact** (`contact.html`) - Contact form and social links
8. **Admin** (`admin.html`) - Content management interface

## Technology Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive design with CSS Grid and Flexbox
- Modern web standards and accessibility

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- RESTful API architecture

### Database Schema
- **Projects**: Title, description, technologies, URLs, status
- **Skills**: Name, category, proficiency, experience
- **Certifications**: Title, issuer, dates, credentials
- **Contacts**: Name, email, phone, message
- **Visitors**: IP, user agent, page, timestamp

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Steps
1. **Clone/Download the project**
   ```bash
   cd portfolio
   ```

2. **Install backend dependencies**
   ```bash
   cd portfolio-backend
   npm install
   ```

3. **Configure environment**
   - Create `.env` file in `portfolio-backend` directory
   - Add: `MONGO_URI=mongodb://localhost:27017/portfolio`

4. **Seed the database**
   ```bash
   node seedData.js
   ```

5. **Start the server**
   ```bash
   node server.js
   ```

6. **Access the website**
   - Portfolio: http://localhost:5000/index.html
   - Admin Panel: http://localhost:5000/admin.html

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/category/:category` - Get skills by category
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Certifications
- `GET /api/certifications` - Get all certifications
- `POST /api/certifications` - Create new certification
- `PUT /api/certifications/:id` - Update certification
- `DELETE /api/certifications/:id` - Delete certification

### Contact & Analytics
- `POST /api/contact` - Submit contact form
- `GET /api/messages` - Get all messages
- `POST /api/visitors` - Track visitor
- `GET /api/analytics/visitors` - Get visitor statistics

## Admin Panel Features

- **Project Management**: Add, edit, delete projects
- **Skills Management**: Manage technical skills and proficiency
- **Certification Management**: Handle professional certifications
- **Message Inbox**: View contact form submissions
- **Analytics Dashboard**: Monitor website traffic

## File Structure

```
portfolio/
├── index.html              # Home page
├── about.html              # About page
├── skills.html             # Skills page
├── projects.html           # Projects page
├── certifications.html     # Certifications page
├── resume.html             # Resume page
├── contact.html            # Contact page
├── admin.html              # Admin panel
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── main.js            # Frontend JavaScript
│   └── admin.js           # Admin panel JavaScript
├── images/
│   └── profile.jpg        # Profile image
├── portfolio-backend/
│   ├── server.js          # Express server
│   ├── seedData.js        # Database seeding
│   ├── package.json       # Dependencies
│   ├── .env               # Environment variables
│   ├── models/            # MongoDB models
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   ├── Certification.js
│   │   ├── Contact.js
│   │   └── Visitor.js
│   └── routes/            # API routes
│       ├── projectRoutes.js
│       ├── skillRoutes.js
│       └── certificationRoutes.js
└── README.md              # This file
```

## Development

### Adding New Features
1. Create new MongoDB models in `models/` directory
2. Add corresponding routes in `routes/` directory
3. Update `server.js` to include new routes
4. Create frontend interfaces in HTML/CSS/JS

### Database Management
- Use the admin panel for content management
- Run `node seedData.js` to reset with sample data
- MongoDB data persists between server restarts

## Deployment

### Local Development
- Server runs on http://localhost:5000
- MongoDB connection: mongodb://localhost:27017/portfolio

### Production Considerations
- Set up MongoDB Atlas for cloud database
- Configure environment variables for production
- Use process manager like PM2 for server deployment
- Set up reverse proxy with Nginx
- Enable HTTPS with SSL certificates

## Contact

**Monikha K**
- Email: monikha.k2024cse@sece.ac.in
- Phone: +91 9994175002
- LinkedIn: [monikha-k-764b9b32b](https://linkedin.com/in/monikha-k-764b9b32b)
- GitHub: [Monikha-K](https://github.com/Monikha-K)

---

© 2025 Monikha K. All Rights Reserved.
