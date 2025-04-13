const express = require('express')

const { FlightController } = require('../../controllers')
const { FlightMiddlewares } = require('../../middlewares')

const router = express.Router();

router.post('/', 
    FlightMiddlewares.createRequestMiddleware,
    FlightController.createFlight
)

// /api/v1/flights?trips=MUM-DEL
router.get('/', FlightController.getAllFlights)
module.exports = router