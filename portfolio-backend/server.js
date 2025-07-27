const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

// Import models
const Contact = require('./models/Contact');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Certification = require('./models/Certification');
const Visitor = require('./models/Visitor');

// Import routes
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const certificationRoutes = require('./routes/certificationRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://127.0.0.1:5000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the parent directory
app.use(express.static(path.join(__dirname, '..')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/certifications', certificationRoutes);

// POST route for contact form
app.post('/api/contact', async (req, res) => {
  console.log('Contact form submission received:', req.body);
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    console.log('Contact saved successfully');
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// GET all messages
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Visitor tracking
app.post('/api/visitors', async (req, res) => {
  try {
    const visitorData = {
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      page: req.body.page,
      referrer: req.get('Referrer')
    };

    const visitor = new Visitor(visitorData);
    await visitor.save();
    res.status(201).json({ message: 'Visitor tracked' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to track visitor' });
  }
});

// Analytics - Get visitor count
app.get('/api/analytics/visitors', async (req, res) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    const todayVisitors = await Visitor.countDocuments({
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    });

    res.json({
      total: totalVisitors,
      today: todayVisitors
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Portfolio: http://localhost:${PORT}/index.html`);
  console.log(`Admin: http://localhost:${PORT}/admin.html`);
});
