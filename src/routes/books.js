const express = require("express");

const router = express.Router();

const booksController = require("../controllers/books");

router
    .route('/')
    .get(booksController.list)
    .post(booksController.createBook);

router
  .route("/:id")
  .get(booksController.getBooksById)
  .patch(booksController.updatesBook)
  .delete(booksController.deletesBook);

module.exports = router;
