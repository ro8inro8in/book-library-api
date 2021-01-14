const express = require('express');
//const readerControllers = require('./controllers/reader');
//Talking to the routes file instead of the controller 
const readerRouter = require('./routes/reader');
const app = express();

app.use(express.json())

app.use('/readers', readerRouter);

//app.post("/readers", readerControllers.create);

module.exports = app; 

//following my last code we where creating route handlers to the controller directory but this time we are using route files ???