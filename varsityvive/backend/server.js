const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./db');
const User = require('./models/User');
const Post = require('./models/Post');

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/post'));
app.use('/api/profile', require('./routes/profile')); // NEW

// Sync DB and start server
sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });
});
