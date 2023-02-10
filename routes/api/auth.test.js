const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const app = require("../../app");

const {MONGO_URL_TEST, PORT_TEST} = process.env;

describe("test auth routes", ()=> {
    mongoose.set('strictQuery', true);

    let server;
    beforeAll((done) => {
        server = app.listen(PORT_TEST);
        mongoose.connect(MONGO_URL_TEST).then(()=> done());
    });

    afterAll((done)=> {
        mongoose.connection.db.dropCollection('contacts')
        mongoose.connection.db.dropCollection('users', () => {
            mongoose.connection.close(()=> done())
        });
        server.close();
    });

    test("test login route", async()=> {
        const newUser = {
            email: "test@test.com",
            password: "1111111aaa"
        };

        const user = await request(app).post("/api/auth/register").send(newUser);
        const { subscription, email } = user.body;

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
//Check object "user" in responce
        expect(body.data.user).toBeTruthy();
//Check qty of properties
        expect(Object.keys(body.data.user).length).toBe(2);
//Check object properties "email" & "subscription" are exist
        expect(body.data.user.email).toBeTruthy();
        expect(body.data.user.subscription).toBeTruthy();
//Check object properties "email" & "subscription" are valid
        expect(body.data.user.email).toBe(email);
        expect(body.data.user.subscription).toBe(subscription);
//Check typeOf object properties "email" & "subscription" are "string"
        expect(typeof body.data.user.email).toBe("string");
        expect(typeof body.data.user.subscription).toBe("string");
    })
})