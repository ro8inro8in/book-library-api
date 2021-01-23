module.exports = (connection, DataTypes) => {
  const schema = {
    title: DataTypes.STRING,

    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Author search fail",
        },
        notNull: {
          args: [true],
          msg: "Author search fail",
        },
      },
    },

    genre: DataTypes.STRING,
    ISBN: DataTypes.STRING,
  };

  const authorModel = connection.define("author", schema);
  return authorModel;
};
