import request from "supertest";
import app from "../../../server/app.js";
import { insect1, insect3 } from "../../fixtures.js";
import { BugResponse, ErrorResponse } from "../../../server/types.js";
import { BugStructure } from "../../types.js";
import setupTestDatabase from "../../../test-utils/setupTestDatabase.js";
import statusCodes from "../../../globals/statusCodes.js";

setupTestDatabase();

describe("Given the PATCH /bugs/:id endpoint", () => {
  describe("When it receives a request with Insect One's ID which is not a favorite bug", () => {
    test("Then it should respond with Insect One which is a favorite bug", async () => {
      const updatedInsectOne: BugStructure = {
        ...insect1,
        isFavorite: true,
      };

      const response = await request(app).patch(`/bugs/${insect1._id}`);

      const { bug } = response.body as BugResponse;

      expect(bug).toStrictEqual(
        expect.objectContaining({
          commonName: updatedInsectOne.commonName,
          isFavorite: updatedInsectOne.isFavorite,
        }),
      );
    });
  });

  describe("When it receives a request with Insect Three's ID which doesn't exist", () => {
    test(`Then it should respond with error 404 'Bug with ID ${insect3._id} doesn't exist'`, async () => {
      const expectedErrorMessage = `Bug with ID '${insect3._id}' doesn't exist`;

      const response = await request(app).patch(`/bugs/${insect3._id}`);

      const { error } = response.body as ErrorResponse;

      expect(response.status).toBe(statusCodes.NOT_FOUND);
      expect(error).toBe(expectedErrorMessage);
    });
  });

  describe("When it receives a request with 'XXXX' invalid ID", () => {
    test("Then it should respond with error 400 'Invalid object ID'", async () => {
      const invalidId = "XXXX";
      const expectedErrorMessage = "Invalid object ID";

      const response = await request(app).patch(`/bugs/${invalidId}`);

      const { error } = response.body as ErrorResponse;

      expect(response.status).toBe(statusCodes.BAD_REQUEST);
      expect(error).toBe(expectedErrorMessage);
    });
  });
});
