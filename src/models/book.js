module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      notNull: true,
    },
    author: {
      type: DataTypes.STRING,
      notNUll: true,
    },
    genre: DataTypes.STRING,
    ISBN: DataTypes.STRING,
  };

  const bookModel = connection.define("book", schema);
  return bookModel;
};
