const bowlModel = require('../models/bowlModel');

const getBowls = async (req, res) => {
  try {
    const bowls = await bowlModel.getBowls();
    res.json(bowls);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getBowlById = async (req, res) => {
  const { id } = req.params;
  try {
    const bowl = await bowlModel.getBowlById(id);
    if (!bowl) {
      res.status(404).send('Bowl not found');
    } else {
      res.json(bowl);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createBowl = async (req, res) => {
  const { location } = req.body;
  const { description } = req.body;
  const status = "empty";
  try {
    const newBowl = await bowlModel.createBowl(location, status, description);
    res.status(201).json(newBowl);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateBowl = async (req, res) => {
  const { id } = req.params;
  const { location } = req.body;
  try {
    const updatedBowl = await bowlModel.updateBowl(id, location);
    if (!updatedBowl) {
      res.status(404).send('Bowl not found');
    } else {
      res.json(updatedBowl);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteBowl = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBowl = await bowlModel.deleteBowl(id);
    if (!deletedBowl) {
      res.status(404).send('Bowl not found');
    } else {
      res.json(deletedBowl);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getBowls,
  getBowlById,
  createBowl,
  updateBowl,
  deleteBowl,
};
