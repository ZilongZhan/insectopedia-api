import { Model } from "mongoose";
import { BugStructure } from "../types.js";
import { BugsControllerStructure } from "./types.js";
import statusCodes from "../../globals/statusCodes.js";
import { BugsDataResponse, BugsRequest } from "../../server/types.js";
import { Response } from "express";

class BugsController implements BugsControllerStructure {
  constructor(private readonly bugModel: Model<BugStructure>) {}

  public getBugsData = async (
    req: BugsRequest,
    res: Response<BugsDataResponse>,
  ): Promise<void> => {
    let { pageNumber } = req.query;

    if (!pageNumber) {
      pageNumber = "1";
    }

    const bugsLimit = 16;
    const startIndex = (Number(pageNumber) - 1) * bugsLimit;

    const bugs = await this.bugModel
      .find<BugStructure>()
      .skip(startIndex)
      .limit(bugsLimit)
      .exec();

    const bugsTotal = await this.bugModel.countDocuments();

    res.status(statusCodes.OK).json({ bugs, bugsTotal });
  };
}

export default BugsController;
