module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: 'Name cannot be empty, please enter a nook name.',
                },
                notNull: {
                    args: [true],
                    msg: 'Name cannot be empty, please enter a book name.',
                }
            }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notEmpty: {
              args: [true],
              msg: 'Author cannot be empty, please enter an Author.',
          },
          notNull: {
              args: [true],
              msg: 'Author cannot be empty, please enter an Author.',
          }
      }
    },

    genre: DataTypes.STRING,
    ISBN: DataTypes.STRING,
  };

  const bookModel = connection.define("book", schema);
  return bookModel;
};
