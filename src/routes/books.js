const express = require('express');

const router = express.Router();

const booksController = require('../controllers/books');

router.get('/:id', booksController.getBooksById);

router.patch('/:id', booksController.updatesBook);

router.delete('/:id', booksController.deletesBook);

module.exports = router;
