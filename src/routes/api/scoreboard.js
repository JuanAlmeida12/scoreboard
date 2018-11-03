/**
 * Sets the base URL to this API 
 */
const SCOREBOARD_BASE_URL = '/scoreboards'

module.exports = (router, database) => {
    
    /**
     * Get scoreboards
     */
    router.get(SCOREBOARD_BASE_URL, (req, res) => {
        database.getSubmissions()
        .then(cases => {
            let scoreboards = {}
            for(i in cases.data) scoreboards[i] = calculateScores(cases.data[i])
            res.status(200).json(scoreboards)
        })
    })
}

/**
 * Calculate scores
 * @param {JSON} submissions 
 */
const calculateScores = (submissions) => {
    // Inits all contestants with default values 
    let contestants = []
    let aux = []
    let scoreboard = {}
    for(let i = 0; i < 100; i++) {
        let contestant = []
        for(let j = 0; j < 9; j++) {
            contestant.push({ penalty:0, status:false })
        }
        contestants.push(contestant)
    }

    // Transform submissions JSON in a Array following the model [ID, PROBLEM, TIME, ANSWER_STATUS] 
    for(key in submissions) aux.push(submissions[key])
    
    // Sort the array by submission time
    aux.sort((a, b) => {
        return a[2] - b[2]
    })

    for(i in aux) {
        const submission = aux[i]
        const solved = contestants[submission[0]][submission[1]].status
        const penalty = contestants[submission[0]][submission[1]].penalty

        // Make sure the contestant is on the scoreboard, if not, create
        if(!scoreboard[submission[0]]) {
            scoreboard[submission[0]] = {
                time:0,
                score:0
            }
        }

        // Verify if submission is correct, if it is, set problem status to solved and update the score and time
        if(submission[3] === "C" && !solved) {
            contestants[submission[0]][submission[1]].status = true
            scoreboard[submission[0]].time += submission[2] + penalty
            scoreboard[submission[0]].score += 1
        }

        // Verify if submisson are incorrect, if it is, increment the problem penalty 
        if(submission[3] === "I" && !solved) {
            contestants[submission[0]][submission[1]].penalty += 20
        }
    }

    aux = []
    
    // Transform scoreboard JSON in a Array following the model [ID, SOLVED_PROBLEMS, TIME] 
    for(i in scoreboard) {
        aux.push([i, scoreboard[i].score, scoreboard[i].time])
    }

    // Sort array by solved problems, time and id respectively
    aux.sort((a, b) => {
        if(a[1] === b[1]) {
            if(a[2] === b[2]) return a[0] - b[0]
            return a[2] - b[2]
        }
        return b[1] - a[1]
    })

    return aux
}