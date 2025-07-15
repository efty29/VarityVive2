const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Post = sequelize.define('Post', {
  content: DataTypes.TEXT,
  media: DataTypes.STRING,
  mediaType: DataTypes.STRING,
  timestamp: DataTypes.DATE
});

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = Post;