module.exports = (connection, DataTypes) => {
  const schema = {
    book: DataTypes.STRING,
    author: DataTypes.STRING,
  };

  const bookModel = connection.define('book', schema);
  return bookModel;
};
