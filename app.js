const express = require('express');
const bp = require('body-parser');
const file = require('./helpers/file.js');

const app = express();
app.listen(3000);

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

console.log('\nServer running at http://127.0.0.1:3000/\n');

app.get('/books', (req, res) => {
    const books = file.GetData();

    res.json(books);
    res.end();
});

app.post('/books', (req, res) => {
    let books =  file.GetData();
    let newBook = req.body;
    newBook.id = books.length;

    books.push(newBook);
    file.UpdateJson(books);
    res.end();
});

app.put('/books', (req, res)=>{
    let books =  file.GetData();
    const changedBook = req.body;
    const id = changedBook.id;
    books[id] = changedBook;

    file.UpdateJson(books);
    res.end();
});

app.delete('/books', (req, res)=>{
    let books =  file.GetData();
    const deleteBook = req.body;
    const dId = deleteBook.id;

    books.splice(dId, 1);

    for(let i = 0; i < books.length; i++){
        books[i].id = i;
    };

    file.UpdateJson(books);
    res.end();
});


