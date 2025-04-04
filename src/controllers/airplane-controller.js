const { AirplaneService } = require('../services');
const { StatusCodes } = require('http-status-codes');

async function createAirplane(req, res) {
    console.log(req.body.modelNumber);
    console.log(req.body.capacity);

    try {
        const response = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        })

        return res
                .status(StatusCodes.CREATED)
                .json({
                    success: true,
                    message: 'Airplane created successfully',
                    data: response,
                    error: {}
                })
    } catch (error) {
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({
                    success: false,
                    message: 'Error occured while creating airplane',
                    data: {},
                    error: error
                })
    }
}

module.exports = {
    createAirplane
}