const { Book } = require("../models");
//const { Reader } = require("../models");
const { Reader } = require("../models");
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("./helpers");

/*exports.create = (req, res) => {
  res.status(200).send();
};*/

exports.create = (req, res) => {
  createItem(res, "book", req.body);
};

exports.list = (req, res) => {
  //console.log("Hello")
  getAllItems(res, "book");
};

exports.getBookById = (req, res) => {
  getItemById(res, "book", req.params.id);
};

exports.updateBook = (req, res) =>
  updateItem(res, "book", req.body, req.params.id);

exports.deleteBook = (req, res) => deleteItem(res, "book", req.params.id);
