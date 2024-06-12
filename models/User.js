const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought').schema; // Importing the schema from Thought

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    github: {
      type: String,
      required: true,
      maxlength: 50,
    },
    thoughts: [thoughtSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('User', userSchema);

module.exports = User;