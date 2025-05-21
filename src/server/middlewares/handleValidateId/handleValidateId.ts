import { NextFunction, Response } from "express";
import { BugsRequest } from "../../types.js";
import { isValidObjectId } from "mongoose";
import statusCodes from "../../../globals/statusCodes.js";
import ServerError from "../../ServerError/ServerError.js";

const handleValidateId = (
  req: BugsRequest,
  _res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    const error = new ServerError(statusCodes.BAD_REQUEST, "Invalid object ID");

    next(error);

    return;
  }

  next();
};

export default handleValidateId;
