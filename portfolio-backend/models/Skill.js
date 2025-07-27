const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['programming', 'web-development', 'database', 'tools', 'soft-skills', 'other']
  },
  proficiency: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  icon: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  yearsOfExperience: {
    type: Number,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Skill', skillSchema);
