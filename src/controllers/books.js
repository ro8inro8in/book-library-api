const { Reader, Book } = require("../models");

/*exports.create = (req, res) => {
  res.status(200).send();
};*/
exports.list = (req, res) => {
  Book.findAll().then((books) => res.status(200).json(books));
};
exports.create = (req, res) => {
  Book
    .create(req.body)
    .then((book) => res.status(201).json(book))
    .catch((error) => {  
      const errors = error.errors.map((error) => error.message)    
      res.status(404).json({error: errors});
    });
};
exports.getBooks = (_, res) => {
  Book.findAll().then((book) => {
    res.status(200).json(book);
  });
};
exports.getBooksById = (req, res) => {
  const { id } = req.params;
  Book.findByPk(id).then((book) => {
    if (!book) {
      res.status(404).json({ error: "The reader could not be found." });
    } else {
      res.status(200).json(book);
    }
  });
};
exports.updatesBook = (req, res) => {
  const { id } = req.params;
  Book.update(req.body, { where: { id } }).then(([rowsUpdated]) => {
    if (!rowsUpdated) {
      res.status(404).json({ error: "The reader could not be found." });
    } else {
      res.status(200).json(rowsUpdated);
    }
  });
};
exports.deletesBook = (req, res) => {
  const { id } = req.params;
  Book.destroy({ where: { id } }).then((rowsDeleted) => {
    if (!rowsDeleted) {
      res.status(404).json({ error: "The book could not be found." });
    } else {
      res.status(204).json({ message: "Deleted successfully" });
    }
  });
};
