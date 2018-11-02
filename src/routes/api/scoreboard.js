const database = require('../../database/database')

/**
 * Sets the base URL to this API 
 */
const SCOREBOARD_BASE_URL = '/scoreboards'

module.exports = router => {
    
    router.get(SCOREBOARD_BASE_URL, (req, res) => {
        database.getSubmissions()
        .then(cases => {
            let scoreboards = {}
            for(i in cases.data) scoreboards[i] = calculateScores(cases.data[i])
            res.status(200).json(scoreboards)
        })
    })
}

const calculateScores = (submissions) => {
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

    for(key in submissions) aux.push(submissions[key])
    
    aux.sort((a, b) => {
        return a[2] - b[2]
    })

    for(i in aux) {
        const submission = aux[i]
        const solved = contestants[submission[0]][submission[1]].status
        const penalty = contestants[submission[0]][submission[1]].penalty
        if(!scoreboard[submission[0]]) {
            scoreboard[submission[0]] = {
                time:0,
                score:0
            }
        }
        if(submission[3] === "C" && !solved) {
            contestants[submission[0]][submission[1]].status = true
            scoreboard[submission[0]].time += submission[2] + penalty
            scoreboard[submission[0]].score += 1
        }

        if(submission[3] === "I" && !solved) {
            contestants[submission[0]][submission[1]].penalty += 20
        }
    }

    aux = []
    
    for(i in scoreboard) {
        aux.push([i, scoreboard[i].score, scoreboard[i].time])
    }

    aux.sort((a, b) => {
        if(a[1] === b[1]) {
            if(a[2] === b[2]) return a[0] - b[0]
            return a[2] - b[2]
        }
        return b[1] - a[1]
    })

    return aux
}