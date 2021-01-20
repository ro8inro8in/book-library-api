const express = require('express');
const readerRouter = require('./routes/readers');
const booksRouter = require('./routes/books');
const authorRouter = require('./routes/author');
const genreRouter = require('./routes/genre')
const app = express();

app.use(express.json());

app.use('/readers', readerRouter);

app.use('/books', booksRouter);

app.use('/author', authorRouter);

app.use('/genre', genreRouter);

module.exports = app;
