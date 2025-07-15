const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  department: DataTypes.STRING,
  batch: DataTypes.STRING,
  section: DataTypes.STRING,
  bio: DataTypes.TEXT,
  profilePic: DataTypes.STRING,
  universityId: DataTypes.STRING,
  universityEmail: DataTypes.STRING
});

module.exports = User;