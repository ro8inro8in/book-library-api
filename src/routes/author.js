const express = require('express');

const router = express.Router();

const authorController = require('../controllers/author');


// router
//     .route('/')
//     .post(readerController.createReader)
//     .get(readerController.getReaders);

// router 
//     .route('/:id')
//     .get(readerController.getReaderById)
//     .patch(readerController.updateReader)
//     .delete(readerController.deleteReader)
 
module.exports = router;