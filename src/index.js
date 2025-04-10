const { serverConfig, Logger } = require('./config')
const express = require('express')
const apiRoutes = require('./routes')
const { City, Airport } = require('./models')
const { where } = require('sequelize')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRoutes)

async function db() {
    // const city = await City.findByPk(7)
    // await city.createAirport({ 'name': 'Kempagowda Airport', code: 'KMP' })
    await City.destroy({
        where: {
            id: 7
        }
    })
}

app.listen(serverConfig.PORT, () => {
    console.log(`Server running at port ${serverConfig.PORT}`)
    Logger.info('Successfully started the server')
    db()
})