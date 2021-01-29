const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");
const { Reader, Book, Genre, Author } = require("../src/models");



describe("/books", () => {
  before(async () => {
    try {
      await Book.sequelize.sync();
      await Genre.sequelize.sync();
      await Author.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });
  beforeEach(async () => {
    try {
      await Book.destroy({ where: {} });
      await Genre.destroy({ where: {} });
      await Author.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });
  describe("POST /readers/:readerId/books", async () => {
    it("creates a new book for a given reader in the database", async () => {
      const genre = await Genre.create({ name: "Greek epic poem" });
      const author = await Author.create({ name: "Homer" });
      const response = await request(app).post("/books").send({
        title: "Odyssey",
        AuthorId: author.id,
        GenreId: genre.id,
        ISBN: "12340",
      });
      await expect(response.status).to.equal(201);
      expect(response.body.title).to.equal("Odyssey");
      const insertedBookRecord = await Book.findByPk(response.body.id, {raw: true});
      expect(insertedBookRecord.title).to.equal("Odyssey");
      expect(insertedBookRecord.AuthorId).to.equal(author.id);
      expect(insertedBookRecord.GenreId).to.equal(genre.id);
      expect(insertedBookRecord.ISBN).to.equal("12340");
    });
    it("returns a 404 if the title of book is null", async () => {
      const genre = await Genre.create({ name: "Odyssey" });
      const author = await Author.create({ name: "Homer" });
      await request(app)
        .post("/books")
        .send({
          AuthorId: author.id,
          GenreId: genre.id,
          ISBN: "123400",
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.contain("Please enter the title");
        });
    });
    it("returns a 404 if the author is null", async () => {
      const genre = await Genre.create({ name: "Odyssey" });
      await request(app)
        .post("/books")
        .send({
          title: "Odyssey",
          GenreId: genre.id,
          ISBN: "123400",
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.contain("Please enter the AuthorId");
        });
    });
  });
    describe("with books in the database", () => {
      let books;
      let genres;
      let authors;

      beforeEach(async () => {
        try {
          await Book.destroy({ where: {} });
          await Genre.destroy({ where: {} });
          await Author.destroy({ where: {} });
          authors = await Promise.all([
            Author.create({ name: "Homer" }),
            Author.create({ name: "Daniel Quinn" }),
            Author.create({ name: "Lau Tzu" }),
          ]);
          genres = await Promise.all([
            Genre.create({ name: "Greek epic poem" }),
            Genre.create({ name: "Philosophical novel" }),
            Genre.create({ name: "Philosophy" }),
          ]);
          books = await Promise.all([
            Book.create({
              title: "Odyssey",
              AuthorId: authors[0],
              genreId: genres[0].id,
              ISBN: "1234",
            }),
            Book.create({
              title: "Ishmael",
              AuthorId: authors[1],
              genreId: genres[1].id,
              ISBN: "4321",
            }),
            Book.create({
              title: "Tao Te Ching",
              AuthorId: authors[2],
              genreId: genres[2].id,
              ISBN: "9876",
            }),
          ]);
        } catch (err) {
          console.log(err);
        }
      });
      describe("GET /books", () => {
        console.log(555555);
        it("gets all book records", (done) => {
          request(app)
            .get("/books")
            .then((res) => {
              expect(res.status).to.equal(200);
              expect(res.body.length).to.equal(3);
              res.body.forEach((book) => {
                const expected = books.find((a) => a.id === book.id);
                expect(book.title).to.equal(expected.title);
                expect(book.AuthorId).to.equal(expected.AuthorId);
                expect(book.GenreId).to.equal(expected.GenreId);
                expect(book.ISBN).to.equal(expected.ISBN);
              });
              done();
            })
            .catch((error) => done(error));
        });
      });
      describe("GET /books/:id", () => {
        it("gets book by ID", (done) => {
          const book = books[0];
          request(app)
            .get(`/books/${book.id}`)
            .then((res) => {
              expect(res.status).to.equal(200);
              expect(res.body.title).to.equal(book.title);
              expect(res.body.AuthorId).to.equal(book.AuthorId);
              expect(res.body.GenreId).to.equal(book.GenreId);
              expect(res.body.ISBN).to.equal(book.ISBN);
              done();
            })
            .catch((error) => done(error));
        });
        it("returns a 404 if the book does not exist", (done) => {
          request(app)
            .get("/books/12345")
            .then((res) => {
              expect(res.status).to.equal(404);
              expect(res.body.error).to.equal("The book could not be found.");
              done();
            })
            .catch((error) => done(error));
        });
      });
      //--------------------------------------------RE-DO-----------------------------------
      describe("PATCH /books/:id", () => {
        it("updates book name by id", (done) => {
          const book = books[0];
          request(app)
            .patch(`/books/${book.id}`)
            .send({ title: "Ishmael" })
            .then((res) => {
              expect(res.status).to.equal(200);
              Book.findByPk(book.id, { raw: true }).then((updatedBook) => {
                expect(updatedBook.title).to.equal("Ishmael");
                done();
              });
            })
            .catch((error) => done(error));
        });
        //check for async instead of done---------------///////////
        it("updates book author by id", async () => {
          const book = books[0];
          request(app)
            .patch(`/books/${book.id}`)
            .send({ authorId: authors[2].id })
            .then((res) => {
              expect(res.status).to.equal(200);
              Book.findByPk(book.id, { raw: true }).then((updatedBook) => {
                expect(updatedBook.AuthorId.name).to.equal("Homer");
                done();
              });
            })
            .catch((error) => done(error));
        });
        //-----------------------------take a look ----------------------------------------------
        it("updates book genre by id", async () => {
          const book = books[0];
          //console.log(book.id)
          request(app)
            .patch(`/books/${book.id}`)
            .send({ genreId: genres[1].id })
            .then((res) => {
              expect(res.status).to.equal(200);
              Book.findByPk(book.id, { raw: true }).then((updatedBook) => {
                expect(updatedBook.genreId.name).to.equal("Odyssey");
                done();
              });
            })
            .catch((error) => done(error));
        });
        it("updates book ISBN by id", async () => {
          const book = books[0];
          request(app)
            .patch(`/books/${book.id}`)
            .send({ ISBN: "43210" })
            .then((res) => {
              expect(res.status).to.equal(200);
              Book.findByPk(book.id, { raw: true })
                .then((updatedBook) => {
                  expect(updatedBook.ISBN).to.equal("43210");
                  done();
                })
                .catch((error) => done(error));
            });
        });
        //----------------------------take a look---------------------------------------------
        it('returns a 404 if the book does not exist', (done) => {
          request(app)
            .patch('/books/12345')
            .then((res) => {
              expect(res.status).to.equal(404);
              expect(res.body.error).to.equal('The book could not be found.');
              done();
            })
            .catch((error) => done(error));
        });
      });
      //------------------------------------------------------------------------------------------
      describe("DELETE /books/:id", () => {
        it("deletes book record by id", async () => {
          const book = books[0];
          const response = await request(app).delete(`/books/${book.id}`);
          const deletedBook = await Book.findByPk(book.id, { raw: true });

          expect(response.status).to.equal(204);
          expect(deletedBook).to.equal(null);
        });
        

        it("returns a 404 if the book does not exist", async () => {
          const response = await request(app).delete("/books/12345");
          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal("The book could not be found.");
        });
      });
    });
  });

