import request from "supertest";
import app from "../app.js";
import statusCodes from "../../globals/statusCodes.js";
import { ErrorResponse } from "../types.js";

describe("Given the /test non-existend endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with error 404 'Endpoint not found'", async () => {
      const expectedErrorMessage = "Endpoint not found";

      const response = await request(app).get("/test");

      const { error } = response.body as ErrorResponse;

      expect(error).toBe(expectedErrorMessage);
      expect(response.status).toBe(statusCodes.NOT_FOUND);
    });
  });
});
