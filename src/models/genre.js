module.exports = (connection, DataTypes) => {
    const schema = {
     // title: DataTypes.STRING,    
      //author: DataTypes.STRING,
      
      genre:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notEmpty: {
              args: [true],
              msg: "genre search fail",
          },
          notNull: {
              args: [true],
              msg: "genre search fail"
          }
      }
    },
      //ISBN: DataTypes.STRING,
    };
  
    const genreModel = connection.define("genre", schema);
    return genreModel;
  };


//removed title, author, ISBN