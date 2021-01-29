const express = require("express");

const router = express.Router();

const authorController = require("../controllers/author");

router
  .route("/")
  //.get(authorController.list);
  .post(authorController.create)
  
//problem with .get all passes until this is engaged.
router
  .route("/:id")
  .get(authorController.getAuthorById)
  .patch(authorController.updateAuthor)
  .delete(authorController.deleteAuthor);

module.exports = router;
