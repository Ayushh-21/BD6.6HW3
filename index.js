const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const { getAllBooks, getBookById } = require('./controllers/index.js');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/books', async (req, res) => {
  let books = await getAllBooks();
  res.json({ books });
});

app.get('/books/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let book = await getBookById(id);
  res.json({ book });
});

module.exports = { app };
