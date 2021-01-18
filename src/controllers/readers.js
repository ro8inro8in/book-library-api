const { Reader } = require("../models");

/*exports.create = (req, res) => {
  res.status(200).send();
};*/

exports.create = (req, res) => {
  if (
    req.body.name === "" ||
    req.body.email === "" ||
    req.body.password === ""
  ) {
    res.status(404).json({ error: "All fields must be completed." });
  } else if (req.body.email.indexOf("@") === -1) {
    res.status(404).json({ error: "The email address is invalid." });
  } else if (req.body.password.length < 8) {
    res.status(404).json({ error: "Password must be at least 8 characters." });
  } else {
    Reader.create(req.body).then((reader) => res.status(201).json(reader));
  }
};
exports.getReaders = (_, res) => {
  Reader.findAll().then((readers) => res.status(200).json(readers));
};
exports.readerId = (req, res) => {
  Reader.findByPk(req.params.id)
    .then((reader) => {
      if (!reader) {
        res.status(404).json({ error: "The reader could not be found" });
      } else {
        res.status(200).json(reader);
      }
    })
    .catch((err) => console.log(err));
};
exports.updateReader = (req, res) => {
  const { id } = req.params;
  Reader.update(req.body, { where: { id } }).then(([rowsUpdated]) => {
    if (!rowsUpdated) {
      res.status(404).json({ error: "The reader could not be found" });
    } else {
      res.status(200).json(rowsUpdated);
    }
  });
};
exports.deletesReader = (req, res) => {
  const { id } = req.params;
  Reader.destroy({ where: { id } })
    .then((rowsDeleted) => {
      if (!rowsDeleted) {
        res.status(404).json({ error: "The reader could not be found" });
      } else {
        res.status(204).json({ message: "Success files deleted." });
      }
    })
    .catch((err) => console.log(err));
};
