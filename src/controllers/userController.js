const userModel = require('../models/userModel');

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await userModel.getLeaderboard();
    res.json(leaderboard);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getUserByUid = async (req, res) => {
  const { uid } = req.query;
  try {
    const user = await userModel.getUserByUid(uid);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createUser = async (req, res) => {
  const { full_name, uid, age } = req.body;
  try {
    const newUser = await userModel.createUser(full_name, uid, age);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createUsers = async (req, res) => {
  const users = req.body;
  try {
    const newUsers = await userModel.createUsers(users);
    res.status(201).json(newUsers);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, uid, scanned_bowls } = req.body;
  try {
    const updatedUser = await userModel.updateUser(id, full_name, uid, scanned_bowls);
    if (!updatedUser) {
      res.status(404).send('User not found');
    } else {
      res.json(updatedUser);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userModel.deleteUser(id);
    if (!deletedUser) {
      res.status(404).send('User not found');
    } else {
      res.json(deletedUser);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getLeaderboard,
  getUsers,
  getUserById,
  getUserByUid,
  createUser,
  createUsers,
  updateUser,
  deleteUser,
};
