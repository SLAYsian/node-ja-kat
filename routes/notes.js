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

// SECTION: GET route for retrieving note by id
notes.get('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile(path.join(__dirname, '../db/notes.json'))
  .then((data) => JSON.parse(data))
  .then((json) => {
    const result = json.filter((note) => note.id === noteId);
    return result.length > 0 ? res.json(result) : res.json('Error: No note found');
  });
});

// SECTION: POST Route for submitting notes
notes.post('/', (req, res) => {
console.log(req.body);
const { title, text } = req.body;
if(req.body){
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };
  readAndAppend(newNote, path.join(__dirname, '../db/notes.json'));
  res.json('Note added successfully!')
} else {
  res.error('Error adding your note!')
}
});

// SECTION: DELETE Route for deleting notes
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  const noteTitle = req.params.title;
  readFromFile(path.join(__dirname, '../db/notes.json'))
  .then((data) => JSON.parse(data))
  .then((json) => {
    const result = json.filter((note) => note.id !== noteId);
    writeToFile(path.join(__dirname, '../db/notes.json'), result);
    res.json('Your note has been deleted!');
  });
});

// SECTION: Export route
module.exports = notes

