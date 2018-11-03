const chai = require('chai')
const expect = chai.expect;
const assert = require("assert")
const chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised)

const database =  require('../../src/database/database')

describe('Database Test', () => {
    describe('Add', () => {
        describe('Try add submission with wrong data format', () => {
            it('Input: ([1,1,"a","C"], 1)', () => {
                return chai.assert.isRejected(database.addSubmission([1,1,"a","C"], 1),"Invalid data")
            })

            it('Input: ([1,1,"C"], 1)', () => {
                return chai.assert.isRejected(database.addSubmission([1,1,"C"], 1),"Invalid data")
            })

            it('Input: ([3,1,34,12], 1)', () => {
                return chai.assert.isRejected(database.addSubmission([3,1,34,12], 1),"Invalid data")
            })

            it('Input: ([1,1,1,"C"])', () => {
                return chai.assert.isRejected(database.addSubmission([1,1,1,"C"]),"Invalid data")
            })
        })

        describe('Try add submission with correct data format', () => {
            it('Input: ([1,2,10,"I"], 1)', () => {
                return chai.assert.isFulfilled(database.addSubmission([1,2,10,"I"], 1))
            })

            it('Input: ([3,1,11,"C"], 1)', () => {
                return chai.assert.isFulfilled(database.addSubmission([3,1,11,"C"], 1))
            })

            it('Input: ([1,2,19,"R"], 1)', () => {
                return chai.assert.isFulfilled(database.addSubmission([1,2,19,"R"], 1))
            })

            it('Input: ([1,2,21,"C"], 1)', () => {
                return chai.assert.isFulfilled(database.addSubmission([1,2,21,"C"], 1))
            })

            it('Input: ([1,2,25,"C"], 1)', () => {
                return chai.assert.isFulfilled(database.addSubmission([1,2,25,"C"], 1))
            })
        })
    })

    describe('Update', () => {

        let context = {
            id: undefined,
            data: undefined,
            case: 1
        }

        before(done => {
            database.addSubmission([1,2,10,"I"], 1)
            .then(result => {                
                context.id = result.id
                context.data = result.submission
                done()
            })
        })

        describe('Try update submission with wrong data format', () => {
            it('Input: ([1,1,"a","C"], :ID, 1)', () => {
                return chai.assert.isRejected(database.updateSubmission([1,1,"a","C"], context.id, 1),"Invalid data")
            })

            it('Input: ([1,1,"C"], :ID, 1)', () => {
                return chai.assert.isRejected(database.updateSubmission([1,1,"C"], context.id, 1),"Invalid data")
            })

            it('Input: ([3,1,34,12], :ID, 1)', () => {
                return chai.assert.isRejected(database.updateSubmission([3,1,34,12], context.id, 1),"Invalid data")
            })

            it('Input: ([1,1,1,"C"])', () => {
                return chai.assert.isRejected(database.updateSubmission([1,1,1,"C"]),"Invalid data")
            })

            it(`Input: ([1,1,1,"C"], :ID)`, () => {
                return chai.assert.isRejected(database.updateSubmission([1,1,1,"C"], context.id),"Invalid data")
            })
        })

        describe('Try update submission with correct data format', () => {
            it('Input: ([1,2,10,"I"], :ID, 1)', () => {
                return chai.assert.isFulfilled(database.updateSubmission([1,2,10,"I"], context.id, 1))
            })

            it('Input: ([3,1,11,"C"], :ID, 1)', () => {
                return chai.assert.isFulfilled(database.updateSubmission([3,1,11,"C"], context.id, 1))
            })

            it('Input: ([1,2,19,"R"], :ID, 1)', () => {
                return chai.assert.isFulfilled(database.updateSubmission([1,2,19,"R"], context.id, 1))
            })

            it('Input: ([1,2,21,"C"], :ID, 1)', () => {
                return chai.assert.isFulfilled(database.updateSubmission([1,2,21,"C"], context.id, 1))
            })

            it('Input: ([1,2,25,"C"], :ID, 1)', () => {
                return chai.assert.isFulfilled(database.updateSubmission([1,2,25,"C"], context.id, 1))
            })
        })

        describe('Try update non-existent submission ', () => {
            it('Input: ([1,2,10,"I"], "213", 1)', () => {
                return chai.assert.isRejected(database.updateSubmission([1,2,10,"I"], "213", 1), "Data does not exist")
            })

            it('Input: ([3,1,11,"C"], "4123", 1)', () => {
                return chai.assert.isRejected(database.updateSubmission([3,1,11,"C"], "4123", 1), "Data does not exist")
            })

            it('Input: ([1,2,19,"R"], "as23", 1)', () => {
                return chai.assert.isRejected(database.updateSubmission([1,2,19,"R"], "as23", 1), "Data does not exist")
            })

            it('Input: ([1,2,21,"C"], "gsd21", 1)', () => {
                return chai.assert.isRejected(database.updateSubmission([1,2,21,"C"], "gsd21", 1), "Data does not exist")
            })

            it('Input: ([1,2,25,"C"], "ag2134", 1)', () => {
                return chai.assert.isRejected(database.updateSubmission([1,2,25,"C"], "ag2134", 1), "Data does not exist")
            })
        })

        describe('Verify that data has changed', () => {
            const DEFAUL_SUBMISSION = [1,2,25,"C"]
            beforeEach((done) => {
                database.updateSubmission(DEFAUL_SUBMISSION, context.id, context.case)
                .then(result => {
                    context.data = result.new
                    done()
                })
            })

            it('Input: ([1,2,10,"I"], 1)', () => {
                database.updateSubmission([1,2,10,"I"], context.id, context.case)
                return database.getSubmissions(context.case, context.id)
                .then(result => {
                    chai.assert.notEqual(DEFAUL_SUBMISSION, result.data)
                })
            })

            it('Input: ([3,1,11,"C"], 1)', () => {
                database.updateSubmission([3,1,11,"C"], context.id, context.case)
                return database.getSubmissions(context.case, context.id)
                .then(result => {
                    chai.assert.notEqual(DEFAUL_SUBMISSION, result.data)
                })
            })

            it('Input: ([1,2,19,"R"], 1)', () => {
                database.updateSubmission([1,2,19,"R"], context.id, context.case)
                return database.getSubmissions(context.case, context.id)
                .then(result => {
                    chai.assert.notEqual(DEFAUL_SUBMISSION, result.data)
                })
            })

            it('Input: ([1,2,21,"C"], 1)', () => {
                database.updateSubmission([1,2,21,"C"], context.id, context.case)
                return database.getSubmissions(context.case, context.id)
                .then(result => {
                    chai.assert.notEqual(DEFAUL_SUBMISSION, result.data)
                })
            })

            it('Input: ([1,2,251,"C"], 1)', () => {
                database.updateSubmission([1,2,251,"C"], context.id, context.case)
                return database.getSubmissions(context.case, context.id)
                .then(result => {
                    chai.assert.notEqual(DEFAUL_SUBMISSION, result.data)
                })          
            })
        })

    })

    describe('Delete', () => {

        let context = {
            id: undefined,
            data: undefined,
            case: 1
        }

        before(done => {
            database.addSubmission([1,2,10,"I"], 1)
            .then(result => {                
                context.id = result.id
                context.data = result.submission
                done()
            })
        })

        describe('Try delete non-existent submission', () => {
            it('Input: (1, "1")', () => {
                return chai.assert.isRejected(database.deleteSubmission(1, "1"), "Data does not exist")
            })

            it('Input: (4, "123")', () => {
                return chai.assert.isRejected(database.deleteSubmission(4, "123"), "Data does not exist")
            })

            it('Input: (10, "5633")', () => {
                return chai.assert.isRejected(database.deleteSubmission(10, "5633"), "Data does not exist")
            })

            it('Input: (1, "965a")', () => {
                return chai.assert.isRejected(database.deleteSubmission(1, "965a"), "Data does not exist")
            })
        })

        describe('Try delete submission', () => {
            it('Input: (:ID, :CASE)', () => {
                return chai.assert.isFulfilled(database.deleteSubmission(context.id, context.case))
            })
        })

    })

    describe('Get', () => {
        let context = {
            id: undefined,
            data: undefined,
            case: 1
        }

        before(done => {
            database.addSubmission([1,2,10,"I"], 1)
            .then(result => {                
                context.id = result.id
                context.data = result.submission
                done()
            })
        })

        describe('Try get submission by id', () => {
            it('Input: (:CASE, :ID)', () => {
                return chai.assert.isFulfilled(database.getSubmissions(context.case, context.id))
            })
        })

        describe('Try get submissions from a case', () => {
            it('Input: (:CASE)', () => {
                return chai.assert.isFulfilled(database.getSubmissions(context.case))
            })
        })

        describe('Try get submissions from a non-existing case', () => {
            it('Input: (123)', () => {
                return chai.assert.isRejected(database.getSubmissions(123), "Data does not exist")
            })
        })

        describe('Try get submissions by a non-existing id', () => {
            it('Input: (123)', () => {
                return chai.assert.isRejected(database.getSubmissions(context.case, 112), "Data does not exist")
            })
        })

        describe('Try get all submissions', () => {
            it('Input: (123)', () => {
                return chai.assert.isFulfilled(database.getSubmissions())
            })
        })
    })
})