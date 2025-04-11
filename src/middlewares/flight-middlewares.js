const { StatusCodes } = require('http-status-codes')
const { ErrorResponse } = require('../utils/common') 
const AppError = require('../utils/errors/app-error')

function createRequestMiddleware(req, res, next) {

    const requiredKeys = ['flightNumber', 'airplaneId', 'departureAirportId', 'arrivalAirportId', 'departureTime', 'arrivalTime', 'price', 'totalSeats']
    const missingKeys = requiredKeys.filter(key => !(key in req.body));

    if (missingKeys.length > 0) {
        ErrorResponse.message = 'Something went wrong while creating Flight'
        ErrorResponse.error = new AppError([`Missing required fields: ${missingKeys.join(', ')}`], StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    
    next()
}

module.exports = {
    createRequestMiddleware
}