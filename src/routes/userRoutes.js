const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.use(authenticate);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.post('/batch', userController.createUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
