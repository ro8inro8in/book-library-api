const express = require('express');

const router = express.Router();

const booksController = require('../controllers/books');

router.get('/:id', booksController.getBooksById);

module.exports = router;
