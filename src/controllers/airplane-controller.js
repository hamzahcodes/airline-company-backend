const { AirplaneService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common')

async function createAirplane(req, res) {
    console.log(req.body.modelNumber);
    console.log(req.body.capacity);

    try {
        const response = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        })

        SuccessResponse.data = response;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)

    } catch (error) {
        // console.log('Error in Controller', error)
        ErrorResponse.error = error
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        console.log('in controller', airplanes)
        SuccessResponse.data = airplanes;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
                
    } catch (error) {
        ErrorResponse.error = error
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

async function getAirplane(req, res) {
    const airplaneId = req.params.id;
    console.log(airplaneId)

    try {
        const airplane = await AirplaneService.getAirplane(airplaneId);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        // console.log(error)
        ErrorResponse.error = error 
        return res.status(error.statusCode)
                    .json(ErrorResponse)
    }
}

async function deleteAirplane(req, res) {
    try {
        const response = await AirplaneService.deleteAirplane(req.params.id);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports = {
    createAirplane, 
    getAirplanes,
    getAirplane,
    deleteAirplane
}