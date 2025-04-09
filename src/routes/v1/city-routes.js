const express = require('express');
const router = express.Router();
const { CityController } = require('../../controllers')
const { CityMiddlewares } = require('../../middlewares')


// api/v1/cities/
router.post('/', 
    CityMiddlewares.createRequestMiddleware,
    CityController.createCity);
    
// api/v1/cities/:id
router.delete('/:id', CityController.deleteCity)
router.patch('/:id', CityController.updateCity)


module.exports = router;