const express = require('express');
const bowlController = require('../controllers/bowlController');

const router = express.Router();

router.get('/', bowlController.getBowls);
router.get('/:id', bowlController.getBowlById);
router.post('/', bowlController.createBowl);
router.put('/:id', bowlController.updateBowl);
router.delete('/:id', bowlController.deleteBowl);

module.exports = router;
