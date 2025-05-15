import { Response } from "express";
import { BugsDataResponse, BugsRequest } from "../../server/types.js";

export interface BugsControllerStructure {
  getBugsData: (
    req: BugsRequest,
    res: Response<BugsDataResponse>,
  ) => Promise<void>;
}
