import { NextFunction, Response } from "express";
import {
  BugResponse,
  BugsDataResponse,
  BugsRequest,
} from "../../server/types.js";

export interface BugsControllerStructure {
  getBugsData: (
    req: BugsRequest,
    res: Response<BugsDataResponse>,
  ) => Promise<void>;
  addBug: (
    req: BugsRequest,
    res: Response<BugResponse>,
    next: NextFunction,
  ) => Promise<void>;
  deleteBugById: (
    req: BugsRequest,
    res: Response<BugResponse>,
    next: NextFunction,
  ) => Promise<void>;
  getBugById: (
    req: BugsRequest,
    res: Response<BugResponse>,
    next: NextFunction,
  ) => Promise<void>;
}
