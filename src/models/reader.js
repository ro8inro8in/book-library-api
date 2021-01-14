module.exports = (sequelize, DataTypes) => {
    const schema = {
      name: DataTypes.STRING,
      genre: DataTypes.STRING,
    };
  
    const readerModel = sequelize.define('reader', schema);
    return readerModel;
  };
  