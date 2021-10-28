const express = require('express');

const app = express();
const PORT = process.env.PORT||3001;
const path = require('path');
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/api/notes',(req, res) => {
  fs.readFile('./db/db.json', function(err,data){
    if(err) throw err
    const parseNotes = JSON.parse(data);
    res.json(parseNotes);
  })
})

app.get('/api/notes',(req, res) => {
  
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