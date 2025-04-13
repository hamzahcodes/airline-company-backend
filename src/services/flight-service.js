const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const { FlightRepository } = require('../repositories');
const { compareTime } = require('../utils/helpers/datetime-helper');
const { Op } = require('sequelize');
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

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    if(query.trips) {
        const [ departureAirportId, arrivalAirportId ] = query.trips.split('-')

        try {
            if(departureAirportId === arrivalAirportId) {
                const error = new Error('Departure Airport and Arrival Airport cannot be same')
                error.name = "travelPlaceError";
                throw error;
            }    
        } catch (error) {
            if(error.name === 'travelPlaceError') {
                throw new AppError(error.message, StatusCodes.BAD_REQUEST)
            }
        }
        
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }

    if(query.price) {
        [minPrice, maxPrice] = query.price.split('-');
        customFilter.price = {
            [Op.between]: [minPrice, maxPrice]
        }
    }

    if(query.travellers) {
        customFilter.totalSeats = {
            [Op.gte] : query.travellers
        }
    }

    if(query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + " 23:59:00"]
        }
    }

    if(query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map(param => param.split('_'))
        sortFilter = sortFilters;
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch details of Flight', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createFlight,
    getAllFlights
}