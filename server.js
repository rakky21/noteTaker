const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');
const { post } = require('got');
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', function (err, data) {
    if (err) throw err
    const parseNotes = JSON.parse(data);
    res.json(parseNotes);
  })
})

app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', function (err, data) {
    if (err) throw err
    const saveNotes = JSON.parse(data);
    console.log(saveNotes, req.body);
    const newNote = req.body;
    newNote.id = uuidv4();
    saveNotes.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(saveNotes), function (err) {
      if (err) throw err
      res.json(req.body);
    });
  })
})

app.delete(`/api/notes/:id`, (req, res) => {
  fs.readFile('./db/db.json', function (err, data) {
    if (err) throw err
    const Notes = JSON.parse(data);
    const filternotes = Notes.filter(function (note) {
      return note.id !== req.params.id
    })
    fs.writeFile('./db/db.json', JSON.stringify(filternotes), function (err) {
      if (err) throw err
      res.json(req.body);
    });
  });
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});