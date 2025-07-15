// routes/profile.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

const router = express.Router();

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Update profile picture
router.post('/upload/:id', upload.single('profilePic'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.profilePic = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({ message: 'Profile updated', profilePic: user.profilePic });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload profile picture' });
  }
});

module.exports = router;
