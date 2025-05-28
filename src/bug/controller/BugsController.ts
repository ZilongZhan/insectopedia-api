import { Model, Types } from "mongoose";
import { NextFunction, Response } from "express";
import { BugStructure } from "../types.js";
import { BugsControllerStructure } from "./types.js";
import statusCodes from "../../globals/statusCodes.js";
import {
  BugResponse,
  BugsDataResponse,
  BugsRequest,
} from "../../server/types.js";
import ServerError from "../../server/ServerError/ServerError.js";
import { mapBugDataDtoToBugData } from "../dto/mappers.js";

class BugsController implements BugsControllerStructure {
  constructor(private readonly bugModel: Model<BugStructure>) {}

  private readonly doesBugExist = async (
    key: string,
    value: unknown,
  ): Promise<{ _id: Types.ObjectId } | null> => {
    return await this.bugModel.exists({ [key]: value });
  };

  public getBugsData = async (
    req: BugsRequest,
    res: Response<BugsDataResponse>,
  ): Promise<void> => {
    let { pageNumber } = req.query;

    if (!pageNumber) {
      pageNumber = "1";
    }

    const bugsPerPage = 16;
    const startIndex = (Number(pageNumber) - 1) * bugsPerPage;

    const bugs = await this.bugModel
      .find<BugStructure>()
      .sort({ _id: "descending" })
      .skip(startIndex)
      .limit(bugsPerPage)
      .exec();

    const bugsTotal = await this.bugModel.countDocuments();

    res.status(statusCodes.OK).json({ bugs, bugsTotal });
  };

  public addBug = async (
    req: BugsRequest,
    res: Response<BugResponse>,
    next: NextFunction,
  ): Promise<void> => {
    const { bugData: bugDataDto } = req.body;

    const bugExists = await this.doesBugExist("commonName", bugDataDto.name);

    if (bugExists) {
      const error = new ServerError(
        statusCodes.CONFLICT,
        `Bug with name '${bugDataDto.name}' already exists`,
      );

      next(error);

      return;
    }

    const bugData = mapBugDataDtoToBugData(bugDataDto);

    try {
      const bug: BugStructure = await this.bugModel.create(bugData);

      res.status(statusCodes.CREATED).json({ bug });
    } catch (creationError: unknown) {
      const error = new ServerError(
        statusCodes.BAD_REQUEST,
        (creationError as Error).message,
      );

      next(error);

      return;
    }
  };

  public deleteBugById = async (
    req: BugsRequest,
    res: Response<BugResponse>,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;

    const bugExists = await this.doesBugExist("_id", id);

    if (!bugExists) {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        `Bug with ID '${id}' doesn't exist`,
      );

      next(error);

      return;
    }

    const bug = (await this.bugModel.findByIdAndDelete(id)) as BugStructure;

    res.status(statusCodes.OK).json({ bug });
  };

  public getBugById = async (
    req: BugsRequest,
    res: Response<BugResponse>,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;

    const bugExists = await this.doesBugExist("_id", id);

    if (!bugExists) {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        `Bug with ID '${id}' doesn't exist`,
      );

      next(error);

      return;
    }

    const bug = (await this.bugModel.findById(id)) as BugStructure;

    res.status(statusCodes.OK).json({ bug });
  };

  public toggleIsFavorite = async (
    req: BugsRequest,
    res: Response<BugResponse>,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;

    const bugExists = await this.doesBugExist("_id", id);

    if (!bugExists) {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        `Bug with ID '${id}' doesn't exist`,
      );

      next(error);

      return;
    }

    const currentBug = (await this.bugModel.findById(id)) as BugStructure;

    const bug = (await this.bugModel.findByIdAndUpdate(
      id,
      {
        isFavorite: !currentBug.isFavorite,
      },
      { new: true },
    )) as BugStructure;

    res.status(statusCodes.OK).json({ bug });
  };
}

export default BugsController;
