import request from "supertest";
import { mapBugDataDtoToBugData } from "../../dto/mappers.js";
import { insectDataDto1 } from "../../dto/fixtures.js";
import app from "../../../server/app.js";
import { insect1, insect3 } from "../../fixtures.js";
import { BugResponse, ErrorResponse } from "../../../server/types.js";
import setupTestDatabase from "../../../test-utils/setupTestDatabase.js";
import { BugDataDto } from "../../dto/types.js";
import statusCodes from "../../../globals/statusCodes.js";

setupTestDatabase();

describe("Given the PUT /bugs/:id endpoint", () => {
  describe("When it receives a request with Insect One's ID and modified data", () => {
    test("Then it should respond with modified Insect One", async () => {
      const modifiedInsect1Dto: BugDataDto = {
        ...insectDataDto1,
        name: "Insecto Uno",
      };
      const modifiedInsect1 = mapBugDataDtoToBugData(modifiedInsect1Dto);

      const response = await request(app)
        .put(`/bugs/${insect1._id}`)
        .send({ bugData: modifiedInsect1Dto });

      const { bug } = response.body as BugResponse;

      expect(bug).toStrictEqual(expect.objectContaining(modifiedInsect1));
    });
  });

  describe("When it receives a request with Insect Three's ID which doesn't exist", () => {
    test(`Then it should respond with error 404 'Bug with ID '${insect3._id}' doesn't exist'`, async () => {
      const expectedErrorMessage = `Bug with ID '${insect3._id}' doesn't exist`;

      const response = await request(app).put(`/bugs/${insect3._id}`);

      const { error } = response.body as ErrorResponse;

      expect(response.status).toBe(statusCodes.NOT_FOUND);
      expect(error).toBe(expectedErrorMessage);
    });
  });

  describe("When it receives a request with 'XXXX' invalid ID", () => {
    test("Then it should respond with error 500 'Invalid object ID'", async () => {
      const invalidId = "XXXX";
      const expectedErrorMessage = "Invalid object ID";

      const response = await request(app).put(`/bugs/${invalidId}`);

      const { error } = response.body as ErrorResponse;

      expect(response.status).toBe(statusCodes.BAD_REQUEST);
      expect(error).toBe(expectedErrorMessage);
    });
  });
});
