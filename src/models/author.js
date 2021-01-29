module.exports = (connection, DataTypes) => {
  const schema = {
    //title: DataTypes.STRING,

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

    //genre: DataTypes.STRING,
    //ISBN: DataTypes.STRING,
  };

  const authorModel = connection.define("Author", schema);
  return authorModel;
};
