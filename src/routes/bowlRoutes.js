const express = require('express');
const bowlController = require('../controllers/bowlController');
const authenticate = require('../../middleware/auth');

const router = express.Router();

// Public routes (no authentication required)
router.get('/', bowlController.getBowls);
router.get('/export', bowlController.exportBowls);
router.get('/:id', bowlController.getBowlById);
router.put('/:id', bowlController.updateBowl);

// Protected routes (authentication required)
router.post('/', authenticate, bowlController.createBowl);
router.delete('/:id', authenticate, bowlController.deleteBowl);

module.exports = router;