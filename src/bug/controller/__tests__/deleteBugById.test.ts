import { Model } from "mongoose";
import { Response } from "express";
import { insect1, insect2 } from "../../fixtures.js";
import { BugStructure } from "../../types.js";
import BugsController from "../BugsController.js";
import { BugResponse, BugsRequest } from "../../../server/types.js";
import statusCodes from "../../../globals/statusCodes.js";
import ServerError from "../../../server/ServerError/ServerError.js";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given the deleteBugById method of BugsController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Pick<Response<BugResponse>, "status" | "json">;
  const next = jest.fn();

  describe("When it receives a request with Insect One's ID, and a response", () => {
    const bugId = insect1._id.toString();
    const bugModel = {
      exists: jest.fn().mockResolvedValue({ _id: insect1._id }),
      findByIdAndDelete: jest.fn().mockResolvedValue(insect1),
    } as Pick<Model<BugStructure>, "exists" | "findByIdAndDelete">;

    const bugController = new BugsController(bugModel as Model<BugStructure>);

    const req = {
      params: {
        id: bugId,
      },
    } as Pick<BugsRequest, "params">;

    test("Then it should the response's status method with status code 200", async () => {
      await bugController.deleteBugById(
        req as BugsRequest,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
    });

    test("Then it should call the response's json method with Insect One", async () => {
      await bugController.deleteBugById(
        req as BugsRequest,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ bug: insect1 });
    });
  });

  describe("When it receives a request with Insect Two's ID which doesn't exist", () => {
    test(`Then it should call the next function with error 404 'Bug with ID '${insect2._id}' doesn't exist`, async () => {
      const bugId = insect2._id.toString();
      const expectedError = new ServerError(
        statusCodes.NOT_FOUND,
        `Bug with ID '${insect2._id}' doesn't exist`,
      );

      const bugModel = {
        exists: jest.fn().mockResolvedValue(null),
      } as Pick<Model<BugStructure>, "exists">;

      const bugsController = new BugsController(
        bugModel as Model<BugStructure>,
      );

      const req = {
        params: {
          id: bugId,
        },
      } as Pick<BugsRequest, "params">;

      await bugsController.deleteBugById(
        req as BugsRequest,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
