# Contest Scoreboard

## Summary

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Running](#running)
- [Tests](#tests)
- [API](#api)
    - [Scores](#scores)
        - [Add new score](#add_new_score)

## Dependencies

The project requires only NodeJs[www.nodejs.org]

## Installation

Clone the repository:

```bash
git clone https://github.com/JuanAlmeida12/scoreboard.git
```

Open prompt/bash into repository directory and run the following command:
```bash
npm install
```
or just:
```bash
npm i
```
Now you are able to run the server.

## Running

The server can be started on two modes:
### Development
In development mode the server runs using ```nodemon```, which is a simple monitor script for use in development.\n
To run in this mode, run the following command:
```bash
npm run dev
```

### Production
In production mode the server runs using ```pm2```, which is a production process manager.\n
To run in this mode, run the following command:
```bash
npm run production
```

## Tests

To run the test suite, run the following command
```bash
npm test
```
## API

### Add new score
