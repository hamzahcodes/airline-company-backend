const express = require('express');
const router = express.Router();
const { AirplaneController } = require('../../controllers')

// api/v1/airplanes
router.post('/', AirplaneController.createAirplane);


module.exports = router;