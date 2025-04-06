const express = require('express');
const router = express.Router();
const { AirplaneController } = require('../../controllers')
const { AirplaneMiddlewares } = require('../../middlewares')

// api/v1/airplanes
router.post('/', 
    AirplaneMiddlewares.createRequestMiddleware,
    AirplaneController.createAirplane);


module.exports = router;