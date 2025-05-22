import request from "supertest";
import { insect1, insect3 } from "../../fixtures.js";
import app from "../../../server/app.js";
import setupTestDatabase from "../../../test-utils/setupTestDatabase.js";
import { BugResponse, ErrorResponse } from "../../../server/types.js";
import statusCodes from "../../../globals/statusCodes.js";

setupTestDatabase();

describe("Given the GET /bugs/:id endpoint", () => {
  describe("When it receives a request with Insect One's ID", () => {
    test("Then it should respond with Insect One", async () => {
      const response = await request(app).get(`/bugs/${insect1._id}`);

      const { bug } = response.body as BugResponse;

      expect(bug).toStrictEqual(
        expect.objectContaining({ commonName: insect1.commonName }),
      );
    });
  });

  describe("When it receives a request with Insect Three's ID which doesn't exist", () => {
    test(`Then it should respond with error 404 'Bug with ID '${insect3._id}' doesn't exist`, async () => {
      const expectedErrorMessage = `Bug with ID '${insect3._id}' doesn't exist`;

      const response = await request(app).get(`/bugs/${insect3._id}`);

      const { error } = response.body as ErrorResponse;

      expect(response.status).toBe(statusCodes.NOT_FOUND);
      expect(error).toBe(expectedErrorMessage);
    });
  });

  describe("When it receives a request with 'XXXX' invalid ID", () => {
    test("Then it should respond with error 400 'Invalid object ID'", async () => {
      const invalidId = "XXXX";

      const response = await request(app).get(`/bugs/${invalidId}`);

      const { error } = response.body as ErrorResponse;

      expect(response.status).toBe(statusCodes.BAD_REQUEST);
      expect(error).toBe("Invalid object ID");
    });
  });
});
