const express = require('express');

const router = express.Router();

const readerController = require('../controllers/readers');

router.post('/', readerController.create);

router.get('/', readerController.getReaders);

router.get('/:id', readerController.readerId);

router.patch('/:id', readerController.updateReader);

router.delete('/:id', readerController.deletesReader);

module.exports = router;
