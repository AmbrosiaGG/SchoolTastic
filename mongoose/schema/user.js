const mongoose = require('mongoose');
const user = new mongoose.Schema(
      [
        {
          name: String,
          role: String, // Admin/Teacher/Student
          password: String,
          modify: Boolean
        },
      ]
);

const User = mongoose.model('User', user);

module.exports = User