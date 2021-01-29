const express = require("express");

const router = express.Router();

const booksController = require("../controllers/books");

router.route("/")
.get(booksController.list)
.post(booksController.create);

router
  .route("/:id")
  .get(booksController.getBookById)
  .patch(booksController.updateBook)
  .delete(booksController.deleteBook);

module.exports = router;
