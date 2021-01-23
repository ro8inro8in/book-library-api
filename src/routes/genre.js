const express = require("express");

const router = express.Router();

const genreController = require("../controllers/genre");

router.route("/").get(genreController.list).post(genreController.createGenre);

router
  .route("/:id")
  .get(genreController.getGenreById)
  .patch(genreController.updatesGenre)
  .delete(genreController.deletesGenre);

module.exports = router;
