const userModel = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    console.log("Salam controller before request to model");
    const users = await userModel.getUsers();
    res.json(users);
    console.log("Salam controller after request to model");
  } catch (err) {
    console.log("Salam in catch");
    res.status(500).send(err.message);
    console.log(err.message);
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

const createUser = async (req, res) => {
  const { fullName, email, password, scannedBowls } = req.body;
  try {
    const newUser = await userModel.createUser(fullName, email, password, scannedBowls);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, password, scannedBowls } = req.body;
  try {
    const updatedUser = await userModel.updateUser(id, fullName, email, password, scannedBowls);
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
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
