import express from 'express';
import Task from '../models/Task.js'; // Make sure this model exists

const router = express.Router();

// GET tasks by projectId
router.get('/', async (req, res) => {
  const { projectId } = req.query;
  try {
    const tasks = await Task.find({ projectId });
    res.json(tasks);
  } catch (err) {
    console.error('GET /tasks error:', err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// POST create a new task
router.post('/', async (req, res) => {
  const { title, status = 'todo', projectId, assignedTo } = req.body;
  try {
    const newTask = new Task({ title, status, projectId, assignedTo });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('POST /tasks error:', err);
    res.status(500).json({ message: 'Error creating task' });
  }
});

// PUT update task (status or assignee)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, assignedTo, title } = req.body;
  try {
    const updated = await Task.findByIdAndUpdate(
      id,
      { status, assignedTo, title },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error('PUT /tasks/:id error:', err);
    res.status(500).json({ message: 'Error updating task' });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error('DELETE /tasks/:id error:', err);
    res.status(500).json({ message: 'Error deleting task' });
  }
});

export default router;
