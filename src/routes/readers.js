const express = require('express');

const router = express.Router();

const readerController = require('../controllers/readers');

const booksController = require('../controllers/books');

router.post('/', readerController.create);

router.get('/', readerController.getReaders);

router.get('/:id', readerController.readerId);

router.patch('/:id', readerController.updateReader);

router.delete('/:id', readerController.deletesReader);

router.post('/:id/books', booksController.create);

module.exports = router;
