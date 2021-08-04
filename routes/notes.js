//files requried
const { readFile, appendDataFile } = require('../helpers/readWrite');
const notes = require('express').Router();

const dbLocation = './db/db.json';


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

        //define a new note
        const newNote = {
            "title": title,
            "text": text
        };

        //append to datafile
        appendDataFile(newNote, dbLocation);
  
        //send back response to API all
        res.send(`${title} has been saved`);

    }else {
        //error in saving note
        res.send('Error in saving note.');
    }

});

//export notes route;
module.exports = notes;
