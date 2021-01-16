const express = require('express');
const readerRouter = require('./routes/readers');
const booksRouter = require('./routes/books');

const app = express();

app.use(express.json());

app.use('/readers', readerRouter);

app.use('/books', booksRouter);

module.exports = app;
