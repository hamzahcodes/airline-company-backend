const { AirportService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common')

async function createAirport(req, res) {

    try {
        const response = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
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

async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports();
        console.log('in controller', airports)
        SuccessResponse.data = airports;

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

async function getAirport(req, res) {
    const airportId = req.params.id;
    console.log(airportId)

    try {
        const airport = await AirportService.getAirport(airportId);
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        // console.log(error)
        ErrorResponse.error = error 
        return res.status(error.statusCode)
                    .json(ErrorResponse)
    }
}

async function deleteAirport(req, res) {
    try {
        const response = await AirportService.deleteAirport(req.params.id);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function updateAirport(req, res) {
    const airportId = req.params.id;
    const updateBody = req.body;

    try {
        const updatedAirport = await AirportService.updateAirport(updateBody, airportId);
        SuccessResponse.data = updatedAirport;
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports = {
    createAirport, 
    getAirports,
    getAirport,
    deleteAirport,
    updateAirport 
}