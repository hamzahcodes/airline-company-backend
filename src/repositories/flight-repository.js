const CrudRepository = require('./crud-repository');
const { Flight } = require('../models');
const { where } = require('sequelize');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight)
    }

    async getAllFlights(filter, sortFilter) {
        const response = await Flight.findAll({
            where: filter,
            order: sortFilter
        })
        return response;
    }
}

module.exports = FlightRepository;