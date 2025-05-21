import { Request } from "express";
import { BugStructure } from "../bug/types.js";
import { BugDataDto } from "../bug/dto/types.js";

interface BugsQuery {
  pageNumber: string;
}

export interface BugsBody {
  bugData: BugDataDto;
}

interface BugsParams {
  id: string;
}

export type BugsRequest = Request<BugsParams, unknown, BugsBody, BugsQuery>;

export interface ErrorResponse {
  error: string;
}

export interface BugsDataResponse {
  bugs: BugStructure[];
  bugsTotal: number;
}

export interface BugResponse {
  bug: BugStructure;
}
