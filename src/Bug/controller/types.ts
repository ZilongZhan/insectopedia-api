import { Response } from "express";
import { BugsRequest } from "../../server/types.js";

export interface BugsControllerStructure {
  getBugs: (req: BugsRequest, res: Response) => Promise<void>;
}
