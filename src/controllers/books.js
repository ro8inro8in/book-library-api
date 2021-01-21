const { Book } = require("../models");
//const { Reader } = require("../models");
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

exports.createBook = (req, res) => { createItem(res, 'book', req.body); };

exports.list = (req, res) => { getAllItems(res, 'book' );};

exports.getBooksById = (req, res) => { getItemById(res, 'book', req.params.id);};

exports.updatesBook = (req, res) => updateItem(res, 'book', req.body, req.params.id);

exports.deletesBook = (req, res) => deleteItem(res, 'book', req.params.id);