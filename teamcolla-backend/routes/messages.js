import express from 'express';
import Message from '../models/Message.js';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { content, senderId, senderName, teamId } = req.body;
    const message = await Message.create({ content, senderId, senderName, teamId });
    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { teamId } = req.query;
    if (!teamId) return res.status(400).json({ error: 'teamId is required' });
    const messages = await Message.find({ teamId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default router;
