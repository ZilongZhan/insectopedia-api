import { Model } from "mongoose";
import { BugData, BugStructure } from "../../types.js";
import { insect1, insect2 } from "../../fixtures.js";
import { insectDataDto1, insectDataDto2 } from "../../dto/fixtures.js";
import { mapBugDataDtoToBugData } from "../../dto/mappers.js";
import BugsController from "../BugsController.js";
import { BugsRequest } from "../../../server/types.js";
import { Response } from "express";
import statusCodes from "../../../globals/statusCodes.js";
import ServerError from "../../../server/ServerError/ServerError.js";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given the editBug method of BugsController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Pick<Response, "status" | "json">;
  const next = jest.fn();

  describe("When it receives a request with Insect One's ID and modified data, and a response", () => {
    const bugId = insect1._id.toString();
    const insect1Data = mapBugDataDtoToBugData(insectDataDto1);
    const editedInsect1Data: BugData = {
      ...insect1Data,
      commonName: "Insecto Uno",
    };

    const bugModel = {
      exists: jest.fn().mockResolvedValue({ _id: insect1._id }),
      findByIdAndUpdate: jest.fn().mockResolvedValue(editedInsect1Data),
    } as Pick<Model<BugStructure>, "findByIdAndUpdate" | "exists">;

    const req = {
      body: {
        bugData: insectDataDto1,
      },
      params: {
        id: bugId,
      },
    } as Pick<BugsRequest, "params" | "body">;

    test("Then it should call the response's status method with status code 200", async () => {
      const bugsController = new BugsController(
        bugModel as Model<BugStructure>,
      );

      await bugsController.editBug(req as BugsRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
    });

    test("Then it should call the response's json method with modifed Insect One", async () => {
      const bugsController = new BugsController(
        bugModel as Model<BugStructure>,
      );

      await bugsController.editBug(req as BugsRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({
        bug: expect.objectContaining(editedInsect1Data),
      });
    });
  });

  describe("When it receives a request with Insect Two's ID which doesn't exist, and a next function", () => {
    test(`Then it should call the next functions method with error 404 'Bug with ID '${insect2._id}' doesn't exist'`, async () => {
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
        body: {
          bugData: insectDataDto2,
        },
        params: {
          id: bugId,
        },
      } as Pick<BugsRequest, "params" | "body">;

      await bugsController.editBug(req as BugsRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
