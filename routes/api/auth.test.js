const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const {User} = require("../../models/user");

const {MONGO_URL_TEST, PORT_TEST} = process.env;

describe("test auth routes", ()=> {
    mongoose.set('strictQuery', true);

    let server;
    beforeAll(()=> server = app.listen(PORT_TEST));
    afterAll(()=> server.close());

    beforeEach((done)=> {
        mongoose.connect(MONGO_URL_TEST).then(()=> done())
    });

    afterEach((done) => {
        mongoose.connection.db.dropCollection('users', () => {
            mongoose.connection.close(()=> done())
        });
});

    test("test login route", async()=> {
        const newUser = {
            email: "test@test.com",
            password: "1111111aaa",
            avatarURL: "http://localhost:4321/api/users/avatars/ava.jpg"
        };

        const user = await User.create(newUser);

        const loginUser = {
            email: "test@test.com",
            password: "1111111aaa"
        };

        const response = await request(app).post("/api/auth/login").send(loginUser);
//Check statusCode
        expect(response.statusCode).toBe(200);
//Check token in responce
        const {body} = response;
        expect(body.data.token).toBeTruthy();
//Check token is valid
        const {token} = await User.findById(user._id);
        expect(body.data.token).toBe(token);
//Check object "user" in responce
        expect(body.data.user).toBeTruthy();
//Check qty of properties
        expect(Object.keys(body.data.user).length).toBe(2);
//Check object properties "email" & "subscription" are exist
        expect(body.data.user.email).toBeTruthy();
        expect(body.data.user.subscription).toBeTruthy();
//Check object properties "email" & "subscription" are valid
        const {email, subscription} = await User.findById(user._id);
        expect(body.data.user.email).toBe(email);
        expect(body.data.user.subscription).toBe(subscription);
    })
})