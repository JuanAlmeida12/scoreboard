// Require module to HTTP requests
const axios = require('axios')

// Require config file
const githubConfigs = require('../configs/githubConfig.json')

// Base URL to Github API
const apiURL = 'https://api.github.com/gists'

// Transform username and password in base64 token
const base64Login = Buffer.from(`${githubConfigs.username}:${githubConfigs.password}`).toString('base64')

// Add Auth token in headers
axios.defaults.headers.common.Authorization = `Basic ${base64Login}`

/**
 * Adds new Gist
 * @param {JSON} gist
 */
const addGist = (gist) => axios.post(apiURL, gist)

/**
 * Remove a gist by id
 * @param {string} gistId
 */
const removeGist = (gistId) => axios.delete(`${apiURL}/${gistId}`)

/**
 * Edit a gist by Id
 * @param {string} gistId
 * @param {JSON} gist
 */
const editGist = (gistId, gist) => axios.patch(`${apiURL}/${gistId}`, gist)

/**
 * Get a gist by Id
 * @param {string} gistId
 */
const getGist = (gistId) => axios.get(`${apiURL}/${gistId}`)

/**
 * Gets all gists from user
 */
const getGists = () => axios.get(apiURL)

/**
 * Get all comments from gist
 * @param {string} gistId
 */
const getGistComments = (gistId) => axios.get(`${apiURL}/${gistId}/comments`)

/**
 * Get a comment by id
 * @param {string} gistId
 * @param {string} commentId
 */
const getGistComment = (gistId, commentId) => axios.get(`${apiURL}/${gistId}/comments/${commentId}`)

/**
 * Add a new comment in gist
 * @param {string} gistId
 * @param {JSON} comment
 */
const createGistComment = (gistId, comment) => axios.post(`${apiURL}/${gistId}/comments`, comment)

/**
 * Edit a comment
 * @param {string} gistId
 * @param {string} commentId
 * @param {JSON} comment
 */
const editGistComment = (gistId, commentId, comment) => axios.patch(`${apiURL}/${gistId}/comments/${commentId}`, comment)

/**
 * Remove a comment from gist
 * @param {string} gistId
 * @param {string} commentId
 */
const removeGistComment = (gistId, commentId) => axios.delete(`${apiURL}/${gistId}/comments/${commentId}`)

module.exports = {
  addGist,
  removeGist,
  editGist,
  getGist,
  getGists,
  getGistComments,
  getGistComment,
  createGistComment,
  editGistComment,
  removeGistComment,
}
