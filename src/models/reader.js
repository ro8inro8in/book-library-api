module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your name",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your email",
        },
        isEmail: {
          msg: "Please enter a valid email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password must be at least 8 characters.",
        },
        len: {
          args: [8, 100],
          msg: "Password must be at least 8 characters.",
        },
      },
    },
  };
  const readerModel = connection.define("reader", schema);
  return readerModel;
};
