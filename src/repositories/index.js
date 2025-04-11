const AirplaneRepository = require("./airplane-repository");

module.exports = {
    AirplaneRepository,
    CityRepository: require('./city-repository'),
    AirportRepository: require('./airport-repository')
}