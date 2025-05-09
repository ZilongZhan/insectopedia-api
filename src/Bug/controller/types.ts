import { Request, Response } from "express";

export interface BugsControllerStructure {
  getBugs: (req: BugsRequest, res: Response) => Promise<void>;
}

interface BugsQuery {
  pageNumber: string;
}

export type BugsRequest = Request<unknown, unknown, unknown, BugsQuery>;
