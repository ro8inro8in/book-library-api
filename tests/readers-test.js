/*const request = require("supertest");
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
          await Reader.destroy.sync();
      } catch (err) {
          console.log(err);
      }
  });
  describe('POST /readers', async () => {
      it('creates a new reader in the database', async () => {
          try {
              const response = await (await request(app).post('/readers').send({
                  name: 'Jane Doe',
                  email: 'J_Doe@email.com'
              })
             await expect(response.status).to.equal(201)
             expect(response.body.name).to.equal('Jane Doe');
             const insertedReaderRecords = await Reader.findByPk(response.body.id, { raw: true });
             expect(insertedReaderRecords.name).to.equal('Jane Doe');
             expect(insertedReaderRecords.email).to.equal('J_Doe@email.com');
          } catch(err) {
          done(err)
          }
      })
  })
});*/
