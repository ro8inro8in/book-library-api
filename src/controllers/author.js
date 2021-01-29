const { Author } = require('../models');
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
  createItem(res, "author", req.body);
};
/////////vvvvvvvvvvvvvv
exports.list = (req, res) => {
 // console.log("Hello")
  getAllItems(res, "author");
};
/////////^^^^^^^^^^^
exports.getAuthorById = (req, res) => {
  getItemById(res, "author", req.params.id);
};
exports.updateAuthor = (req, res) =>
  updateItem(res, "author", req.body, req.params.id);

exports.deleteAuthor = (req, res) => deleteItem(res, "author", req.params.id);
