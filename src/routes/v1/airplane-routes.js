const express = require('express');
const router = express.Router();
const { AirplaneController } = require('../../controllers')
const { AirplaneMiddlewares } = require('../../middlewares')


// api/v1/airplanes/
router.get('/', AirplaneController.getAirplanes)
router.post('/', 
    AirplaneMiddlewares.createRequestMiddleware,
    AirplaneController.createAirplane);
    
// api/v1/airplanes/:id
router.get('/:id', AirplaneController.getAirplane)
router.delete('/:id', AirplaneController.deleteAirplane)
router.patch('/:id', AirplaneController.updateAirplane)

module.exports = router;