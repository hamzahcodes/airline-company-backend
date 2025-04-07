const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository } = require('../repositories')
const airplaneRepository = new AirplaneRepository();
const AppError = require('../utils/errors/app-error')

async function createAirplane(data) {
    console.log('In airplane service', data)
    try {
        const response = await airplaneRepository.create(data);
        return response;
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
        throw new AppError('Cannot create a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError('Cannot fetch data of all airplanes', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        console.log(airplane)
        return airplane;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('Plane with requested id does not exist', error.statusCode)
        }
        // console.log(error)
        throw new AppError('Cannot fetch data of requested airplane', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function deleteAirplane(id) {
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('Airplane to be deleted does not exist', error.statusCode)
        }
        throw new AppError('Cannot delete data of requested airplane', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane
}