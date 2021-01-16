module.exports = (connection, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  };

  const readerModel = connection.define('reader', schema);
  return readerModel;
};
