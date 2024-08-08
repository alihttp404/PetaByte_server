const express = require('express');
const bowlController = require('../controllers/bowlController');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.use(authenticate);
router.get('/', bowlController.getBowls);
router.post('/', bowlController.createBowl);
router.get('/export', bowlController.exportBowls); // e.g GET /api/bowls/export?ids=1,2,3
router.get('/:id', bowlController.getBowlById);
router.put('/:id', bowlController.updateBowl);
router.delete('/:id', bowlController.deleteBowl);

module.exports = router;
