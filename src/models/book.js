module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Please enter the title',
        },
        notEmpty: {
          args: [true],
          msg: 'The book title cannot be empty',
        },
      },
    },
    ISBN: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter the ISBN',
        },
      },
    },
    AuthorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Please enter the AuthorId',
        },
      },
    },
    GenreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Please enter the GenreId',
        },
      },
    },
  };

  const bookModel = connection.define("Book", schema);
  return bookModel;
};

// removed genre,
