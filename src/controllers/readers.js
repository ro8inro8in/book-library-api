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

exports.create = (req, res) => createItem(res, "reader", req.body);

exports.list = (req, res) => getAllItems(res, "reader");

exports.getReaderById = (req, res) => getItemById(res, "reader", req.params.id);

exports.updateReader = (req, res) =>
  updateItem(res, "reader", req.body, req.params.id);

exports.deleteReader = (req, res) => deleteItem(res, "reader", req.params.id);
