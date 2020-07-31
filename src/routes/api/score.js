/**
 * Sets the base URL to this API
 */
const SCORE_BASE_URL = '/scores'

module.exports = (router, database) => {
  /**
     * Retrieves all scores from database
     */
  router.get(SCORE_BASE_URL, (req, res) => {
    // Returning Status 200 and the json with scores and cases.
    database.getSubmissions()
      .then((submissions) => {
        res.status(200).json(submissions)
      })
      .catch((error) => {
        res.status(400).json(error)
      })
  })

  /**
     * Add new score on persistence
     */
  router.post(SCORE_BASE_URL, (req, res) => {
    // Retrieves the number of case and the submission
    const { mcase, data } = req.body

    database.addSubmission(data, mcase)
      .then((submission) => {
        res.status(201).json(submission)
      })
      .catch((error) => {
        res.status(400).json(error)
      })
  })

  /**
     * Retrieves all scores from case
     */
  router.get(`${SCORE_BASE_URL}/:mcase`, (req, res) => {
    const { mcase } = req.params

    // Returning Status 200 and the json with scores.
    database.getSubmissions(mcase)
      .then((submissions) => {
        res.status(200).json(submissions)
      })
      .catch((error) => {
        res.status(400).json(error)
      })
  })

  /**
     * Retrieves a single score
     */
  router.get(`${SCORE_BASE_URL}/:mcase/:id`, (req, res) => {
    const { mcase, id } = req.params

    // Returning Status 200 and the json with score.
    database.getSubmissions(mcase, id)
      .then((submissions) => {
        res.status(200).json(submissions)
      })
      .catch((error) => {
        res.status(400).json(error)
      })
  })

  /**
     * Update score on persistence
     */
  router.put(`${SCORE_BASE_URL}/:mcase/:id`, (req, res) => {
    // Retrieves the number of case and the submission
    const { data } = req.body
    const { id, mcase } = req.params

    database.updateSubmission(data, id, mcase)
      .then((submission) => {
        res.status(200).json(submission)
      })
      .catch((error) => {
        res.status(400).json(error)
      })
  })

  /**
     * Delete score on persistence
     */
  router.delete(`${SCORE_BASE_URL}/:mcase/:id`, (req, res) => {
    // Retrieves the number of case and the submission
    const { id, mcase } = req.params

    database.deleteSubmission(id, mcase)
      .then((submission) => {
        res.status(204).json(submission)
      })
      .catch((error) => {
        res.status(400).json(error)
      })
  })
}
