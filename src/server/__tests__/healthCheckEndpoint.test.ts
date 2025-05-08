import request from "supertest";
import app from "../app.js";

describe("Given the GET / endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status code 200 and message 'OK'", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "OK";

      const response = await request(app).get("/");

      const { message } = response.body as { message: string };

      expect(response.status).toBe(expectedStatusCode);
      expect(message).toBe(expectedMessage);
    });
  });
});
