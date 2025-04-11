const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const { FlightRepository } = require('../repositories');
const { compareTime } = require('../utils/helpers/datetime-helper');
const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        if(compareTime(data.departureTime, data.arrivalTime)) {
            const error = new Error('Departure Time cannot be greater than Arrival Time')
            error.name = 'Time Error'
            throw error;
        }

        const newFlight = await flightRepository.create(data);
        return newFlight;

    } catch (error) {
        console.log(error)
        if(error.name === 'SequelizeValidationError') {
            let explanation = []
            error.errors.forEach((error) => {
                explanation.push(error.message)
            });
            console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        } else if(error.name === 'Time Error') {
            throw new AppError(error.message, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createFlight
}