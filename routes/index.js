const express = require('express');

// Import our note routs
const notes = require('./notes');

// New instance of express
const app = express();

//route to use the notes requests. 
app.use('/notes', notes);

module.exports = app;
