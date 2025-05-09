import { NextFunction, Request, Response } from "express";
import ServerError from "../../ServerError/ServerError.js";
import statusCodes from "../../../globals/statusCodes.js";

const handleEndpointNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const errorMessage = "Endpoint not found";

  const error = new ServerError(statusCodes.NOT_FOUND, errorMessage);

  next(error);
};

export default handleEndpointNotFound;
