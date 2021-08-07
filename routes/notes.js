//files requried
const { readFile, appendDataFile, writeFile } = require('../helpers/readWrite');
const notes = require('express').Router();
const newID = require('../helpers/getID');
const fs = require('fs');

const dbLocation = './db/db.json';


// GET request for retrieving all notes
notes.get('/', (req, res) => {
    readFile(dbLocation).then(data => res.json(JSON.parse(data)))
});

// POST request to add a new note
notes.post('/', (req, res) => {
 
    // getting title and text out of request body
    const { title, text } = req.body;
  
    // If all requirements are met
    if (title && text) {

        //define a new note
        const newNote = {
            "title": title,
            "text": text,
            "id": newID()
        };

        //append to datafile
        appendDataFile(newNote, dbLocation);
  
        //send back response
        res.send(`${title} has been saved`);

    }else {
        //error in saving note
        res.send('Error in saving note.');
    }

});

notes.delete('/:id', (req, res) => {

    //get id out of req.params
    const index = req.params.id;

    //read curent database
    const db = JSON.parse(fs.readFileSync(dbLocation, 'utf8'));

    //check if id exists in database
    if (db.some(obj => obj.id == index)) {
        //Delete from array, write new file
        const newDB = db.filter( ({ id }) => id != index);

        //write new file
        writeFile(dbLocation, newDB);
    
        //send back response
        res.send(`${index} deleted`);
        
    }
    //IF NOT send back error response
    else {
        res.send(`${index} is not a valid id`);
    };

});

notes.get('/:id', (req, res) => {

    //get id out of req.params
    const index = req.params.id;

    //read curent database
    const db = JSON.parse(fs.readFileSync(dbLocation, 'utf8'));

    //check if id exists in database
    if (db.some(obj => obj.id == index)) {
        //filter DB by the ID
        const selectedID = db.filter( ({ id }) => id == index);
   
        //send back response
        res.json(selectedID);
        
    }
    //IF NOT send back error response
    else {
        res.send(`${index} is not a valid id`);
    };

});

//export notes route;
module.exports = notes;
