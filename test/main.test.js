require('./database/database.test')

describe('API', () => {
  require('./api/scores.test')
  require('./api/scoreboard.test')
  require('./api/gist.test')
})
