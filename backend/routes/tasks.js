const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Task = require('../models/Task');

const router = express.Router();

// Create
router.post('/', auth, [ body('title').notEmpty() ], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const task = new Task({ user: req.user.id, title: req.body.title, description: req.body.description });
    await task.save();
    res.json(task);
  } catch (err) { res.status(500).send('Server error'); }
});

// Read (with search & filter)
router.get('/', auth, async (req, res) => {
  try {
    const { q, completed } = req.query;
    const filter = { user: req.user.id };
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (completed !== undefined) filter.completed = completed === 'true';
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) { res.status(500).send('Server error'); }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not allowed' });

    task = await Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(task);
  } catch (err) { res.status(500).send('Server error'); }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not allowed' });

    await task.remove();
    res.json({ message: 'Task removed' });
  } catch (err) { res.status(500).send('Server error'); }
});

module.exports = router;
