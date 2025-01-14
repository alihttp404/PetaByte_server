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

const getUserByEmail = async (req, res) => {
  const { email } = req.query; // Email passed as a query parameter
  try {
    const result = await userModel.getUserByEmail(email); // Use model to fetch user
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createUser = async (req, res) => {
  const { full_name, email, password, age } = req.body;
  console.log("Controller received data:", { full_name, email, password, age });
  try {
    const newUser = await userModel.createUser(full_name, email, password, age);
    res.status(201).json(newUser);
    console.log("Salam createUser controller after model")
  } catch (err) {
    console.log("Salam createUser controller in catch")
    res.status(500).send(err.message);
  }
};

const createUsers = async (req, res) => {
  const users = req.body;
  console.log("Salam createUsers controller before model")
  try {
    const newUsers = await userModel.createUsers(users);
    res.status(201).json(newUsers);
    console.log("Salam createUsers controller after model")
  } catch (err) {
    console.log("Salam createUsers controller in catch")
    res.status(500).send(err.message);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, email, password, scanned_bowls } = req.body;

  console.log('Request params:', req.params);
  console.log('Request body:', req.body);

  try {
    // Fetch the current user details for fallback
    const currentUser = await userModel.getUserById(id);

    if (!currentUser) {
      return res.status(404).send('User not found');
    }

    const updatedUser = await userModel.updateUser(
      id,
      full_name || currentUser.full_name, // Fallback to current name
      email || currentUser.email, // Fallback to current email
      password || currentUser.password, // Fallback to current password
      scanned_bowls || currentUser.scanned_bowls // Fallback to current scanned bowls
    );

    console.log('Updated user:', updatedUser);

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error in updateUser:', err);
    res.status(500).send('Failed to update user');
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
  getUserByEmail,
  createUser,
  createUsers,
  updateUser,
  deleteUser, // Export leaderboard function
};
