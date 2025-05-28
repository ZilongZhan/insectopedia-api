import { Model } from "mongoose";
import { BugStructure } from "../../types.js";
import { insect1, insect2 } from "../../fixtures.js";
import BugsController from "../BugsController.js";
import { BugsRequest } from "../../../server/types.js";
import { Response } from "express";
import statusCodes from "../../../globals/statusCodes.js";
import ServerError from "../../../server/ServerError/ServerError.js";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given the toggleIsFavorite method of BugsController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Pick<Response, "status" | "json">;
  const next = jest.fn();

  describe("When it receives a request with Insect One's ID which is not a favorite bug, and a response", () => {
    const bugId = insect1._id.toString();
    const updatedInsectOne: BugStructure = {
      ...insect1,
      isFavorite: !insect1.isFavorite,
    };

    const bugModel = {
      exists: jest.fn().mockResolvedValue({ _id: insect1._id }),
      findById: jest.fn().mockResolvedValue(insect1),
      findByIdAndUpdate: jest.fn().mockResolvedValue(updatedInsectOne),
    } as Pick<Model<BugStructure>, "exists" | "findById" | "findByIdAndUpdate">;

    const req = {
      params: {
        id: bugId,
      },
    } as Pick<BugsRequest, "params">;

    test("Then it should call the response's status method with status code 200", async () => {
      const bugsController = new BugsController(
        bugModel as Model<BugStructure>,
      );

      await bugsController.toggleIsFavorite(
        req as BugsRequest,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
    });

    test("Then it should call the response's json method with Insect One which is a favorite bug", async () => {
      const bugsController = new BugsController(
        bugModel as Model<BugStructure>,
      );

      await bugsController.toggleIsFavorite(
        req as BugsRequest,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ bug: updatedInsectOne });
    });
  });

  describe("When it receives a request with Insect Two's ID which doesn't exist, and a next function", () => {
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

      await bugsController.toggleIsFavorite(
        req as BugsRequest,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
