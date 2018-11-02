const githubService = require('../../services/githubService')

/**
 * Sets the base URL to this API 
 */
const GIST_BASE_URL = '/gists'

module.exports = router => {

    /**
     * Gets all Gists from user
     */
    router.get(GIST_BASE_URL, (req, res) => {
        githubService.getGists()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.json(error)
        })
    })

    /**
     * Creates a new Gist
     */
    router.post(GIST_BASE_URL, (req, res) => {
        const data = req.body
        githubService.addGist(data)
        .then(result => {
            res.status(201).json(result.data)
        })
        .catch(error => {
            res.status(error.response.status).json(error.response.data)
        })
    })

    /**
     * Deletes a Gist
     */
    router.delete(`${GIST_BASE_URL}/:id`, (req, res) => {
        const { id } = req.params
        githubService.removeGist(id)
        .then(result => {
            res.status(203).json(result.data)
        })
        .catch(error => {
            res.status(error.response.status).json(error.response.data)
        })
    })

    /**
     * Gets a single Gist by id
     */
    router.get(`${GIST_BASE_URL}/:id`, (req, res) => {
        const { id } = req.params
        githubService.getGist(id)
        .then(result => {
            res.status(200).json(result.data)
        })
        .catch(error => {
            res.status(error.response.status).json(error.response.data)
        })
    })

    /**
     * Update a existing Gist
     */
    router.patch(`${GIST_BASE_URL}/:id`, (req, res) => {
        const { id } = req.params
        const data = req.body
        githubService.editGist(id, data)
        .then(result => {
            res.status(200).json(result.data)
        })
        .catch(error => {
            res.status(error.response.status).json(error.response.data)
        })
    })

    /**
     * Gets all comments from a gist
     */
    router.get(`${GIST_BASE_URL}/:id/comments`, (req, res) => {
        const { id } = req.params
        githubService.getGistComments(id)
        .then(result => {
            res.status(200).json(result.data)
        })
        .catch(error => {
            res.status(error.response.status).json(error.response.data)
        })
    })

    /**
     * Creates a new comment for a Gist
     */
    router.post(`${GIST_BASE_URL}/:id/comments`, (req, res) => {
        const { id } = req.params
        const data = req.body
        githubService.createGistComment(id, data)
        .then(result => {
            res.status(201).json(result.data)
        })
        .catch(error => {
            res.status(error.response.status).json(error.response.data)
        })
    })

    /**
     * Get a comment by id
     */
    router.get(`${GIST_BASE_URL}/:id/comments/:commentId`, (req, res) => {
        const { id, commentId } = req.params
        githubService.getGistComment(id, commentId)
        .then(result => {
            res.status(201).json(result.data)
        })
        .catch(error => {
            res.status(error.response.status).json(error.response.data)
        })
    })

    /**
     * Updates an existing comment
     */
    router.patch(`${GIST_BASE_URL}/:id/comments/:commentId`, (req, res) => {
        const { id, commentId } = req.params
        const data = req.body
        githubService.editGistComment(id, commentId, data)
        .then(result => {
            res.status(200).json(result.data)
        })
        .catch(error => {
            res.status(error.response.status).json(error.response.data)
        })
    })

    /**
     * Deletes an existing comment by Id 
     */
    router.delete(`${GIST_BASE_URL}/:id/comments/:commentId`, (req, res) => {
        const { id, commentId } = req.params
        githubService.removeGistComment(id, commentId)
        .then(result => {
            res.status(203).json(result.data)
        })
        .catch(error => {
            res.status(error.response.status).json(error.response.data)
        })
    })
}