const { Reader, Book } = require("../models");

/*exports.create = (req, res) => {
  res.status(200).send();
};*/
exports.list = (req, res) => {
  Book.findAll().then((books) => res.status(200).json(books));
};
exports.create = (req, res) => {
  Reader.findByPk(req.params.id)
    .then((reader) => {
      if (!reader) {
        res.status(404).json({ error: "The reader could not be found." });
      } else {
        const data = req.body;
        data.readerId = req.params.id;
        Book.create(data, { include: "reader" })
          .then((book) => res.status(201).json(book))
          .catch((err) => console.log(err));
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
exports.getBooks = (_, res) => {
  Book.findAll().then((book) => {
    res.status(200).json(book);
  });
};
exports.getBooksById = (req, res) => {
  console.log(111)
  const { id } = req.params;
  Book.findByPk(id).then((book) => {
    if (!book) {
      res.status(404).json({ error: "The reader could not be found." });
    } else {
      res.status(200).json(book);
    }
  });
};
