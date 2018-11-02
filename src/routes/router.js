const express = require('express')

module.exports = (server) => {

    // API Routes
    const router = express.Router()
    server.use('/api', router)

    // Scores Routes
    require('./api/score')(router)
    
    // Scoreboards Route
    require('./api/scoreboard')(router)

    // Gist Route
    require('./api/gist')(router)
    
}