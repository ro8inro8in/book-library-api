const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");
const { Reader, Book } = require("../src/models");

describe("/books", () => {
  let reader;
  let books;
  before(async () => {
    try {
      await Reader.sequelize.sync();
      await Book.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });
  beforeEach(async () => {
    try {
      await Reader.destroy({ where: {} });
      await Book.destroy({ where: {} });
      reader = await Reader.create({
        name: "Jane Doe",
        email: "J_Doe@email.com",
      });
      books = await Promise.all([
        Book.create({ name: "Odyssey", author: "Homer" }),
        Book.create({ name: "Ishmael", author: "Daniel Quinn" }),
        Book.create({ name: "Tao Te Ching", author: "Lau Tzu" }),
      ]);
    } catch (err) {
      console.log(err);
    }
  });
  describe("POST /readers/:readerId/books", () => {
    it("creates a new book for a given reader", (done) => {
      request(app)
        .post(`/readers/${reader.id}/books`)
        .send({
          name: "Odyssey",
          author: "Homer",
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          Book.findByPk(res.body.id, { raw: true })
            .then((book) => {
              expect(book.name).to.equal("Odyssey");
              expect(book.author).to.equal("Homer");
              expect(book.readerId).to.equal(reader.id);
              done();
            })
            .catch((error) => done(error));
        })
        .catch((error) => done(error));
    });
    it("returns a 404 and does not create a book if the reader does not exist", (done) => {
      request(app)
        .post("/readers/1234/books")
        .send({
          name: "Odyssey",
          author: "Homer",
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The reader could not be found.");
          Book.findAll()
            .then((books) => {
              expect(books.length).to.equal(3);
              done();
            })
            .catch((error) => done(error));
        })
        .catch((error) => done(error));
    });
  });
  describe("GET /books", () => {
    it("gets all book records", (done) => {
      request(app)
        .get(`/readers/${reader.id}/books`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(3);
          res.body.forEach((book) => {
            const expected = books.find((a) => a.id === book.id);
            expect(book.name).to.equal(expected.name);
            expect(book.author).to.equal(expected.author);
          });
          done();
        })
        .catch((error) => done(error));
    });
  });

  // Just started booksById nothing working yet so will pick up later.
  describe("GET /books/:id", () => {
    it("gets book by ID", (done) => {
      const book = books[0];
      request(app)
        .get(`/books/${book.id}`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(book.name);
          expect(res.body.author).to.equal(book.author);
          done();
        })
        .catch((error) => done(error));
    });
    it("returns a 404 if the artist does not exist", (done) => {
      request(app)
        .get("/books/12345")
        .then((res) => {
          console.log(1)
          expect(res.status).to.equal(404);
          console.log(2)
          expect(res.body.error).to.equal("The reader could not be found.");
          done();
        })
        .catch((error) => done(error));
    });
  });
});
