// routes/users.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Create or update user (POST /api/users)
router.post('/', async (req, res) => {
  const { uid, email, name, role, teamId } = req.body;
  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, email, name, role, teamId });
      await user.save();
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('User creation error:', err);
    res.status(500).json({ error: 'Failed to create/fetch user' });
  }
});

// GET user by UID
router.get('/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching user' });
  }
});

export default router;
