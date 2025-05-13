import { Model } from "mongoose";
import { Response } from "express";
import { BugStructure } from "../types.js";
import { BugsControllerStructure } from "./types.js";
import statusCodes from "../../globals/statusCodes.js";
import { BugsRequest } from "../../server/types.js";

class BugsController implements BugsControllerStructure {
  constructor(private readonly bugModel: Model<BugStructure>) {}

  public getBugsData = async (
    req: BugsRequest,
    res: Response,
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
