
const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/sliderController');

router.get('/', sliderController.getSliders);

module.exports = router;
