import request from "supertest";
import app from "../../../server/app.js";
import setupTestDatabase from "../../../test-utils/setupTestDatabase.js";
import { BugsDataResponse } from "../../../server/types.js";
import { insect1, insect2 } from "../../fixtures.js";

setupTestDatabase();

describe("Given the GET /bugs endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with insect 1 and insect 2 and a number 2", async () => {
      const expectedBugsTotal = 2;

      const response = await request(app).get("/bugs");

      const { bugs, bugsTotal } = response.body as BugsDataResponse;

      expect(bugs).toContainEqual(
        expect.objectContaining({ commonName: insect1.commonName }),
      );
      expect(bugs).toContainEqual(
        expect.objectContaining({ commonName: insect2.commonName }),
      );
      expect(bugsTotal).toBe(expectedBugsTotal);
    });
  });
});
