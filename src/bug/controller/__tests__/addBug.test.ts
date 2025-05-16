import { Model } from "mongoose";
import { Response } from "express";
import setupTestDatabase from "../../../test-utils/setupTestDatabase.js";
import { BugStructure } from "../../types.js";
import BugsController from "../BugsController.js";
import {
  insectDataDto1,
  insectDataDto2,
  insectDataDto3,
} from "../../dto/fixtures.js";
import { insect1, insect2 } from "../../fixtures.js";
import { BugResponse, BugsRequest } from "../../../server/types.js";
import statusCodes from "../../../globals/statusCodes.js";
import ServerError from "../../../server/ServerError/ServerError.js";
import { BugDataDto } from "../../dto/types.js";

setupTestDatabase();

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given the addBug method of BugsController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Pick<Response<BugResponse>, "status" | "json">;
  const next = jest.fn();

  describe("When it receives a request with insect 1 data, and a response", () => {
    const bugModel = {
      exists: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(insect1),
    } as Pick<Model<BugStructure>, "exists">;

    const req = {
      body: {
        bugData: insectDataDto1,
      },
    } as Pick<BugsRequest, "body">;

    test("Then it should call the response's status method with status code 201", async () => {
      const bugsController = new BugsController(
        bugModel as Model<BugStructure>,
      );

      await bugsController.addBug(
        req as BugsRequest,
        res as Response<BugResponse>,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(statusCodes.CREATED);
    });

    test("Then it should call the response's json method with insect 1", async () => {
      const bugsController = new BugsController(
        bugModel as Model<BugStructure>,
      );

      await bugsController.addBug(req as BugsRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({
        bug: expect.objectContaining({ commonName: insect1.commonName }),
      });
    });
  });

  describe("When it receives a request with insect 2 existing data, and a next function", () => {
    test(`Then it should call the next function with error 409 'Bug with name '${insectDataDto2.name}' already exists'`, async () => {
      const bugModel = {
        exists: jest.fn().mockResolvedValue({ _id: insect2._id }),
      } as Pick<Model<BugStructure>, "exists">;

      const req = {
        body: {
          bugData: insectDataDto2,
        },
      } as Pick<BugsRequest, "body">;

      const bugsController = new BugsController(
        bugModel as Model<BugStructure>,
      );

      await bugsController.addBug(req as BugsRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new ServerError(
          statusCodes.CONFLICT,
          `Bug with name '${insectDataDto2.name}' already exists`,
        ),
      );
    });
  });

  describe("When it receives a request with insect 3 with invalid name 'A', and a next function", () => {
    test("Then it should call the next function with error 400 'Bug validation failed: commonName: Minimum 3 characters required'", async () => {
      const expectedError = new ServerError(
        statusCodes.BAD_REQUEST,
        "Bug validation failed: commonName: Minimum 3 characters required",
      );

      const bugModel = {
        exists: jest.fn().mockResolvedValue(null),
        create: jest.fn(() => {
          throw expectedError;
        }),
      } as Pick<Model<BugStructure>, "exists" | "create">;

      const bugsController = new BugsController(
        bugModel as Model<BugStructure>,
      );

      const insectDataDto3WithInvalidName: BugDataDto = {
        ...insectDataDto3,
        name: "A",
      };

      const req = {
        body: {
          bugData: insectDataDto3WithInvalidName,
        },
      } as Pick<BugsRequest, "body">;

      await bugsController.addBug(req as BugsRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
