# Contest Scoreboard

## Summary

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Setup](#setup)
- [Running](#running)
- [Tests](#tests)
- [API](#api)
    - [Scores](#scores)
        - [Add new score](#add-new-score)
        - [Get all scores and cases](#get-all-scores-and-cases)
        - [Get all scores from the case](#get-all-scores-from-the-case)
        - [Get a single score from the case](#get-a-single-score-from-the-case)
        - [Update Score](#update-score)
        - [Delete Score](#delete-score)
    - [Scoreboards](#scoreboards)
        - [Get All Scoreboards](#get-all-scoreboards)
    - [Gists](#gists)

## Dependencies

The project requires only [NodeJs](www.nodejs.org)

## Installation

Clone the repository:

```shell
git clone https://github.com/JuanAlmeida12/scoreboard.git
```

Open prompt/bash into repository directory and run the following command:
```shell
npm install
```
or just:
```shell
npm i
```
Now you are able to run the server.

## Setup

It is necessary to change the `username` and` password` values ​​in` src / configs / githubConfig.json` to Github Api works properly.

## Running

The server can be started on two modes:
### Development
In development mode the server runs using ```nodemon```, which is a simple monitor script for use in development.

To run in this mode, run the following command:
```shell
npm run dev
```

### Production
In production mode the server runs using ```pm2```, which is a production process manager.

To run in this mode, run the following command:
```shell
npm run production
```

## Tests

To run the test suite, run the following command
```shell
npm test
```
## API
### Scores
#### Add new score
```
POST /api/scores
```
##### Parameters
| Name | Type | Description |
| --- | --- | --- |
| `mcase` | `number` | **Required**. Number of scoreboard test case |
| `data` | `array` | **Required**. Array with submission data |

##### Exemple
```json
{
    "mcase": 2,
    "data": [1,1,25,"C"]
}
```

##### Response
```
Status: 201 Created
```
```json
{
    "submission": [
        1,
        1,
        25,
        "C"
    ],
    "id": "4rV3axnS"
}
```

#### Get all scores and cases
```
GET /api/scores
```
##### Response
```
Status: 200 OK
```
```json
{
    "data": {
        "1": {
            "AY31NaQd": [
                1,
                1,
                "25",
                "C"
            ]
        },
        "2": {
            "OGAOpjbt": [
                12,
                2,
                30,
                "C"
            ]
        }
    }
}
```

#### Get all scores from the case
```
GET /api/scores/:case_id
```
##### Response
```
Status: 200 OK
```
```json
{
    "data": {
        "OGAOpjbt": [
            12,
            2,
            30,
            "C"
        ]
    }
}
```

#### Get a single score from the case
```
GET /api/scores/:case_id/:score_id
```
##### Response
```
Status: 200 OK
```
```json
{
    "data": [
        12,
        2,
        30,
        "C"
    ]
}
```

#### Update Score
```
PUT /api/scores/:case_id/:score_id
```
##### Parameters
| Name | Type | Description |
| --- | --- | --- |
| `data` | `array` | **Required**. Array with submission data |

##### Exemple
```json
{
    "data": [2,2,45,"C"]
}
```

##### Response
```
Status: 200 Created
```
```json
{
    "old": [
        12,
        2,
        30,
        "C"
    ],
    "new": [
        2,
        2,
        45,
        "C"
    ],
    "id": "OGAOpjbt"
}
```

#### Delete Score
```
DELETE /api/scores/:case_id/:score_id
```
##### Response
```
Status: 203
```
```json
{
    "deleted": [
        12,
        2,
        30,
        "C"
    ],
    "id": "OGAOpjbt"
}
```
### Scoreboards
#### Get All Scoreboards
```
GET /api/scoreboards
```
##### Response
Each case is ordered from first to last.
```
Status 200 OK
```
```json
{
    "1": [
        [
            "1",
            2,
            66
        ],
        [
            "3",
            1,
            11
        ]
    ]
}
```

### Gists
URLs to manipulate gists from this server.

Get user gists
```
GET /api/gists
```
Create a new gist
```
POST /api/gists
```
Update gist
```
PATCH /api/gists/:gist_id
```
Remove gist
```
DELETE /api/gists/:gist_id
```
Get gist comments
```
GET /api/gists/:gist_id/comments
```
Create gist comment
```
POST /api/gists/:gist_id/comments
```
Get single gist comment
```
POST /api/gists/:gist_id/comments/:comment_id
```
Update gist comment
```
PATCH /api/gists/:gist_id/comments/:comment_id
```
Remove gist comment
```
DELETE /api/gists/:gist_id/comments/:comment_id
```

See inputs and outputs in [Github Api](https://developer.github.com/v3/gists/)