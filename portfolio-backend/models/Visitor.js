const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String
  },
  page: {
    type: String,
    required: true
  },
  referrer: {
    type: String
  },
  country: {
    type: String
  },
  city: {
    type: String
  }
}, { 
  timestamps: true 
});

// Create compound index for unique visitor tracking
visitorSchema.index({ ipAddress: 1, page: 1 }, { unique: false });

module.exports = mongoose.model('Visitor', visitorSchema);
