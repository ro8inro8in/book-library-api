const request = require("supertest");
const { expect } = require("chai");
const { Reader } = require("../src/models");
const app = require("../src/app");

describe("/readers", () => {
  before(async () => {
    try {
      await Reader.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });
  beforeEach(async () => {
    try {
      await Reader.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });
  describe("POST /readers", async () => {
    it("creates a new reader in the database", async () => {
      const response = await request(app).post("/readers").send({
        name: "Jane Doe",
        email: "J_Doe@email.com",
        password: "Password1",
      });
      expect(response.status).to.equal(201);
      expect(response.body.name).to.equal("Jane Doe");
      const insertedReaderRecords = await Reader.findByPk(response.body.id, {
        raw: true,
      });
      expect(insertedReaderRecords.name).to.equal("Jane Doe");
      expect(insertedReaderRecords.email).to.equal("J_Doe@email.com");
      expect(insertedReaderRecords.password).to.equal("Password1");
    });
  });
  describe("with readers in the database", () => {
    let readers;
    beforeEach((done) => {
      Promise.all([
        Reader.create({ name: "Jane Doe", email: "J_Doe@email.com", password: "Password1"}),
        Reader.create({ name: "Jim Doe", email: "jim_doe@email.com", password: "Password1" }),
        Reader.create({ name: "Jo Jim", email: "jo_jimmy666@email.com", password: "Password1" }),
      ]).then((documents) => {
        readers = documents;
        done();
      });
    });
    describe("GET /readers", () => {
      it("gets all readers records", (done) => {
        request(app)
          .get("/readers")
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(readers.name);
            expect(res.body.email).to.equal(readers.email);
            expect(res.body.password).to.equal(readers.password);
            done();
          })
          .catch((error) => done(error));
      });
    });
    describe("GET /readers/:id", () => {
      it("gets readers record  by id", (done) => {
        const reader = readers[0];
        request(app)
          .get(`/readers/${reader.id}`)
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(reader.name);
            expect(res.body.email).to.equal(reader.email);
            expect(res.body.password).to.equal(reader.password);
            done();
          })
          .catch((error) => done(error));
      });
      it("returns a 404 if the reader does not exist", (done) => {
        request(app)
          .get("/readers/12345")
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal("The reader could not be found");
            done();
          })
          .catch((error) => done(error));
      });
    });
    describe("PATCH /readers/:id", () => {
      it("updates readers email by id", (done) => {
        const reader = readers[0];
        request(app)
          .patch(`/readers/${reader.id}`)
          .send({ email: "Jane_Doe@email.com" })
          .then((res) => {
            expect(res.status).to.equal(200);
            Reader.findByPk(reader.id, { raw: true }).then((updateReader) => {
              expect(updateReader.email).to.equal("Jane_Doe@email.com");
              done();
            });
          })
          .catch((error) => done(error));
      });
      it("returns a 404 if the reader does not exist", (done) => {
        request(app)
          .patch("/readers/12345")
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal("The reader could not be found");
            done();
          })
          .catch((error) => done(error));
      });
    });
    describe('DELETE /reader/:id', () => {
      it('deletes reader record by id', async () => {
        const reader = readers[0];
        const response = await request(app).delete(`/readers/${reader.id}`);
        const deletedReader = await Reader.findByPk(reader.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedReader).to.equal(null);
      });
      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app).delete('/readers/12345');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found');
      });
    });
  });
});
