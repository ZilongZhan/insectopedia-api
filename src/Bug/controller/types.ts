import { Response } from "express";
import { BugsRequest } from "../../server/types.js";

export interface BugsControllerStructure {
  getBugsData: (req: BugsRequest, res: Response) => Promise<void>;
}
