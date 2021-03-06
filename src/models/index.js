const Sequelize = require("sequelize");
const ReaderModel = require("./reader");
const BookModel = require("./book");
const AuthorModel = require("./author");
const GenreModel = require("./genre");

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setupDatabase = () => {
  const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
    logging: false,
  });

  const Reader = ReaderModel(connection, Sequelize);
  const Book = BookModel(connection, Sequelize);
  const Author = AuthorModel(connection, Sequelize);
  const Genre = GenreModel(connection, Sequelize);

  //Book.belongsTo(Reader, { as: 'reader' });
  //Author.belongsTo(Book, { as: 'book' });
 // Genre.belongsTo(Book, { as: 'book' });
  //Genre.hasMany(Book);(Book, { as: 'book' });
  // Book.belongsTo(Genre, {as: "genre"});
  // Reader.hasMany(Book);
  // Author.belongsTo(Book);
  // unsure whats going on hear ^^^VVV

  Genre.hasMany(Book);
  Book.belongsTo(Genre);
  Author.hasMany(Book);
  Book.belongsTo(Author);
  Reader.hasMany(Book);
  Book.belongsTo(Reader);


  connection.sync({ alter: true });
  return {
    Reader,
    Book,
    Author,
    Genre,
  };
};

module.exports = setupDatabase();
