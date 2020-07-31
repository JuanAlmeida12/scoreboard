const express = require('express')
const database = require('../database/database')

module.exports = (server) => {
  // API Routes
  const router = express.Router()
  server.use('/api', router)

  // Scores Routes
  require('./api/score')(router, database)

  // Scoreboards Route
  require('./api/scoreboard')(router, database)

  // Gist Route
  require('./api/gist')(router)
}
