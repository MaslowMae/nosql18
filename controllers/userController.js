const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of students overall

module.exports = {
  // Controller function to fetch all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      if(!user) {
        return res.status(404).json({ message: 'no Users found'});
      }
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get users', error: error.message });
    }
  },

  // Controller function to fetch a single user by _id with populated thought and friend data
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get user', error: error.message });
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'no user with that id' })
      }

      res.json({
        user,
      });
    }
    catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Controller function to create a new user
  createUser: async (req, res) => {
    try {
      const { username, email } = req.body;
      const user = await User.create({ username, email });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
  },
  
  // delete a user
  async deleteUser(req, res) {
    try {
      const user = await Student.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};