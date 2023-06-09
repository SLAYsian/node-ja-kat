// SECTION: IMPORT PACKAGES
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// SECTION: MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api)

// SECTION: GET route for homepage
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public/index.html'));
});

// SECTION: GET route for notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
  });


  // SECTION: Wildcard route to direct to homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
  });

// SECTION: LISTEN on port

app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT} 🚀`)
);