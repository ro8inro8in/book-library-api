const { Genre } = require("../models");

const {
  getAllItems,
  createItem,
  updateItem,
  getItemById,
  deleteItem,
} = require("./helpers");

/*exports.create = (req, res) => {
  res.status(200).send();
};*/

exports.create = (req, res) => {
  createItem(res, "genre", req.body);
};

exports.list = (req, res) => {
  getAllItems(res, "genre");
};

exports.getGenreById = (req, res) => {
  getItemById(res, "genre", req.params.id);
};

exports.updateGenre = (req, res) =>
  updateItem(res, "genre", req.body, req.params.id);


exports.deleteGenre = (req, res) => deleteItem(res, "genre", req.params.id);
