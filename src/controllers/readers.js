const { Reader } = require("../models");
const {
  getAllItems,
  createItem,
  updateItem,
  getItemById,
  deleteItem,
} = require('./helpers');
/*exports.create = (req, res) => {
  res.status(200).send();
};*/
//-----------vvvvvvvv-failing the test suite -------vvvvvvvvvvv--------------------//
exports.createReader = (req, res) => createItem(res, 'reader', req.body);
//----------^^^^^^^failing the test suite----------^^^^^^^^^^---------------------//
exports.getReaders = (_, res) => getAllItems(res, 'reader');

exports.getReaderById = (req, res) => getItemById(res, 'reader', req.params.id);

exports.updateReader = (req, res) => updateItem(res, 'reader', req.body, req.params.id);

exports.deleteReader = (req, res) => deleteItem(res, 'reader', req.params.id);