const { readFile, appendDataFile } = require('../helpers/readWrite');
const notes = require('express').Router();

const dbLocation = './db/db.json'


// GET request for retrieving all notes
notes.get('/', (req, res) => {
    readFile(dbLocation).then(data => res.json(JSON.parse(data)))
});

// POST request to add a new note
notes.post('/', (req, res) => {
 
    // getting title and text out of request body
    const { title, text } = req.body;
  
    // If all requirements are there
    if (title && text) {

        const newNote = {
            "title": title,
            "text": text
        };

        appendDataFile(newNote, dbLocation);
  
        res.send(`${title} has been saved`);

    }else {
        res.send('Error in saving note.');
    }

});

module.exports = notes;
