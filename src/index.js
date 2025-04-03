const { serverConfig, Logger } = require('./config')
const express = require('express')
const apiRoutes = require('./routes')

const app = express()

app.use('/api', apiRoutes)

app.listen(serverConfig.PORT, () => {
    console.log(`Server running at port ${serverConfig.PORT}`)
    Logger.info('Successfully started the server')
})