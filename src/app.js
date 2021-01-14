const express = require('express');
const readerRouter = require('./routes/reader');

const app = express();

app.use(express.json());

app.use('/reader', readerRouter);

module.exports = app;
