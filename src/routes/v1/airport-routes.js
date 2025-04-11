const express = require('express');
const router = express.Router();
const { AirportController } = require('../../controllers')
const { AirportMiddlewares } = require('../../middlewares')


// api/v1/airports/
router.get('/', AirportController.getAirports)
router.post('/', 
    AirportMiddlewares.createRequestMiddleware,
    AirportController.createAirport);
    
// api/v1/airports/:id
router.get('/:id', AirportController.getAirport)
router.delete('/:id', AirportController.deleteAirport)
router.patch('/:id', AirportController.updateAirport)

module.exports = router;