/*==================
CRUD operation tests
====================*/

const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user");

const testUser2Id = new mongoose.Types.ObjectId();
const testUser2 = {
  _id: testUser2Id,
  name: "testname2",
  password: "xyz123",
  tokens: [
    {
      token: jwt.sign({ _id: testUser2Id }, process.env.JWT_SECRET),
    },
  ],
};
/*----------------------Clear DB before CRUD test suite----------------------*/

beforeAll(async () => {
  await User.deleteMany();
  await new User(testUser2).save();
});

/*----------------------Create company financials----------------------*/

test("Create company financials", async () => {
  await request(app)
    .post("/crud/create")
    .send({
      name: "ITC",
      Revenue_million_USD: "$1000",
    })
    .set('Authorization', `Bearer ${testUser2.tokens[0].token}`)
    .send()
    .expect(200);
});

/*----------------------Read company----------------------*/

test("Read company", async () => {
  await request(app)
    .get("/crud/read?Name=Citigroup")
    .set('Authorization', `Bearer ${testUser2.tokens[0].token}`)
    .send()
    .expect(200);
});

/*----------------------Update company financials----------------------*/

test("Update company revenue", async () => {
  await request(app)
    .patch("/crud/update/:60d866a1fee012bfa094bb67")
    .set('Authorization', `Bearer ${testUser2.tokens[0].token}`)
    .send({
      Revenue_million_USD: "$3000",
    })
    .expect(200);
});

/*----------------------Delete company----------------------*/

test("Delete company", async () => {
    await request(app)
      .delete("/crud/delete/:60d866a1fee012bfa094bb67")
      .set('Authorization', `Bearer ${testUser2.tokens[0].token}`)
      .send()
      .expect(200);
  });
  