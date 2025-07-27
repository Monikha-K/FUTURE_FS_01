const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');

// GET all certifications
router.get('/', async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ issueDate: -1 });
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certifications' });
  }
});

// GET featured certifications
router.get('/featured', async (req, res) => {
  try {
    const certifications = await Certification.find({ featured: true }).sort({ issueDate: -1 });
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured certifications' });
  }
});

// GET single certification
router.get('/:id', async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) {
      return res.status(404).json({ error: 'Certification not found' });
    }
    res.json(certification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certification' });
  }
});

// POST new certification
router.post('/', async (req, res) => {
  try {
    const certification = new Certification(req.body);
    await certification.save();
    res.status(201).json(certification);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create certification' });
  }
});

// PUT update certification
router.put('/:id', async (req, res) => {
  try {
    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!certification) {
      return res.status(404).json({ error: 'Certification not found' });
    }
    res.json(certification);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update certification' });
  }
});

// DELETE certification
router.delete('/:id', async (req, res) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);
    if (!certification) {
      return res.status(404).json({ error: 'Certification not found' });
    }
    res.json({ message: 'Certification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete certification' });
  }
});

module.exports = router;
