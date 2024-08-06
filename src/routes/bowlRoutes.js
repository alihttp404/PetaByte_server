const express = require('express');
const bowlController = require('../controllers/bowlController');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.use(authenticate);
router.get('/', bowlController.getBowls);
router.get('/:id', bowlController.getBowlById);
router.post('/', bowlController.createBowl);
router.put('/:id', bowlController.updateBowl);
router.delete('/:id', bowlController.deleteBowl);

module.exports = router;
