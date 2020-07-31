// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const app = require('../../src/app')

// chai.use(chaiHttp)

// const BASE_URL = "/api/gists"
// const DEFAULT_CONTENT = {
//     "description": "Hello World Examples",
//     "public": true,
//     "files": {
//       "hello_world.rb": {
//         "content": "class HelloWorld\n   def initialize(name)\n      @name = name.capitalize\n   end\n   def sayHi\n      puts \"Hello !\"\n   end\nend\n\nhello = HelloWorld.new(\"World\")\nhello.sayHi"
//       }
//     }
//   }
// const requester = chai.request(app).keepOpen()

// const expect = chai.expect

// describe(BASE_URL, () => {

//     let context = {
//         gist : undefined,
//         comment: undefined
//     }

//     it(`GET ${BASE_URL} expect Response Code 200`, () => {
//         return requester.get(BASE_URL).then(response => {
//             expect(response).to.have.status(200)
//             expect(response.body).to.be.a('array')
//         })
//     })

//     it(`POST ${BASE_URL} expect Response Code 201`, () => {
//         return requester.post(BASE_URL)
//         .send(DEFAULT_CONTENT)
//         .then(response => {
//             context.gist = response.body
//             expect(response).to.have.status(201)
//             expect(response.body).to.be.a('object')
//         })
//     })

//     it(`GET ${BASE_URL}/:ID expect Response Code 200`, () => {
//         return requester.get(`${BASE_URL}/${context.gist.id}`)
//         .then(response => {
//             expect(response).to.have.status(200)
//             expect(response.body).to.be.a('object')
//         })
//     })

//     it(`GET ${BASE_URL}/:ID expect Response Code 404`, () => {
//         return requester.get(`${BASE_URL}/${undefined}`)
//         .then(response => {
//             expect(response).to.have.status(404)
//             expect(response.body).to.be.a('object')
//         })
//     })

//     it(`PATCH ${BASE_URL}/:ID expect Response Code 200`, () => {
//         return requester.patch(`${BASE_URL}/${context.gist.id}`)
//         .send({ "files": {
//             "hello_world_ruby.txt": {
//               "content": "Run `ruby hello_world.rb` or `python hello_world.py` to print Hello World",
//               "filename": "hello_world.md"
//             }}})
//         .then(response => {
//             expect(response).to.have.status(200)
//             expect(response.body).to.be.a('object')
//         })
//     })

//     it(`GET ${BASE_URL}/:ID/comments expect Response Code 200`, () => {
//         return requester.get(`${BASE_URL}/${context.gist.id}/comments`)
//         .then(response => {
//             expect(response).to.have.status(200)
//             expect(response.body).to.be.a('array')
//         })
//     })

//     it(`POST ${BASE_URL}/:ID/comments expect Response Code 201`, () => {
//         return requester.post(`${BASE_URL}/${context.gist.id}/comments`)
//         .send({ body:"Comment content" })
//         .then(response => {
//             context.comment = response.body
//             expect(response).to.have.status(201)
//             expect(response.body).to.be.a('object')
//         })
//     })

//     it(`GET ${BASE_URL}/:ID/comments/:COMMENTID expect Response Code 200`, () => {
//         return requester.get(`${BASE_URL}/${context.gist.id}/comments/${context.comment.id}`)
//         .then(response => {
//             expect(response).to.have.status(201)
//             expect(response.body).to.be.a('object')
//         })
//     })

//     it(`GET ${BASE_URL}/:ID/comments/:COMMENTID expect Response Code 404`, () => {
//         return requester.get(`${BASE_URL}/${context.gist.id}/comments/${undefined}`)
//         .then(response => {
//             expect(response).to.have.status(404)
//             expect(response.body).to.be.a('object')
//         })
//     })

//     it(`PATCH ${BASE_URL}/:ID/comments/:COMMENTID expect Response Code 200`, () => {
//         return requester.patch(`${BASE_URL}/${context.gist.id}/comments/${context.comment.id}`)
//         .send({ body: "Comment content 2" })
//         .then(response => {
//             expect(response).to.have.status(200)
//             expect(response.body).to.be.a('object')
//         })
//     })

//     it(`PATCH ${BASE_URL}/:ID/comments/:COMMENTID expect Response Code 404`, () => {
//         return requester.patch(`${BASE_URL}/${context.gist.id}/comments/${undefined}`)
//         .send({ body: "Comment content 2" })
//         .then(response => {
//             expect(response).to.have.status(404)
//             expect(response.body).to.be.a('object')
//         })
//     })

//     it(`DELETE ${BASE_URL}/:ID/comments/:COMMENTID expect Response Code 203`, () => {
//         return requester.del(`${BASE_URL}/${context.gist.id}/comments/${context.comment.id}`)
//         .send({ body: "Comment content 2" })
//         .then(response => {
//             expect(response).to.have.status(203)
//         })
//     })

//     it(`DELETE ${BASE_URL}/:ID/comments/:COMMENTID expect Response Code 404`, () => {
//         return requester.del(`${BASE_URL}/${context.gist.id}/comments/${undefined}`)
//         .send({ body: "Comment content 2" })
//         .then(response => {
//             expect(response).to.have.status(404)
//         })
//     })

//     it(`DELETE ${BASE_URL}/:ID expect Response Code 203`, () => {
//         return requester.del(`${BASE_URL}/${context.gist.id}`)
//         .then(response => {
//             expect(response).to.have.status(203)
//         })
//     })

//     it(`DELETE ${BASE_URL}/:ID expect Response Code 404`, () => {
//         return requester.del(`${BASE_URL}/${undefined}`)
//         .then(response => {
//             expect(response).to.have.status(404)
//         })
//     })
// })
