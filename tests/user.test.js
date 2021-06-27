/*========================
 User authentication tests
==========================*/

const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require("../src/app")
const User = require("../src/models/user")

const testUser1Id = new mongoose.Types.ObjectId();
const testUser1 = {
    _id : testUser1Id,
    name : 'testname1',
    password : 'xyz123',
    tokens : [{
        token : jwt.sign({_id:testUser1Id},process.env.JWT_SECRET)
    }]
   } 
/*----------------------Clear DB before each test----------------------*/
beforeEach(async() => {
   await User.deleteMany()
   await new User(testUser1).save()
})

/*----------------------Test to check sign up----------------------*/

test('Signup user',async() => {
    await request(app).post('/user/new').send({
        name : 'testname',
        password : 'xyz123'
    }).expect(200)
})

/*----------------------Test to check login----------------------*/

test('Login existing user',async() => {
    await request(app).post('/user/login').send({
    name : testUser1.name,
    password : testUser1.password
    }).expect(200)
})

/*----------------------Test to check authentication fail----------------------*/

test('Authentication fail',async() => {
    await request(app).post('/user/login').send({
    name : testUser1.name,
    password : "password"
    }).expect(401)
})

