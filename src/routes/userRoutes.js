const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.use(authenticate);

// Static routes first
router.get('/getLeaderboard', userController.getLeaderboard);
router.get('/getUserByEmail', userController.getUserByEmail);

// Parameterized routes later
router.get('/:id', (req, res, next) => {
    if (!/^\d+$/.test(req.params.id)) {
      return res.status(400).send('Invalid ID format');
    }
    next();
  }, userController.getUserById);
  

// Other routes
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.post('/batch', userController.createUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
