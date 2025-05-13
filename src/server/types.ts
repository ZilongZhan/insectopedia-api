import { Request } from "express";
import { BugStructure } from "../bug/types.js";

interface BugsQuery {
  pageNumber: string;
}

export type BugsRequest = Request<unknown, unknown, unknown, BugsQuery>;

export interface ErrorResponse {
  error: string;
}

export interface BugsDataResponse {
  bugs: BugStructure[];
  bugsTotal: number;
}
