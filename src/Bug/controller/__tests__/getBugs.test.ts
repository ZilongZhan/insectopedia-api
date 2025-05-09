import { Response } from "express";
import { Model, Query } from "mongoose";
import statusCodes from "../../../globals/statusCodes.js";
import { BugStructure } from "../../types.js";
import { BugsRequest } from "../types.js";
import BugsController from "../BugsController.js";
import {
  insect1,
  insect10,
  insect2,
  insect3,
  insect4,
  insect5,
  insect6,
  insect7,
  insect8,
  insect9,
} from "../../fixtures.js";

describe("Given the getBugs method of BugsController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Pick<Response, "status" | "json">;

  const bugsTotal = 16;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("When it receives a request and a response", () => {
    const bugs = [insect1, insect2, insect3, insect4, insect5];

    const query = {
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockReturnValue(bugs),
    } as Pick<Query<BugStructure[], BugStructure>, "skip" | "limit" | "exec">;

    const bugModel = {
      find: jest.fn().mockReturnValue(query),
      countDocuments: jest.fn().mockReturnValue(bugsTotal),
    } as Pick<Model<BugStructure>, "find">;

    const bugsController = new BugsController(bugModel as Model<BugStructure>);

    const req = {
      query: {},
    } as Pick<BugsRequest, "query">;

    test("Then it should call the response's status method with status code 200", async () => {
      const expectedStatusCode = statusCodes.OK;

      await bugsController.getBugs(req as BugsRequest, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json method with recipes 1 to 5", async () => {
      await bugsController.getBugs(req as BugsRequest, res as Response);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ bugs }));
    });

    test("Then it should call the response's json method with 16 total bugs", async () => {
      await bugsController.getBugs(req as BugsRequest, res as Response);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ bugsTotal }),
      );
    });
  });

  describe("When it receives a request with pageNumber 2 and a response", () => {
    test("Then it should call the reponse's json method with recipes 6 to 10", async () => {
      const bugs = [insect6, insect7, insect8, insect9, insect10];

      const query = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockReturnValue(bugs),
      } as Pick<
        Query<BugStructure[], BugStructure>,
        "sort" | "skip" | "limit" | "exec"
      >;

      const bugModel = {
        find: jest.fn().mockReturnValue(query),
        countDocuments: jest.fn().mockReturnValue(bugsTotal),
      } as Pick<Model<BugStructure>, "find">;

      const bugsController = new BugsController(
        bugModel as Model<BugStructure>,
      );

      const req = {
        query: {
          pageNumber: "2",
        },
      } as Pick<BugsRequest, "query">;

      await bugsController.getBugs(req as BugsRequest, res as Response);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ bugs }));
    });
  });
});
