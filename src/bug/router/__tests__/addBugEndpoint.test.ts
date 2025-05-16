import request from "supertest";
import setupTestDatabase from "../../../test-utils/setupTestDatabase.js";
import app from "../../../server/app.js";
import { insectDataDto1, insectDataDto3 } from "../../dto/fixtures.js";
import { insect3 } from "../../fixtures.js";
import { ErrorResponse } from "../../../server/types.js";
import statusCodes from "../../../globals/statusCodes.js";
import { BugDataDto } from "../../dto/types.js";

setupTestDatabase();

describe("Given the POST /bugs endpoint", () => {
  describe("When it receives a request with insect 3 data", () => {
    test("Then it should respond with insect 3", async () => {
      const response = await request(app)
        .post("/bugs")
        .send({ bugData: insectDataDto3 });

      const { bug } = response.body;

      expect(bug).toEqual(
        expect.objectContaining({ commonName: insect3.commonName }),
      );
    });
  });

  describe("When it receives a request with insect 1 data which already exists", () => {
    test(`Then it should respond with error 409 'Bug with name ${insectDataDto1.name} already exists'`, async () => {
      const expectedErrorMessage = `Bug with name '${insectDataDto1.name}' already exists`;

      const response = await request(app)
        .post("/bugs")
        .send({ bugData: insectDataDto1 });

      const { error } = response.body as ErrorResponse;

      expect(response.status).toBe(statusCodes.CONFLICT);
      expect(error).toBe(expectedErrorMessage);
    });
  });

  describe("When it receives a request with insect 3 with invalid name 'A'", () => {
    test("Then it should respond with error 400 'Error: '", async () => {
      const invalidBugName = "A";
      const expectedErrorMessage =
        "Bug validation failed: commonName: Minimum 3 characters required";

      const insectDataDto3WithInvalidName: BugDataDto = {
        ...insectDataDto3,
        name: invalidBugName,
      };

      const response = await request(app)
        .post("/bugs")
        .send({ bugData: insectDataDto3WithInvalidName });

      const { error } = response.body as ErrorResponse;

      expect(response.status).toBe(statusCodes.BAD_REQUEST);
      expect(error).toBe(expectedErrorMessage);
    });
  });
});
