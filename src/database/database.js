// import module to generate random tokens
const randtoken = require('rand-token')

/**
 * Sets the data length
 */
const DATA_LENGTH = 4

/**
 * Sets the data model
 */
const DATA_TYPES = ['number', 'number', 'number', 'string']

/**
* Using variable to simplify execute the code. This can be a database.
*/
const persistence = {
  submissions: {},
}

/**
 * Adds Submission on persistence
 * @param {Array} submission
 * @param {Number} mcase
 */
const addSubmission = (submission, mcase) => new Promise((resolve, reject) => {
  // Check data, if it is not valid, then reject
  if (!validateInputData(submission) || !mcase) {
    reject({ message: 'Invalid data' })
  }
  const id = randtoken.generate(8)
  if (!persistence.submissions[mcase]) persistence.submissions[mcase] = {}
  // Saves the submission on persistence
  persistence.submissions[mcase][id] = submission
  resolve({ submission, id })
})

/**
 * Updates a existing submission in persistence
 * @param {Array} submission
 * @param {Number} id
 * @param {Number} mcase
 */
const updateSubmission = (submission, id, mcase) => new Promise((resolve, reject) => {
  // Check data, if it is not valid, then reject
  if (!validateInputData(submission) || !mcase || !id) {
    reject({ message: 'Invalid data' })
  }

  // Check if the data exists in persistence
  if (!persistence.submissions[mcase] || !persistence.submissions[mcase][id]) reject({ message: 'Data does not exist' })

  const old = persistence.submissions[mcase][id]
  // Update
  persistence.submissions[mcase][id] = submission
  resolve({ old, new: submission, id })
})

/**
 * Deletes a existing submission on persistence
 * @param {Number} id
 * @param {Number} mcase
 */
const deleteSubmission = (id, mcase) => new Promise((resolve, reject) => {
  // Check if the data exists in persistence
  if (!persistence.submissions[mcase] || !persistence.submissions[mcase][id]) reject({ message: 'Data does not exist' })

  const deleted = persistence.submissions[mcase][id]
  // delete
  delete persistence.submissions[mcase][id]
  resolve({ deleted, id })
})

/**
 * Query the submissions
 * @param {Number} mcase
 * @param {Number} id
 */
const getSubmissions = (mcase, id) => new Promise((resolve, reject) => {
  if (mcase) {
    if (!persistence.submissions[mcase]) reject({ message: 'Data does not exist' })
    if (id) {
      if (!persistence.submissions[mcase][id]) reject({ message: 'Data does not exist' })
      resolve({ data: persistence.submissions[mcase][id] })
    }
    resolve({ data: persistence.submissions[mcase] })
  }
  resolve({ data: persistence.submissions })
})

/**
 * Check if array follows the model
 * @param {Array} data
 */
const validateInputData = (data) => {
  if (!data || data.length != DATA_LENGTH) return false
  for (let i = 0; i < DATA_LENGTH; i++) {
    if (typeof data[i] !== DATA_TYPES[i]) return false
  }
  return true
}

module.exports = {
  addSubmission,
  getSubmissions,
  updateSubmission,
  deleteSubmission,
}
