# Contest Scoreboard

## Summary

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Running](#running)
- [Tests](#tests)
- [API](#api)
    - [Scores](#scores)
        - [Add new score](#add_new_score)
        - [Get all scores and cases](#get_all_scores_and_cases)
        - [Get all scores from the case](#get_all_scores_from_the_case)
        - [Get a single score from the case](#get_a_single_score_from_the_case)
        - [Update Score](#update_score)
        - [Delete Score](#delete_score)
    - [Scoreboards](#scoreboards)
        - [Get All Scoreboards](#get_all_scoreboards)
    - [Gist](#gist)
        - [Get User Gists](#get_user_gists)
        - [Add new Gist](#add_new_gist)
        - [Update a Gist](#update)

## Dependencies

The project requires only NodeJs[www.nodejs.org]

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

