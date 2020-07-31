const server = require('./server')
require('./routes/router')(server)

module.exports = server
