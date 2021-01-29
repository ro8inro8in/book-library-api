module.exports = (connection, DataTypes) => {
  const schema = {
    // title: DataTypes.STRING,
    //author: DataTypes.STRING,

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: [true],
          msg: "genre search fail",
        },
        notNull: {
          args: [true],
          msg: "genre search fail",
        },
      },
    },
    //ISBN: DataTypes.STRING,
  };

  const genreModel = connection.define("Genre", schema);
  return genreModel;
};

//removed title, author, ISBN
