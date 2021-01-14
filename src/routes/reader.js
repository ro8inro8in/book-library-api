const express = require('express');

const router = express.Router();

const readerControllers = require('../controllers/reader');

router.post('/', readerControllers.create);

module.exports = router;
