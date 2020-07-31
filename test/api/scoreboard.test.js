const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../src/app')
const database = require('../../src/database/database')

chai.use(chaiHttp)

const BASE_URL = '/api/scoreboards'
const requester = chai.request(app).keepOpen()

const { expect } = chai

describe(BASE_URL, () => {
  before(() => {
    database.addSubmission([1, 2, 10, 'I'], 12)
    database.addSubmission([3, 1, 11, 'C'], 12)
    database.addSubmission([1, 2, 19, 'R'], 12)
    database.addSubmission([1, 2, 21, 'C'], 12)
    database.addSubmission([1, 1, 25, 'C'], 12)
  })

  it(`GET ${BASE_URL} expect Response Code 200`, () => requester.get(BASE_URL).then((response) => {
    expect(response).to.have.status(200)
    expect(response.body).to.be.a('object')
  }))
})
