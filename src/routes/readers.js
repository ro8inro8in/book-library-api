const express = require('express');

const router = express.Router();

const readerController = require('../controllers/readers');


router
    .route('/')
    .post(readerController.createReader)
    .get(readerController.getReaders);

router 
    .route('/:id')
    .get(readerController.getReaderById)
    .patch(readerController.updateReader)
    .delete(readerController.deleteReader)
 
module.exports = router;
