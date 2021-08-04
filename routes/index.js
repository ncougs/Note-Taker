const express = require('express');

// Import our note routs
const notes = require('./notes');

const app = express();

app.use('/notes', notes);

module.exports = app;
