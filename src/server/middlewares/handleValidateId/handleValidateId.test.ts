import { Response } from "express";
import { insect1 } from "../../../bug/fixtures.js";
import { BugsRequest } from "../../types.js";
import handleValidateId from "./handleValidateId.js";
import ServerError from "../../ServerError/ServerError.js";
import statusCodes from "../../../globals/statusCodes.js";

describe("Given the handleValidateId middleware", () => {
  const res = {};
  const next = jest.fn();

  describe("When it receives a request with Insect One's ID, and a next function", () => {
    test("Then it should call the next function", () => {
      const bugId = insect1._id.toString();

      const req = {
        params: {
          id: bugId,
        },
      } as Pick<BugsRequest, "params">;

      handleValidateId(req as BugsRequest, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a request with 'XXXX' invalid ID", () => {
    test("Then it should call the next function with error 400 'Invalid object ID'", () => {
      const invalidId = "XXXX";

      const req = {
        params: {
          id: invalidId,
        },
      } as Pick<BugsRequest, "params">;

      handleValidateId(req as BugsRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new ServerError(statusCodes.BAD_REQUEST, "Invalid object ID"),
      );
    });
  });
});
