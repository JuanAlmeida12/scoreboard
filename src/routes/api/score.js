
/**
 * Sets the data length
 */
const DATA_LENGTH = 4

/**
 * Sets the data model
 */
const DATA_TYPES = ["number", "number", "number", "string"]

/**
 * Sets the base URL to this API 
 */
const SCORE_BASE_URL = '/scores'

/**
* Using variable to simplify the code. This can be a database. 
*/
let persistence = {
    submissions: {},
    scores: {}
}

module.exports = router => {

    /**
     * Retrieves all scores from database
     */
    router.get(SCORE_BASE_URL, (req, res) => {

        // Returning Status 200 and the json with scores and cases.
        res.status(200).json(persistence.scores)
    })

    /**
     * Add new score on persistence
     */
    router.post(SCORE_BASE_URL, (req, res) => {
        
        // Retrieves the number of case and the submission 
        const { mcase, data } = req.body

        // Check data, if it is not valid, then returns Bad Request
        if(!validateInputData(data) || !mcase) {
            return res.status(400).json({ message:'Invalid data' })
        }

        // Saves the submission on persistence
        if(persistence.submissions[mcase]) {
            persistence.submissions[mcase].push(data)
        } else {
            persistence.submissions[mcase] = [data]
        }

        // Checks if the contestant is in persistence, if it does not create it
        if(!persistence.scores[data[0]]) {
            persistence.scores[data[0]] = {
                time: 0,
                problems: [false, false, false, false, false, false, false, false, false],
                solved: 0
            }
        }
        
        // Check if this problem is already solved by this contestant
        if(!persistence.scores[data[0]].problems[data[1]]) {

            // Checks if the problem in submission is already solved
            let problem_solved = persistence.scores[data[0]].problems[data[1] - 1]    

            console.log(data[3] === 'I' && problem_solved)
            if(data[3] === 'I' && !problem_solved) persistence.score[data[0]].time += 20
            
            // If the submission is correct, L = 'C',
            if(data[3] === 'C') { 
                console.log("C")
                // Set problem to solved
                persistence.scores[data[0]].problems[data[1] - 1] = true
                
                // Update contestant score
                persistence.scores[data[0]].solved += 1
                persistence.scores[data[0]].time += data[2]             

            }       
        }
        
        res.status(200).json(persistence.submissions[mcase])
    })

    router.get(`${SCORE_BASE_URL}/scoreboards`, (req, res) => {

    })
}

/**
 * Check if array follows the model
 * @param {Array} data 
 */
const validateInputData = data => {
    if (!data || data.length != DATA_LENGTH) return false
    for(let i = 0; i < DATA_LENGTH; i++) {
        if(typeof data[i] != DATA_TYPES[i]) return false
    }
    return true
}