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
          console.log(res.body)
          expect(res.status).to.equal(201);
          Book.findByPk(res.body.id, { raw: true })
            .then((book) => {
              expect(book.name).to.equal("Odyssey");
              expect(book.author).to.equal("Homer");
              //expect(book.artistId).to.equal(artist.id);
              done();
            })
            .catch((error) => done(error));
        })
        .catch((error) => done(error));
    });
  });
});
