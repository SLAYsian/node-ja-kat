// SECTION: ROUTER
const path = require('path');
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

// SECTION: GET route for retrieving notes
notes.get('/', (req, res) => {
  readFromFile(path.join(__dirname, '../db/notes.json')).then((data) => res.json(JSON.parse(data)
  ))
});

// SECTION: POST Route for submitting notes
notes.post('/', (req, res) => {
console.log(req.body);
const { title, text } = req.body;
if(req.body){
  const newNote = {
    title,
    text,
    note_id: uuidv4(),
  };
  readAndAppend(newNote, path.join(__dirname, '../db/notes.json'));
  res.json('Note added successfully!')
} else {
  res.error('Error adding your note!')
}
});

// SECTION: DELETE Route for deleting notes

// SECTION: Export route
module.exports = notes

