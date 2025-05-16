import { Request } from "express";
import { BugStructure } from "../bug/types.js";
import { BugDataDto } from "../bug/dto/types.js";

interface BugsQuery {
  pageNumber: string;
}

export interface BugsBody {
  bugData: BugDataDto;
}

export type BugsRequest = Request<
  Record<string, unknown>,
  unknown,
  BugsBody,
  BugsQuery
>;

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
