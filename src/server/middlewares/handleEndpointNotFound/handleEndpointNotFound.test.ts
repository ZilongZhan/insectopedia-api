import { Request, Response } from "express";
import handleEndpointNotFound from "./handleEndpointNotFound.js";
import statusCodes from "../../../globals/statusCodes.js";

describe("Given the handleEndpointNotFound middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the next function with error 404 'Endpoint not found'", () => {
      const expectedErrorMessage = "Endpoint not found";

      const req = {};
      const res = {};
      const next = jest.fn();

      handleEndpointNotFound(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: statusCodes.NOT_FOUND,
          message: expectedErrorMessage,
        }),
      );
    });
  });
});
