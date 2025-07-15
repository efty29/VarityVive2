const express = require('express');
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');

const router = express.Router();

// Setup Multer for post media
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Create new post
router.post('/create', upload.single('media'), async (req, res) => {
  const { userId, content, mediaType } = req.body;

  try {
    const newPost = await Post.create({
      userId,
      content,
      mediaType,
      media: req.file ? `/uploads/${req.file.filename}` : null,
      timestamp: new Date()
    });

    res.status(201).json({ message: 'Post created', post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Get all posts with user info
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ include: 'User', order: [['timestamp', 'DESC']] });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

module.exports = router;
