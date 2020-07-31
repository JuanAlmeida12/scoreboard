const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../src/app')
const database = require('../../src/database/database')

chai.use(chaiHttp)

const BASE_URL = '/api/scores'
const requester = chai.request(app).keepOpen()

const { expect } = chai

describe(BASE_URL, () => {
  const context = {
    id: undefined,
    data: undefined,
    case: 1,
  }

  before((done) => {
    database.addSubmission([1, 2, 10, 'I'], 1)
      .then((result) => {
        context.id = result.id
        context.data = result.submission
        done()
      })
  })

  it(`GET ${BASE_URL} expect Response Code 200`, () => requester.get(BASE_URL).then((response) => {
    expect(response).to.have.status(200)
    expect(response.body).to.be.a('object')
  }))

  it(`POST ${BASE_URL} expect Response Code 201`, () => requester.post(BASE_URL)
    .send({ mcase: 1, data: [1, 1, 1, 'C'] })
    .then((response) => {
      expect(response).to.have.status(201)
      expect(response.body).to.be.a('object')
    }))

  it(`POST ${BASE_URL} expect Response Code 400`, () => requester.post(BASE_URL)
    .send({ data: [1, 1, 1, 'C'] })
    .then((response) => {
      expect(response).to.have.status(400)
      expect(response.body).to.be.a('object')
    }))

  it(`GET ${BASE_URL}/:case expect Response Code 200`, () => requester.get(`${BASE_URL}/${context.case}`)
    .then((response) => {
      expect(response).to.have.status(200)
      expect(response.body).to.be.a('object')
    }))

  it(`GET ${BASE_URL}/:case expect Response Code 400`, () => requester.get(`${BASE_URL}/12`)
    .then((response) => {
      expect(response).to.have.status(400)
      expect(response.body).to.be.a('object')
    }))

  it(`GET ${BASE_URL}/:case/:id expect Response Code 200`, () => requester.get(`${BASE_URL}/${context.case}/${context.id}`)
    .then((response) => {
      expect(response).to.have.status(200)
      expect(response.body).to.be.a('object')
    }))

  it(`GET ${BASE_URL}/:case/:id expect Response Code 400`, () => requester.get(`${BASE_URL}/${context.case}/1234`)
    .then((response) => {
      expect(response).to.have.status(400)
      expect(response.body).to.be.a('object')
    }))

  it(`PUT ${BASE_URL}/:case/:id expect Response Code 200`, () => requester.put(`${BASE_URL}/${context.case}/${context.id}`)
    .send({ data: [1, 2, 34, 'C'] })
    .then((response) => {
      expect(response).to.have.status(200)
      expect(response.body).to.be.a('object')
    }))

  it(`PUT ${BASE_URL}/:case/:id expect Response Code 400`, () => requester.put(`${BASE_URL}/${context.case}/${context.id}`)
    .send({ data: [1, 2, '34', 'C'] })
    .then((response) => {
      expect(response).to.have.status(400)
      expect(response.body).to.be.a('object')
    }))

  it(`DELETE ${BASE_URL}/:case/:id expect Response Code 400`, () => requester.delete(`${BASE_URL}/${context.case}/1263`)
    .then((response) => {
      expect(response).to.have.status(400)
      expect(response.body).to.be.a('object')
    }))

  it(`DELETE ${BASE_URL}/:case/:id expect Response Code 204`, () => requester.delete(`${BASE_URL}/${context.case}/${context.id}`)
    .then((response) => {
      expect(response).to.have.status(204)
      expect(response.body).to.be.a('object')
    }))
})
