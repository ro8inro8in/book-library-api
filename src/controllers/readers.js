const { Reader } = require("../models");
const {
  getAllReaders,
  createItem,
  updateItem,
  getItemById,
  deleteItem,
} = require("./helpers");
/*exports.create = (req, res) => {
  res.status(200).send();
};*/

exports.createReader = (req, res) => createItem(res, "reader", req.body);

exports.getReaders = (req, res) => getAllReaders(res, "reader");

exports.getReaderById = (req, res) => getItemById(res, "reader", req.params.id);

exports.updateReader = (req, res) =>
  updateItem(res, "reader", req.body, req.params.id);

exports.deleteReader = (req, res) => deleteItem(res, "reader", req.params.id);
