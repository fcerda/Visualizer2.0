const { expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../server/app");

describe("Test the root path", () => {
    test("It should return an array", async (done) => {
        const response = await request(app).get("/api/clients");
        expect(Array.isArray(response.body)).toBe(true);
        done();
    });
});
describe("Test create user", () => {
    test("It should return the new user", async (done) => {
        const body = {
            username: "test",
            email: "testemail@email.com",
            password: "testpassword",
        };
        const response = await request(app)
            .post("/api/clients/create")
            .send(body);
        expect(response.status).toBe(200);
        expect(response.body.email).toBe(body.email);
        expect(response.body.id).toBeGreaterThan(0);
        done();
    });
});
describe("Test create user without username", () => {
    test("It should return code 500", async (done) => {
        const body = { email: "testemail@email.com", password: "testpassword" };
        const response = await request(app)
            .post("/api/clients/create")
            .send(body);
        expect(response.status).toBe(500);
        done();
    });
});
describe("Test create user without email", () => {
    test("It should return code 500", async (done) => {
        const body = { username: "test", password: "testpassword" };
        const response = await request(app)
            .post("/api/clients/create")
            .send(body);
        expect(response.status).toBe(500);
        done();
    });
});
describe("Test create user without password", () => {
    test("It should return code 500", async (done) => {
        const body = { email: "testemail@email.com", username: "test" };
        const response = await request(app)
            .post("/api/clients/create")
            .send(body);
        expect(response.status).toBe(500);
        done();
    });
});
