module.exports = (connection, DataTypes) => {
  const schema = {
   name: {
      type: DataTypes.STRING,
      notNull: true,
    },
    email: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        len: {
          args: [8, 100],
          msg: "Password must be minimum 8 characters."
        }
      }
    }
  };


  const readerModel = connection.define("reader", schema);
  return readerModel;
};
