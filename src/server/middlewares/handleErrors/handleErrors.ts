import { NextFunction, Request, Response } from "express";
import createDebug from "debug";
import ServerError from "../../ServerError/ServerError.js";
import statusCodes from "../../../globals/statusCodes.js";

const debug = createDebug("insectopedia:server:error");

const handleErrors = (
  error: ServerError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  debug(error.message);
  debug(error.stack);

  res.status(error.statusCode ?? statusCodes.INTERNAL_SERVER_ERROR).json({
    error:
      error instanceof ServerError && error.message
        ? error.message
        : "Server error",
  });
};

export default handleErrors;
