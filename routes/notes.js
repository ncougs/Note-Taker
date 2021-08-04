const { readFile, appendDataFile } = require('../helpers/readWrite');
const notes = require('express').Router();


// GET Route for retrieving all notes
notes.get('/', (req, res) => {
    readFile('./db/db.json').then(data => res.json(JSON.parse(data)))
});

module.exports = notes;

// readFile('./db/db.json').then(data => console.log(JSON.parse(data)));
