const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const { AirportRepository } = require('../repositories')
const airportRepository = new AirportRepository();

async function createAirport(data) {
    console.log('In airplane service', data)
    try {
        const newAirport = await airportRepository.create(data);
        return newAirport;
    } catch (error) {
        // console.log(error)
        if(error.name === 'SequelizeValidationError') {
            let explanation = []
            error.errors.forEach((error) => {
                explanation.push(error.message)
            });
            console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError('Cannot fetch data of all airports', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        // console.log(airport)
        return airport;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('Airport with requested id does not exist', error.statusCode)
        }
        // console.log(error)
        throw new AppError('Cannot fetch data of requested airport', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function deleteAirport(id) {
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('Airport to be deleted does not exist', error.statusCode)
        }
        throw new AppError('Cannot delete data of requested airport', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateAirport(data, id){
    console.log(data, id);
    try {
        const response = await airportRepository.update(id, data);
        return response;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('Airport to be updated does not exist', error.statusCode)
        }
        throw new AppError('Cannot update data of requested airport', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    deleteAirport,
    updateAirport
}