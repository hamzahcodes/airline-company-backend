const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const newCity = await cityRepository.create(data);
        return newCity;
    } catch (error) {
        // console.log(error)
        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
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

async function deleteCity(id) {
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch (error) {
        // console.log(error);
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('City cannot be deleted as it does not exist', error.statusCode)
        }
        throw new AppError('Cannot delete the city', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateCity(data, id) {
    try {
        const response = await cityRepository.update(id, data);
        return response;
    } catch (error) {
        console.log(error)
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('City cannot be updated as it does not exist', error.statusCode)
        }
        throw new AppError('Cannot update the city name', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createCity,
    deleteCity,
    updateCity
}