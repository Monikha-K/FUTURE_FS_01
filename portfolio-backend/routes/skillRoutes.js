const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// GET all skills
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const skills = await Skill.find(filter).sort({ proficiency: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// GET skills by category
router.get('/category/:category', async (req, res) => {
  try {
    const skills = await Skill.find({ category: req.params.category }).sort({ proficiency: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills by category' });
  }
});

// GET featured skills
router.get('/featured', async (req, res) => {
  try {
    const skills = await Skill.find({ featured: true }).sort({ proficiency: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured skills' });
  }
});

// POST new skill
router.post('/', async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create skill' });
  }
});

// PUT update skill
router.put('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update skill' });
  }
});

// DELETE skill
router.delete('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

module.exports = router;
