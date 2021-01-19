const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");
const { Reader, Book } = require("../src/models");

describe("/books", () => {
  let books;
  before(async () => {
    try {
      await Book.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });
  beforeEach(async () => {
    try {
      await Book.destroy({ where: {} });
      reader = await Reader.create({
        name: "Jane Doe",
        email: "J_Doe@email.com",
        password: "Password1"
      });
      books = await Promise.all([
        Book.create({ name: "Odyssey", author: "Homer", genre: "Greek epic poem", ISBN: "1234" }),
        Book.create({ name: "Ishmael", author: "Daniel Quinn", genre: "Philosophical novel", ISBN: "4321" }),
        Book.create({ name: "Tao Te Ching", author: "Lau Tzu", genre: "Philosophy", ISBN: "9876" }),
      ]);
    } catch (err) {
      console.log(err);
    }
  });
  //------------------------------needs a check---------------------------------------------
  describe("POST /readers/:readerId/books", () => {
    it("creates a new book for a given reader", async () => {
      const response = await request(app).post(`/books`).send({
          name: "Odyssey",
          author: "Homer",
          genre: "Greek epic poem",
          ISBN: "1234",
        })
        .then((res) => {
          Book.findByPk(res.body.id, { raw: true })
            .then((book) => {
              expect(res.status).to.equal(201);
              expect(book.name).to.equal("Odyssey");
              expect(book.author).to.equal("Homer");
              expect(book.genre).to.equal("Greek epic poem");
              expect(book.ISBN).to.equal("1234");
              done();
            })
            .catch((error) => done(error));
        })
    });
    it("returns a 404 if the name of book is null", (done) => {
      request(app)
        .post("/books")
        .send({
          author: 'Homer',
          genre: 'Greek epic poem',
          ISBN: '1234',
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error[0]).to.equal("Name cannot be empty, please enter a book name.");
          done()
        })
        .catch((error) => done(error));
    });
    it("returns a 404 if the author is null", (done) => {
      request(app)
        .post("/books")
        .send({
          name: 'Odyssey',
          genre: 'Greek epic poem',
          ISBN: '1234',
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error[0]).to.equal("Author cannot be empty, please enter an Author.");
          done();
        })
        .catch((error) => done(error)); 
    })
  });
   
  describe("GET /books", () => {

    it("gets all book records", (done) => {
      request(app)
        .get(`/books`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(3);
          res.body.forEach((book) => {
            const expected = books.find((a) => a.id === book.id);
            expect(book.name).to.equal(expected.name);
            expect(book.author).to.equal(expected.author);
            expect(book.genre).to.equal(expected.genre);
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
          expect(res.body.name).to.equal(book.name);
          expect(res.body.author).to.equal(book.author);
          expect(res.body.genre).to.equal(book.genre);
          expect(res.body.ISBN).to.equal(book.ISBN);
          done();
        })
        .catch((error) => done(error));
    });
    it("returns a 404 if the artist does not exist", (done) => {
      request(app)
        .get("/books/12345")
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The reader could not be found.");
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
        .send({ name: "Ishmael" })
        .then((res) => {
          expect(res.status).to.equal(200);
          Book.findByPk(book.id, { raw: true }).then((updatedBook) => {
            expect(updatedBook.name).to.equal("Ishmael");
            done();
          });
        })
        .catch((error) => done(error));
    });
    it("updates book author by id", (done) => {
      const book = books[0];
      request(app)
        .patch(`/books/${book.id}`)
        .send({ author: "Daniel Quinn" })
        .then((res) => {
          expect(res.status).to.equal(200);
          Book.findByPk(book.id, { raw: true }).then((updatedBook) => {
            expect(updatedBook.author).to.equal("Daniel Quinn");
            done();
          });
        })
        .catch((error) => done(error));
    });
    //-----------------------------take a look ----------------------------------------------
    it("updates book genre by id", (done) => {
      const book = books[0];
      request(app)
        .patch(`/books/${book.id}`)
        .send({ genre: "Philosophical novel" })
        .then((res) => {
          expect(res.status).to.equal(200);
          Book.findByPk(book.id, { raw: true }).then((updatedBook) => {
            expect(updatedBook.genre).to.equal("Philosophical novel");
            done();
          });
        })
        .catch((error) => done(error));
    });
    it("updates book ISBN by id", (done) => {
      const book = books[0];
      request(app)
        .patch(`/books/${book.id}`)
        .send({ ISBN: "4321" })
        .then((res) => {
          expect(res.status).to.equal(200);
          Book.findByPk(book.id, { raw: true }).then((updatedBook) => {
            expect(updatedBook.ISBN).to.equal("4321");
            done();
          });
        })
        .catch((error) => done(error));
    });
    //----------------------------take a look---------------------------------------------
    it("returns a 404 if the book does not exist", (done) => {
      request(app)
        .patch("/books/12345")
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The reader could not be found.");
          done();
        })
        .catch((error) => done(error));
    });
  });
  //------------------------------------------------------------------------------------------
  describe("DELETE /books/:bookId", () => {
    it("deletes book record by id", (done) => {
      const book = books[0];
      request(app)
        .delete(`/books/${book.id}`)
        .then((res) => {
          expect(res.status).to.equal(204);
          Book.findByPk(book.id, { raw: true }).then((updatedBook) => {
            expect(updatedBook).to.equal(null);
            done();
          });
        })
        .catch((error) => done(error));
    });
    it("returns a 404 if the book does not exist", (done) => {
      request(app)
        .delete("/books/54321")
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The book could not be found.");
          done();
        })
        .catch((error) => done(error));
    });
  });
});
