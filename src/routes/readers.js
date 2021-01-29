const express = require("express");

const router = express.Router();

const readerController = require("../controllers/readers");

router
  .route("/")
  
  .get(readerController.list)
  .post(readerController.create);
router
  .route("/:id")
  .get(readerController.getReaderById)
  .patch(readerController.updateReader)
  .delete(readerController.deleteReader);

module.exports = router;
